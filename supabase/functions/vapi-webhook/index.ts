import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { message } = body;
    
    console.log('[VAPI Webhook] Received:', JSON.stringify(message, null, 2));

    // Handle different message types
    if (message.type === 'tool-calls') {
      return await handleToolCalls(message, req);
    } else if (message.type === 'status-update') {
      console.log(`[VAPI Webhook] Call status: ${message.call?.status}`);
    } else if (message.type === 'transcript') {
      console.log(`[VAPI Webhook] ${message.role}: ${message.transcript}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[VAPI Webhook] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function handleToolCalls(message: any, req: Request) {
  const { toolCalls } = message;
  
  if (!toolCalls || !Array.isArray(toolCalls)) {
    console.error('[VAPI Webhook] No tool calls found in message');
    return new Response(JSON.stringify({ error: 'No tool calls found' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  console.log(`[VAPI Webhook] Processing ${toolCalls.length} tool call(s)`);

  // Initialize Supabase client
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const results = [];

  try {
    // Process each tool call
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function?.name;
      const functionArgs = toolCall.function?.arguments;
      
      if (!functionName) {
        console.warn('[VAPI Webhook] Skipping tool call without function name:', toolCall);
        continue;
      }

      console.log(`[VAPI Webhook] Tool call ${toolCall.id}: ${functionName}`, functionArgs);

      // Special handling for get_page_context - request from frontend
      if (functionName === 'get_page_context') {
        console.log('[VAPI Webhook] Requesting page context from frontend...');
        
        const requestId = `${toolCall.id}-${Date.now()}`;
        const requestChannel = supabase.channel('vapi-function-requests');
        const responseChannel = supabase.channel('vapi-function-responses');
        
        // Subscribe to response channel first
        await responseChannel.subscribe();
        
        // Set up promise to wait for response
        const responsePromise = new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Timeout waiting for page context'));
          }, 5000); // 5 second timeout
          
          responseChannel.on('broadcast', { event: 'function-response' }, ({ payload }: any) => {
            if (payload.requestId === requestId) {
              clearTimeout(timeout);
              resolve(payload);
            }
          });
        });
        
        // Request page context from frontend
        await requestChannel.send({
          type: 'broadcast',
          event: 'function-request',
          payload: {
            requestId,
            functionName: 'get_page_context',
            parameters: functionArgs,
            toolCallId: toolCall.id,
          },
        });
        
        try {
          // Wait for response from frontend
          const response: any = await responsePromise;
          
          console.log('[VAPI Webhook] Received page context:', response.result);
          
          results.push({
            toolCallId: toolCall.id,
            result: response.result,
          });
        } catch (error) {
          console.error('[VAPI Webhook] Failed to get page context:', error);
          results.push({
            toolCallId: toolCall.id,
            error: 'Failed to retrieve page context from frontend',
          });
        } finally {
          await supabase.removeChannel(requestChannel);
          await supabase.removeChannel(responseChannel);
        }
      } else {
        // Regular function - broadcast to frontend via Realtime
        const channel = supabase.channel('vapi-commands');
        
        await channel.send({
          type: 'broadcast',
          event: 'function-call',
          payload: {
            function: functionName,
            parameters: functionArgs,
            callId: message.call?.id,
            toolCallId: toolCall.id,
            timestamp: new Date().toISOString(),
          },
        });

        console.log(`[VAPI Webhook] Broadcasted ${functionName} (${toolCall.id}) to frontend`);
        
        results.push({
          toolCallId: toolCall.id,
          result: `${functionName} command queued for execution`,
        });
      }
    }

    // Return results to VAPI
    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[VAPI Webhook] Error processing tool calls:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({
      error: errorMessage,
      results,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

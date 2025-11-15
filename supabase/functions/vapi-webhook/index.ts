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
  const channel = supabase.channel('vapi-commands');

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

      // Broadcast to frontend via Realtime
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
        function: functionName,
        success: true,
      });
    }

    // Return success for all tool calls
    return new Response(JSON.stringify({
      result: `${results.length} command(s) queued for execution`,
      success: true,
      toolCalls: results,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[VAPI Webhook] Broadcast error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({
      result: 'Failed to queue commands',
      success: false,
      error: errorMessage,
      toolCalls: results,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

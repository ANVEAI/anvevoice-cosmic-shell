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
    if (message.type === 'function-call') {
      return await handleFunctionCall(message, req);
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

async function handleFunctionCall(message: any, req: Request) {
  const { functionCall } = message;
  
  console.log(`[VAPI Webhook] Function call: ${functionCall.name}`, functionCall.parameters);

  // Initialize Supabase client
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Broadcast to frontend via Realtime
    const channel = supabase.channel('vapi-commands');
    
    await channel.send({
      type: 'broadcast',
      event: 'function-call',
      payload: {
        function: functionCall.name,
        parameters: functionCall.parameters,
        callId: message.call?.id,
        timestamp: new Date().toISOString(),
      },
    });

    console.log(`[VAPI Webhook] Broadcasted ${functionCall.name} to frontend`);

    // Return success immediately - DOM action happens asynchronously on frontend
    return new Response(JSON.stringify({
      result: `Command ${functionCall.name} queued for execution`,
      success: true,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[VAPI Webhook] Broadcast error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({
      result: `Failed to queue ${functionCall.name}`,
      success: false,
      error: errorMessage,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

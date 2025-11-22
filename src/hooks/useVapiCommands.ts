import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CommandPayload {
  function: string;
  parameters: Record<string, any>;
  callId: string;
  timestamp: string;
}

export const useVapiCommands = (domActions: Record<string, Function>, callId: string | null) => {
  useEffect(() => {
    if (!callId) {
      console.log('[ANVE Commands] No callId yet, waiting...');
      return;
    }
    
    const channelName = `vapi-commands-${callId}`;
    console.log('[ANVE Commands] Setting up listener for:', channelName);
    
    const channel = supabase.channel(channelName);

    channel
      .on('broadcast', { event: 'function-call' }, ({ payload }: { payload: CommandPayload }) => {
        console.log('[ANVE Commands] Received command:', payload);

        const action = domActions[payload.function];
        if (action) {
          try {
            action(payload.parameters);
            console.log(`[ANVE Commands] Executed: ${payload.function}`, payload.parameters);
          } catch (error) {
            console.error(`[ANVE Commands] Error executing ${payload.function}:`, error);
          }
        } else {
          console.warn(`[ANVE Commands] Unknown function: ${payload.function}`);
        }
      })
      .subscribe((status) => {
        console.log('[ANVE Commands] Channel status:', status);
      });

    return () => {
      console.log('[ANVE Commands] Cleaning up listener for:', channelName);
      supabase.removeChannel(channel);
    };
  }, [domActions, callId]);
};

import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CommandPayload {
  function: string;
  parameters: Record<string, any>;
  callId: string;
  timestamp: string;
}

export const useVapiCommands = (domActions: Record<string, Function>) => {
  useEffect(() => {
    console.log('[ANVE Commands] Setting up Realtime listener');
    
    const channel = supabase.channel('vapi-commands');

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
      console.log('[ANVE Commands] Cleaning up Realtime listener');
      supabase.removeChannel(channel);
    };
  }, [domActions]);
};

import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CommandPayload {
  function: string;
  parameters: Record<string, any>;
  callId: string;
  timestamp: string;
}

export const useVapiCommands = (
  domActions: Record<string, Function>,
  sessionId: string,
  isActive: boolean
) => {
  useEffect(() => {
    if (!isActive || !sessionId) {
      console.log('[ANVE Commands] Not active or no sessionId, waiting...');
      return;
    }

    const executeAction = (payload: CommandPayload) => {
      // Double-check sessionId matches for extra safety
      if (payload.callId && payload.callId !== sessionId) {
        console.warn('[ANVE Commands] Ignoring command for different session');
        return;
      }

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
    };
    
    // Subscribe ONLY to session-specific channel
    const channelName = `vapi-commands-${sessionId}`;
    console.log('[ANVE Commands] Subscribing to:', channelName);
    
    const channel = supabase.channel(channelName);
    channel
      .on('broadcast', { event: 'function-call' }, ({ payload }: { payload: CommandPayload }) => {
        console.log('[ANVE Commands] Received command:', payload);
        executeAction(payload);
      })
      .subscribe((status) => {
        console.log('[ANVE Commands] Channel status:', status);
      });

    return () => {
      console.log('[ANVE Commands] Cleaning up listener');
      supabase.removeChannel(channel);
    };
  }, [domActions, sessionId, isActive]);
};

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
  callId: string | null,
  isActive: boolean
) => {
  useEffect(() => {
    const channels: any[] = [];
    
    const executeAction = (payload: CommandPayload) => {
      if (!isActive) {
        console.log('[ANVE Commands] Ignoring command - assistant not active in this tab');
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
    
    // Always subscribe to global fallback channel
    console.log('[ANVE Commands] Setting up global fallback listener');
    const globalChannel = supabase.channel('vapi-commands-global');
    globalChannel
      .on('broadcast', { event: 'function-call' }, ({ payload }: { payload: CommandPayload }) => {
        console.log('[ANVE Commands] Received command on global channel:', payload);
        executeAction(payload);
      })
      .subscribe((status) => {
        console.log('[ANVE Commands] Global channel status:', status);
      });
    channels.push(globalChannel);
    
    // If we have callId, also subscribe to session-specific channel
    if (callId) {
      const channelName = `vapi-commands-${callId}`;
      console.log('[ANVE Commands] Setting up session-specific listener for:', channelName);
      
      const sessionChannel = supabase.channel(channelName);
      sessionChannel
        .on('broadcast', { event: 'function-call' }, ({ payload }: { payload: CommandPayload }) => {
          console.log('[ANVE Commands] Received command on session channel:', payload);
          executeAction(payload);
        })
        .subscribe((status) => {
          console.log('[ANVE Commands] Session channel status:', status);
        });
      channels.push(sessionChannel);
    } else {
      console.log('[ANVE Commands] No callId yet, using global channel only');
    }

    return () => {
      console.log('[ANVE Commands] Cleaning up all listeners');
      channels.forEach(ch => supabase.removeChannel(ch));
    };
  }, [domActions, callId, isActive]);
};

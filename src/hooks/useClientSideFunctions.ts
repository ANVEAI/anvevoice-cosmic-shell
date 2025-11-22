import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import * as domActions from '@/utils/domActions';

/**
 * Hook to handle client-side function execution for VAPI
 * Listens for function requests from webhook and sends results back
 */
export const useClientSideFunctions = (callId: string | null, isActive: boolean) => {
  useEffect(() => {
    const channels: any[] = [];

    const handleFunctionRequest = async (payload: any) => {
      if (!isActive) {
        console.log('[Client Functions] Ignoring request - assistant not active in this tab');
        return;
      }

      console.log('[Client Functions] Processing function request:', payload);
      const { functionName, parameters, requestId } = payload;

      if (functionName === 'get_page_context') {
        try {
          const result = domActions.get_page_context(parameters || {});
          console.log('[Client Functions] Executed get_page_context:', result);

          // Send response back through appropriate channel
          const responseChannelName = callId 
            ? `vapi-function-responses-${callId}`
            : 'vapi-function-responses-global';
          
          const responseChannel = supabase.channel(responseChannelName);
          await responseChannel.send({
            type: 'broadcast',
            event: 'function-response',
            payload: {
              requestId,
              functionName,
              result,
              success: true,
            },
          });
          console.log(`[Client Functions] Sent response to ${responseChannelName}`);
          await supabase.removeChannel(responseChannel);
        } catch (error) {
          console.error('[Client Functions] Error executing get_page_context:', error);
          
          const responseChannelName = callId 
            ? `vapi-function-responses-${callId}`
            : 'vapi-function-responses-global';
          
          const responseChannel = supabase.channel(responseChannelName);
          await responseChannel.send({
            type: 'broadcast',
            event: 'function-response',
            payload: {
              requestId,
              functionName,
              error: error instanceof Error ? error.message : 'Unknown error',
              success: false,
            },
          });
          await supabase.removeChannel(responseChannel);
        }
      }
    };

    // Always subscribe to global fallback
    console.log('[Client Functions] Setting up global request listener');
    const globalRequestChannel = supabase.channel('vapi-function-requests-global');
    globalRequestChannel
      .on('broadcast', { event: 'function-request' }, ({ payload }: any) => {
        console.log('[Client Functions] Received request on global channel:', payload);
        handleFunctionRequest(payload);
      })
      .subscribe((status) => {
        console.log('[Client Functions] Global request channel status:', status);
      });
    channels.push(globalRequestChannel);

    // If we have callId, also subscribe to session-specific channel
    if (callId) {
      const requestChannelName = `vapi-function-requests-${callId}`;
      console.log('[Client Functions] Setting up session-specific listener for:', requestChannelName);
      
      const requestChannel = supabase.channel(requestChannelName);
      const responseChannel = supabase.channel(`vapi-function-responses-${callId}`);

      requestChannel
        .on('broadcast', { event: 'function-request' }, ({ payload }: any) => {
          console.log('[Client Functions] Received request on session channel:', payload);
          handleFunctionRequest(payload);
        })
        .subscribe((status) => {
          console.log('[Client Functions] Session request channel status:', status);
        });
      
      responseChannel.subscribe((status) => {
        console.log('[Client Functions] Session response channel status:', status);
      });
      
      channels.push(requestChannel);
      channels.push(responseChannel);
    } else {
      console.log('[Client Functions] No callId yet, using global channel only');
    }

    return () => {
      console.log('[Client Functions] Cleaning up all listeners');
      channels.forEach(ch => supabase.removeChannel(ch));
    };
  }, [callId, isActive]);
};

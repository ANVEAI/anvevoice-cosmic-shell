import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import * as domActions from '@/utils/domActions';

/**
 * Hook to handle client-side function execution for VAPI
 * Listens for function requests from webhook and sends results back
 */
export const useClientSideFunctions = (sessionId: string, isActive: boolean) => {
  useEffect(() => {
    if (!isActive || !sessionId) {
      console.log('[Client Functions] Not active or no sessionId, waiting...');
      return;
    }

    const handleFunctionRequest = async (payload: any) => {
      console.log('[Client Functions] Processing function request:', payload);
      const { functionName, parameters, requestId } = payload;

      if (functionName === 'get_page_context') {
        try {
          const result = domActions.get_page_context(parameters || {});
          console.log('[Client Functions] Executed get_page_context:', result);

          // Send response back through session-specific channel
          const responseChannelName = `vapi-function-responses-${sessionId}`;
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
          
          const responseChannelName = `vapi-function-responses-${sessionId}`;
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

    // Subscribe ONLY to session-specific channel
    const requestChannelName = `vapi-function-requests-${sessionId}`;
    console.log('[Client Functions] Subscribing to:', requestChannelName);
    
    const requestChannel = supabase.channel(requestChannelName);
    const responseChannel = supabase.channel(`vapi-function-responses-${sessionId}`);

    requestChannel
      .on('broadcast', { event: 'function-request' }, ({ payload }: any) => {
        console.log('[Client Functions] Received request:', payload);
        handleFunctionRequest(payload);
      })
      .subscribe((status) => {
        console.log('[Client Functions] Request channel status:', status);
      });
    
    responseChannel.subscribe((status) => {
      console.log('[Client Functions] Response channel status:', status);
    });

    return () => {
      console.log('[Client Functions] Cleaning up listeners');
      supabase.removeChannel(requestChannel);
      supabase.removeChannel(responseChannel);
    };
  }, [sessionId, isActive]);
};

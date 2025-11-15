import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import * as domActions from '@/utils/domActions';

/**
 * Hook to handle client-side function execution for VAPI
 * Listens for function requests from webhook and sends results back
 */
export const useClientSideFunctions = () => {
  useEffect(() => {
    console.log('[Client Functions] Setting up client-side function handlers');
    
    const requestChannel = supabase.channel('vapi-function-requests');
    const responseChannel = supabase.channel('vapi-function-responses');

    // Listen for function requests from webhook
    requestChannel
      .on('broadcast', { event: 'function-request' }, ({ payload }: any) => {
        console.log('[Client Functions] Received request:', payload);

        const { functionName, parameters, requestId } = payload;

        if (functionName === 'get_page_context') {
          try {
            // Execute the function locally
            const result = domActions.get_page_context(parameters || {});
            console.log('[Client Functions] Executed get_page_context:', result);

            // Send result back to webhook via Realtime
            responseChannel.send({
              type: 'broadcast',
              event: 'function-response',
              payload: {
                requestId,
                functionName,
                result,
                success: true,
              },
            });
          } catch (error) {
            console.error('[Client Functions] Error executing function:', error);
            
            // Send error back to webhook
            responseChannel.send({
              type: 'broadcast',
              event: 'function-response',
              payload: {
                requestId,
                functionName,
                error: error instanceof Error ? error.message : 'Unknown error',
                success: false,
              },
            });
          }
        }
      })
      .subscribe((status) => {
        console.log('[Client Functions] Request channel status:', status);
      });

    // Subscribe to response channel
    responseChannel.subscribe((status) => {
      console.log('[Client Functions] Response channel status:', status);
    });

    return () => {
      console.log('[Client Functions] Cleaning up');
      supabase.removeChannel(requestChannel);
      supabase.removeChannel(responseChannel);
    };
  }, []);
};

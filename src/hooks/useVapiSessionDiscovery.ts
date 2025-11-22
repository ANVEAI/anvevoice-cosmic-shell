import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SessionInitPayload {
  callId: string;
  timestamp: string;
}

export const useVapiSessionDiscovery = (
  isActive: boolean,
  onCallIdReceived: (callId: string) => void
) => {
  useEffect(() => {
    if (!isActive) {
      console.log('[Session Discovery] Not active, skipping subscription');
      return;
    }
    
    console.log('[Session Discovery] Subscribing to global discovery channel');
    const discoveryChannel = supabase.channel('vapi-session-discovery');
    
    discoveryChannel
      .on('broadcast', { event: 'session-init' }, ({ payload }: { payload: SessionInitPayload }) => {
        console.log('[Session Discovery] Received callId:', payload.callId);
        onCallIdReceived(payload.callId);
      })
      .subscribe((status) => {
        console.log('[Session Discovery] Channel status:', status);
      });
    
    return () => {
      console.log('[Session Discovery] Cleaning up discovery channel');
      supabase.removeChannel(discoveryChannel);
    };
  }, [isActive, onCallIdReceived]);
};

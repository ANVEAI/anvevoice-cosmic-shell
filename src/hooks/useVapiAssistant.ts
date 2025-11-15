import { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import { useToast } from '@/hooks/use-toast';
import * as domActions from '@/utils/domActions';

export const useVapiAssistant = () => {
  const vapiRef = useRef<Vapi | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize VAPI
    const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      console.error('VITE_VAPI_PUBLIC_KEY not configured');
      return;
    }

    const vapi = new Vapi(publicKey);
    vapiRef.current = vapi;

    // Event listeners
    vapi.on('call-start', () => {
      console.log('[VAPI] Call started');
      setIsActive(true);
      toast({
        title: "🎙️ Voice Assistant Active",
        description: "Listening to your commands...",
      });
    });

    vapi.on('call-end', () => {
      console.log('[VAPI] Call ended');
      setIsActive(false);
      setIsSpeaking(false);
      toast({
        title: "Voice Assistant Stopped",
        description: "Click the orb to start again",
      });
    });

    vapi.on('speech-start', () => {
      console.log('[VAPI] Assistant speaking');
      setIsSpeaking(true);
    });

    vapi.on('speech-end', () => {
      console.log('[VAPI] Assistant stopped speaking');
      setIsSpeaking(false);
    });

    vapi.on('error', (error) => {
      console.error('[VAPI] Error:', error);
      toast({
        title: "Voice Assistant Error",
        description: error.message || 'An error occurred',
        variant: "destructive",
      });
      setIsActive(false);
      setIsSpeaking(false);
    });

    vapi.on('message', (message: any) => {
      console.log('[VAPI] Message:', message);
      
      // Handle client-side function calls
      if (message.type === 'function-call' && message.functionCall) {
        const { functionCall } = message;
        
        if (functionCall.name === 'get_page_context') {
          try {
            console.log('[VAPI] Executing client-side get_page_context');
            const result = domActions.get_page_context(functionCall.parameters || {});
            
            // Return result via callback in message
            if (message.callback) {
              message.callback({
                result: result,
              });
            }
            
            console.log('[VAPI] get_page_context result:', result);
          } catch (error) {
            console.error('[VAPI] Error executing get_page_context:', error);
            if (message.callback) {
              message.callback({
                error: error instanceof Error ? error.message : 'Unknown error',
              });
            }
          }
        }
      }
    });

    return () => {
      vapi.stop();
    };
  }, [toast]);

  const startAssistant = async () => {
    const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;
    if (!assistantId) {
      toast({
        title: "Configuration Error",
        description: "VAPI Assistant ID not configured",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('[VAPI] Starting assistant:', assistantId);
      await vapiRef.current?.start(assistantId);
    } catch (error) {
      console.error('[VAPI] Failed to start assistant:', error);
      toast({
        title: "Failed to Start",
        description: "Could not activate voice assistant",
        variant: "destructive",
      });
    }
  };

  const stopAssistant = () => {
    console.log('[VAPI] Stopping assistant');
    vapiRef.current?.stop();
  };

  return {
    startAssistant,
    stopAssistant,
    isActive,
    isSpeaking,
  };
};

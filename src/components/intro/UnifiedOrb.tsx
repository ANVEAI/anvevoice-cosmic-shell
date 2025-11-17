import { motion, AnimatePresence } from 'framer-motion';
import { IntroOrb } from '@/components/intro/IntroOrb';
import { Mic, X } from 'lucide-react';
import { useVapiAssistant } from "@/hooks/useVapiAssistant";
import { useVapiCommands } from "@/hooks/useVapiCommands";
import { useClientSideFunctions } from "@/hooks/useClientSideFunctions";
import { useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import * as domActions from "@/utils/domActions";

interface UnifiedOrbProps {
  isCentered: boolean;
}

/**
 * A single orb that smoothly transitions from large centered intro to small floating assistant.
 * 
 * Animation approach informed by:
 * - Framer Motion layout animations: https://www.framer.com/motion/
 * - Easings.net cubic-bezier(0.16, 1, 0.3, 1) for smooth deceleration
 * - GSAP principles: anticipation, natural path, follow-through
 * - Awwwards: visible transformation with preserved visual effects
 */
export const UnifiedOrb = ({ isCentered }: UnifiedOrbProps) => {
  const { startAssistant, stopAssistant, isActive, isSpeaking } = useVapiAssistant();
  const isMobile = useIsMobile();
  
  // DOM Actions mapping for VAPI commands
  const actionHandlers = useMemo(() => ({
    scroll_page: domActions.scroll_page,
    scroll_to_content: domActions.scroll_to_content,
    go_back_to_top: domActions.go_back_to_top,
    click_element: domActions.click_element,
    fill_field: domActions.fill_field,
    toggle_element: domActions.toggle_element,
    navigate_to_page: domActions.navigate_to_page,
  }), []);

  useVapiCommands(actionHandlers);
  useClientSideFunctions();

  const handleTapSpeak = () => {
    if (isActive) {
      stopAssistant();
    } else {
      startAssistant();
    }
  };

  // Animation variants for smooth, visible transformation
  // Using cubic-bezier(0.16, 1, 0.3, 1) - "ease-out-expo" for natural deceleration
  const easeCurve = [0.16, 1, 0.3, 1] as const;
  
  const orbVariants = {
    centered: {
      top: '50%',
      left: isMobile ? '50%' : 'calc(50% + 40px)',
      x: '-50%',
      y: '-50%',
      scale: 1,
      transition: {
        duration: 1,
        ease: easeCurve, // Smooth ease-out from easings.net
      }
    },
    floating: {
      top: 'auto' as const,
      left: 'auto' as const,
      bottom: 24,
      right: 24,
      x: 0,
      y: 0,
      scale: 0.25, // Shrinks from 320px to 80px
      transition: {
        duration: 1,
        ease: easeCurve,
      }
    }
  };

  return (
    <>
      {/* Background overlay - only visible when centered */}
      <AnimatePresence>
        {isCentered && (
          <motion.div
            className="fixed inset-0 z-30 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-glow opacity-50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unified Orb Container */}
      <motion.div
        className="z-[60]"
        initial={false}
        animate={isCentered ? 'centered' : 'floating'}
        variants={orbVariants}
        style={{
          position: 'fixed',
          pointerEvents: 'auto',
        }}
      >
        {/* Text content - only when centered */}
        <AnimatePresence>
          {isCentered && (
            <motion.div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-max"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-center whitespace-nowrap">
                Ask Anything. Speak, Don't Type.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Orb itself - always visible, smoothly transitioning */}
        <motion.div
          className="relative cursor-pointer"
          onClick={handleTapSpeak}
          whileHover={{ scale: isCentered ? 1.02 : 1.1 }}
          whileTap={{ scale: isCentered ? 0.98 : 0.95 }}
          aria-label={isActive ? "Stop voice assistant" : "Start voice assistant"}
        >
          <div className={isCentered ? "w-80 h-80" : "w-80 h-80"}>
            <IntroOrb size="large" />
          </div>

          {/* Active indicator for floating state */}
          <AnimatePresence>
            {!isCentered && isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full shadow-lg"
                style={{ transformOrigin: 'center' }}
              >
                {isSpeaking && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-green-400 rounded-full opacity-50"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Voice Control Button - only when centered */}
        <AnimatePresence>
          {isCentered && (
            <motion.button
              onClick={handleTapSpeak}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-background/10 backdrop-blur-md rounded-full border border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all flex items-center justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.div
                    key="cross"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mic"
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mic className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

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
 * Revised UnifiedOrb:
 * - motion.div is the fixed box with width/height = orbSize so transforms work predictably.
 * - No inner fixed-size wrapper that broke transforms.
 * - Variants explicitly set top/left or bottom/right so centering is robust.
 */
export const UnifiedOrb = ({
  isCentered
}: UnifiedOrbProps) => {
  const {
    startAssistant,
    stopAssistant,
    isActive,
    isSpeaking
  } = useVapiAssistant();
  const isMobile = useIsMobile();
  const orbSize = 'clamp(240px, 70vw, 340px)';
  const actionHandlers = useMemo(() => ({
    scroll_page: domActions.scroll_page,
    scroll_to_content: domActions.scroll_to_content,
    go_back_to_top: domActions.go_back_to_top,
    click_element: domActions.click_element,
    fill_field: domActions.fill_field,
    toggle_element: domActions.toggle_element,
    navigate_to_page: domActions.navigate_to_page
  }), []);
  useVapiCommands(actionHandlers);
  useClientSideFunctions();
  const handleTapSpeak = (e?: React.MouseEvent) => {
    // prevent bubbled clicks (like clicking the inner button) from toggling twice
    e?.stopPropagation?.();
    if (isActive) stopAssistant();else startAssistant();
  };
  const easeCurve = [0.16, 1, 0.3, 1] as const;
  const mobileNudge = 'clamp(28px, 8vw, 48px)';
  const orbVariants = useMemo(() => ({
    centered: {
      top: '50%',
      left: isMobile ? `calc(50% - ${mobileNudge})` : '50%',
      right: 'auto',
      bottom: 'auto',
      x: '-50%',
      y: '-50%',
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeCurve
      }
    },
    floating: {
      top: 'auto',
      left: 'auto',
      bottom: 24,
      right: 24,
      x: 0,
      y: 0,
      scale: 0.25,
      transition: {
        duration: 0.9,
        ease: easeCurve
      }
    }
  }), [isMobile]);
  return <>
      <AnimatePresence>
        {isCentered && <motion.div className="fixed inset-0 z-30" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.4
      }}>
            <div className="absolute inset-0 bg-background/80">
              <div className="absolute inset-0 bg-gradient-glow opacity-50" />
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* motion container is the fixed box sized to orbSize so transforms are stable */}
      <motion.div className={isCentered ? "z-50" : "z-20"} initial={false} animate={isCentered ? 'centered' : 'floating'} variants={orbVariants} style={{
      position: 'fixed',
      width: orbSize,
      height: orbSize,
      pointerEvents: 'auto',
      // keep high render quality during transforms
      transformOrigin: 'center center'
    }}>
        {/* content positioned relative to the orb box */}
        <div className="relative w-full h-full overflow-visible">
          {/* centered text above orb */}
          <AnimatePresence>
            {isCentered && <motion.div className="absolute left-1/2 -translate-x-[10%] w-max" style={{
            bottom: `calc(100% + clamp(16px, 4vh, 40px))`
          }} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -20
          }} transition={{
            duration: 0.35
          }}>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-center">
                  Ask Anything. Speak, Don't Type.
                </p>
              </motion.div>}
          </AnimatePresence>

          {/* Orb clickable area: fills the motion container */}
          <motion.div className="relative w-full h-full cursor-pointer" onClick={handleTapSpeak} whileHover={{
          scale: isCentered ? 1.02 : 1.05
        }} whileTap={{
          scale: isCentered ? 0.98 : 0.95
        }} aria-label={isActive ? "Stop voice assistant" : "Start voice assistant"}>
            {/* IntroOrb should scale to its container; this wrapper ensures it covers the box */}
            <div style={{
            width: '100%',
            height: '100%'
          }}>
              <IntroOrb size="large" />
            </div>

            {/* floating active indicator */}
            <AnimatePresence>
              {!isCentered && isActive && <motion.div initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} exit={{
              opacity: 0,
              scale: 0.8
            }} className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full shadow-lg" style={{
              transformOrigin: 'center'
            }}>
                  {isSpeaking && <motion.div animate={{
                scale: [1, 1.5, 1]
              }} transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }} className="absolute inset-0 bg-green-400 rounded-full opacity-50" />}
                </motion.div>}
            </AnimatePresence>
          </motion.div>

          {/* voice control button when centered */}
          <AnimatePresence>
            {isCentered && <motion.button onClick={e => handleTapSpeak(e)} style={{
            top: `calc(100% + clamp(24px, 6vh, 64px))`
          }} initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: 20
          }} transition={{
            duration: 0.35
          }} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="absolute left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-background/10 backdrop-blur-md rounded-full border border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all flex items-center justify-center py-0 px-0 my-[80px]">
                <AnimatePresence mode="wait">
                  {isActive ? <motion.div key="cross" initial={{
                scale: 0,
                rotate: -90
              }} animate={{
                scale: 1,
                rotate: 0
              }} exit={{
                scale: 0,
                rotate: 90
              }} transition={{
                duration: 0.18
              }}>
                      <X className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </motion.div> : <motion.div key="mic" initial={{
                scale: 0,
                rotate: 90
              }} animate={{
                scale: 1,
                rotate: 0
              }} exit={{
                scale: 0,
                rotate: -90
              }} transition={{
                duration: 0.18
              }}>
                      <Mic className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </motion.div>}
                </AnimatePresence>
              </motion.button>}
          </AnimatePresence>
        </div>
      </motion.div>
    </>;
};
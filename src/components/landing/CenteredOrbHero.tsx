import { motion, AnimatePresence } from 'framer-motion';
import { IntroOrb } from '@/components/intro/IntroOrb';
import { Mic, X } from 'lucide-react';
interface CenteredOrbHeroProps {
  onTapSpeak: () => void;
  isActive: boolean;
}
export const CenteredOrbHero = ({
  onTapSpeak,
  isActive
}: CenteredOrbHeroProps) => {
  return <motion.section className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-background" initial={{
    opacity: 1
  }} exit={{
    opacity: 0,
    scale: 0.25,
    x: 'calc(50vw - 4rem)',
    y: 'calc(50vh - 4rem)',
    transition: {
      duration: 1.2,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }}>
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Heading */}
        

        {/* Tagline */}
        <motion.p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 px-4 text-center" initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4,
        duration: 0.6
      }}>
          Ask Anything. Speak, Don't Type.
        </motion.p>

        {/* Large Centered Orb */}
        <motion.div className="relative mb-6 sm:mb-8 w-full flex justify-center items-center" initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 0.6,
        duration: 0.8,
        ease: 'easeOut'
      }}>
          <div className="w-80 h-80 flex justify-center items-center scale-[0.8] sm:scale-100">
            <IntroOrb size="large" className="flex items-center justify-center" />
          </div>
        </motion.div>

        {/* Voice Control Button */}
        <motion.button onClick={onTapSpeak} className="relative w-14 h-14 sm:w-16 sm:h-16 bg-background/10 backdrop-blur-md rounded-full border border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all flex items-center justify-center" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.8,
        duration: 0.6
      }} whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
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
            duration: 0.2
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
            duration: 0.2
          }}>
                <Mic className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </motion.div>}
          </AnimatePresence>
        </motion.button>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-sm" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.2,
        duration: 0.6
      }}>
          
        </motion.div>
      </div>
    </motion.section>;
};
import { motion } from 'framer-motion';
import { IntroOrb } from '@/components/intro/IntroOrb';
import { Mic } from 'lucide-react';

interface CenteredOrbHeroProps {
  onTapSpeak: () => void;
}

export const CenteredOrbHero = ({ onTapSpeak }: CenteredOrbHeroProps) => {
  return (
    <motion.section
      className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.8, ease: 'easeOut' },
      }}
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent px-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          AnveVoice
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 px-4 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Ask Anything. Speak, Don't Type.
        </motion.p>

        {/* Large Centered Orb */}
        <motion.div
          className="relative mb-6 sm:mb-8 px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        >
          <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto">
            <IntroOrb size="large" className="!w-full !h-full" />
          </div>
        </motion.div>

        {/* Tap & Speak Button */}
        <motion.button
          onClick={onTapSpeak}
          className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-slate-800/50 backdrop-blur-md rounded-full border border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:animate-pulse" />
          <span className="text-foreground font-medium text-sm sm:text-base">Tap & Speak</span>
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓ Scroll to explore
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

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
      {/* Deep space cosmic background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Animated cosmic particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`cosmic-${i}`}
            className="absolute w-1 h-1 bg-primary-glow rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary-glow bg-clip-text text-transparent tracking-tight"
          style={{
            textShadow: "0 0 40px hsl(270 100% 60% / 0.3), 0 0 80px hsl(190 100% 60% / 0.2)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          AnveVoice
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-12 font-light tracking-wide"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Ask Anything. Speak, Don't Type.
        </motion.p>

        {/* Large Centered Orb */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        >
          <IntroOrb size="large" />
        </motion.div>

        {/* Tap & Speak Button */}
        <motion.button
          onClick={onTapSpeak}
          className="flex items-center gap-3 px-8 py-4 rounded-full border-2 transition-all group relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(270 100% 60% / 0.15), hsl(190 100% 60% / 0.15))",
            borderColor: "hsl(270 100% 65%)",
            boxShadow: "0 0 30px hsl(270 100% 60% / 0.4), 0 0 60px hsl(190 100% 60% / 0.2)",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 40px hsl(270 100% 60% / 0.6), 0 0 80px hsl(190 100% 60% / 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Mic className="w-5 h-5 text-primary group-hover:animate-pulse relative z-10" />
          <span className="text-foreground font-medium tracking-wide relative z-10">Tap & Speak</span>
          
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: "linear-gradient(135deg, hsl(270 100% 60% / 0.2), hsl(190 100% 60% / 0.2))",
            }}
          />
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

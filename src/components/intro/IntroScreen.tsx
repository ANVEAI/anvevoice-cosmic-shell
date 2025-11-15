import { motion } from "framer-motion";
import { useEffect } from "react";
import { Mic, X } from "lucide-react";
import { IntroOrb } from "./IntroOrb";

interface IntroScreenProps {
  onComplete: () => void;
  onTransitionComplete: () => void;
  phase: "intro" | "transitioning" | "completed";
}

export const IntroScreen = ({ onComplete, onTransitionComplete, phase }: IntroScreenProps) => {
  // Auto-transition after 12 seconds
  useEffect(() => {
    const timer = setTimeout(onComplete, 12000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Helper to compute exact target offset for bottom-right positioning
  const getTargetOffset = () => {
    const margin = 24; // matches bottom-6 right-6 (1.5rem = 24px)
    const smallSize = 64; // small orb size
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const targetCenterX = window.innerWidth - margin - smallSize / 2;
    const targetCenterY = window.innerHeight - margin - smallSize / 2;
    return { x: targetCenterX - centerX, y: targetCenterY - centerY };
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, hsl(220 20% 8%), hsl(220 25% 10%))",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Ambient background effects */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        animate={{ opacity: phase === "intro" ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Subtle gradient overlays */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(205 80% 65% / 0.08), transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(280 60% 50% / 0.05), transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={
          phase === "intro"
            ? { scale: 1, opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
            : (() => {
                const { x, y } = typeof window !== "undefined" ? getTargetOffset() : { x: 0, y: 0 };
                return {
                  scale: 0.25,
                  x,
                  y,
                  opacity: 1,
                  filter: "blur(0px)",
                };
              })()
        }
        transition={
          phase === "intro"
            ? { duration: 0.8, delay: 0.2 }
            : { 
                duration: 2.2, 
                ease: [0.43, 0.13, 0.23, 0.96],
                filter: { duration: 1.1 }
              }
        }
        onAnimationComplete={() => {
          if (phase === "transitioning") {
            onTransitionComplete();
          }
        }}
      >
        {/* Central orb */}
        <IntroOrb />

        {/* Control buttons */}
        <motion.div
          className="flex items-center gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === "intro" ? 1 : 0, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          {/* Mic button */}
          <button
            disabled
            className="relative group cursor-not-allowed"
            aria-label="Microphone (disabled)"
          >
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: "hsl(220 15% 18% / 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid hsl(220 15% 30% / 0.3)",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Mic className="w-5 h-5 text-muted-foreground" />
            </motion.div>
            
            {/* Subtle glow effect */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "radial-gradient(circle, hsl(195 100% 50% / 0.1), transparent 70%)",
                filter: "blur(10px)",
              }}
            />
          </button>

          {/* Close button */}
          <button
            onClick={onComplete}
            className="relative group"
            aria-label="Close intro"
          >
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: "hsl(220 15% 18% / 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid hsl(220 15% 30% / 0.3)",
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "hsl(220 15% 22% / 0.7)",
              }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </motion.div>
            
            {/* Subtle glow effect */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "radial-gradient(circle, hsl(195 100% 50% / 0.1), transparent 70%)",
                filter: "blur(10px)",
              }}
            />
          </button>
        </motion.div>

        {/* Optional loading indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "intro" ? 0.5 : 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary-glow"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

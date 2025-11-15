import { motion } from "framer-motion";

interface IntroOrbProps {
  size?: "large" | "small";
  className?: string;
}

export const IntroOrb = ({ size = "large", className = "" }: IntroOrbProps) => {
  const isSmall = size === "small";
  const orbSize = isSmall ? "w-16 h-16" : "w-80 h-80"; // 320px for large
  const particleRadius = isSmall ? 45 : 180;
  const blurAmount = isSmall ? 25 : 60;
  const ringParticleCount = isSmall ? 12 : 24;
  
  return (
    <div className={`relative ${className}`}>
      {/* Cosmic outer glow - purple/blue */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(270 100% 65% / 0.4), hsl(210 100% 60% / 0.3), transparent 70%)",
          filter: `blur(${blurAmount}px)`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary cosmic glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(190 100% 60% / 0.3), transparent 60%)",
          filter: `blur(${blurAmount * 0.6}px)`,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main holographic orb */}
      <motion.div
        className={`relative ${orbSize} rounded-full overflow-hidden`}
        style={{
          boxShadow: "0 0 60px hsl(270 100% 60% / 0.5), 0 0 100px hsl(210 100% 60% / 0.3)",
        }}
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Holographic gradient core */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at center, hsl(270 100% 70% / 0.9), hsl(260 90% 60% / 0.7), hsl(210 100% 60% / 0.5))",
          }}
        />
        
        {/* Holographic scan lines */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(270 100% 80% / 0.1) 2px, hsl(270 100% 80% / 0.1) 4px)",
          }}
        />

        {/* Animated hologram pulse */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, hsl(180 100% 80% / 0.6), transparent 50%)",
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Rotating energy shimmer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, hsl(270 100% 80% / 0.4) 90deg, transparent 180deg, hsl(210 100% 70% / 0.4) 270deg, transparent 360deg)",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner holographic glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 80px hsl(270 100% 70% / 0.6), inset 0 0 40px hsl(210 100% 70% / 0.4)",
          }}
        />

        {/* Neon edge highlight */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid hsl(270 100% 75% / 0.8)",
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Rotating particle ring */}
      {[...Array(ringParticleCount)].map((_, i) => {
        const angle = (i * 360) / ringParticleCount;
        const radius = particleRadius;
        
        return (
          <motion.div
            key={`ring-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${(isSmall ? 32 : 160)}px`,
              top: `${(isSmall ? 32 : 160)}px`,
              background: i % 2 === 0 
                ? "radial-gradient(circle, hsl(270 100% 70%), hsl(270 100% 50%))"
                : "radial-gradient(circle, hsl(190 100% 70%), hsl(190 100% 50%))",
              boxShadow: i % 2 === 0
                ? "0 0 10px hsl(270 100% 60%), 0 0 20px hsl(270 100% 50% / 0.5)"
                : "0 0 10px hsl(190 100% 60%), 0 0 20px hsl(190 100% 50% / 0.5)",
            }}
            animate={{
              x: [
                Math.cos((angle * Math.PI) / 180) * radius,
                Math.cos(((angle + 360) * Math.PI) / 180) * radius,
              ],
              y: [
                Math.sin((angle * Math.PI) / 180) * radius,
                Math.sin(((angle + 360) * Math.PI) / 180) * radius,
              ],
              opacity: [0.6, 1, 0.6],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              x: { duration: 8, repeat: Infinity, ease: "linear", delay: i * 0.05 },
              y: { duration: 8, repeat: Infinity, ease: "linear", delay: i * 0.05 },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        );
      })}

      {/* Ambient floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${(isSmall ? 32 : 160) + Math.cos((i * Math.PI) / 4) * (particleRadius * 0.6)}px`,
            top: `${(isSmall ? 32 : 160) + Math.sin((i * Math.PI) / 4) * (particleRadius * 0.6)}px`,
            background: i % 3 === 0 
              ? "hsl(270 100% 70%)"
              : i % 3 === 1
              ? "hsl(190 100% 70%)"
              : "hsl(260 100% 65%)",
            boxShadow: i % 3 === 0
              ? "0 0 8px hsl(270 100% 60%)"
              : i % 3 === 1
              ? "0 0 8px hsl(190 100% 60%)"
              : "0 0 8px hsl(260 100% 60%)",
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-10, 10, -10],
            opacity: [0.4, 1, 0.4],
            scale: [0.6, 1.4, 0.6],
          }}
          transition={{
            duration: 4 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
};

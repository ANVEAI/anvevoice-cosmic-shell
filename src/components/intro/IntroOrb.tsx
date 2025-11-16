import { motion } from "framer-motion";

interface IntroOrbProps {
  size?: "large" | "small";
  className?: string;
}

export const IntroOrb = ({ size = "large", className = "" }: IntroOrbProps) => {
  const isSmall = size === "small";
  const orbSize = isSmall ? "w-16 h-16" : "w-80 h-80"; // 320px for large
  const particleRadius = isSmall ? 35 : 160;
  const blurAmount = isSmall ? 20 : 50;
  
  return (
    <div className={`relative ${className}`}>
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(205 85% 65% / 0.3), transparent 70%)",
          filter: `blur(${blurAmount}px)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main orb */}
      <motion.div
        className={`relative ${orbSize} rounded-full overflow-hidden`}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Gradient layers */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, hsl(200 70% 90%), hsl(210 90% 55%))",
          }}
        />
        
        {/* Animated texture overlay */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, hsl(200 60% 95% / 0.9), transparent 60%)",
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Moving shimmer effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(145deg, transparent 30%, hsl(200 80% 85% / 0.6) 50%, transparent 70%)",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 60px hsl(210 80% 70% / 0.4)",
          }}
        />

        {/* Edge highlight */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid hsl(205 70% 80% / 0.5)",
          }}
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary-glow"
          style={{
            left: `${(isSmall ? 32 : 128) + Math.cos((i * Math.PI) / 3) * particleRadius}px`,
            top: `${(isSmall ? 32 : 128) + Math.sin((i * Math.PI) / 3) * particleRadius}px`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

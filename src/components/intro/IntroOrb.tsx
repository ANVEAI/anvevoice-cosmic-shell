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
  const ringRadius = isSmall ? 45 : 180;
  
  return (
    <div className={`relative ${className}`}>
      {/* Outer purple glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(280 85% 60% / 0.4), hsl(220 90% 60% / 0.3), transparent 70%)",
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

      {/* Neon blue outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(220 100% 60% / 0.3), transparent 60%)",
          filter: `blur(${blurAmount * 0.8}px)`,
        }}
        animate={{
          scale: [1.1, 1.4, 1.1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Main orb sphere */}
      <motion.div
        className={`relative ${orbSize} rounded-full overflow-hidden`}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Purple to blue gradient base */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, hsl(280 90% 50%), hsl(260 85% 55%), hsl(220 100% 60%))",
          }}
        />
        
        {/* Holographic shine effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, hsl(280 60% 70% / 0.8), transparent 50%)",
          }}
          animate={{
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Neon blue highlight */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 70% 70%, transparent 40%, hsl(220 100% 65% / 0.6) 60%, transparent 80%)",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner neon glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 80px hsl(280 100% 60% / 0.6), inset 0 0 40px hsl(220 100% 70% / 0.4)",
          }}
        />

        {/* Hologram scan lines */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(180deg, transparent 48%, hsl(220 100% 80% / 0.1) 50%, transparent 52%)",
            backgroundSize: "100% 8px",
          }}
          animate={{
            y: ["-8px", "8px"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Neon edge glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid hsl(220 100% 65% / 0.8)",
            boxShadow: "0 0 20px hsl(220 100% 60% / 0.6), 0 0 40px hsl(280 90% 60% / 0.4)",
          }}
        />
      </motion.div>

      {/* Rotating particle ring */}
      <motion.div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: `${ringRadius * 2}px`,
          height: `${ringRadius * 2}px`,
          marginLeft: `-${ringRadius}px`,
          marginTop: `-${ringRadius}px`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          {/* Elliptical ring path */}
          <ellipse
            cx="50"
            cy="50"
            rx="48"
            ry="15"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="0.5"
            opacity="0.6"
            style={{ filter: "blur(1px)" }}
          />
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(220 100% 60%)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(280 90% 60%)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(220 100% 60%)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating neon particles */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const distance = particleRadius;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: isSmall ? "3px" : "4px",
              height: isSmall ? "3px" : "4px",
              left: `${(isSmall ? 32 : 160) + Math.cos(angle) * distance}px`,
              top: `${(isSmall ? 32 : 160) + Math.sin(angle) * distance}px`,
              background: i % 2 === 0 
                ? "hsl(220 100% 65%)" 
                : "hsl(280 90% 60%)",
              boxShadow: i % 2 === 0
                ? "0 0 10px hsl(220 100% 60% / 0.8)"
                : "0 0 10px hsl(280 90% 60% / 0.8)",
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.4, 1, 0.4],
              scale: [0.6, 1.4, 0.6],
            }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        );
      })}
    </div>
  );
};

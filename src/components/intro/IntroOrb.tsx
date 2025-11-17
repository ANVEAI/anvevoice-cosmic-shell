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
      {/* Deep space background glow - volumetric bloom */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(270 100% 65% / 0.4), hsl(240 100% 60% / 0.3), transparent 80%)",
          filter: `blur(${blurAmount * 1.5}px)`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Outer circular halo */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, transparent 65%, hsl(270 100% 70% / 0.15) 75%, transparent 85%)",
          filter: `blur(${isSmall ? 15 : 40}px)`,
        }}
        animate={{
          scale: [1.2, 1.4, 1.2],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main holographic orb */}
      <motion.div
        className={`relative ${orbSize} rounded-full overflow-hidden`}
        style={{
          boxShadow: `0 0 ${isSmall ? 30 : 80}px hsl(270 100% 65% / 0.6), 0 0 ${isSmall ? 50 : 120}px hsl(240 100% 60% / 0.4)`,
        }}
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Base gradient - neon purple to blue */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, hsl(270 100% 65%), hsl(260 100% 60%), hsl(240 100% 60%))",
          }}
        />
        
        {/* Holographic overlay - subsurface scattering effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, hsl(280 100% 80% / 0.8), hsl(270 80% 70% / 0.4), transparent 70%)",
            mixBlendMode: "screen",
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Volumetric glow shimmer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(145deg, transparent 20%, hsl(240 100% 70% / 0.5) 50%, transparent 80%)",
            mixBlendMode: "screen",
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

        {/* Inner radiance core */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at center, hsl(280 100% 75% / 0.6), transparent 60%)",
            boxShadow: `inset 0 0 ${isSmall ? 30 : 80}px hsl(270 100% 70% / 0.5)`,
          }}
        />

        {/* Depth blur edge */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `${isSmall ? 1 : 2}px solid hsl(270 100% 75% / 0.4)`,
            boxShadow: `inset 0 0 ${isSmall ? 20 : 50}px hsl(280 100% 60% / 0.3)`,
          }}
        />
      </motion.div>

      {/* Golden planetary ring */}
      <motion.div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: isSmall ? "110px" : "440px",
          height: isSmall ? "30px" : "120px",
          border: `${isSmall ? 1.5 : 3}px solid hsl(45 100% 60% / 0.7)`,
          borderRadius: "50%",
          transform: "translate(-50%, -50%) rotateX(75deg)",
          boxShadow: `0 0 ${isSmall ? 15 : 40}px hsl(45 100% 60% / 0.5), inset 0 0 ${isSmall ? 10 : 30}px hsl(45 100% 60% / 0.3)`,
        }}
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Particle ring - neon cosmic dust */}
      {[...Array(isSmall ? 16 : 24)].map((_, i) => {
        const angle = (i * 2 * Math.PI) / (isSmall ? 16 : 24);
        const radius = isSmall ? 50 : 200;
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: isSmall ? "2px" : "4px",
              height: isSmall ? "2px" : "4px",
              left: `${(isSmall ? 32 : 160) + Math.cos(angle) * radius}px`,
              top: `${(isSmall ? 32 : 160) + Math.sin(angle) * radius}px`,
              background: i % 3 === 0 
                ? "hsl(270 100% 70%)" 
                : i % 3 === 1 
                  ? "hsl(240 100% 65%)" 
                  : "hsl(280 100% 75%)",
              boxShadow: `0 0 ${isSmall ? 4 : 8}px currentColor`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.4, 0.8],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.05,
            }}
          />
        );
      })}

      {/* Swirling light specks - motion trails */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`speck-${i}`}
          className="absolute rounded-full"
          style={{
            width: isSmall ? "1px" : "2px",
            height: isSmall ? "1px" : "2px",
            left: `${(isSmall ? 32 : 160) + Math.cos((i * Math.PI) / 4) * (isSmall ? 40 : 160)}px`,
            top: `${(isSmall ? 32 : 160) + Math.sin((i * Math.PI) / 4) * (isSmall ? 40 : 160)}px`,
            background: "hsl(270 100% 75%)",
            boxShadow: `0 0 ${isSmall ? 6 : 12}px hsl(270 100% 70% / 0.8)`,
          }}
          animate={{
            x: [0, Math.cos((i * Math.PI) / 4) * (isSmall ? 20 : 60), 0],
            y: [0, Math.sin((i * Math.PI) / 4) * (isSmall ? 20 : 60), 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

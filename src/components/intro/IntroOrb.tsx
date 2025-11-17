import { motion } from "framer-motion";

interface IntroOrbProps {
  size?: "large" | "small";
  className?: string;
}

export const IntroOrb = ({ size = "large", className = "" }: IntroOrbProps) => {
  const isSmall = size === "small";
  const orbSize = isSmall ? "w-16 h-16" : "w-80 h-80";
  
  return (
    <div className={`relative ${className}`}>
      {/* Volumetric bloom - outer atmospheric glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(270 80% 60% / 0.3), hsl(250 90% 65% / 0.2), hsl(240 100% 70% / 0.15), transparent 75%)",
          filter: `blur(${isSmall ? 40 : 100}px)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft outer halo */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, transparent 60%, hsl(260 100% 70% / 0.12) 70%, hsl(240 100% 75% / 0.08) 80%, transparent 90%)",
          filter: `blur(${isSmall ? 20 : 50}px)`,
        }}
        animate={{
          scale: [1.3, 1.5, 1.3],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main 3D holographic sphere */}
      <motion.div
        className={`relative ${orbSize} rounded-full`}
        style={{
          boxShadow: `
            0 0 ${isSmall ? 40 : 100}px ${isSmall ? 20 : 50}px hsl(270 100% 65% / 0.4),
            0 0 ${isSmall ? 60 : 150}px ${isSmall ? 30 : 75}px hsl(250 100% 70% / 0.3),
            0 0 ${isSmall ? 80 : 200}px ${isSmall ? 40 : 100}px hsl(240 100% 75% / 0.2)
          `,
        }}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Base gradient sphere - violet to blue */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(280 95% 60%), hsl(270 90% 65%), hsl(260 85% 68%), hsl(250 80% 70%), hsl(240 90% 72%))",
          }}
        />
        
        {/* Top highlight - creates 3D sphere effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 25%, hsl(260 100% 85% / 0.6), hsl(250 90% 75% / 0.4), transparent 50%)",
            mixBlendMode: "overlay",
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subsurface scattering glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at center, hsl(270 100% 75% / 0.5), hsl(260 90% 70% / 0.3), transparent 65%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Rotating shimmer layer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(145deg, transparent 30%, hsl(240 100% 75% / 0.4) 50%, transparent 70%)",
            mixBlendMode: "overlay",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner radiance */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `inset 0 0 ${isSmall ? 40 : 100}px hsl(270 100% 70% / 0.6)`,
          }}
        />

        {/* Soft edge definition */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `${isSmall ? 1 : 2}px solid hsl(260 100% 80% / 0.3)`,
            boxShadow: `inset 0 0 ${isSmall ? 15 : 40}px hsl(270 90% 65% / 0.4)`,
          }}
        />
      </motion.div>

      {/* Embedded glowing ring - Saturn style */}
      <motion.div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: isSmall ? "110px" : "440px",
          height: isSmall ? "22px" : "88px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%) rotateX(75deg)",
          background: `
            radial-gradient(ellipse at center, 
              transparent 40%,
              hsl(190 100% 60% / 0.5) 47%,
              hsl(220 100% 65% / 0.7) 50%,
              hsl(260 100% 70% / 0.8) 53%,
              hsl(280 100% 65% / 0.6) 56%,
              transparent 63%
            )
          `,
          boxShadow: `
            0 0 ${isSmall ? 30 : 80}px hsl(220 100% 65% / 0.8),
            0 0 ${isSmall ? 20 : 60}px hsl(260 100% 70% / 0.6),
            inset 0 0 ${isSmall ? 20 : 50}px hsl(240 100% 75% / 0.7)
          `,
          filter: `blur(${isSmall ? 1.5 : 3}px)`,
        }}
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Ring particles - cosmic dust with gradient colors */}
      {[...Array(isSmall ? 12 : 20)].map((_, i) => {
        const angle = (i * 2 * Math.PI) / (isSmall ? 12 : 20);
        const radiusX = isSmall ? 52 : 208;
        const radiusY = isSmall ? 11 : 44;
        
        // Create gradient effect around the ring
        const progress = i / (isSmall ? 12 : 20);
        const hue = 190 + progress * 90; // From cyan (190) to purple (280)
        
        return (
          <motion.div
            key={`ring-particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: isSmall ? "2px" : "4px",
              height: isSmall ? "2px" : "4px",
              left: `${(isSmall ? 32 : 160) + Math.cos(angle) * radiusX}px`,
              top: `${(isSmall ? 32 : 160) + Math.sin(angle) * radiusY}px`,
              background: `hsl(${hue} 100% 70%)`,
              boxShadow: `0 0 ${isSmall ? 8 : 16}px hsl(${hue} 100% 70% / 0.8)`,
              filter: "blur(0.5px)",
            }}
            animate={{
              opacity: [0.4, 0.9, 0.4],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        );
      })}

      {/* Floating space particles - ambient depth */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const distance = isSmall ? 45 : 180;
        return (
          <motion.div
            key={`space-particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: isSmall ? "1px" : "2px",
              height: isSmall ? "1px" : "2px",
              left: `${(isSmall ? 32 : 160) + Math.cos(angle) * distance}px`,
              top: `${(isSmall ? 32 : 160) + Math.sin(angle) * distance}px`,
              background: "hsl(260 100% 80%)",
              boxShadow: `0 0 ${isSmall ? 8 : 16}px hsl(260 100% 75% / 0.7)`,
            }}
            animate={{
              x: [0, Math.cos(angle + Math.PI / 4) * (isSmall ? 15 : 40), 0],
              y: [0, Math.sin(angle + Math.PI / 4) * (isSmall ? 15 : 40), 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1.3, 0.5],
            }}
            transition={{
              duration: 5 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        );
      })}
    </div>
  );
};

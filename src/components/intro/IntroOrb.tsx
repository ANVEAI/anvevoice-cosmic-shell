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
  const ringRadius = isSmall ? 60 : 240; // Much larger ring
  
  return (
    <div className={`relative ${className}`}>
      {/* Atmospheric halo */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(250 80% 55% / 0.25), hsl(220 90% 60% / 0.2), transparent 65%)",
          filter: `blur(${blurAmount * 1.2}px)`,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft volumetric glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(230 85% 60% / 0.2), transparent 60%)",
          filter: `blur(${blurAmount * 0.8}px)`,
        }}
        animate={{
          scale: [1.05, 1.25, 1.05],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Main 3D orb sphere */}
      <motion.div
        className={`relative ${orbSize} rounded-full overflow-hidden`}
        style={{
          boxShadow: "0 8px 32px hsl(230 70% 50% / 0.3)",
        }}
        animate={{
          scale: [1, 1.015, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Smooth gradient base - blue to purple */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, hsl(230 85% 55%), hsl(250 75% 60%))",
          }}
        />
        
        {/* Soft highlight for 3D effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, hsl(220 70% 75% / 0.6), transparent 55%)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle depth shadow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 65% 70%, transparent 45%, hsl(250 60% 35% / 0.4) 70%)",
          }}
        />

        {/* Soft inner glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 60px hsl(230 80% 60% / 0.3)",
          }}
        />

        {/* Soft bloom effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 40% 35%, hsl(220 90% 70% / 0.3), transparent 50%)",
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Polished edge */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "0.5px solid hsl(220 80% 70% / 0.4)",
          }}
        />
      </motion.div>

      {/* Thin dotted luminescent ring */}
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
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          {/* Soft glow under the dots */}
          <ellipse
            cx="50"
            cy="50"
            rx="47"
            ry="16"
            fill="none"
            stroke="hsl(220 90% 65%)"
            strokeWidth="0.8"
            opacity="0.15"
            style={{ filter: "blur(2px)" }}
          />
          
          {/* Elegant dotted ring particles */}
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i * 360) / 48;
            const radians = (angle * Math.PI) / 180;
            const x = 50 + 47 * Math.cos(radians);
            const y = 50 + 16 * Math.sin(radians);
            const opacity = 0.4 + Math.sin((i / 48) * Math.PI * 4) * 0.35;
            const size = 0.35 + Math.sin((i / 48) * Math.PI * 2) * 0.15;
            
            return (
              <g key={i}>
                {/* Particle glow */}
                <circle
                  cx={x}
                  cy={y}
                  r={size * 2}
                  fill="hsl(220 100% 70%)"
                  opacity={opacity * 0.3}
                  style={{ filter: "blur(0.8px)" }}
                />
                {/* Bright particle core */}
                <circle
                  cx={x}
                  cy={y}
                  r={size}
                  fill="hsl(220 95% 75%)"
                  opacity={opacity + 0.3}
                />
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Soft ambient particles */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 6;
        const distance = particleRadius * 1.1;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: isSmall ? "2px" : "3px",
              height: isSmall ? "2px" : "3px",
              left: `${(isSmall ? 32 : 160) + Math.cos(angle) * distance}px`,
              top: `${(isSmall ? 32 : 160) + Math.sin(angle) * distance}px`,
              background: "hsl(220 90% 70%)",
              boxShadow: "0 0 8px hsl(220 90% 65% / 0.6)",
            }}
            animate={{
              y: [-12, 12, -12],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.7, 1.2, 0.7],
            }}
            transition={{
              duration: 4 + i * 0.5,
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

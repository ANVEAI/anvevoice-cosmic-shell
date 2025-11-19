import { motion } from "framer-motion";

interface IntroOrbProps {
  size?: "large" | "small";
  className?: string;
}

export const IntroOrb = ({ size = "large", className = "" }: IntroOrbProps) => {
  const isSmall = size === "small";

  const containerSizeClass = isSmall ? "w-16 h-16" : "w-full h-full";
  const baseGlowBlur = isSmall ? 32 : 80;
  const haloGlowBlur = isSmall ? 22 : 60;
  const ringWidth = isSmall ? 72 : 240;
  const ringHeight = isSmall ? 22 : 72;

  return (
    <div className={`relative ${containerSizeClass} ${className}`}>
      {/* Main soft glow behind the orb */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(270 100% 65% / 0.4), hsl(260 95% 68% / 0.28), hsl(250 90% 70% / 0.16), transparent 70%)",
          filter: `blur(${baseGlowBlur}px)`,
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary atmospheric glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(270 100% 70% / 0.35), hsl(260 90% 72% / 0.22), transparent 60%)",
          filter: `blur(${haloGlowBlur}px)`,
        }}
        animate={{ scale: [1.05, 1.18, 1.05], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main sphere */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, hsl(280 100% 65%), hsl(270 90% 60%), hsl(255 85% 64%), hsl(240 90% 72%))",
          boxShadow: `0 0 ${isSmall ? 32 : 80}px hsl(270 100% 75% / 0.8), 0 0 ${
            isSmall ? 60 : 130
          }px hsl(260 95% 68% / 0.5)` ,
        }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Top highlight */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 28% 20%, hsl(0 0% 100% / 0.35), hsl(260 100% 90% / 0.28), transparent 45%)",
            mixBlendMode: "overlay",
          }}
          animate={{ opacity: [0.7, 0.95, 0.7] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Saturn-style ring - reduced for performance */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: "rotateX(65deg)",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: `${ringWidth}px`,
            height: `${ringHeight}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse, hsl(270 100% 70% / 0.18), hsl(260 90% 75% / 0.12), transparent 70%)",
            filter: `blur(${isSmall ? 14 : 26}px)`,
          }}
        />
        {[...Array(isSmall ? 8 : 12)].map((_, i) => {
          const total = isSmall ? 8 : 12;
          const angle = (i * 2 * Math.PI) / total;
          const radius = isSmall ? 34 : 140;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.3;
          const baseOpacity = 0.45 + (y / (radius * 0.3)) * 0.3;

          return (
            <motion.div
              key={`ring-particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: isSmall ? 3 : 5,
                height: isSmall ? 3 : 5,
                left: `calc(50% + ${x}px)` ,
                top: `calc(50% + ${y}px)` ,
                background: "hsl(270 100% 80%)",
                boxShadow: `0 0 ${isSmall ? 10 : 18}px hsl(270 100% 80%)`,
                opacity: baseOpacity,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                opacity: [baseOpacity * 0.7, baseOpacity, baseOpacity * 0.7],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </motion.div>

      {/* Floating space particles - simplified */}
      {[...Array(isSmall ? 4 : 6)].map((_, i) => {
        const total = isSmall ? 4 : 6;
        const angle = (i * Math.PI * 2) / total;
        const distance = isSmall ? 40 : 120;
        const baseX = Math.cos(angle) * distance;
        const baseY = Math.sin(angle) * distance;

        return (
          <motion.div
            key={`space-particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: isSmall ? 2 : 3,
              height: isSmall ? 2 : 3,
              left: `calc(50% + ${baseX}px)` ,
              top: `calc(50% + ${baseY}px)` ,
              background:
                i % 2 === 0
                  ? "hsl(270 100% 80%)"
                  : "hsl(240 100% 85%)",
              boxShadow: `0 0 ${isSmall ? 12 : 20}px hsl(265 100% 75% / 0.8)`,
            }}
            animate={{
              x: [0, baseX * 0.15, 0],
              y: [0, baseY * 0.15, 0],
              opacity: [0.25, 0.85, 0.25],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{
              duration: 7 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

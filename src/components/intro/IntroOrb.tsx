import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

interface IntroOrbProps {
  size?: "large" | "small";
  className?: string;
}

export const IntroOrb = ({ size = "large", className = "" }: IntroOrbProps) => {
  const isSmall = size === "small";
  const orbSize = isSmall ? "w-16 h-16" : "w-80 h-80";
  const [isParticlesReady, setIsParticlesReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setIsParticlesReady(true);
    });
  }, []);
  
  const particlesOptions = {
    background: {
      color: { value: "transparent" },
    },
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      color: {
        value: ["#a855f7", "#8b5cf6", "#6366f1", "#3b82f6"],
      },
      move: {
        enable: true,
        speed: { min: 0.1, max: 0.5 },
        direction: "none" as const,
        random: true,
        straight: false,
        outModes: { default: "out" as const },
      },
      number: {
        value: isSmall ? 30 : 80,
        density: { enable: true, width: 800, height: 800 },
      },
      opacity: {
        value: { min: 0.1, max: 0.8 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: isSmall ? 2 : 3 },
      },
      links: {
        enable: false,
      },
    },
    detectRetina: true,
  };

  return (
    <div className={`relative ${className}`}>
      {/* Cosmic Particle Background using tsParticles */}
      {isParticlesReady && (
        <div className="absolute inset-0 -m-20">
          <Particles options={particlesOptions} className="w-full h-full" />
        </div>
      )}

      {/* Deep volumetric bloom - multiple layers for depth */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(270 100% 65% / 0.4), hsl(260 95% 68% / 0.3), hsl(250 90% 70% / 0.2), hsl(240 100% 72% / 0.1), transparent 70%)",
          filter: `blur(${isSmall ? 50 : 120}px)`,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary atmospheric glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(270 100% 70% / 0.3), hsl(260 90% 72% / 0.2), hsl(240 100% 75% / 0.1), transparent 60%)",
          filter: `blur(${isSmall ? 30 : 80}px)`,
        }}
        animate={{
          scale: [1.2, 1.4, 1.2],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft outer halo with enhanced glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, transparent 55%, hsl(265 100% 70% / 0.15) 65%, hsl(250 100% 72% / 0.1) 75%, hsl(240 100% 75% / 0.05) 85%, transparent 95%)",
          filter: `blur(${isSmall ? 25 : 60}px)`,
        }}
        animate={{
          scale: [1.4, 1.6, 1.4],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main 3D holographic sphere with enhanced neon glow */}
      <motion.div
        className={`relative ${orbSize} rounded-full`}
        style={{
          boxShadow: `
            0 0 ${isSmall ? 20 : 50}px hsl(270 100% 75% / 0.8),
            0 0 ${isSmall ? 40 : 100}px hsl(265 100% 70% / 0.6),
            0 0 ${isSmall ? 60 : 150}px hsl(260 95% 68% / 0.5),
            0 0 ${isSmall ? 80 : 200}px hsl(250 90% 70% / 0.4),
            0 0 ${isSmall ? 100 : 250}px hsl(240 100% 72% / 0.3),
            0 0 ${isSmall ? 120 : 300}px hsl(230 100% 75% / 0.2),
            inset 0 0 ${isSmall ? 40 : 100}px hsl(270 100% 70% / 0.5)
          `,
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
        {/* Base gradient sphere - enhanced neon purple to blue */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: "radial-gradient(circle at 35% 30%, hsl(280 100% 65%), hsl(275 95% 62%), hsl(270 90% 60%), hsl(265 85% 62%), hsl(260 85% 65%), hsl(250 80% 68%), hsl(240 90% 70%))",
          }}
        />
        
        {/* Top highlight - creates enhanced 3D sphere effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 28% 20%, hsl(0 0% 100% / 0.4), hsl(260 100% 90% / 0.3), hsl(250 90% 80% / 0.2), transparent 45%)",
            mixBlendMode: "overlay",
          }}
          animate={{
            opacity: [0.7, 0.95, 0.7],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subsurface scattering glow - enhanced volumetric effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at center, hsl(270 100% 80% / 0.6), hsl(265 95% 75% / 0.4), hsl(260 90% 70% / 0.25), transparent 60%)",
            mixBlendMode: "screen",
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Rotating shimmer layer - enhanced spectral effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(145deg, transparent 25%, hsl(260 100% 80% / 0.35) 45%, hsl(240 100% 75% / 0.5) 50%, hsl(260 100% 80% / 0.35) 55%, transparent 75%)",
            mixBlendMode: "overlay",
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

        {/* Secondary rotating shimmer - opposite direction */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(45deg, transparent 30%, hsl(270 100% 75% / 0.3) 50%, transparent 70%)",
            mixBlendMode: "screen",
          }}
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner radiance - enhanced with multiple layers */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `
              inset 0 0 ${isSmall ? 20 : 50}px hsl(270 100% 75% / 0.7),
              inset 0 0 ${isSmall ? 40 : 100}px hsl(265 95% 70% / 0.5),
              inset 0 0 ${isSmall ? 60 : 150}px hsl(260 90% 65% / 0.3)
            `,
          }}
        />

        {/* Soft edge definition with neon border */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: `${isSmall ? 1 : 1.5}px solid hsl(270 100% 80% / 0.4)`,
            boxShadow: `
              inset 0 0 ${isSmall ? 10 : 25}px hsl(270 100% 70% / 0.5),
              inset 0 0 ${isSmall ? 20 : 50}px hsl(260 90% 65% / 0.3),
              0 0 ${isSmall ? 10 : 20}px hsl(270 100% 75% / 0.5)
            `,
          }}
          animate={{
            borderColor: [
              "hsl(270 100% 80% / 0.4)",
              "hsl(260 100% 85% / 0.6)",
              "hsl(270 100% 80% / 0.4)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating space particles - enhanced ambient depth */}
      {[...Array(isSmall ? 8 : 12)].map((_, i) => {
        const angle = (i * Math.PI) / (isSmall ? 4 : 6);
        const distance = isSmall ? 50 : 200;
        return (
          <motion.div
            key={`space-particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: isSmall ? "1.5px" : "3px",
              height: isSmall ? "1.5px" : "3px",
              left: `${(isSmall ? 32 : 160) + Math.cos(angle) * distance}px`,
              top: `${(isSmall ? 32 : 160) + Math.sin(angle) * distance}px`,
              background: i % 3 === 0 ? "hsl(270 100% 80%)" : i % 3 === 1 ? "hsl(260 100% 75%)" : "hsl(240 100% 85%)",
              boxShadow: `0 0 ${isSmall ? 10 : 20}px hsl(265 100% 75% / 0.8)`,
            }}
            animate={{
              x: [0, Math.cos(angle + Math.PI / 4) * (isSmall ? 20 : 50), 0],
              y: [0, Math.sin(angle + Math.PI / 4) * (isSmall ? 20 : 50), 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.6, 1.5, 0.6],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        );
      })}
    </div>
  );
};

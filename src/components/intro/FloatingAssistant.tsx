import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export const FloatingAssistant = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(195 100% 50% / 0.3), transparent 70%)",
          filter: "blur(20px)",
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

      {/* Main orb button */}
      <motion.button
        className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        aria-label="Open voice assistant"
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, hsl(195 100% 95%), hsl(195 100% 70%))",
          }}
        />
        
        {/* Animated texture overlay */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, hsl(195 100% 85% / 0.8), transparent 60%)",
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Mic icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Mic className="w-6 h-6 text-primary" />
        </div>

        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 30px hsl(195 100% 60% / 0.4)",
          }}
        />

        {/* Hover effect */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: "radial-gradient(circle, hsl(195 100% 50% / 0.2), transparent 70%)",
          }}
        />
      </motion.button>

      {/* Tooltip on hover */}
      <div
        className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: "hsl(220 15% 18% / 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid hsl(220 15% 30% / 0.3)",
        }}
      >
        <span className="text-sm text-foreground">Voice Assistant</span>
      </div>
    </motion.div>
  );
};

import { motion } from "framer-motion";
import { IntroOrb } from "./IntroOrb";

export const FloatingAssistant = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open voice assistant"
    >
      <IntroOrb size="small" />
    </motion.div>
  );
};

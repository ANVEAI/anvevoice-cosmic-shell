import { motion } from "framer-motion";

export const WelcomeSection = () => {
  return (
    <section className="relative min-h-screen flex items-end justify-center px-4 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-foreground">
          Welcome to ANVEVoice
        </h1>
        <p className="text-3xl md:text-5xl text-muted-foreground">
          Your embeddable voice bot
        </p>
      </motion.div>
    </section>
  );
};

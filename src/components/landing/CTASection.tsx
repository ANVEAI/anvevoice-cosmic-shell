import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Cut Support Costs 40% & Boost Conversions 50%?
        </h2>
        
        <Button
          onClick={() => navigate("/offers")}
          size="lg"
          className="text-lg px-8 py-6 shadow-glow hover:shadow-elevated transition-all duration-300"
        >
          Start Now
        </Button>
      </motion.div>
    </section>
  );
};

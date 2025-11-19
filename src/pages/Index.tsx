import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { WelcomeSection } from "@/components/landing/WelcomeSection";
import { useOrbTransition } from "@/hooks/useOrbTransition";
import { motion } from "framer-motion";
import { useOrbContext } from "@/contexts/OrbContext";
import { useEffect } from "react";

const Index = () => {
  const { isCentered } = useOrbTransition();
  const { setIsCentered } = useOrbContext();

  useEffect(() => {
    setIsCentered(isCentered);
  }, [isCentered, setIsCentered]);

  return (
    <>
      {/* Scrollable Content */}
      <motion.div
        className="relative"
        style={{ marginTop: isCentered ? '100vh' : '0' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <WelcomeSection />
        <HowItWorks />
        <FeatureGrid />
        <CTASection />
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;

import { CenteredOrbHero } from "@/components/landing/CenteredOrbHero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { useOrbTransition } from "@/hooks/useOrbTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useVapiAssistant } from "@/hooks/useVapiAssistant";
import { useOrbContext } from "@/contexts/OrbContext";
import { useEffect } from "react";

const Index = () => {
  const { isCentered, triggerScroll } = useOrbTransition();
  const { setIsCentered } = useOrbContext();
  const { startAssistant, stopAssistant, isActive } = useVapiAssistant();

  useEffect(() => {
    setIsCentered(isCentered);
  }, [isCentered, setIsCentered]);

  // Automatic 20-second timer to trigger orb transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCentered(false);
    }, 20000);
    
    return () => clearTimeout(timer);
  }, [setIsCentered]);

  const handleTapSpeak = () => {
    if (isActive) {
      stopAssistant();
    } else {
      startAssistant();
    }
  };

  return (
    <>
      {/* Centered Hero - visible when isCentered */}
      <AnimatePresence mode="wait">
        {isCentered && (
          <CenteredOrbHero key="intro" onTapSpeak={handleTapSpeak} isActive={isActive} />
        )}
      </AnimatePresence>

      {/* Scrollable Content */}
      <motion.div
        className="relative"
        style={{ marginTop: isCentered ? '100vh' : '0' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <HowItWorks />
        <FeatureGrid />
        <CTASection />
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;

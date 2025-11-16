import { CenteredOrbHero } from "@/components/landing/CenteredOrbHero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { FloatingAssistant } from "@/components/intro/FloatingAssistant";
import { useOrbTransition } from "@/hooks/useOrbTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useVapiAssistant } from "@/hooks/useVapiAssistant";

const Index = () => {
  const { isCentered, triggerScroll } = useOrbTransition();
  const { startAssistant, stopAssistant, isActive } = useVapiAssistant();

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
      <AnimatePresence>
        {isCentered && (
          <CenteredOrbHero onTapSpeak={handleTapSpeak} isActive={isActive} />
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
        <FeatureGrid />
        <HowItWorks />
        <CTASection />
        <Footer />
      </motion.div>

      {/* Floating Assistant - only visible when not centered */}
      {!isCentered && <FloatingAssistant isCentered={false} />}
    </>
  );
};

export default Index;

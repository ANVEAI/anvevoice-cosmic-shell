import { CenteredOrbHero } from "@/components/landing/CenteredOrbHero";
import { VoiceDemoPanel } from "@/components/landing/VoiceDemoPanel";
import { GuidedTourPreview } from "@/components/landing/GuidedTourPreview";
import { InteractiveFormDemo } from "@/components/landing/InteractiveFormDemo";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingSection } from "@/components/landing/PricingSection";
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
          <CenteredOrbHero onTapSpeak={handleTapSpeak} />
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
        <VoiceDemoPanel />
        <GuidedTourPreview />
        <InteractiveFormDemo />
        <FeatureGrid />
        <HowItWorks />
        <PricingSection />
        <Footer />
      </motion.div>

      {/* Floating Assistant - only visible when not centered */}
      {!isCentered && <FloatingAssistant isCentered={false} />}
    </>
  );
};

export default Index;

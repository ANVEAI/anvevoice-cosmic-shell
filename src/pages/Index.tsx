import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { VoiceDemoPanel } from "@/components/landing/VoiceDemoPanel";
import { GuidedTourPreview } from "@/components/landing/GuidedTourPreview";
import { InteractiveFormDemo } from "@/components/landing/InteractiveFormDemo";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingSection } from "@/components/landing/PricingSection";
import { Footer } from "@/components/landing/Footer";
import { FloatingAssistant } from "@/components/intro/FloatingAssistant";
import { motion } from "framer-motion";

interface IndexProps {
  showAssistant?: boolean;
}

const Index = ({ showAssistant = false }: IndexProps) => {
  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Navigation />
      <HeroSection />
      <VoiceDemoPanel />
      <GuidedTourPreview />
      <InteractiveFormDemo />
      <FeatureGrid />
      <HowItWorks />
      <PricingSection />
      <Footer />
      
      {showAssistant && <FloatingAssistant />}
    </motion.div>
  );
};

export default Index;

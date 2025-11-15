import { HeroSection } from "@/components/landing/HeroSection";
import { VoiceDemoPanel } from "@/components/landing/VoiceDemoPanel";
import { GuidedTourPreview } from "@/components/landing/GuidedTourPreview";
import { InteractiveFormDemo } from "@/components/landing/InteractiveFormDemo";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingSection } from "@/components/landing/PricingSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <VoiceDemoPanel />
      <GuidedTourPreview />
      <InteractiveFormDemo />
      <FeatureGrid />
      <HowItWorks />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;

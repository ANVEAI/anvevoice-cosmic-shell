import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IntroScreen } from "./components/intro/IntroScreen";
import { FloatingAssistant } from "./components/intro/FloatingAssistant";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import Demo from "./pages/Demo";

const queryClient = new QueryClient();

const App = () => {
  const [introPhase, setIntroPhase] = useState<"intro" | "transitioning" | "completed">("intro");

  const handleIntroComplete = () => {
    setIntroPhase("transitioning");
  };

  const handleTransitionComplete = () => {
    setIntroPhase("completed");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            {(introPhase === "intro" || introPhase === "transitioning") && (
              <IntroScreen 
                key="intro" 
                onComplete={handleIntroComplete}
                onTransitionComplete={handleTransitionComplete}
                phase={introPhase}
              />
            )}
          </AnimatePresence>
          
          {introPhase === "completed" && (
            <>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/contact" element={<Contact />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <FloatingAssistant />
            </>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

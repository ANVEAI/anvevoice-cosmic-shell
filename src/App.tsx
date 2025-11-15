import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IntroScreen } from "./components/intro/IntroScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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
            <Routes>
              <Route path="/" element={<Index showAssistant={true} />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

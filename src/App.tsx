import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { OrbProvider } from "./contexts/OrbContext";
import { VerticalNavigation } from "./components/VerticalNavigation";
import { UnifiedOrb } from "./components/intro/UnifiedOrb";
import { useOrbContext } from "./contexts/OrbContext";
import { navigationManager } from "./utils/navigationManager";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import Demo from "./pages/Demo";
import TryOffer from "./pages/TryOffer";
import WaitingList from "./pages/WaitingList";

const queryClient = new QueryClient();

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCentered } = useOrbContext();

  // Only show intro animation on landing page
  const isLandingPage = location.pathname === '/';
  const orbCentered = isLandingPage ? isCentered : false;

  useEffect(() => {
    navigationManager.setNavigate(navigate);
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-full">
      <ScrollToTop />
      <VerticalNavigation />
      <main className="flex-1 ml-0 md:ml-20 mt-16 md:mt-0">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/try-offer" element={<TryOffer />} />
          <Route path="/waiting-list" element={<WaitingList />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <UnifiedOrb isCentered={orbCentered} />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <OrbProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </OrbProvider>
    </ThemeProvider>
  );
};

export default App;

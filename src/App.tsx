import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { OrbProvider } from "./contexts/OrbContext";
import { VerticalNavigation } from "./components/VerticalNavigation";
import { FloatingAssistant } from "./components/intro/FloatingAssistant";
import { navigationManager } from "./utils/navigationManager";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import Demo from "./pages/Demo";

const queryClient = new QueryClient();

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigationManager.setNavigate(navigate);
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-full">
      <VerticalNavigation />
      <main className="flex-1 ml-0 md:ml-20 mt-16 md:mt-0 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <FloatingAssistant />
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

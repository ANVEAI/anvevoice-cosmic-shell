import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "scroll" | "navigation" | "form" | "workflow";
}

export const DemoModal = ({ isOpen, onClose, title, type }: DemoModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl mx-4"
          >
            <div className="bg-card rounded-3xl shadow-elevated border border-border overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-glow/5" />
                  <div className="relative text-center space-y-4">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Play className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Demo Video Placeholder</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {type === "scroll" && "Watch how AnveVoice automatically scrolls to relevant sections"}
                        {type === "navigation" && "See intelligent navigation between pages in action"}
                        {type === "form" && "Experience step-by-step voice-guided form filling"}
                        {type === "workflow" && "Observe complex multi-step workflow automation"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent rounded-xl">
                  <p className="text-sm text-accent-foreground">
                    <strong>Coming Soon:</strong> Interactive demo with real-time voice interaction
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Scroll, Navigation, FileText, Zap } from "lucide-react";
import { useState } from "react";
import { DemoModal } from "./DemoModal";

const tourCards = [
  {
    icon: Scroll,
    title: "Auto-Scroll Navigation",
    description: "Automatically scrolls to relevant sections based on voice commands",
    demoType: "scroll" as const,
  },
  {
    icon: Navigation,
    title: "Smart Section Navigation",
    description: "Navigates between pages and sections with natural language",
    demoType: "navigation" as const,
  },
  {
    icon: FileText,
    title: "Intelligent Form Filling",
    description: "Fills complex forms step-by-step through voice guidance",
    demoType: "form" as const,
  },
  {
    icon: Zap,
    title: "Multi-Step Workflows",
    description: "Executes complex workflows with sequential actions",
    demoType: "workflow" as const,
  },
];

export const GuidedTourPreview = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Guided Tours That <span className="text-primary">Actually Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how AnveVoice transforms user interaction with intelligent, voice-driven navigation
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-4 -mx-6 px-6">
          <div className="flex gap-6 min-w-max lg:grid lg:grid-cols-4 lg:min-w-0">
            {tourCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-72 lg:w-auto"
                >
                  <Card className="h-full p-6 bg-gradient-card border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                    <div className="space-y-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {card.description}
                        </p>
                      </div>

                      <Button 
                        variant="ghost" 
                        className="w-full group/btn"
                        onClick={() => setOpenModal(card.demoType)}
                      >
                        View Demo
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Demo Modals */}
      <DemoModal
        isOpen={openModal === "scroll"}
        onClose={() => setOpenModal(null)}
        title="Auto-Scroll Navigation Demo"
        type="scroll"
      />
      <DemoModal
        isOpen={openModal === "navigation"}
        onClose={() => setOpenModal(null)}
        title="Smart Section Navigation Demo"
        type="navigation"
      />
      <DemoModal
        isOpen={openModal === "form"}
        onClose={() => setOpenModal(null)}
        title="Intelligent Form Filling Demo"
        type="form"
      />
      <DemoModal
        isOpen={openModal === "workflow"}
        onClose={() => setOpenModal(null)}
        title="Multi-Step Workflow Demo"
        type="workflow"
      />
    </section>
  );
};

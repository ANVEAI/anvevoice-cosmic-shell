import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MessageSquare, FormInput, Users, Zap, Layers, Code } from "lucide-react";
const features = [
  {
    icon: MessageSquare,
    title: "Natural Voice Navigation",
    description:
      "Navigate websites using natural conversation. Just speak and let AnveVoice guide you to the right place.",
  },
  {
    icon: FormInput,
    title: "Smart Form Filling",
    description:
      "Complex forms made simple. Voice-guided field completion with intelligent validation and error handling.",
  },
  {
    icon: Users,
    title: "Human-like Dialogue",
    description: "Conversations that feel natural. Advanced NLP understands context, intent, and nuanced requests.",
  },
  {
    icon: Zap,
    title: "Convert Web Visitors Into Sales 24/7",
    description:
      "Execute actions automatically. Click buttons, navigate menus, and interact with web elements via voice.",
  },
];
export const FeatureGrid = () => {
  return (
    <section className="py-12 sm:py-16 px-6 bg-muted/30 min-h-screen flex items-center">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Powerful Features, <span className="text-primary">Simple Integration</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create conversational experiences that users love
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <Card className="h-full p-4 sm:p-5 bg-gradient-card border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all duration-300">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold mb-1.5">{feature.title}</h3>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

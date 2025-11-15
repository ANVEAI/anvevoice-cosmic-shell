import { motion } from "framer-motion";
import { Globe, MessageCircle, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Globe,
    number: "01",
    title: "User Lands on Website",
    description: "Visitor arrives at your website and is greeted by AnveVoice with a friendly voice prompt",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "AnveVoice Greets & Assists",
    description: "Natural conversation begins. The AI understands intent and offers personalized guidance",
  },
  {
    icon: CheckCircle,
    number: "03",
    title: "Bot Guides Navigation",
    description: "Executes actions, fills forms, or navigates pages based on voice commands with precision",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
        <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, seamless, and intelligent. See how AnveVoice transforms user experience in three steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="text-center space-y-6">
                    {/* Step number badge */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative inline-block"
                    >
                      <div className="relative z-10 h-24 w-24 mx-auto rounded-full bg-gradient-card border-2 border-primary flex items-center justify-center shadow-glow">
                        <Icon className="h-10 w-10 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold shadow-card">
                        {step.number}
                      </div>
                    </motion.div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow connector for mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-8">
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-12 w-0.5 bg-gradient-to-b from-primary to-transparent"
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

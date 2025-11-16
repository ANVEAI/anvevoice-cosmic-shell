import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MessageSquare, FormInput, Users, Zap, Layers, Code } from "lucide-react";
const features = [{
  icon: MessageSquare,
  title: "Natural Voice Navigation",
  description: "Navigate websites using natural conversation. Just speak and let AnveVoice guide you to the right place."
}, {
  icon: FormInput,
  title: "Smart Form Filling",
  description: "Complex forms made simple. Voice-guided field completion with intelligent validation and error handling."
}, {
  icon: Users,
  title: "Human-like Dialogue",
  description: "Conversations that feel natural. Advanced NLP understands context, intent, and nuanced requests."
}, {
  icon: Zap,
  title: "Agentic Web Actions",
  description: "Execute actions automatically. Click buttons, navigate menus, and interact with web elements via voice."
}];
export const FeatureGrid = () => {
  return <section className="py-12 sm:py-16 px-6 bg-muted/30 min-h-screen flex items-center">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Powerful Features, <span className="text-primary">Simple Integration</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create conversational experiences that users love
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature, index) => {
          const Icon = feature.icon;
          return <motion.div key={feature.title} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }}>
                <Card className="h-full p-6 bg-gradient-card border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group">
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>;
        })}
        </div>
      </div>
    </section>;
};
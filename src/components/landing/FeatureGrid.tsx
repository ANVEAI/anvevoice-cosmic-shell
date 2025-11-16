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
}, {
  icon: Layers,
  title: "Multi-step Task Handling",
  description: "Chain complex workflows effortlessly. Complete multi-page processes with sequential voice commands."
}, {
  icon: Code,
  title: "Easy 2-line Script Embed",
  description: "Integration in minutes, not days. Add AnveVoice to any website with just two lines of code."
}];
export const FeatureGrid = () => {
  return <section className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
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
      }} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Powerful Features, <span className="text-primary">Simple Integration</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create conversational experiences that users love
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <Card className="h-full p-8 bg-gradient-card border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group">
                  <div className="space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      
                    </div>
                  </div>
                </Card>
              </motion.div>;
        })}
        </div>
      </div>
    </section>;
};
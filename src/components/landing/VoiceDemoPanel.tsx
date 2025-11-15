import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const VoiceDemoPanel = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Experience Voice Navigation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Try our AI voice assistant. Click the mic and speak naturally to navigate, ask questions, or fill forms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-gradient-card rounded-3xl shadow-elevated p-8 border border-border"
        >
          {/* Coming Soon Badge */}
          <Badge className="absolute top-6 right-6 bg-secondary text-secondary-foreground">
            Voice Engine Coming Soon
          </Badge>

          <div className="space-y-8">
            {/* Mic Button */}
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Button
                  size="lg"
                  disabled
                  className="h-24 w-24 rounded-full shadow-glow bg-muted hover:bg-muted cursor-not-allowed"
                >
                  <Mic className="h-10 w-10 text-muted-foreground" />
                </Button>
                
                {/* Pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-primary opacity-0"
                />
              </motion.div>
            </div>

            {/* Waveform Placeholder */}
            <div className="flex justify-center items-center gap-1 h-20">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-muted rounded-full"
                  style={{ height: "20%" }}
                  animate={{ 
                    height: ["20%", "60%", "20%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Transcript Area */}
            <div className="bg-muted/30 rounded-2xl p-6 min-h-32 space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Volume2 className="h-4 w-4" />
                <span>Transcript will appear here</span>
              </div>
              
              <div className="space-y-2">
                <div className="bg-accent/50 rounded-lg p-3 max-w-md">
                  <p className="text-sm text-accent-foreground">
                    "Show me the pricing page"
                  </p>
                </div>
                <div className="bg-card rounded-lg p-3 max-w-md ml-auto text-right">
                  <p className="text-sm text-card-foreground">
                    Navigating to pricing section...
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Click the microphone to start • Powered by advanced AI
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

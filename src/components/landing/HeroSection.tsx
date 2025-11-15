import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import heroAvatar from "@/assets/hero-avatar.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-24 px-6">
      {/* Ambient glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-glow opacity-50 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-glow opacity-30 blur-3xl" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 bg-accent rounded-full text-sm font-medium text-accent-foreground"
              >
                AI-Powered Voice Navigation
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Meet AnveVoice
                <br />
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Your AI Voice Guide
                </span>
                <br />
                for Websites
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                Transform website navigation with natural voice interaction. Guide users, fill forms, and execute workflows through conversational AI.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 shadow-glow hover:shadow-elevated transition-all">
                Try Live Demo
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch How It Works
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">2-Line</div>
                <div className="text-sm text-muted-foreground">Integration</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Floating Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative">
              {/* Glow rings */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary opacity-20 blur-2xl"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary-glow opacity-30 blur-xl"
              />
              
              {/* Avatar */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-80 h-80 rounded-full overflow-hidden shadow-elevated"
              >
                <img 
                  src={heroAvatar} 
                  alt="AnveVoice AI Avatar" 
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Waveform placeholder */}
              <motion.div 
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1 bg-card/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-full"
                    animate={{ 
                      height: ["20px", "40px", "20px"],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

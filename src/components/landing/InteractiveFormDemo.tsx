import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, Sparkles } from "lucide-react";

export const InteractiveFormDemo = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Voice-Guided Form Filling
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience how AnveVoice transforms complex forms into simple conversations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 right-8 z-10"
          >
            <Badge className="bg-secondary text-secondary-foreground shadow-elevated px-4 py-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Voice Guide Active (UI Only)
            </Badge>
          </motion.div>

          <div className="bg-gradient-card rounded-3xl shadow-elevated p-8 lg:p-12 border-2 border-primary/20 relative overflow-hidden">
            {/* Animated border glow */}
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-2 border-primary rounded-3xl"
              style={{ filter: "blur(8px)" }}
            />

            <div className="relative space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input 
                    placeholder="John Doe" 
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input 
                    type="email"
                    placeholder="john@example.com" 
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <Input 
                    placeholder="Acme Corp" 
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Size</label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201+">201+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">How can we help you?</label>
                <Textarea 
                  placeholder="Tell us about your needs..."
                  className="min-h-32 resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="flex-1 sm:flex-initial">
                  Submit Form
                </Button>
                <Button size="lg" variant="outline" className="flex-1 sm:flex-initial group">
                  <Mic className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Fill with Voice
                </Button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Just say: <span className="text-foreground font-medium">"Fill out the contact form"</span> and AnveVoice will guide you through each field
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

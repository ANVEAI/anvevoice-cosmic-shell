import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Stethoscope, BookOpen, ShoppingBag } from "lucide-react";

const Demo = () => {
  const demos = [
    {
      title: "Medical Equipment",
      icon: Stethoscope,
      url: "https://assistive-reach-hub.lovable.app/"
    },
    {
      title: "E-commerce Bookstore",
      icon: BookOpen,
      url: "https://tome-haven-online.lovable.app/"
    },
    {
      title: "Dresses E-commerce Website",
      icon: ShoppingBag,
      url: "https://mega-drop-shop.lovable.app/"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <section className="pt-10 sm:pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:space-y-4 sm:mb-16"
          >
            <Badge className="mb-0 sm:mb-4 text-base sm:text-sm px-4 py-2">Live Demos</Badge>
            <h1 className="hidden sm:block text-5xl lg:text-6xl font-bold">
              See AnveVoice
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {" "}In Action
              </span>
            </h1>
            <p className="hidden sm:block text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore how AnveVoice transforms different industries with intelligent voice navigation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {demos.map((demo, index) => (
              <motion.a
                key={demo.title}
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 bg-gradient-card shadow-elevated hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      <demo.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{demo.title}</h3>
                  </div>
                </Card>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Demo;

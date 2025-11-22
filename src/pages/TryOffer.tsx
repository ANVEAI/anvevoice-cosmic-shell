import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TryOffer = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 md:space-y-6 lg:space-y-8"
          >
            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              🚨 WAIT! Before You Leave… Try AnveVoice for Just $27
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl lg:text-xl text-muted-foreground">
              So here's a ZERO-RISK try option created just for you.
            </p>

            {/* Pricing Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 md:mt-8 lg:mt-12"
            >
              <Card className="relative p-5 md:p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-primary-glow/5 border-2 border-primary shadow-elevated">
                <div className="space-y-4 md:space-y-5 lg:space-y-6">
                  {/* Pricing Title */}
                  <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-3 lg:mb-4">
                      🎁 One-Time "TRY AnveVoice" Offer – Only $27
                    </h2>
                    <p className="text-lg md:text-xl lg:text-xl font-semibold text-primary">
                      Get 3,000 Voice Credits
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 md:space-y-3 pt-3 md:pt-4 border-t border-border">
                    {[
                      "No subscription.",
                      "No renewal.",
                      "No monthly charges."
                    ].map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 md:gap-3">
                        <div className="h-5 w-5 md:h-5 md:w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 md:h-3 md:w-3 text-primary" />
                        </div>
                        <span className="text-base md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full shadow-glow hover:shadow-elevated"
                    size="lg"
                    onClick={() => navigate("/waiting-list")}
                  >
                    Try Now
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TryOffer;

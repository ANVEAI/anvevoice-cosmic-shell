import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, TrendingUp } from "lucide-react";

const offers = [
  {
    id: 1,
    title: "Starter Plan",
    badge: "Most Popular",
    price: "$99",
    period: "/month",
    description: "Perfect for small businesses getting started with voice AI",
    features: [
      "Up to 10,000 voice interactions/month",
      "2 website integrations",
      "Basic analytics dashboard",
      "Email support",
      "Custom voice responses",
      "Multi-language support (5 languages)"
    ],
    icon: Sparkles,
    gradient: "from-primary/10 to-primary-glow/10"
  },
  {
    id: 2,
    title: "Professional Plan",
    badge: "Best Value",
    price: "$299",
    period: "/month",
    description: "Advanced features for growing businesses",
    features: [
      "Up to 50,000 voice interactions/month",
      "10 website integrations",
      "Advanced analytics & insights",
      "Priority email & chat support",
      "Custom voice training",
      "Multi-language support (15 languages)",
      "Form automation",
      "CRM integrations"
    ],
    icon: Zap,
    gradient: "from-secondary/10 to-secondary/5"
  },
  {
    id: 3,
    title: "Enterprise Plan",
    badge: "Custom",
    price: "Custom",
    period: "pricing",
    description: "Tailored solutions for large organizations",
    features: [
      "Unlimited voice interactions",
      "Unlimited website integrations",
      "Custom analytics & reporting",
      "24/7 dedicated support",
      "AI model customization",
      "All languages supported",
      "Advanced workflow automation",
      "White-label solution",
      "On-premise deployment option",
      "SLA guarantees"
    ],
    icon: TrendingUp,
    gradient: "from-accent-foreground/10 to-primary/5"
  }
];

const Offers = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <Badge className="mb-4">Special Offers</Badge>
            <h1 className="text-5xl lg:text-6xl font-bold">
              Choose Your
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {" "}Perfect Plan
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing options designed to scale with your business needs. No hidden fees, cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => {
              const Icon = offer.icon;
              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className={`relative overflow-hidden p-8 h-full bg-gradient-to-br ${offer.gradient} border-2 hover:border-primary/50 transition-all hover:shadow-elevated group`}>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="text-xs">
                        {offer.badge}
                      </Badge>
                    </div>

                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">{offer.price}</span>
                        <span className="text-muted-foreground ml-2">{offer.period}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6">{offer.description}</p>

                    <ul className="space-y-3 mb-8">
                      {offer.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full" 
                      size="lg"
                      variant={index === 1 ? "default" : "outline"}
                    >
                      {offer.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Card className="inline-block p-6 bg-gradient-card">
              <p className="text-sm text-muted-foreground">
                All plans include free 14-day trial • No credit card required • Cancel anytime
              </p>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Offers;

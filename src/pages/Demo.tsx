import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Wrench, BookOpen, Calendar, ShoppingCart, MessageSquare, Phone, Video } from "lucide-react";

const Demo = () => {
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
            <Badge className="mb-4">Live Demos</Badge>
            <h1 className="text-5xl lg:text-6xl font-bold">
              See AnveVoice
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {" "}In Action
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore how AnveVoice transforms different industries with intelligent voice navigation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="medical" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-auto p-2">
                <TabsTrigger value="medical" className="flex flex-col sm:flex-row gap-2 py-3">
                  <Stethoscope className="w-5 h-5" />
                  <span className="hidden sm:inline">Medical Consultation</span>
                </TabsTrigger>
                <TabsTrigger value="prosthetic" className="flex flex-col sm:flex-row gap-2 py-3">
                  <Wrench className="w-5 h-5" />
                  <span className="hidden sm:inline">Prosthetic Arm</span>
                </TabsTrigger>
                <TabsTrigger value="bookstore" className="flex flex-col sm:flex-row gap-2 py-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="hidden sm:inline">Book E-commerce</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="medical" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="p-8 bg-gradient-card shadow-elevated">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">HealthCare Connect</h3>
                        <p className="text-muted-foreground">Virtual Medical Consultations</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">Smart Appointment Booking</h4>
                            <p className="text-sm text-muted-foreground">
                              "Schedule an appointment with a cardiologist next week"
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">Symptom Description</h4>
                            <p className="text-sm text-muted-foreground">
                              Voice-guided symptom checker and triage system
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Video className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">Video Consultation Setup</h4>
                            <p className="text-sm text-muted-foreground">
                              Hands-free video call initiation and navigation
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full" size="lg">
                        Try Medical Demo
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary-glow/5 border-primary/20">
                    <h4 className="font-bold text-lg mb-4">Key Features</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span>HIPAA-compliant voice interactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span>Multi-language support for diverse patient base</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span>Integration with EHR systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span>Accessibility features for elderly patients</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span>Emergency escalation protocols</span>
                      </li>
                    </ul>

                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-sm text-muted-foreground italic">
                        "AnveVoice reduced our appointment booking time by 60% and improved patient satisfaction scores significantly." - Dr. Sarah Chen, Chief Medical Officer
                      </p>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="prosthetic" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="p-8 bg-gradient-card shadow-elevated">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">BionicTech Solutions</h3>
                        <p className="text-muted-foreground">Advanced Prosthetic Systems</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-secondary mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">Product Information</h4>
                            <p className="text-sm text-muted-foreground">
                              "Tell me about the C-Leg 4 prosthetic specifications"
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-secondary mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">Fitting Appointments</h4>
                            <p className="text-sm text-muted-foreground">
                              Schedule consultations with certified prosthetists
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-5 h-5 text-secondary mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">Insurance Navigation</h4>
                            <p className="text-sm text-muted-foreground">
                              Guided insurance claim and documentation process
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full" size="lg" variant="secondary">
                        Try Prosthetic Demo
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-8 bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
                    <h4 className="font-bold text-lg mb-4">Key Features</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
                        <span>Technical specification queries via voice</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
                        <span>Virtual product demonstrations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
                        <span>Insurance verification assistance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
                        <span>Maintenance and care instructions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
                        <span>Community support connection</span>
                      </li>
                    </ul>

                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-sm text-muted-foreground italic">
                        "The voice interface helps our customers navigate complex information easily, especially those learning to use their prosthetics." - Mark Thompson, CEO
                      </p>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bookstore" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="p-8 bg-gradient-card shadow-elevated">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-accent-foreground/10 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">ReadMore Books</h3>
                        <p className="text-muted-foreground">Online Bookstore</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                        <div className="flex items-start gap-3">
                          <BookOpen className="w-5 h-5 text-accent-foreground mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">Smart Book Search</h4>
                            <p className="text-sm text-muted-foreground">
                              "Find mystery novels by Agatha Christie"
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <ShoppingCart className="w-5 h-5 text-accent-foreground mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">Voice-Activated Shopping</h4>
                            <p className="text-sm text-muted-foreground">
                              Add books to cart and complete checkout hands-free
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-5 h-5 text-accent-foreground mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">Personalized Recommendations</h4>
                            <p className="text-sm text-muted-foreground">
                              AI-powered book suggestions based on preferences
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full" size="lg">
                        Try Bookstore Demo
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-8 bg-gradient-to-br from-accent-foreground/5 to-primary/5 border-accent-foreground/20">
                    <h4 className="font-bold text-lg mb-4">Key Features</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground mt-2" />
                        <span>Natural language book discovery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground mt-2" />
                        <span>Voice-guided checkout process</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground mt-2" />
                        <span>Reading list management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground mt-2" />
                        <span>Book reviews and ratings via voice</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground mt-2" />
                        <span>Accessibility features for visually impaired</span>
                      </li>
                    </ul>

                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-sm text-muted-foreground italic">
                        "Voice navigation increased our conversion rate by 40% and made shopping accessible to more customers." - Emily Rodriguez, Digital Director
                      </p>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Demo;

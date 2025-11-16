import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  companyName: z.string().min(2, "Company name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  employeeSize: z.string().min(1, "Employee size is required").max(50),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000)
});
type ContactFormData = z.infer<typeof contactSchema>;
const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });
  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
    toast.success("Thank you! We'll get back to you within 24 hours.");
    reset();
  };
  const contactInfo = [{
    icon: Mail,
    title: "Email Us",
    detail: "support@anvevoice.com",
    color: "text-primary"
  }, {
    icon: Phone,
    title: "Call Us",
    detail: "+1 (555) 123-4567",
    color: "text-secondary"
  }, {
    icon: MapPin,
    title: "Visit Us",
    detail: "123 AI Street, San Francisco, CA 94102",
    color: "text-accent-foreground"
  }, {
    icon: Clock,
    title: "Working Hours",
    detail: "Mon-Fri: 9AM - 6PM PST",
    color: "text-muted-foreground"
  }];
  return <div className="min-h-screen bg-gradient-hero overflow-x-hidden">
      <Navigation />
      
      <section className="pt-10 sm:pt-32 pb-5">
        <div className="mx-auto w-full max-w-[680px] px-4 sm:px-6 lg:max-w-7xl">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center mb-4 sm:mb-16 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Let's Get In Touch</h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 justify-items-center">
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="max-w-xl mx-auto w-full lg:max-w-none">
              <Card className="p-6 sm:p-8 bg-gradient-card shadow-elevated">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="John Doe" {...register("name")} className={errors.name ? "border-destructive" : ""} />
                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input id="companyName" placeholder="Acme Inc." {...register("companyName")} className={errors.companyName ? "border-destructive" : ""} />
                    {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="john@company.com" {...register("email")} className={errors.email ? "border-destructive" : ""} />
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                    <Input id="phoneNumber" type="tel" placeholder="+1 (555) 123-4567" {...register("phoneNumber")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeSize">Employee Size *</Label>
                    <Input id="employeeSize" placeholder="e.g., 50-100 employees" {...register("employeeSize")} className={errors.employeeSize ? "border-destructive" : ""} />
                    {errors.employeeSize && <p className="text-sm text-destructive">{errors.employeeSize.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" placeholder="Tell us about your project or ask us anything..." rows={5} {...register("message")} className={errors.message ? "border-destructive" : ""} />
                    {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }} className="max-w-xl mx-auto w-full lg:max-w-none space-y-6">
              <Card className="p-6 sm:p-8 bg-gradient-card shadow-card">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return <motion.div key={index} initial={{
                    opacity: 0,
                    y: 10
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: 0.4 + index * 0.1
                  }} className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0`}>
                          <Icon className={`w-6 h-6 ${info.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <p className="text-muted-foreground">{info.detail}</p>
                        </div>
                      </motion.div>;
                })}
                </div>
              </Card>

              <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-primary-glow/5 border-primary/20">
                <h3 className="font-bold text-lg mb-3">Quick Response Guarantee</h3>
                <p className="text-muted-foreground mb-4">
                  We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-muted-foreground">Average response time: 4 hours</span>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>;
};
export default Contact;
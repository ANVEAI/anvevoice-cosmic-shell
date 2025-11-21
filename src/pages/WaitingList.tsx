import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const waitingListSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address"),
  phoneNumber: z.string().trim().min(1, "Phone number is required").max(50),
  website: z.string().trim().min(1, "Website is required").max(255),
  employeeSize: z.string().trim().min(1, "Employee size is required").max(50),
  comments: z.string().trim().max(1000).optional().or(z.literal(""))
});

type WaitingListFormData = z.infer<typeof waitingListSchema>;

const WaitingList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<WaitingListFormData>({
    resolver: zodResolver(waitingListSchema),
    mode: "onChange",
    reValidateMode: "onChange"
  });

  const onSubmit = (data: WaitingListFormData) => {
    console.log("Waiting List form submitted:", data);
    toast.success("Thank you! You've been added to our waiting list.");
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-hero overflow-x-hidden">
      <section className="pt-8 sm:pt-32 pb-5">
        <div className="mx-auto w-full max-w-[680px] px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-3 sm:mb-16 max-w-2xl mx-auto"
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">Join Our Waiting List</h1>
            <p className="text-muted-foreground text-lg">
              Be the first to experience the future of voice-powered assistance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto w-full"
          >
            <Card className="p-4 sm:p-8 bg-gradient-card shadow-elevated">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Apply Now</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-6">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    data-field="fullName"
                    placeholder="John Doe"
                    {...register("fullName")}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    data-field="email"
                    type="email"
                    placeholder="john@company.com"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    data-field="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    {...register("phoneNumber")}
                    className={errors.phoneNumber ? "border-destructive" : ""}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
                  )}
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="website">Website *</Label>
                  <Input
                    id="website"
                    data-field="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    {...register("website")}
                    className={errors.website ? "border-destructive" : ""}
                  />
                  {errors.website && (
                    <p className="text-sm text-destructive">{errors.website.message}</p>
                  )}
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="employeeSize">Employee Size *</Label>
                  <Input
                    id="employeeSize"
                    data-field="employeeSize"
                    placeholder="e.g., 50-100 employees"
                    {...register("employeeSize")}
                    className={errors.employeeSize ? "border-destructive" : ""}
                  />
                  {errors.employeeSize && (
                    <p className="text-sm text-destructive">{errors.employeeSize.message}</p>
                  )}
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="comments">Any Comments/Feedbacks (Optional)</Label>
                  <Textarea
                    id="comments"
                    data-field="comments"
                    placeholder="Tell us what you're looking for..."
                    rows={4}
                    {...register("comments")}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Apply Now
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WaitingList;

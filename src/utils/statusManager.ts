import { toast } from "@/hooks/use-toast";

export const showStatus = (message: string, variant: "default" | "destructive" = "default") => {
  toast({
    title: message,
    variant,
  });
};

export const showSuccess = (message: string) => {
  showStatus(`✅ ${message}`, "default");
};

export const showError = (message: string) => {
  showStatus(`❌ ${message}`, "destructive");
};

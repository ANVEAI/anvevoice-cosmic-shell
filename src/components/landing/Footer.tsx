import { motion } from "framer-motion";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import anvevoiceLogo from "@/assets/anvevoice-logo-footer.png";
const footerLinks = {
  product: [{
    label: "Features",
    href: "#features",
    comingSoon: true
  }, {
    label: "Pricing",
    href: "/offers",
    comingSoon: false
  }, {
    label: "Demo",
    href: "/demo",
    comingSoon: false
  }, {
    label: "Documentation",
    href: "#docs",
    comingSoon: true
  }],
  company: [{
    label: "About",
    href: "#about",
    comingSoon: true
  }, {
    label: "Blog",
    href: "#blog",
    comingSoon: true
  }, {
    label: "Careers",
    href: "#careers",
    comingSoon: true
  }, {
    label: "Contact",
    href: "#contact",
    comingSoon: true
  }],
  resources: [{
    label: "Help Center",
    href: "#help",
    comingSoon: true
  }, {
    label: "API Reference",
    href: "#api",
    comingSoon: true
  }, {
    label: "Status",
    href: "#status",
    comingSoon: true
  }, {
    label: "Terms of Service",
    href: "#terms",
    comingSoon: true
  }]
};
const socialLinks = [{
  icon: Twitter,
  href: "https://x.com/ANVEAI",
  label: "Twitter",
  comingSoon: false
}, {
  icon: Github,
  href: "#",
  label: "GitHub",
  comingSoon: true
}, {
  icon: Linkedin,
  href: "https://www.linkedin.com/company/105584248",
  label: "LinkedIn",
  comingSoon: false
}, {
  icon: Mail,
  href: "mailto:hello@anvevoice.app",
  label: "Email",
  comingSoon: false
}];
export const Footer = () => {
  const navigate = useNavigate();
  const handleLinkClick = (href: string, comingSoon: boolean) => (e: React.MouseEvent) => {
    if (comingSoon) {
      e.preventDefault();
      toast.info("Coming Soon", {
        description: "This feature is coming soon. Stay tuned!"
      });
    } else if (href.startsWith("/")) {
      e.preventDefault();
      navigate(href);
    }
  };
  const handleSocialClick = (href: string, comingSoon: boolean) => (e: React.MouseEvent) => {
    if (comingSoon) {
      e.preventDefault();
      toast.info("Coming Soon", {
        description: "This feature is coming soon. Stay tuned!"
      });
    }
  };
  return <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src={anvevoiceLogo} alt="AnveVoice Logo" className="h-16 w-16 object-contain" />
              
            </div>
            <p className="text-muted-foreground max-w-sm">
              Transform website navigation with natural voice interaction. Guide users, fill forms, and execute workflows through conversational AI.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(social => {
              const Icon = social.icon;
              return <Button key={social.label} variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors" asChild={!social.comingSoon} onClick={handleSocialClick(social.href, social.comingSoon)}>
                    <a href={social.href} aria-label={social.label} target={social.href.startsWith("http") && !social.comingSoon ? "_blank" : undefined} rel={social.href.startsWith("http") && !social.comingSoon ? "noopener noreferrer" : undefined}>
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>;
            })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map(link => <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" onClick={handleLinkClick(link.href, link.comingSoon)}>
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" onClick={handleLinkClick(link.href, link.comingSoon)}>
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map(link => <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" onClick={handleLinkClick(link.href, link.comingSoon)}>
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 AnveVoice. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" onClick={handleLinkClick("#privacy", true)}>
              Privacy Policy
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" onClick={handleLinkClick("#terms", true)}>
              Terms of Service
            </a>
            <a href="#cookies" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" onClick={handleLinkClick("#cookies", true)}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
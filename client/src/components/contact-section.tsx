import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const socialPlatforms = [
  {
    name: "Spotify",
    icon: "fab fa-spotify",
    color: "green-500",
    description: "Stream our music",
    href: "#"
  },
  {
    name: "YouTube",
    icon: "fab fa-youtube",
    color: "red-500",
    description: "Watch our videos",
    href: "https://www.youtube.com/@TheSixthRiftv2"
  },
  {
    name: "Instagram",
    icon: "fab fa-instagram",
    color: "pink-500",
    description: "Behind the scenes",
    href: "https://www.instagram.com/the.sixthrift?igsh=cDl5dHdnYjdxOGls"
  },
  {
    name: "Discord",
    icon: "fab fa-discord",
    color: "blue-500",
    description: "Join our community",
    href: "https://discord.gg/ts8mNdWP"
  }
];

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll be notified about our latest releases.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Connect With Us</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our cosmic journey and stay updated with our latest dimensional creations
          </p>
        </div>

        {/* Social Media Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {socialPlatforms.map((platform, index) => (
            <a
              key={index}
              href={platform.href}
              className="bg-card rounded-xl p-6 border border-border card-hover text-center group"
              data-testid={`social-link-${platform.name.toLowerCase()}`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-${platform.color}/20 rounded-full flex items-center justify-center group-hover:bg-${platform.color}/30 transition-colors`}>
                <i className={`${platform.icon} text-${platform.color} text-2xl`}></i>
              </div>
              <h3 className="font-semibold text-foreground" data-testid={`social-name-${platform.name.toLowerCase()}`}>
                {platform.name}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid={`social-description-${platform.name.toLowerCase()}`}>
                {platform.description}
              </p>
            </a>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-card border border-border">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Stay in the Loop</h3>
            <p className="text-muted-foreground mb-6">
              Get notified when we release new music or announce upcoming performances
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-background border border-border"
                data-testid="newsletter-email"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
                data-testid="newsletter-submit"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">For collaboration or bookings:</p>
          <a
            href="mailto:thesixthrift@example.com"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
            data-testid="contact-email"
          >
            thesixthrift@example.com
          </a>
        </div>
      </div>
    </section>
  );
}

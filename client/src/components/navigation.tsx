import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/thesixthrift_1758308023097.jpg";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img src={logoImage} alt="The Sixth Rift Logo" className="w-10 h-10 object-cover rounded-full" />
            <span className="text-xl font-bold gradient-text">The Sixth Rift</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
                data-testid="nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('band')}
                className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
                data-testid="nav-band"
              >
                Band
              </button>
              <button 
                onClick={() => scrollToSection('music')}
                className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
                data-testid="nav-music"
              >
                Music
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
                data-testid="nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
                data-testid="nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary"
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background">
              <button 
                onClick={() => scrollToSection('home')}
                className="block text-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium w-full text-left"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('band')}
                className="block text-muted-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium w-full text-left"
                data-testid="mobile-nav-band"
              >
                Band
              </button>
              <button 
                onClick={() => scrollToSection('music')}
                className="block text-muted-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium w-full text-left"
                data-testid="mobile-nav-music"
              >
                Music
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-muted-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium w-full text-left"
                data-testid="mobile-nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block text-muted-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium w-full text-left"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

import { Button } from "@/components/ui/button";
import { Play, Users, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Musical vintage background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/music-background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full floating opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary rounded-full floating opacity-80" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-secondary rounded-full floating opacity-40" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-accent rounded-full floating opacity-70" style={{ animationDelay: '-1s' }}></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 pulse-ring border-2 border-primary rounded-full opacity-30"></div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold gradient-text leading-tight relative z-10">
            The Sixth Rift
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          Where young talent meets infinite possibilities
        </p>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Five extraordinary 12-year-old musicians creating magic through the dimensional rifts of sound
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => scrollToSection('music')}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all transform hover:scale-105"
            data-testid="button-listen-now"
          >
            <Play className="mr-2 h-4 w-4" />
            Listen Now
          </Button>
          <Button 
            variant="outline"
            onClick={() => scrollToSection('band')}
            className="border border-border text-foreground px-8 py-3 rounded-lg font-medium hover:bg-muted transition-all transform hover:scale-105"
            data-testid="button-meet-band"
          >
            <Users className="mr-2 h-4 w-4" />
            Meet the Band
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}

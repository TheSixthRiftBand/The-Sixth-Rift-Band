import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import BandMembers from "@/components/band-members";
import MusicPlayer from "@/components/music-player";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import logoImage from "@assets/thesixthrift_1758308023097.jpg";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <BandMembers />
      <MusicPlayer />
      <AboutSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={logoImage} alt="The Sixth Rift Logo" className="w-10 h-10 object-cover rounded-full" />
              <span className="text-xl font-bold gradient-text">The Sixth Rift</span>
            </div>
            <div className="text-muted-foreground text-sm text-center md:text-right">
              <p>&copy; 2025 The Sixth Rift. All rights reserved.</p>
              <p className="mt-1">Creating music beyond dimensions</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

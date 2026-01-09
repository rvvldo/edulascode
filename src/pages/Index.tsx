import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { PrinciplesSection } from "@/components/PrinciplesSection";
import { ContactSection } from "@/components/ContactSection";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button earlier (after 100px scroll)
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-10 relative">
      <LandingHeader />
      <HeroSection />
      <AboutSection />
      <PrinciplesSection />
      <ContactSection />

      {/* Mobile Scroll to Top Button */}
      {/* Increased z-index to 999 to ensure it floats above everything including footer */}
      <div className={`fixed bottom-6 right-6 z-[999] transition-all duration-500 md:hidden ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full shadow-elevated bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;

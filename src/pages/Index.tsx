import { LandingHeader } from "@/components/LandingHeader";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { PrinciplesSection } from "@/components/PrinciplesSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen pt-10">
      <LandingHeader />
      <HeroSection />
      <AboutSection />
      <PrinciplesSection />
      <ContactSection />
    </div>
  );
};

export default Index;

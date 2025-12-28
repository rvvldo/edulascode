import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-background"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-leaf/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-effect rounded-full px-5 py-2.5 mb-8 animate-bounce-in border border-border/30">
            <Sparkles className="w-4 h-4 text-accent animate-pulse-slow" />
            <span className="text-sm font-semibold text-foreground">
              Platform Edukasi Interaktif
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in leading-tight" style={{ animationDelay: "0.1s" }}>
            Edukasi{" "}
            <span className="gradient-text bg-gradient-to-r from-primary via-forest-light to-leaf bg-clip-text text-transparent">Lestari Alam</span>
            <br />
            Digital
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Jelajahi petualangan interaktif yang menanamkan kesadaran pelestarian alam melalui cerita-cerita yang menginspirasi dan pilihan yang bermakna.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in mb-20" style={{ animationDelay: "0.3s" }}>
            <Link to="/dashboard">
              <Button variant="hero" size="xl" className="group relative overflow-hidden bg-gradient-to-r from-primary to-forest-light hover:shadow-elevated glow-effect">
                <span className="relative z-10">Mulai Petualangan</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-forest-light to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="xl"
              className="border-2 hover:bg-primary/5 hover:border-primary/50 transition-all glow-effect"
              onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-0 md:pt-32 pb-28 md:pb-0 bg-background"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-leaf/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-sage/20 rounded-full blur-3xl" />
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
          <h1 className="font-display text-3xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6 animate-fade-in leading-tight" style={{ animationDelay: "0.1s" }}>
            Edukasi{" "}
            <span className="gradient-text bg-gradient-to-r from-primary via-forest-light to-leaf bg-clip-text text-transparent">Lestari Alam</span>
            <br />
            Digital
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-12 animate-fade-in leading-relaxed px-4" style={{ animationDelay: "0.2s" }}>
            Jelajahi petualangan interaktif yang menanamkan kesadaran pelestarian alam melalui cerita-cerita yang menginspirasi dan pilihan yang bermakna.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 md:gap-5 max-w-sm md:max-w-none mx-auto animate-fade-in mb-8 md:mb-20" style={{ animationDelay: "0.3s" }}>
            <div className="grid grid-cols-2 gap-3 md:hidden w-full px-2">
              <Link to="/dashboard" className="contents">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full h-10 min-h-0 py-0 px-3 text-xs whitespace-normal text-center leading-tight shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all glow-effect bg-gradient-to-r from-primary to-forest-light rounded-full flex items-center justify-center gap-2"
                >
                  {/* <Sparkles className="w-4 h-4" /> */}
                  <span>Mulai Petualangan</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-10 min-h-0 py-0 px-3 text-xs whitespace-normal text-center leading-tight border-2 hover:bg-primary/5 hover:border-primary/50 transition-all glow-effect rounded-full flex items-center justify-center gap-2"
                onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
              >
                {/* <ArrowRight className="w-4 h-4" /> */}
                <span>Pelajari Lebih</span>
              </Button>
            </div>

            <div className="hidden md:flex items-center gap-5">
              <Link to="/dashboard"
                className="inline-block w-60 h-60 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Mulai Petualangan"
              >
                <DotLottieReact
                  src="https://lottie.host/5dd8f96c-5d47-44e2-a9a9-8c1bd583d3d6/02yHMpIzeb.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
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
      </div>
    </section>
  );
}

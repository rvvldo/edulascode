import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Beranda", href: "#hero" },
  { label: "Tentang", href: "#about" },
  { label: "Prinsip", href: "#principles" },
  { label: "Kontak", href: "#contact" },
];

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl md:rounded-3xl bg-primary/10 flex items-center justify-center shadow-soft group-hover:shadow-card transition-shadow overflow-hidden">
              <img
                src="/icons.webp"
                alt="EDULAD Logo"
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
            </div>
            <span className="font-display text-lg md:text-xl lg:text-2xl font-bold text-foreground">
              EDULAD
            </span>
          </Link>

          {/* CTA Button */}
          <div className="hidden md:grid grid-cols-[1fr_auto] items-center gap-12">
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-foreground font-medium transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>
            {currentUser ? (
              <Link to="/dashboard">
                <Button variant="hero" size="lg">
                  Masuk
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="hero" size="lg">
                  Daftar Sekarang
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 px-2 border-t border-border/50 animate-fade-in bg-background/95 backdrop-blur-xl absolute top-16 left-0 right-0 shadow-lg z-40">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-muted-foreground hover:text-foreground hover:bg-primary/5 font-medium transition-all py-2 px-4 rounded-lg text-sm"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 mt-1 border-t border-border/30 px-2">
                {currentUser ? (
                  <Link to="/dashboard">
                    <Button variant="hero" size="sm" className="w-full text-sm h-9">
                      Masuk
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth">
                    <Button variant="hero" size="sm" className="w-full text-sm h-9">
                      Daftar Sekarang
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

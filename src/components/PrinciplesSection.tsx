import { useState } from "react";
import { Heart, Leaf, Lightbulb, Shield } from "lucide-react";

const principles = [
  {
    icon: Leaf,
    title: "Kelestarian",
    description: "Menanamkan kesadaran akan pentingnya menjaga keseimbangan ekosistem dan keanekaragaman hayati Indonesia.",
    color: "bg-leaf/20 text-leaf",
  },
  {
    icon: Heart,
    title: "Empati",
    description: "Membangun rasa kepedulian terhadap makhluk hidup lain dan lingkungan sekitar melalui cerita yang menyentuh.",
    color: "bg-destructive/20 text-destructive",
  },
  {
    icon: Lightbulb,
    title: "Edukasi",
    description: "Menyampaikan pengetahuan tentang isu lingkungan dengan cara yang menarik dan mudah dipahami.",
    color: "bg-accent/20 text-accent",
  },
  {
    icon: Shield,
    title: "Tanggung Jawab",
    description: "Mendorong tindakan nyata dalam kehidupan sehari-hari untuk melindungi alam dan lingkungan.",
    color: "bg-primary/20 text-primary",
  },
];

export function PrinciplesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const togglePrinciple = (index: number) => {
    // Only allow toggling on mobile devices (below md breakpoint)
    if (window.innerWidth >= 768) return;

    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="principles" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Prinsip Kami
          </span>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 md:mt-4 mb-4 md:mb-6">
            Nilai-Nilai yang Kami Junjung
          </h2>
          <p className="text-muted-foreground text-base md:text-lg px-2">
            Setiap cerita dan pengalaman di EDULAD dibangun berdasarkan prinsip-prinsip yang mendukung pelestarian alam.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8 max-w-5xl mx-auto">
          {principles.map((principle, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={principle.title}
                onClick={() => togglePrinciple(index)}
                className={`flex flex-col md:flex-row gap-2 md:gap-6 p-4 md:p-8 rounded-3xl glass-effect border border-border/30 hover:border-primary/40 transition-all duration-500 group hover:shadow-card hover:-translate-y-1 glow-effect animate-slide-up cursor-pointer md:cursor-default relative overflow-hidden items-center md:items-start text-center md:text-left ${isOpen ? 'bg-primary/5 row-span-2' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 md:w-20 md:h-20 rounded-2xl ${principle.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-soft ${isOpen ? 'scale-110 rotate-6' : ''}`}>
                  <principle.icon className="w-6 h-6 md:w-9 md:h-9" />
                </div>
                <div className="w-full">
                  <h3 className="font-display text-sm md:text-2xl font-bold text-foreground mb-1 md:mb-3 group-hover:text-primary transition-colors">
                    {principle.title}
                  </h3>
                  {/* Mobile Description (Collapsible) */}
                  <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                  {/* Desktop Description (Always Visible) */}
                  <p className="hidden md:block text-muted-foreground leading-relaxed text-base">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

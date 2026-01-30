import { useState } from "react";
import { BookOpen, Gamepad2, Trophy, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Cerita Interaktif",
    description: "Nikmati petualangan dengan karakter yang menarik dan alur cerita yang mendidik tentang pelestarian alam.",
  },
  {
    icon: Gamepad2,
    title: "Pilihan Bermakna",
    description: "Setiap keputusanmu mempengaruhi jalan cerita dan mengajarkan dampak tindakan terhadap lingkungan.",
  },
  {
    icon: Trophy,
    title: "Sistem Penghargaan",
    description: "Kumpulkan poin dari pilihan bijak dan bersaing di leaderboard untuk mendapatkan penghargaan.",
  },
  {
    icon: Users,
    title: "Komunitas Peduli",
    description: "Bergabung dengan komunitas yang sama-sama peduli terhadap kelestarian alam Indonesia.",
  },
];

export function AboutSection() {
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    // Only allow toggling on mobile devices (below md breakpoint)
    if (window.innerWidth >= 768) return;

    // Only apply toggle logic on mobile (optional check, but UI logic handles view)
    if (openCardIndex === index) {
      setOpenCardIndex(null);
    } else {
      setOpenCardIndex(index);
    }
  };
  return (
    <section id="about" className="py-12 md:py-24 bg-card relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Tentang EDULAD
          </span>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 md:mt-4 mb-4 md:mb-6">
            Belajar Sambil Bermain
          </h2>
          <p className="text-muted-foreground text-base md:text-lg px-2">
            EDULAD menghadirkan pengalaman belajar yang unik melalui storytelling interaktif yang menanamkan nilai-nilai pelestarian alam.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {features.map((feature, index) => {
            const isOpen = openCardIndex === index;
            return (
              <div
                key={feature.title}
                onClick={() => toggleCard(index)}
                className={`group glass-effect rounded-3xl p-4 md:p-7 hover:shadow-card transition-all duration-500 border border-border/30 hover:border-primary/30 glow-effect animate-slide-up cursor-pointer md:cursor-default relative overflow-hidden ${isOpen ? 'row-span-2 bg-primary/5' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-soft ${isOpen ? 'scale-110 rotate-3' : ''}`}>
                    <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-forest-light transition-colors" />
                  </div>
                  <h3 className="font-display text-sm md:text-xl font-bold text-foreground mb-1 md:mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  {/* Mobile Description (Collapsible) */}
                  <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  {/* Desktop Description (Always Visible) */}
                  <p className="hidden md:block text-muted-foreground leading-relaxed">
                    {feature.description}
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

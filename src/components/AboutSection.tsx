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
  return (
    <section id="about" className="py-24 bg-card relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Tentang EDULAD
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Belajar Sambil Bermain
          </h2>
          <p className="text-muted-foreground text-lg">
            EDULAD menghadirkan pengalaman belajar yang unik melalui storytelling interaktif yang menanamkan nilai-nilai pelestarian alam.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-background rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

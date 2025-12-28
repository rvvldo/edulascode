import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Leaf, Mail, MapPin, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih telah menghubungi kami. Kami akan segera merespons.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Hubungi Kami
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
              Mari Berdiskusi
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi tim EDULAD.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-soft">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                  <p className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">hello@edulad.id</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-soft">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Telepon</p>
                  <p className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">+62 21 1234 5678</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-soft">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Lokasi</p>
                  <p className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">Gedog Wetan, Jawa Timur</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect rounded-3xl p-10 shadow-elevated border border-border/30">
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nama Lengkap
                </label>
                <Input
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-14 text-base bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-14 text-base bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Pesan
                </label>
                <Textarea
                  placeholder="Tulis pesan Anda..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="text-base bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all rounded-xl resize-none"
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full group bg-gradient-to-r from-primary to-forest-light hover:shadow-elevated glow-effect relative overflow-hidden">
                <span className="relative z-10">Kirim Pesan</span>
                <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-forest-light to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* Footer */}
      <footer className="mt-24 pt-16 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6">
                <img src="/icons.webp" alt="Edulad" className="w-8 h-8 object-contain hover:scale-105 transition-transform" />
                <span className="font-display text-2xl font-bold text-foreground">EDULAD</span>
              </Link>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Platform terdepan untuk menghubungkan talenta muda dengan peluang emas. Temukan lomba, beasiswa, dan komunitas yang mendukung perjalanan suksesmu.
              </p>
              <div className="flex items-center gap-4">
                {[
                  { icon: Leaf, href: "#" }, // Placeholder for GitHub/Socials as requested in image but keeping Leaf as placeholder or finding correct icons
                  { icon: Mail, href: "#" },
                  { icon: Phone, href: "#" },
                  { icon: MapPin, href: "#" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Platform Column */}
            <div>
              <h4 className="font-display text-lg font-bold text-foreground mb-6">Platform</h4>
              <ul className="space-y-4">
                {["Tentang Kami", "Fitur", "Karir", "Blog"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dukungan Column */}
            <div>
              <h4 className="font-display text-lg font-bold text-foreground mb-6">Dukungan</h4>
              <ul className="space-y-4">
                {["Pusat Bantuan", "Syarat & Ketentuan", "Kebijakan Privasi", "Kontak"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Komunitas Column */}
            <div>
              <h4 className="font-display text-lg font-bold text-foreground mb-6">Komunitas</h4>
              <ul className="space-y-4">
                {["Event", "Newsletter"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@edulad.id</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Malang, Jawa Timur</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              © 2025 EDULAD Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}

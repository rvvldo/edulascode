import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Leaf, Mail, MapPin, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/edulad20@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Message from ${formData.name}`,
        })
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Pesan Terkirim!",
          description: "Terima kasih telah menghubungi kami. Kami akan segera merespons.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Gagal mengirim pesan");
      }
    } catch (error) {
      toast({
        title: "Gagal Mengirim",
        description: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
        variant: "destructive",
      });
      console.error("Email error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Hubungi Kami
            </span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 md:mt-4 mb-4 md:mb-6">
              Mari Berdiskusi
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8">
              Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi tim EDULAD.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-soft flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-medium text-muted-foreground mb-0.5">Email</p>
                  <p className="font-semibold text-foreground text-sm md:text-lg group-hover:text-primary transition-colors truncate">edulad20@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-soft flex-shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-medium text-muted-foreground mb-0.5">Telepon</p>
                  <p className="font-semibold text-foreground text-sm md:text-lg group-hover:text-primary transition-colors truncate">+62 878-6544-0787</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-soft flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-medium text-muted-foreground mb-0.5">Lokasi</p>
                  <p className="font-semibold text-foreground text-sm md:text-lg group-hover:text-primary transition-colors truncate">Gedog Wetan, Turen</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect rounded-3xl p-5 md:p-10 shadow-elevated border border-border/30">
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
                  className="h-12 md:h-14 text-base bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
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
                  className="h-12 md:h-14 text-base bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
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
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={isSubmitting}
                className="w-full group bg-gradient-to-r from-primary to-forest-light hover:shadow-elevated glow-effect relative overflow-hidden h-10 md:h-12 py-0 text-sm md:text-base font-medium"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                  {!isSubmitting && <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-forest-light to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* Footer */}
      {/* Footer */}
      <footer className="mt-12 md:mt-24 pt-8 md:pt-16 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-16">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4 md:mb-6">
                <img src="/icons.webp" alt="Edulad" className="w-6 h-6 md:w-8 md:h-8 object-contain hover:scale-105 transition-transform" />
                <span className="font-display text-xl md:text-2xl font-bold text-foreground">EDULAD</span>
              </Link>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6 max-w-sm">
                Platform untuk menyalurkan wawasan tentang pentingnya kesadaran pelestarian lingkunan.
              </p>
              <div className="flex items-center gap-3 md:gap-4">
                {[
                  { icon: Leaf, href: "#" },
                  { icon: Mail, href: "#" },
                  { icon: Phone, href: "#" },
                  { icon: MapPin, href: "#" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Platform Column */}
            <div>
              <h4 className="font-display text-base md:text-lg font-bold text-foreground mb-3 md:mb-6">Platform</h4>
              <ul className="space-y-2 md:space-y-4 text-sm md:text-base">
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
              <h4 className="font-display text-base md:text-lg font-bold text-foreground mb-3 md:mb-6">Dukungan</h4>
              <ul className="space-y-2 md:space-y-4 text-sm md:text-base">
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
              <h4 className="font-display text-base md:text-lg font-bold text-foreground mb-3 md:mb-6">Komunitas</h4>
              <ul className="space-y-2 md:space-y-4 text-sm md:text-base">
                {["Event", "Seminar"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-8 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>edulad20@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Gedog Wetan, Turen</span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-right">
              © 2025 EDULAD Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}

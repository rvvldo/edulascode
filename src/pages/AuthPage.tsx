import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    institution: "",
  });
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login dengan Firebase
        await login(formData.email, formData.password);
        toast({
          title: "Login Berhasil!",
          description: "Selamat datang kembali di EDULAD.",
        });
        navigate("/dashboard");
      } else {
        // Register dengan Firebase
        await register(formData.email, formData.password, formData.name);
        toast({
          title: "Registrasi Berhasil!",
          description: "Akun Anda telah dibuat. Selamat berpetualang!",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Auth error:", error);

      // Handle Firebase error messages
      let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";

      if (error.message) {
        if (error.message.includes("invalid-email")) {
          errorMessage = "Format email tidak valid.";
        } else if (error.message.includes("user-not-found")) {
          errorMessage = "Email tidak terdaftar.";
        } else if (error.message.includes("wrong-password")) {
          errorMessage = "Password salah.";
        } else if (error.message.includes("email-already-in-use")) {
          errorMessage = "Email sudah digunakan.";
        } else if (error.message.includes("weak-password")) {
          errorMessage = "Password terlalu lemah. Minimal 6 karakter.";
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: isLogin ? "Login Gagal" : "Registrasi Gagal",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4"
      style={{
        background: "linear-gradient(135deg, hsl(45 30% 97%) 0%, hsl(140 25% 90%) 50%, hsl(150 30% 85%) 100%)",
      }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-leaf/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Auth Card */}
        <div className="bg-card/90 backdrop-blur-md rounded-2xl shadow-elevated p-8 border border-border/50">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-soft">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">EDULAD</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
            {isLogin ? "Masuk ke Akun" : "Buat Akun Baru"}
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            {isLogin
              ? "Masuk untuk melanjutkan petualanganmu"
              : "Daftar untuk memulai perjalanan edukasimu"
            }
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nama Lengkap
                  </label>
                  <Input
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Asal Instansi
                  </label>
                  <Input
                    placeholder="Sekolah / Universitas / Organisasi"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="h-12"
                  />
                </div>
              </>
            )}

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
                className="h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full mt-6" disabled={loading}>
              {loading ? "Memproses..." : (isLogin ? "Masuk" : "Daftar")}
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center text-muted-foreground mt-6">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-semibold hover:underline"
            >
              {isLogin ? "Daftar" : "Masuk"}
            </button>
          </p>
        </div>
      </div>
    </div >
  );
};

export default AuthPage;

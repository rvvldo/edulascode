import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  User,
  Trophy,
  Medal,
  Settings,
  HelpCircle,
  LogOut,
  Edit2,
  Save,
  Award,
  Star,
  Leaf,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock user data
const userData = {
  name: "Budi Santoso",
  bio: "Pecinta alam dan lingkungan. Saya percaya setiap tindakan kecil bisa membuat perbedaan besar untuk bumi kita.",
  institution: "Universitas Indonesia",
  totalScore: 850,
  rank: 5,
  storiesCompleted: 8,
  achievements: [
    { id: 1, name: "Pemula Hijau", icon: "🌱", description: "Selesaikan cerita pertama" },
    { id: 2, name: "Penjaga Hutan", icon: "🌳", description: "Selesaikan 5 cerita kategori Hutan" },
    { id: 3, name: "Sahabat Laut", icon: "🐋", description: "Selesaikan 3 cerita kategori Laut" },
  ],
};

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, name: "Rina Wijaya", score: 1250, institution: "ITB" },
  { rank: 2, name: "Ahmad Fadli", score: 1180, institution: "UGM" },
  { rank: 3, name: "Dewi Lestari", score: 1050, institution: "Unair" },
  { rank: 4, name: "Joko Susilo", score: 920, institution: "IPB" },
  { rank: 5, name: "Budi Santoso", score: 850, institution: "UI", isCurrentUser: true },
  { rank: 6, name: "Maya Putri", score: 780, institution: "Undip" },
  { rank: 7, name: "Andi Pratama", score: 720, institution: "Unpad" },
  { rank: 8, name: "Siti Rahayu", score: 650, institution: "UB" },
];

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "leaderboard" | "settings" | "help">("profile");
  const [formData, setFormData] = useState({
    name: userData.name,
    bio: userData.bio,
    institution: userData.institution,
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profil Diperbarui",
      description: "Perubahan telah disimpan.",
    });
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 text-center font-bold text-muted-foreground">{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="font-display text-xl font-bold">Profil</h1>
            </div>
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 sticky top-24">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground">{userData.name}</h2>
                <p className="text-sm text-muted-foreground">{userData.institution}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-background rounded-xl">
                  <div className="text-2xl font-bold text-primary">{userData.totalScore}</div>
                  <div className="text-xs text-muted-foreground">Total Skor</div>
                </div>
                <div className="text-center p-3 bg-background rounded-xl">
                  <div className="text-2xl font-bold text-accent">#{userData.rank}</div>
                  <div className="text-xs text-muted-foreground">Peringkat</div>
                </div>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                {[
                  { id: "profile", label: "Profil", icon: User },
                  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
                  { id: "settings", label: "Pengaturan", icon: Settings },
                  { id: "help", label: "Bantuan", icon: HelpCircle },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                <Link
                  to="/"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Keluar</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                {/* Profile Info */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl font-bold">Informasi Profil</h3>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Simpan
                        </>
                      ) : (
                        <>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nama Lengkap
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Asal Instansi
                      </label>
                      <Input
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        disabled={!isEditing}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Bio
                      </label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                  <h3 className="font-display text-xl font-bold mb-6">Pencapaian</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {userData.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex flex-col items-center text-center p-4 bg-background rounded-xl"
                      >
                        <span className="text-4xl mb-3">{achievement.icon}</span>
                        <h4 className="font-semibold text-foreground mb-1">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === "leaderboard" && (
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-6 h-6 text-accent" />
                  <h3 className="font-display text-xl font-bold">Leaderboard</h3>
                </div>

                {/* Top 3 */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {leaderboardData.slice(0, 3).map((player, index) => (
                    <div
                      key={player.rank}
                      className={`relative text-center p-4 rounded-2xl ${
                        index === 0
                          ? "bg-gradient-to-b from-yellow-500/20 to-yellow-600/10 border-2 border-yellow-500/30"
                          : index === 1
                          ? "bg-gradient-to-b from-gray-400/20 to-gray-500/10 border-2 border-gray-400/30"
                          : "bg-gradient-to-b from-amber-600/20 to-amber-700/10 border-2 border-amber-600/30"
                      }`}
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        {index === 0 && <Award className="w-8 h-8 text-yellow-500" />}
                        {index === 1 && <Award className="w-7 h-7 text-gray-400" />}
                        {index === 2 && <Award className="w-6 h-6 text-amber-600" />}
                      </div>
                      <div className="w-12 h-12 rounded-full bg-muted mx-auto mt-4 mb-2 flex items-center justify-center">
                        <User className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <h4 className="font-semibold text-foreground">{player.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{player.institution}</p>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="font-bold text-primary">{player.score}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Full List */}
                <div className="space-y-2">
                  {leaderboardData.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                        player.isCurrentUser
                          ? "bg-primary/10 border-2 border-primary/30"
                          : "bg-background hover:bg-muted"
                      }`}
                    >
                      <div className="w-8 flex justify-center">
                        {getRankIcon(player.rank)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {player.name}
                          {player.isCurrentUser && (
                            <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                              Kamu
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground">{player.institution}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="font-bold text-foreground">{player.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <h3 className="font-display text-xl font-bold mb-6">Pengaturan</h3>
                <p className="text-muted-foreground">Pengaturan akun akan tersedia di versi mendatang.</p>
              </div>
            )}

            {/* Help Tab */}
            {activeTab === "help" && (
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <h3 className="font-display text-xl font-bold mb-6">Pusat Bantuan</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-background rounded-xl">
                    <h4 className="font-semibold mb-2">Bagaimana cara bermain?</h4>
                    <p className="text-sm text-muted-foreground">
                      Pilih cerita dari dashboard, ikuti alur cerita, dan buat keputusan yang bijak untuk mendapatkan skor tertinggi.
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-xl">
                    <h4 className="font-semibold mb-2">Bagaimana sistem skor bekerja?</h4>
                    <p className="text-sm text-muted-foreground">
                      Setiap pilihan dalam cerita memiliki dampak. Pilihan yang mendukung pelestarian alam akan memberikan skor lebih tinggi.
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-xl">
                    <h4 className="font-semibold mb-2">Hubungi kami</h4>
                    <p className="text-sm text-muted-foreground">
                      Email: support@edulad.id
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

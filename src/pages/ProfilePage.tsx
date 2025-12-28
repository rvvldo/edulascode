import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimeData } from "@/hooks/useFirebase";
import { updateData } from "@/lib/firebase.service";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import ReportForm from "@/components/ReportForm";

// Default achievements untuk user baru
const defaultAchievements = [
  { id: 1, name: "Pemula Hijau", icon: "🌱", description: "Selesaikan cerita pertama" },
  { id: 2, name: "Penjaga Hutan", icon: "🌳", description: "Selesaikan 5 cerita kategori Hutan" },
  { id: 3, name: "Sahabat Laut", icon: "🐋", description: "Selesaikan 3 cerita kategori Laut" },
];

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
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "settings" | "help">("profile");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load user data dari Firebase
  const { data: userData, loading } = useRealtimeData(`users/${currentUser?.uid}`);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    institution: "",
  });

  // Update formData dan load preferences ketika userData dimuat
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.displayName || "",
        bio: userData.bio || "",
        institution: userData.institution || "",
      });

      // Load notification preference if exists
      if (userData.preferences?.notifications !== undefined) {
        setNotificationsEnabled(userData.preferences.notifications);
      }
    }
  }, [userData]);

  // Save notification preference when changed
  const handleNotificationChange = async (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    if (!currentUser) return;

    try {
      await updateData(`users/${currentUser.uid}/preferences`, {
        notifications: enabled
      });
    } catch (error) {
      console.error("Failed to save notification preference:", error);
    }
  };

  const handleSave = async () => {
    if (!currentUser) return;

    setIsSaving(true);
    try {
      // Update data di Firebase
      await updateData(`users/${currentUser.uid}`, {
        displayName: formData.name,
        bio: formData.bio,
        institution: formData.institution,
      });

      setIsEditing(false);
      toast({
        title: "Profil Diperbarui",
        description: "Perubahan telah disimpan ke Firebase.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Gagal Menyimpan",
        description: "Terjadi kesalahan saat menyimpan profil.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 text-center font-bold text-muted-foreground">{rank}</span>;
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat profil...</p>
        </div>
      </div>
    );
  }

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
                <h2 className="font-display text-xl font-bold text-foreground">{userData?.displayName || "User"}</h2>
                <p className="text-sm text-muted-foreground">{userData?.institution || "-"}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-background rounded-xl">
                  <div className="text-2xl font-bold text-primary">{userData?.totalScore || 0}</div>
                  <div className="text-xs text-muted-foreground">Total Skor</div>
                </div>
                <div className="text-center p-3 bg-background rounded-xl">
                  <div className="text-2xl font-bold text-accent">#{userData?.rank || 0}</div>
                  <div className="text-xs text-muted-foreground">Peringkat</div>
                </div>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                {[
                  { id: "profile", label: "Profil", icon: User },
                  { id: "settings", label: "Pengaturan", icon: Settings },
                  { id: "help", label: "Bantuan", icon: HelpCircle },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground"
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Keluar</span>
                </button>
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
                      disabled={isSaving}
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {isSaving ? "Menyimpan..." : "Simpan"}
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
                    {(userData?.achievements || defaultAchievements).map((achievement: any) => (
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



            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <h3 className="font-display text-xl font-bold mb-6">Pengaturan</h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                    <div className="space-y-0.5">
                      <h4 className="font-medium text-foreground">Notifikasi</h4>
                      <p className="text-sm text-muted-foreground">Terima notifikasi untuk update terbaru</p>
                    </div>
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={handleNotificationChange}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                    <div className="space-y-0.5">
                      <h4 className="font-medium text-foreground">Mode Gelap</h4>
                      <p className="text-sm text-muted-foreground">Aktifkan tampilan mode gelap</p>
                    </div>
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Help Tab */}
            {activeTab === "help" && <ReportForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

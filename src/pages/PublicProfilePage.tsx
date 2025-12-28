import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    User,
    Trophy,
    Medal,
} from "lucide-react";
import { useRealtimeData } from "@/hooks/useFirebase";

// Default achievements (same as ProfilePage to maintain consistency)
const defaultAchievements = [
    { id: 1, name: "Pemula Hijau", icon: "🌱", description: "Selesaikan cerita pertama" },
    { id: 2, name: "Penjaga Hutan", icon: "🌳", description: "Selesaikan 5 cerita kategori Hutan" },
    { id: 3, name: "Sahabat Laut", icon: "🐋", description: "Selesaikan 3 cerita kategori Laut" },
];

const PublicProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch user data based on ID from URL
    const { data: userData, loading } = useRealtimeData(`users/${id}`);

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

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Pengguna Tidak Ditemukan</h2>
                    <Button onClick={() => navigate("/dashboard")}>Kembali ke Dashboard</Button>
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
                            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <h1 className="font-display text-xl font-bold">Profil Pengguna</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 lg:px-8 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar / Left Column */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 sticky top-24">
                            {/* Avatar */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                    <User className="w-12 h-12 text-primary" />
                                </div>
                                <h2 className="font-display text-xl font-bold text-foreground text-center">{userData.displayName || "User"}</h2>
                                <p className="text-sm text-muted-foreground text-center">{userData.institution || "Belum ada instansi"}</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="text-center p-3 bg-background rounded-xl">
                                    <div className="text-2xl font-bold text-primary">{userData.totalScore || 0}</div>
                                    <div className="text-xs text-muted-foreground">Total Skor</div>
                                </div>
                                <div className="text-center p-3 bg-background rounded-xl">
                                    <div className="text-2xl font-bold text-accent">#{userData.rank || "-"}</div>
                                    <div className="text-xs text-muted-foreground">Peringkat</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Bio Section */}
                        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                            <h3 className="font-display text-xl font-bold mb-4">Tentang</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {userData.bio || "Tidak ada bio."}
                            </p>
                        </div>

                        {/* Achievements */}
                        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                            <h3 className="font-display text-xl font-bold mb-6">Pencapaian</h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {(userData.achievements || defaultAchievements).map((achievement: any) => (
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
                </div>
            </div>
        </div>
    );
};

export default PublicProfilePage;

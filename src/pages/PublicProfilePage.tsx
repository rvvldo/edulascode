import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    User,
    Trophy,
    Lock,
} from "lucide-react";
import { useRealtimeData } from "@/hooks/useFirebase";
import { ACHIEVEMENTS, getRarityColor } from "@/data/achievements";
import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const PublicProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [displayedAchievements, setDisplayedAchievements] = useState<any[]>([]);

    // Fetch user data based on ID from URL
    const { data: userData, loading } = useRealtimeData(`users/${id}`);

    // Fetch all users to calculate real rank
    const { data: allUsersData } = useRealtimeData("users");

    // Load displayed achievements
    useEffect(() => {
        if (userData) {
            console.log('PublicProfile - User Data:', userData);
            console.log('PublicProfile - Total Score:', userData.totalScore);
            console.log('PublicProfile - Leaderboard Rank:', userData.leaderboardRank);
            console.log('PublicProfile - Achievements:', userData.achievements);

            if (userData?.achievements?.displayed) {
                const displayed = userData.achievements.displayed.map((achievementId: string) => {
                    const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
                    return achievement;
                }).filter(Boolean);
                console.log('PublicProfile - Displayed Achievements:', displayed);
                setDisplayedAchievements(displayed);
            } else {
                setDisplayedAchievements([]);
            }
        }
    }, [userData]);

    // Calculate actual rank from leaderboard
    const calculateActualRank = () => {
        if (!allUsersData || !userData) return null;

        // Create leaderboard sorted by score
        const sortedUsers = Object.entries(allUsersData)
            .map(([uid, user]: [string, any]) => ({
                uid,
                score: user.totalScore || 0,
                role: user.role
            }))
            .filter(user => user.role !== 'admin' && user.role !== 'central_admin') // Exclude admins
            .sort((a, b) => b.score - a.score); // Sort by score descending

        // Find user's position
        const userIndex = sortedUsers.findIndex(u => u.uid === id);

        if (userIndex === -1) return null;

        return userIndex + 1; // Rank is index + 1
    };

    const actualRank = calculateActualRank();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <DotLottieReact
                        src="lottie/loading.lottie"
                        loop
                        autoplay
                        style={{ width: 120, height: 120 }}
                    />
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center text-center">
                    <DotLottieReact
                              src="lottie/404.lottie"
                              loop
                              autoplay
                              className="w-32 h-32" // Atur ukuran sesuai kebutuhan
                            />
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
                                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden ring-4 ring-background">
                                    {userData?.photoURL ? (
                                        <img
                                            src={userData.photoURL}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-12 h-12 text-primary" />
                                    )}
                                </div>
                                <h2 className="font-display text-xl font-bold text-foreground text-center mt-4">{userData.displayName || "User"}</h2>
                                <p className="text-sm text-muted-foreground text-center">{userData.institution || "Belum ada instansi"}</p>
                                {userData?.class && (
                                    <p className="text-xs text-muted-foreground text-center mt-1">Kelas: {userData.class}</p>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="space-y-3 mb-6">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center p-3 bg-background rounded-xl">
                                        <div className="text-2xl font-bold text-primary">
                                            {userData?.totalScore !== undefined ? userData.totalScore : 0}
                                        </div>
                                        <div className="text-xs text-muted-foreground">Total Skor</div>
                                    </div>
                                    <div className="text-center p-3 bg-background rounded-xl">
                                        <div className="text-2xl font-bold text-accent">
                                            {actualRank ? `#${actualRank}` : '-'}
                                        </div>
                                        <div className="text-xs text-muted-foreground">Peringkat</div>
                                    </div>
                                </div>

                                {/* Additional Stats */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center p-3 bg-background rounded-xl">
                                        <div className="text-2xl font-bold text-green-600">
                                            {userData?.completedStories ? Object.keys(userData.completedStories).length : 0}
                                        </div>
                                        <div className="text-xs text-muted-foreground">Misi Selesai</div>
                                    </div>
                                    <div className="text-center p-3 bg-background rounded-xl">
                                        <div className="text-2xl font-bold text-yellow-600">
                                            {userData?.achievements?.unlocked ? Object.keys(userData.achievements.unlocked).length : 0}
                                        </div>
                                        <div className="text-xs text-muted-foreground">Pencapaian</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Bio Section */}
                        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                            <h3 className="font-display text-xl font-bold mb-4">Tentang</h3>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-border/50">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Nama Lengkap</p>
                                    <p className="text-sm font-medium">{userData?.displayName || "User"}</p>
                                </div>
                                {userData?.institution && (
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Instansi</p>
                                        <p className="text-sm font-medium">{userData.institution}</p>
                                    </div>
                                )}
                                {userData?.class && (
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Kelas</p>
                                        <p className="text-sm font-medium">{userData.class}</p>
                                    </div>
                                )}
                                {userData?.email && (
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Email</p>
                                        <p className="text-sm font-medium truncate">{userData.email}</p>
                                    </div>
                                )}
                            </div>

                            {/* Bio */}
                            <div>
                                <p className="text-xs text-muted-foreground mb-2">Bio</p>
                                {userData?.bio ? (
                                    <p className="text-muted-foreground leading-relaxed">
                                        {userData.bio}
                                    </p>
                                ) : (
                                    <p className="text-muted-foreground/60 leading-relaxed text-center py-4 italic">
                                        Tidak ada bio.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
                                        <Trophy className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-bold">Pencapaian</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {userData?.achievements?.unlocked ? Object.keys(userData.achievements.unlocked).length : 0}/{ACHIEVEMENTS.length} terbuka
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {displayedAchievements.length > 0 ? (
                                <div className="grid grid-cols-3 gap-4">
                                    {displayedAchievements.map((achievement: any) => (
                                        <div
                                            key={achievement.id}
                                            className={`relative flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br ${getRarityColor(achievement.rarity)} shadow-md hover:shadow-lg transition-all hover:scale-105`}
                                        >
                                            <div className="text-4xl mb-2">{achievement.icon}</div>
                                            <div className="text-xs font-bold text-white text-center leading-tight">
                                                {achievement.name}
                                            </div>
                                            <div className="text-[10px] text-white/80 text-center mt-1">
                                                {achievement.description}
                                            </div>
                                        </div>
                                    ))}
                                    {/* Fill empty slots */}
                                    {Array.from({ length: 3 - displayedAchievements.length }).map((_, index) => (
                                        <div
                                            key={`empty-${index}`}
                                            className="relative flex flex-col items-center justify-center p-4 rounded-xl bg-muted/30 border-2 border-dashed border-muted-foreground/20"
                                        >
                                            <Lock className="w-10 h-10 text-muted-foreground/30 mb-2" />
                                            <p className="text-xs text-muted-foreground/50 text-center">Slot Kosong</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    <Trophy className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                    <p className="text-sm font-medium">Belum ada pencapaian yang ditampilkan</p>
                                    <p className="text-xs text-muted-foreground/60 mt-1">Pengguna belum memilih lambang untuk dipajang</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfilePage;

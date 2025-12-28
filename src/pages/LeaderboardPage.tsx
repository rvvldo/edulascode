import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Medal, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRealtimeData } from "@/hooks/useFirebase";

const LeaderboardPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { data: usersData, loading } = useRealtimeData("users");

    // Convert users object to array and sort by score
    const leaderboardData = usersData
        ? Object.entries(usersData)
            .map(([uid, user]: [string, any]) => ({
                uid,
                name: user.displayName || "Anonymous",
                score: user.totalScore || 0,
                institution: user.institution || "-",
                rank: 0, // Will be calculated
            }))
            .sort((a, b) => b.score - a.score)
            .map((user, index) => ({ ...user, rank: index + 1 }))
        : [];

    const filteredLeaderboard = leaderboardData.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.institution.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    <div className="flex items-center gap-4 h-16">
                        <Link to="/dashboard">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="font-display text-xl font-bold">Leaderboard</h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 lg:px-8 py-8">
                {/* Search */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Cari pengguna atau institusi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-10 bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                </div>

                {/* Leaderboard List */}
                <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-soft border border-border/50 overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-muted-foreground">Memuat leaderboard...</div>
                    ) : filteredLeaderboard.length > 0 ? (
                        <div className="divide-y divide-border/50">
                            {filteredLeaderboard.map((user) => (
                                <div
                                    key={user.uid}
                                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-8 flex justify-center">
                                        {getRankIcon(user.rank)}
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User className="w-5 h-5 text-primary" />
                                        </div>
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h3 className="font-semibold truncate">{user.name}</h3>
                                        <p className="text-sm text-muted-foreground truncate">{user.institution}</p>
                                    </div>
                                    <div className="flex-shrink-0 text-right">
                                        <div className="font-bold text-primary">{user.score}</div>
                                        <div className="text-xs text-muted-foreground">Poin</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">Tidak ada data ditemukan</div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default LeaderboardPage;

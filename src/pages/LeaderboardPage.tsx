import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Medal, Crown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRealtimeData } from "@/hooks/useFirebase";
import { Badge } from "@/components/ui/badge";

const LeaderboardPage = () => {
    const { data: usersData, loading } = useRealtimeData("users");
    const navigate = useNavigate();

    // Convert users object to array and sort by score
    const leaderboardData = usersData
        ? Object.entries(usersData)
            .map(([uid, user]: [string, any]) => ({
                uid,
                name: user.displayName || "Anonymous",
                score: user.totalScore || 0,
                institution: user.institution || "Indonesia",
                rank: 0,
                role: user.role
            }))
            .filter(user => user.role !== 'admin' && user.role !== 'central_admin') // Filter out admins if needed
            .sort((a, b) => b.score - a.score)
            .slice(0, 50)
            .map((user, index) => ({ ...user, rank: index + 1 }))
        : [];

    const topThree = leaderboardData.slice(0, 3);
    const restOfUsers = leaderboardData.slice(3);

    const PodiumItem = ({ user, position }: { user: any, position: 1 | 2 | 3 }) => {
        let sizeClass = "";
        let colorClass = "";
        let heightClass = "";

        if (position === 1) {
            sizeClass = "w-24 h-24 sm:w-32 sm:h-32";
            colorClass = "from-yellow-300 to-yellow-600 border-yellow-400";
            heightClass = "scale-110 z-10 -mt-8"; // Elevated
        } else if (position === 2) {
            sizeClass = "w-20 h-20 sm:w-24 sm:h-24";
            colorClass = "from-gray-300 to-gray-500 border-gray-400";
            heightClass = "mt-4";
        } else {
            sizeClass = "w-20 h-20 sm:w-24 sm:h-24";
            colorClass = "from-amber-600 to-amber-800 border-amber-700";
            heightClass = "mt-8";
        }

        return (
            <div
                className={`flex flex-col items-center cursor-pointer transition-transform hover:scale-105 ${heightClass}`}
                onClick={() => navigate(`/user/${user.uid}`)}
            >
                <div className="relative">
                    {position === 1 && (
                        <Crown className="absolute -top-10 left-1/2 -translate-x-1/2 w-10 h-10 text-yellow-400 animate-bounce" fill="currentColor" />
                    )}
                    <div className={`rounded-full p-1 bg-gradient-to-br ${colorClass} shadow-xl`}>
                        <div className={`${sizeClass} rounded-full bg-background border-4 border-transparent overflow-hidden flex items-center justify-center relative`}>
                            {/* Placeholder Avatar if no image */}
                            <User className="w-1/2 h-1/2 text-muted-foreground" />
                        </div>
                    </div>
                    <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full font-bold text-white shadow-lg bg-gradient-to-br ${colorClass}`}>
                        {position}
                    </div>
                </div>

                <div className="text-center mt-6 space-y-1">
                    <h3 className="font-bold text-lg sm:text-xl truncate max-w-[150px]">{user.name}</h3>
                    <p className="text-sm text-muted-foreground truncate max-w-[150px]">{user.institution}</p>
                    <Badge variant="secondary" className="mt-2 text-base px-4 py-1 bg-primary/10 text-primary hover:bg-primary/20">
                        {user.score}
                    </Badge>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center gap-4 h-16">
                        <Link to="/dashboard">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="font-display text-xl font-bold">Papan Juara</h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 lg:px-8 py-8 pb-20">

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-muted-foreground">Memuat data juara...</p>
                    </div>
                ) : leaderboardData.length > 0 ? (
                    <>
                        {/* Podium Section */}
                        <div className="flex justify-center items-end gap-4 sm:gap-12 mb-20 min-h-[300px] pt-12">
                            {/* 2nd Place (Left) */}
                            {topThree[1] && <PodiumItem user={topThree[1]} position={2} />}

                            {/* 1st Place (Center) */}
                            {topThree[0] && <PodiumItem user={topThree[0]} position={1} />}

                            {/* 3rd Place (Right) */}
                            {topThree[2] && <PodiumItem user={topThree[2]} position={3} />}
                        </div>

                        {/* List Section for Rank 4+ */}
                        {restOfUsers.length > 0 && (
                            <div className="max-w-3xl mx-auto space-y-3 animate-fade-in-up">
                                <h3 className="text-lg font-bold mb-4 opacity-80 pl-2">Peringkat Lainnya</h3>
                                {restOfUsers.map((user) => (
                                    <div
                                        key={user.uid}
                                        className="group flex items-center gap-4 p-4 rounded-xl bg-card/40 backdrop-blur-sm border border-border/50 hover:bg-card/80 hover:scale-[1.01] transition-all cursor-pointer shadow-sm"
                                        onClick={() => navigate(`/user/${user.uid}`)}
                                    >
                                        <div className="w-8 font-bold text-center text-muted-foreground">{user.rank}</div>
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="w-5 h-5 text-primary" />
                                            </div>
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="font-semibold truncate group-hover:text-primary transition-colors">{user.name}</div>
                                            <div className="text-xs text-muted-foreground truncate">{user.institution}</div>
                                        </div>
                                        <div className="font-display font-bold text-lg text-foreground">{user.score}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 opacity-50">
                        <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <p>Belum ada data peringkat</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default LeaderboardPage;

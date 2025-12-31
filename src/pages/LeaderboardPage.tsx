import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Crown, User, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRealtimeData } from "@/hooks/useFirebase";
import { useEffect } from "react";
import { syncLeaderboardRanks } from "@/lib/firebase.service";
import { MusicPlayer } from "@/components/MusicPlayer";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
                photoURL: user.photoURL || null,
                rank: 0,
                role: user.role
            }))
            .filter(user => user.role !== 'admin' && user.role !== 'central_admin') // Filter out admins if needed
            .sort((a, b) => b.score - a.score)
            .slice(0, 50)
            .map((user, index) => ({ ...user, rank: index + 1 }))
        : [];

    // Sync leaderboard ranks to user profiles when data changes
    useEffect(() => {
        if (usersData && !loading) {
            syncLeaderboardRanks(usersData).catch(error => {
                console.error('Failed to sync leaderboard ranks:', error);
            });
        }
    }, [usersData, loading]);

    const topThree = leaderboardData.slice(0, 3);
    const restOfUsers = leaderboardData.slice(3);

    const PodiumItem = ({ user, position }: { user: any, position: 1 | 2 | 3 }) => {
        let sizeClass = "";
        let colorClass = "";
        let heightClass = "";
        let podiumHeight = "";
        let ringColor = "";

        if (position === 1) {
            sizeClass = "w-28 h-28 sm:w-36 sm:h-36";
            colorClass = "from-yellow-400 via-yellow-500 to-yellow-600";
            heightClass = "order-2";
            podiumHeight = "h-48";
            ringColor = "ring-yellow-400/50";
        } else if (position === 2) {
            sizeClass = "w-24 h-24 sm:w-28 sm:h-28";
            colorClass = "from-slate-300 via-slate-400 to-slate-500";
            heightClass = "order-1";
            podiumHeight = "h-36";
            ringColor = "ring-slate-400/50";
        } else {
            sizeClass = "w-24 h-24 sm:w-28 sm:h-28";
            colorClass = "from-amber-600 via-amber-700 to-amber-800";
            heightClass = "order-3";
            podiumHeight = "h-28";
            ringColor = "ring-amber-600/50";
        }

        return (
            <div className={`flex flex-col items-center ${heightClass} flex-1 max-w-[200px]`}>
                {/* Avatar and Crown */}
                <div className="relative mb-4 group cursor-pointer" onClick={() => navigate(`/user/${user.uid}`)}>
                    {position === 1 && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
                            <Crown 
                                className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] animate-pulse" 
                                fill="currentColor"
                                style={{ animationDuration: '2s' }}
                            />
                        </div>
                    )}
                    
                    <div className={`rounded-full p-1 bg-gradient-to-br ${colorClass} shadow-2xl ${ringColor} ring-4 transition-transform group-hover:scale-110 duration-300`}>
                        <div className={`${sizeClass} rounded-full bg-background border-4 border-white/20 overflow-hidden flex items-center justify-center relative`}>
                            {user.photoURL ? (
                                <img 
                                    src={user.photoURL} 
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-1/2 h-1/2 text-muted-foreground" />
                            )}
                        </div>
                    </div>
                    
                    {/* Position Badge */}
                    <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full font-bold text-white shadow-xl bg-gradient-to-br ${colorClass} border-2 border-white`}>
                        {position}
                    </div>
                </div>

                {/* User Info */}
                <div className="text-center space-y-2 mb-4">
                    <h3 className="font-bold text-lg sm:text-xl truncate max-w-[180px] px-2">
                        {user.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate max-w-[180px] px-2">
                        {user.institution}
                    </p>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg shadow-lg bg-gradient-to-r ${colorClass} text-white`}>
                        <Trophy className="w-5 h-5" />
                        {user.score}
                    </div>
                </div>

                {/* Podium */}
                <div className={`w-full ${podiumHeight} bg-gradient-to-b ${colorClass} rounded-t-2xl shadow-xl border-t-4 border-white/30 relative overflow-hidden transition-all duration-300`}>
                    <div className="absolute inset-0 bg-white/10"></div>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/90 font-bold text-4xl">
                        #{position}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background relative">
            {/* 3D Animated Background Layer */}
            <div className="fixed inset-0 -z-10 overflow-hidden" style={{ perspective: '1200px' }}>
                {/* Large 3D Floating Spheres - Neutral Theme */}
                <div 
                    className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full opacity-20"
                    style={{ 
                        background: 'radial-gradient(circle at 30% 30%, rgba(var(--primary-rgb), 0.3), rgba(var(--accent-rgb), 0.2), transparent)',
                        animation: 'float3d 15s ease-in-out infinite',
                        transform: 'translateZ(100px)',
                        filter: 'blur(60px)',
                    }}
                />
                <div 
                    className="absolute top-40 right-20 w-[400px] h-[400px] rounded-full opacity-15"
                    style={{ 
                        background: 'radial-gradient(circle at 30% 30%, rgba(var(--accent-rgb), 0.3), rgba(var(--primary-rgb), 0.2), transparent)',
                        animation: 'float3d 18s ease-in-out infinite 3s',
                        transform: 'translateZ(80px)',
                        filter: 'blur(50px)',
                    }}
                />
                <div 
                    className="absolute bottom-20 left-1/3 w-[350px] h-[350px] rounded-full opacity-15"
                    style={{ 
                        background: 'radial-gradient(circle at 30% 30%, rgba(var(--primary-rgb), 0.25), rgba(var(--accent-rgb), 0.15), transparent)',
                        animation: 'float3d 20s ease-in-out infinite 6s',
                        transform: 'translateZ(60px)',
                        filter: 'blur(40px)',
                    }}
                />
                
                {/* 3D Rotating Elements */}
                <div className="absolute top-1/4 right-1/4 w-40 h-40" style={{ transformStyle: 'preserve-3d' }}>
                    <div 
                        className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/5 rounded-full"
                        style={{ 
                            animation: 'rotate3d 25s linear infinite',
                            transformStyle: 'preserve-3d',
                            boxShadow: '0 0 60px rgba(var(--primary-rgb), 0.2)',
                        }}
                    />
                </div>
                
                <div className="absolute bottom-1/3 left-1/4 w-32 h-32" style={{ transformStyle: 'preserve-3d' }}>
                    <div 
                        className="w-full h-full bg-gradient-to-br from-accent/10 to-primary/5 rounded-full"
                        style={{ 
                            animation: 'rotate3d 30s linear infinite reverse',
                            transformStyle: 'preserve-3d',
                            boxShadow: '0 0 50px rgba(var(--accent-rgb), 0.2)',
                        }}
                    />
                </div>
                
                {/* 3D Floating Leaves - Multiple Sizes */}
                <div className="absolute top-1/4 left-1/5" style={{ animation: 'floatLeaf 12s ease-in-out infinite' }}>
                    <Leaf className="w-32 h-32 text-green-500/40 rotate-45" style={{ filter: 'drop-shadow(0 0 30px rgba(34, 197, 94, 0.8))' }} />
                </div>
                <div className="absolute top-1/3 right-1/4" style={{ animation: 'floatLeaf 14s ease-in-out infinite 2s' }}>
                    <Leaf className="w-28 h-28 text-emerald-400/35 -rotate-12" style={{ filter: 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.8))' }} />
                </div>
                <div className="absolute bottom-1/4 right-1/5" style={{ animation: 'floatLeaf 16s ease-in-out infinite 4s' }}>
                    <Leaf className="w-36 h-36 text-teal-400/30 rotate-90" style={{ filter: 'drop-shadow(0 0 35px rgba(20, 184, 166, 0.8))' }} />
                </div>
                <div className="absolute top-2/3 left-1/4" style={{ animation: 'floatLeaf 13s ease-in-out infinite 6s' }}>
                    <Leaf className="w-24 h-24 text-lime-400/40 -rotate-45" style={{ filter: 'drop-shadow(0 0 28px rgba(132, 204, 22, 0.8))' }} />
                </div>
                <div className="absolute top-1/2 right-1/3" style={{ animation: 'floatLeaf 15s ease-in-out infinite 8s' }}>
                    <Leaf className="w-30 h-30 text-green-400/35 rotate-12" style={{ filter: 'drop-shadow(0 0 30px rgba(34, 197, 94, 0.8))' }} />
                </div>
                <div className="absolute bottom-1/3 left-1/6" style={{ animation: 'floatLeaf 17s ease-in-out infinite 10s' }}>
                    <Leaf className="w-26 h-26 text-emerald-500/40 rotate-180" style={{ filter: 'drop-shadow(0 0 32px rgba(16, 185, 129, 0.8))' }} />
                </div>
                <div className="absolute top-1/5 right-1/6" style={{ animation: 'floatLeaf 11s ease-in-out infinite 3s' }}>
                    <Leaf className="w-22 h-22 text-teal-500/35 -rotate-90" style={{ filter: 'drop-shadow(0 0 26px rgba(20, 184, 166, 0.8))' }} />
                </div>
                
                {/* Falling Leaves - 3D Effect */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={`falling-leaf-${i}`}
                        className="absolute"
                        style={{
                            left: `${5 + (Math.random() * 90)}%`,
                            top: `-${Math.random() * 20}%`,
                            animation: `fallLeaf ${8 + Math.random() * 8}s linear infinite`,
                            animationDelay: `${Math.random() * 10}s`,
                        }}
                    >
                        <Leaf 
                            className={`text-green-${400 + Math.floor(Math.random() * 3) * 100}/30`}
                            style={{ 
                                width: `${20 + Math.random() * 30}px`,
                                height: `${20 + Math.random() * 30}px`,
                                filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.4))',
                                transform: `rotate(${Math.random() * 360}deg)`,
                            }} 
                        />
                    </div>
                ))}
                
                {/* Trophy Icons with Nature Theme */}
                <div className="absolute top-1/3 left-1/6" style={{ animation: 'float3d 12s ease-in-out infinite 2s' }}>
                    <Trophy className="w-28 h-28 text-green-400/30" style={{ filter: 'drop-shadow(0 0 30px rgba(34, 197, 94, 0.8))' }} />
                </div>
                <div className="absolute bottom-1/4 right-1/6" style={{ animation: 'float3d 16s ease-in-out infinite 5s' }}>
                    <Trophy className="w-24 h-24 text-emerald-400/30" style={{ filter: 'drop-shadow(0 0 28px rgba(16, 185, 129, 0.8))' }} />
                </div>
                <div className="absolute top-2/3 right-1/3" style={{ animation: 'float3d 14s ease-in-out infinite 8s' }}>
                    <Crown className="w-20 h-20 text-lime-400/30" style={{ filter: 'drop-shadow(0 0 26px rgba(132, 204, 22, 0.8))' }} />
                </div>
                
                {/* 3D Grid with Perspective */}
                <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px',
                        transform: 'perspective(800px) rotateX(60deg) translateZ(-200px)',
                        transformOrigin: 'center bottom',
                        color: 'var(--primary)',
                    }}
                />
                
                {/* Animated Light Rays */}
                <div 
                    className="absolute top-0 left-1/2 w-1 h-full opacity-5"
                    style={{
                        background: 'linear-gradient(to bottom, transparent, var(--primary), transparent)',
                        animation: 'slideLight 8s ease-in-out infinite',
                        transform: 'translateX(-50%) rotate(15deg)',
                        filter: 'blur(20px)',
                    }}
                />
                <div 
                    className="absolute top-0 left-1/3 w-1 h-full opacity-5"
                    style={{
                        background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)',
                        animation: 'slideLight 10s ease-in-out infinite 2s',
                        transform: 'translateX(-50%) rotate(-15deg)',
                        filter: 'blur(20px)',
                    }}
                />
                
                {/* Depth Overlay */}
                <div 
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
                    }}
                />
            </div>

            {/* Floating Leaves Overlay - Visible Layer */}
            <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
                {/* Large Floating Leaves */}
                {[
                    { top: '10%', left: '10%', size: 48, delay: 0, duration: 12 },
                    { top: '20%', right: '15%', size: 40, delay: 2, duration: 14 },
                    { bottom: '25%', right: '10%', size: 52, delay: 4, duration: 16 },
                    { top: '60%', left: '12%', size: 36, delay: 6, duration: 13 },
                    { top: '40%', right: '25%', size: 44, delay: 8, duration: 15 },
                ].map((leaf, i) => (
                    <div
                        key={`static-leaf-${i}`}
                        className="absolute"
                        style={{
                            ...leaf,
                            animation: `floatLeaf ${leaf.duration}s ease-in-out infinite ${leaf.delay}s`,
                        }}
                    >
                        <Leaf 
                            style={{ 
                                width: `${leaf.size}px`,
                                height: `${leaf.size}px`,
                                filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 1))',
                                color: 'rgba(34, 197, 94, 0.6)',
                            }} 
                        />
                    </div>
                ))}
                
                {/* Falling Leaves */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`fall-leaf-${i}`}
                        className="absolute"
                        style={{
                            left: `${5 + (i * 4.5)}%`,
                            animation: `fallLeaf ${10 + (i % 6)}s linear infinite ${i * 0.8}s`,
                        }}
                    >
                        <Leaf 
                            style={{ 
                                width: `${30 + (i % 4) * 10}px`,
                                height: `${30 + (i % 4) * 10}px`,
                                filter: 'drop-shadow(0 0 15px rgba(34, 197, 94, 0.9))',
                                color: 'rgba(34, 197, 94, 0.7)',
                            }} 
                        />
                    </div>
                ))}
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-[60] glass-effect border-b border-border/50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard">
                                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </Link>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                                    <Trophy className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="font-display text-2xl font-bold text-foreground">
                                    Papan Juara
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 lg:px-8 pt-24 py-8 pb-20 relative z-10">

                {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <DotLottieReact
                            src="https://lottie.host/8ac7a7f8-9e01-4e19-82c4-7381d9fc3218/D4UsU6eeiC.lottie"
                            loop
                            autoplay
                            style={{ width: 120, height: 120 }}
                            />
                            <p className="mt-6 text-muted-foreground font-medium">Memuat data juara...</p>
                        </div>
                        ) : leaderboardData.length > 0 ? (
                    <>
                        {/* Title Section */}
                        <div className="text-center mb-12 animate-fade-in">
                            <h2 className="text-4xl sm:text-6xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                                Top Champions
                            </h2>
                            <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
                                <Leaf className="w-5 h-5 text-primary" />
                                Para juara terbaik dalam misi penyelamatan lingkungan
                                <Leaf className="w-5 h-5 text-primary" />
                            </p>
                        </div>

                        {/* Podium Section */}
                        <div className="flex justify-center items-end gap-4 sm:gap-8 mb-16 px-4">
                            {/* 2nd Place (Left) */}
                            {topThree[1] && <PodiumItem user={topThree[1]} position={2} />}

                            {/* 1st Place (Center) */}
                            {topThree[0] && <PodiumItem user={topThree[0]} position={1} />}

                            {/* 3rd Place (Right) */}
                            {topThree[2] && <PodiumItem user={topThree[2]} position={3} />}
                        </div>

                        {/* List Section for Rank 4+ */}
                        {restOfUsers.length > 0 && (
                            <div className="max-w-4xl mx-auto space-y-3 animate-fade-in-up">
                                <div className="flex items-center gap-3 mb-6 px-2">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
                                    <h3 className="text-lg font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                        <Leaf className="w-4 h-4 text-primary" />
                                        Peringkat Lainnya
                                        <Leaf className="w-4 h-4 text-primary" />
                                    </h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
                                </div>
                                
                                {restOfUsers.map((user, index) => (
                                    <div
                                        key={user.uid}
                                        className="group flex items-center gap-4 p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-card/90 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                                        onClick={() => navigate(`/user/${user.uid}`)}
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        {/* Rank */}
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center font-bold text-lg text-foreground group-hover:from-primary/30 group-hover:to-accent/20 transition-all">
                                            {user.rank}
                                        </div>
                                        
                                        {/* Avatar */}
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-2 ring-background group-hover:ring-primary/50 transition-all overflow-hidden">
                                                {user.photoURL ? (
                                                    <img 
                                                        src={user.photoURL} 
                                                        alt={user.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <User className="w-6 h-6 text-primary" />
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* User Info */}
                                        <div className="flex-grow min-w-0">
                                            <div className="font-bold text-base truncate text-foreground group-hover:text-primary transition-colors">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-muted-foreground truncate flex items-center gap-2">
                                                <span>{user.institution}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Score */}
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                                            <Trophy className="w-4 h-4 text-primary" />
                                            <span className="font-display font-bold text-lg text-foreground">
                                                {user.score}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <Trophy className="w-20 h-20 mx-auto mb-6 text-muted-foreground" />
                        <h3 className="text-2xl font-bold mb-2 text-foreground">Belum Ada Data Peringkat</h3>
                        <p className="text-muted-foreground">Jadilah yang pertama untuk masuk ke papan juara!</p>
                    </div>
                )}
            </main>
            
            {/* Custom CSS for 3D animations */}
            <style>{`
                @keyframes float3d {
                    0%, 100% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    25% {
                        transform: translate3d(30px, -40px, 80px) scale(1.1);
                    }
                    50% {
                        transform: translate3d(-30px, -80px, 150px) scale(1.3);
                    }
                    75% {
                        transform: translate3d(-40px, -40px, 80px) scale(1.1);
                    }
                }
                
                @keyframes floatLeaf {
                    0%, 100% {
                        transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
                    }
                    25% {
                        transform: translate3d(40px, -50px, 100px) rotate(90deg) scale(1.2);
                    }
                    50% {
                        transform: translate3d(-40px, -100px, 180px) rotate(180deg) scale(1.4);
                    }
                    75% {
                        transform: translate3d(-50px, -50px, 100px) rotate(270deg) scale(1.2);
                    }
                }
                
                @keyframes rotate3d {
                    0% {
                        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
                    }
                    100% {
                        transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
                    }
                }
                
                @keyframes slideLight {
                    0%, 100% {
                        transform: translateX(-50%) translateY(-100%) rotate(15deg);
                        opacity: 0;
                    }
                    50% {
                        transform: translateX(-50%) translateY(0%) rotate(15deg);
                        opacity: 0.2;
                    }
                }
                
                @keyframes fallLeaf {
                    0% {
                        transform: translate3d(0, -100px, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    20% {
                        transform: translate3d(-50px, 20vh, 50px) rotateX(180deg) rotateY(90deg) rotateZ(45deg);
                    }
                    40% {
                        transform: translate3d(30px, 40vh, -30px) rotateX(360deg) rotateY(180deg) rotateZ(90deg);
                    }
                    60% {
                        transform: translate3d(-40px, 60vh, 40px) rotateX(540deg) rotateY(270deg) rotateZ(135deg);
                    }
                    80% {
                        transform: translate3d(20px, 80vh, -20px) rotateX(720deg) rotateY(360deg) rotateZ(180deg);
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate3d(0, 100vh, 0) rotateX(900deg) rotateY(450deg) rotateZ(225deg);
                        opacity: 0;
                    }
                }
            `}</style>
            
            {/* Music Player */}
            <MusicPlayer />
        </div>
    );
};

export default LeaderboardPage;

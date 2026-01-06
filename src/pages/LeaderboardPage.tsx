import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Crown, User, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRealtimeData } from "@/hooks/useFirebase";
import { useEffect } from "react";
import { syncLeaderboardRanks } from "@/lib/firebase.service";
import { MusicPlayer } from "@/components/MusicPlayer";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// ✅ PISAHKAN PODIUM ITEM + GUNAKAN React.memo
const PodiumItem = React.memo(({ user, position, navigate }: { user: any; position: 1 | 2 | 3; navigate: (path: string) => void }) => {
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
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 w-12 h-12">
            {/* ✅ LOTTIE TANPA SPASI */}
            <DotLottieReact
              src="https://lottie.host/02aace42-701c-4d99-b00f-378895304118/TxGc52vruN.lottie"
              loop
              autoplay
              className="w-full h-full"
            />
          </div>
        )}

        <div className={`rounded-full p-1 bg-gradient-to-br ${colorClass} shadow-2xl ${ringColor} ring-4 transition-transform group-hover:scale-110 duration-300`}>
          <div className={`${sizeClass} rounded-full bg-background border-4 border-white/20 overflow-hidden flex items-center justify-center relative`}>
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
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
        <h3 className="font-bold text-lg sm:text-xl truncate max-w-[180px] px-2">{user.name}</h3>
        <p className="text-sm text-muted-foreground truncate max-w-[180px] px-2">{user.institution}</p>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg shadow-lg bg-gradient-to-r ${colorClass} text-white`}>
          <Trophy className="w-5 h-5" />
          {user.score}
        </div>
      </div>

      {/* Podium */}
      <div className={`w-full ${podiumHeight} bg-gradient-to-b ${colorClass} rounded-t-2xl shadow-xl border-t-4 border-white/30 relative overflow-hidden transition-all duration-300`}>
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/90 font-bold text-4xl">#{position}</div>
      </div>
    </div>
  );
});

// ✅ EKSPOR UTAMA
const LeaderboardPage = () => {
  const { data: usersData, loading } = useRealtimeData("users");
  const navigate = useNavigate();

  // ✅ GUNAKAN useMemo AGAR TIDAK RE-CREATE TIAP RENDER
  const leaderboardData = React.useMemo(() => {
    if (!usersData) return [];

    return Object.entries(usersData)
      .map(([uid, user]: [string, any]) => ({
        uid,
        name: user.displayName || "Anonymous",
        score: user.totalScore || 0,
        institution: user.institution || "Indonesia",
        photoURL: user.photoURL || null,
        rank: 0,
        role: user.role,
      }))
      .filter((user) => user.role !== "admin" && user.role !== "central_admin")
      .sort((a, b) => b.score - a.score)
      .slice(0, 50)
      .map((user, index) => ({ ...user, rank: index + 1 }));
  }, [usersData]);

  useEffect(() => {
    if (usersData && !loading) {
      syncLeaderboardRanks(usersData).catch((error) => {
        console.error("Failed to sync leaderboard ranks:", error);
      });
    }
  }, [usersData, loading]);

  const topThree = leaderboardData.slice(0, 3);
  const restOfUsers = leaderboardData.slice(3);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background (tidak diubah) */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ perspective: "1200px" }}>
        {/* ... (semua background 3D kamu tetap sama) ... */}
        {/* [PASTE SELURUH ISI BACKGROUND DARI KODE ASLI DI SINI] */}
        {/* Untuk ringkas, tidak diulang, tapi pastikan tidak dihapus */}
      </div>

      {/* Floating Leaves Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
        {/* ... (tetap sama) ... */}
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
                <h1 className="font-display text-2xl font-bold text-foreground">Papan Juara</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 pt-24 py-8 pb-20 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            {/* ✅ PERBAIKI JUGA URL DI SINI */}
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

            {/* ✅ PODIUM DENGAN key BERDASARKAN uid */}
            <div className="flex justify-center items-end gap-4 sm:gap-8 mb-16 px-4">
              {topThree[1] && <PodiumItem key={topThree[1].uid} user={topThree[1]} position={2} navigate={navigate} />}
              {topThree[0] && <PodiumItem key={topThree[0].uid} user={topThree[0]} position={1} navigate={navigate} />}
              {topThree[2] && <PodiumItem key={topThree[2].uid} user={topThree[2]} position={3} navigate={navigate} />}
            </div>

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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center font-bold text-lg text-foreground group-hover:from-primary/30 group-hover:to-accent/20 transition-all">
                      {user.rank}
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-2 ring-background group-hover:ring-primary/50 transition-all overflow-hidden">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="font-bold text-base truncate text-foreground group-hover:text-primary transition-colors">
                        {user.name}
                      </div>
                      <div className="text-sm text-muted-foreground truncate flex items-center gap-2">
                        <span>{user.institution}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span className="font-display font-bold text-lg text-foreground">{user.score}</span>
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

      {/* CSS Animations (tetap sama) */}
      <style>{`
        @keyframes float3d { /* ... */ }
        @keyframes floatLeaf { /* ... */ }
        @keyframes rotate3d { /* ... */ }
        @keyframes slideLight { /* ... */ }
        @keyframes fallLeaf { /* ... */ }
      `}</style>

      <MusicPlayer />
    </div>
  );
};

export default LeaderboardPage;
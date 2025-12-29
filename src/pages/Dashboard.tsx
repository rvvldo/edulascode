import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Search,
  User,
  Leaf,
  Trophy,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Play,
  Star,
  CheckCircle2,
  Lock,
  ArrowRight,
  History,
  MapPin
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimeData } from "@/hooks/useFirebase";
import { NotificationSidebar } from "@/components/NotificationSidebar";

// Static stories data with new thematic images
const stories = [
  {
    id: 1,
    title: "Petualangan di Hutan Kalimantan",
    description: "Bantu Raka menyelamatkan orangutan dari pembalakan liar",
    category: "Hutan",
    difficulty: "Mudah",
    points: 100,
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1000",
    color: "from-green-500/20 to-green-600/30",
  },
  {
    id: 2,
    title: "Misteri Terumbu Karang",
    description: "Jelajahi keindahan bawah laut Raja Ampat bersama Maya",
    category: "Laut",
    difficulty: "Sedang",
    points: 150,
    imageUrl: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=1000",
    color: "from-blue-500/20 to-cyan-500/30",
  },
  {
    id: 3,
    title: "Sang Pelindung Harimau",
    description: "Ikuti perjalanan Dimas melindungi harimau Sumatera",
    category: "Satwa",
    difficulty: "Sulit",
    points: 200,
    imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=1000",
    color: "from-orange-500/20 to-amber-500/30",
  },
  {
    id: 4,
    title: "Krisis Air Bersih",
    description: "Selamatkan desa dari kelangkaan air bersama Sari",
    category: "Air",
    difficulty: "Sedang",
    points: 150,
    imageUrl: "https://images.unsplash.com/photo-1538300342682-cf57afb9728b?auto=format&fit=crop&q=80&w=1000",
    color: "from-sky-500/20 to-blue-500/30",
  },
  {
    id: 5,
    title: "Pertempuran Sampah Plastik",
    description: "Bersihkan pantai dan edukasi masyarakat tentang daur ulang",
    category: "Polusi",
    difficulty: "Mudah",
    points: 100,
    imageUrl: "https://images.unsplash.com/photo-1618477461853-5f8dd3791983?auto=format&fit=crop&q=80&w=1000",
    color: "from-emerald-500/20 to-teal-500/30",
  },
  {
    id: 6,
    title: "Penyelamatan Komodo",
    description: "Lindungi habitat Komodo di Pulau Komodo",
    category: "Satwa",
    difficulty: "Sulit",
    points: 200,
    imageUrl: "https://images.unsplash.com/photo-1535083252457-6080fe29be45?auto=format&fit=crop&q=80&w=1000",
    color: "from-stone-500/20 to-amber-600/30",
  },
];

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { data: userData } = useRealtimeData(`users/${currentUser?.uid}`);
  const { data: allUsers } = useRealtimeData("users"); // Fetch all users for search
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchOpen, setSearchOpen] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState("");

  // Convert users object to array for search
  const userList = allUsers
    ? Object.entries(allUsers).map(([id, data]: [string, any]) => ({
      id,
      name: data.displayName || "User",
      email: data.email,
      institution: data.institution
    }))
    : [];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const filteredStories = stories.filter(story =>
  (story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Separation Logic
  const completedStoryIds = userData?.completedStories ? Object.keys(userData.completedStories).map(Number) : [];

  const activeStories = filteredStories.filter(story => !completedStoryIds.includes(story.id));
  const finishedStories = filteredStories.filter(story => completedStoryIds.includes(story.id));

  return (
    <div className="min-h-screen bg-background pb-20 font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-primary/10 transition-colors rounded-full">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-2 ring-background shadow-md overflow-hidden">
                    {userData?.photoURL ? (
                      <img 
                        src={userData.photoURL} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="font-medium hidden lg:block ml-1">{userData?.displayName || "Pengguna"}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground hidden lg:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-border/50">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData?.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer p-2">
                    <User className="w-4 h-4" />
                    Profil Saya
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile?tab=settings" className="flex items-center gap-2 cursor-pointer p-2">
                    <Settings className="w-4 h-4" />
                    Pengaturan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile?tab=help" className="flex items-center gap-2 cursor-pointer p-2">
                    <HelpCircle className="w-4 h-4" />
                    Bantuan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer p-2">
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Users */}
            <div className="flex-1 max-w-md mx-4 lg:mx-8 hidden md:block">
              <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={searchOpen}
                    className="w-full justify-between text-muted-foreground font-normal bg-secondary/30 border-transparent hover:bg-secondary/50 rounded-full h-11 px-4"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Cari pengguna lain...
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[450px] p-0 rounded-xl overflow-hidden shadow-2xl" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Ketik nama user..."
                      value={userSearchQuery}
                      onValueChange={setUserSearchQuery}
                      className="h-12 border-none focus:ring-0"
                    />
                    <CommandList>
                      {userSearchQuery.length > 0 && (
                        <>
                          <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">Tidak ditemukan.</CommandEmpty>
                          <CommandGroup heading="Pengguna">
                            {userList.map((user) => (
                              <CommandItem
                                key={user.id}
                                value={user.name}
                                onSelect={() => {
                                  navigate(`/user/${user.id}`);
                                  setSearchOpen(false);
                                }}
                                className="cursor-pointer py-3"
                              >
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                  <User className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium">{user.name}</span>
                                  <span className="text-xs text-muted-foreground">{user.institution || "Belum ada institusi"}</span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <Link to="/leaderboard">
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-yellow-500/10 hover:text-yellow-600 transition-colors relative" title="Leaderboard">
                  <Trophy className="w-5 h-5" />
                  {/* Notification dot example */}
                  <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full border-2 border-background"></span>
                </Button>
              </Link>

              <NotificationSidebar />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative mb-8 group overflow-hidden">
        <div className="absolute inset-0 h-[380px] bg-gradient-to-b from-primary/5 via-primary/5 to-background z-0"></div>

        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-400/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }}></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-16 pb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md text-primary text-sm font-bold tracking-wide mb-6 border border-white/60 shadow-sm animate-fade-in">
                <Leaf className="w-4 h-4" />
                <span>Platform Edukasi Lingkungan No. 1</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground drop-shadow-sm animate-slide-up">
                Jelajahi Dunia, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-600 to-teal-500">Selamatkan Bumi</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Pilih misi interaktif, hadapi tantangan nyata, dan kumpulkan poin kebaikan untuk masa depan yang lebih hijau.
              </p>

              {/* Search for mobile */}
              <div className="md:hidden relative max-w-sm mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Cari misi petualangan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 rounded-2xl shadow-lg border-border/60 bg-white/80 backdrop-blur-xl"
                />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="hidden md:block relative w-80 h-80 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-teal-400 rounded-full blur-[60px] opacity-20 animate-pulse-slow"></div>
              <div className="relative z-10 w-full h-full bg-[url('/lesta-mascot.png')] bg-contain bg-center bg-no-repeat animate-float">
                <div className="flex items-center justify-center w-full h-full text-9xl drop-shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-500 cursor-pointer transform hover:scale-105">
                  🌏
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 z-10 relative space-y-16">

        {/* ACTIVE STORIES SECTION */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold flex items-center gap-3">
              <span className="bg-primary text-white p-2.5 rounded-xl shadow-lg shadow-primary/30"><Play className="w-5 h-5 fill-current" /></span>
              Misi Tersedia
            </h2>

            <div className="hidden md:flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Cari konten..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-11 w-72 rounded-xl bg-card border-border shadow-sm focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </div>

          {activeStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeStories.map((story, index) => (
                <Link
                  key={story.id}
                  to={`/story/${story.id}`}
                  className="group relative flex flex-col h-[420px] rounded-[2.5rem] overflow-hidden shadow-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Full Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-500 group-hover:via-black/50"></div>
                  </div>

                  {/* Top Badge */}
                  <div className="relative z-10 p-6 flex justify-between items-start">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide uppercase">
                      {story.category}
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-white/90 shadow-sm border border-white/10">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold">{story.points} XP</span>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 mt-auto p-8 pb-10">
                    <h3 className="text-3xl font-display font-bold text-white mb-3 leading-tight drop-shadow-lg group-hover:text-primary-foreground transition-colors">
                      {story.title}
                    </h3>

                    <p className="text-white/80 text-sm line-clamp-2 leading-relaxed mb-6 font-light">
                      {story.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-white/60 uppercase tracking-widest font-semibold">Tingkat Kesulitan</span>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((star) => (
                            <div key={star} className={`h-1.5 w-6 rounded-full ${story.difficulty === 'Mudah' && star === 1 ? 'bg-green-400' :
                                story.difficulty === 'Sedang' && star <= 2 ? 'bg-amber-400' :
                                  story.difficulty === 'Sulit' ? 'bg-red-400' : 'bg-white/20'
                              }`}></div>
                          ))}
                        </div>
                        <span className={`text-xs font-medium mt-1 ${story.difficulty === 'Mudah' ? 'text-green-400' :
                            story.difficulty === 'Sedang' ? 'text-amber-400' : 'text-red-400'
                          }`}>{story.difficulty}</span>
                      </div>

                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 group-hover:rotate-90 transition-all duration-500 shadow-xl">
                        <Play className="w-6 h-6 text-white ml-1 fill-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-muted-foreground/20">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Semua Misi Selesai?</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">Kami sedang menyiapkan petualangan baru. Cek kembali nanti atau lihat riwayat misimu di bawah.</p>
            </div>
          )}
        </section>

        {/* COMPLETED STORIES SECTION */}
        {finishedStories.length > 0 && (
          <section className="pt-10 border-t border-border/60">
            <div className="flex items-center gap-4 mb-8 opacity-80">
              <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                <span className="bg-muted p-2 rounded-xl"><History className="w-5 h-5 text-muted-foreground" /></span>
                Riwayat Petualangan
              </h2>
              <span className="text-xs font-bold bg-muted px-2.5 py-1 rounded-full text-muted-foreground uppercase tracking-wide">{finishedStories.length} Selesai</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {finishedStories.map((story) => (
                <div
                  key={story.id}
                  className="relative group overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:shadow-lg"
                >
                  <div className="absolute inset-0">
                    <img src={story.imageUrl} className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity grayscale" />
                    <div className="absolute inset-0 bg-background/80 group-hover:bg-background/60 transition-colors"></div>
                  </div>

                  <div className="relative p-5 flex items-center gap-5">
                    <div className="w-16 h-16 rounded-xl bg-black/5 flex items-center justify-center border border-black/10 shrink-0">
                      <CheckCircle2 className="w-8 h-8 text-green-600/50 group-hover:text-green-600 transition-colors" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-foreground truncate text-lg">{story.title}</h3>
                        <Lock className="w-4 h-4 text-muted-foreground/50" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{story.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                          SELESAI
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                          <Star className="w-3 h-3 fill-yellow-400/50 text-yellow-400/50" />
                          {story.points} XP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default Dashboard;

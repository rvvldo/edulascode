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
  Star
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

// Mock data for stories
// Static stories data
const stories = [
  {
    id: 1,
    title: "Petualangan di Hutan Kalimantan",
    description: "Bantu Raka menyelamatkan orangutan dari pembalakan liar",
    category: "Hutan",
    difficulty: "Mudah",
    points: 100,
    image: "🌳",
    color: "from-green-500/20 to-green-600/30",
  },
  {
    id: 2,
    title: "Misteri Terumbu Karang",
    description: "Jelajahi keindahan bawah laut Raja Ampat bersama Maya",
    category: "Laut",
    difficulty: "Sedang",
    points: 150,
    image: "🐠",
    color: "from-blue-500/20 to-cyan-500/30",
  },
  {
    id: 3,
    title: "Sang Pelindung Harimau",
    description: "Ikuti perjalanan Dimas melindungi harimau Sumatera",
    category: "Satwa",
    difficulty: "Sulit",
    points: 200,
    image: "🐅",
    color: "from-orange-500/20 to-amber-500/30",
  },
  {
    id: 4,
    title: "Krisis Air Bersih",
    description: "Selamatkan desa dari kelangkaan air bersama Sari",
    category: "Air",
    difficulty: "Sedang",
    points: 150,
    image: "💧",
    color: "from-sky-500/20 to-blue-500/30",
  },
  {
    id: 5,
    title: "Pertempuran Sampah Plastik",
    description: "Bersihkan pantai dan edukasi masyarakat tentang daur ulang",
    category: "Polusi",
    difficulty: "Mudah",
    points: 100,
    image: "♻️",
    color: "from-emerald-500/20 to-teal-500/30",
  },
  {
    id: 6,
    title: "Penyelamatan Komodo",
    description: "Lindungi habitat Komodo di Pulau Komodo",
    category: "Satwa",
    difficulty: "Sulit",
    points: 200,
    image: "🦎",
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
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect shadow-elevated border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-primary/10 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center ring-2 ring-primary/20">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium hidden lg:block">{userData?.displayName || "Pengguna"}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    Profil Saya
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/profile?tab=settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Pengaturan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile?tab=help" className="flex items-center gap-2 cursor-pointer">
                    <HelpCircle className="w-4 h-4" />
                    Bantuan
                  </Link>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>


            {/* Search Users */}
            <div className="flex-1 max-w-md mx-4 lg:mx-8">
              <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={searchOpen}
                    className="w-full justify-between text-muted-foreground font-normal"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Cari pengguna lain...
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[450px] p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Ketik nama user..."
                      value={userSearchQuery}
                      onValueChange={setUserSearchQuery}
                    />
                    <CommandList>
                      {userSearchQuery.length > 0 && (
                        <>
                          <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                          <CommandGroup heading="Pengguna">
                            {userList.map((user) => (
                              <CommandItem
                                key={user.id}
                                value={user.name}
                                onSelect={() => {
                                  navigate(`/user/${user.id}`);
                                  setSearchOpen(false);
                                }}
                                className="cursor-pointer"
                              >
                                <User className="mr-2 h-4 w-4" />
                                <div className="flex flex-col">
                                  <span>{user.name}</span>
                                  <span className="text-xs text-muted-foreground">{user.institution}</span>
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
            <div className="flex items-center gap-3">
              {/* Leaderboard Button */}
              <Link to="/leaderboard">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors" title="Leaderboard">
                  <Trophy className="w-5 h-5 text-accent " />
                </Button>
              </Link>

              {/* Notifications */}
              <NotificationSidebar />


            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div
        className="relative h-56 md:h-72 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-forest-light to-leaf animate-gradient"
          style={{
            backgroundSize: '200% 200%',
            backgroundImage: 'linear-gradient(135deg, hsl(150 50% 25%) 0%, hsl(140 40% 35%) 30%, hsl(85 50% 45%) 70%, hsl(150 45% 40%) 100%)'
          }}>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-white rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground px-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">Platform Edukasi Lingkungan</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-3 drop-shadow-lg">
              Selamat Datang di EDULAD
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto drop-shadow-md">
              Pilih cerita dan mulai petualangan edukasimu!
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
            <Input
              placeholder="Cari judul konten atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-6 h-16 text-lg bg-card/60 backdrop-blur-sm shadow-soft border-border/50 rounded-2xl hover:shadow-card focus:shadow-elevated focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story, index) => (
            <Link
              key={story.id}
              to={`/story/${story.id}`}
              className="group block animate-fade-in"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-primary/30 glow-effect">
                {/* Card Image/Gradient */}
                <div className={`h-48 bg-gradient-to-br ${story.color} flex items-center justify-center relative overflow-hidden`}>
                  {/* Animated Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent group-hover:animate-shimmer"></div>
                  </div>

                  <span className="text-7xl relative z-10 transform group-hover:scale-110 transition-transform duration-500">{story.image}</span>

                  {/* Points Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 glass-effect rounded-full px-3 py-1.5 backdrop-blur-md shadow-soft">
                    <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                    <span className="text-sm font-semibold">{story.points}</span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 shadow-elevated">
                      <Play className="w-7 h-7 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold bg-primary/15 text-primary px-3 py-1 rounded-full border border-primary/20">
                      {story.category}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                      {story.difficulty}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {story.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

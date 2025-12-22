import { useState } from "react";
import { Link } from "react-router-dom";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for stories
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
  const [searchQuery, setSearchQuery] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground hidden sm:block">
                EDULAD
              </span>
            </Link>

            {/* Search Users */}
            <div className="flex-1 max-w-md mx-4 lg:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari pengguna lain..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-background"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium hidden lg:block">Pengguna</span>
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
                    <Link to="/leaderboard" className="flex items-center gap-2 cursor-pointer">
                      <Trophy className="w-4 h-4" />
                      Leaderboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Pengaturan
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <HelpCircle className="w-4 h-4" />
                    Bantuan
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/" className="flex items-center gap-2 cursor-pointer text-destructive">
                      <LogOut className="w-4 h-4" />
                      Keluar
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div 
        className="relative h-48 md:h-64 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(150 50% 25%) 0%, hsl(140 40% 35%) 50%, hsl(85 50% 45%) 100%)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Selamat Datang di EDULAD
            </h1>
            <p className="text-primary-foreground/80">
              Pilih cerita dan mulai petualangan edukasimu!
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari judul konten atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-card shadow-soft border-border/50"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
            <Link
              key={story.id}
              to={`/story/${story.id}`}
              className="group block"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50">
                {/* Card Image/Gradient */}
                <div className={`h-40 bg-gradient-to-br ${story.color} flex items-center justify-center relative`}>
                  <span className="text-6xl">{story.image}</span>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-accent fill-accent" />
                    <span className="text-xs font-medium">{story.points}</span>
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-elevated">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {story.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {story.difficulty}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
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

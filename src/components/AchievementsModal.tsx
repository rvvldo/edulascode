import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ACHIEVEMENTS, getRarityColor, getRarityLabel, getRarityTextColor, Achievement } from '@/data/achievements';
import { useAchievements } from '@/hooks/useAchievements';
import { Lock, Check, Star, Trophy, Target, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface AchievementsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AchievementsModal({ open, onOpenChange }: AchievementsModalProps) {
  const { isUnlocked, displayedAchievements, setDisplayedAchievementsOnProfile } = useAchievements();
  const [selectedForDisplay, setSelectedForDisplay] = useState<string[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  // Sync selectedForDisplay with displayedAchievements when modal opens
  useEffect(() => {
    if (open) {
      setSelectedForDisplay(displayedAchievements);
    }
  }, [open, displayedAchievements]);

  const handleToggleDisplay = (achievementId: string) => {
    if (!isUnlocked(achievementId)) return;

    setSelectedForDisplay(prev => {
      if (prev.includes(achievementId)) {
        // Remove from selection
        return prev.filter(id => id !== achievementId);
      } else {
        if (prev.length >= 3) {
          // Already have 3, replace the first one
          return [...prev.slice(1), achievementId];
        }
        // Add to selection
        return [...prev, achievementId];
      }
    });
  };

  const handleSaveDisplayed = async () => {
    const success = await setDisplayedAchievementsOnProfile(selectedForDisplay);
    if (success) {
      const count = selectedForDisplay.length;
      const lambangText = count === 1 ? 'lambang' : 'lambang';
      toast({
        title: "✅ Berhasil!",
        description: `${count} ${lambangText} pencapaian telah ditampilkan di profilmu.`,
      });
      onOpenChange(false);
    } else {
      toast({
        title: "❌ Gagal",
        description: "Terjadi kesalahan saat menyimpan pilihan. Coba lagi.",
        variant: "destructive"
      });
    }
  };

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'starter':
        return <Star className="w-4 h-4" />;
      case 'story':
        return <Target className="w-4 h-4" />;
      case 'leaderboard':
        return <Trophy className="w-4 h-4" />;
      case 'social':
        return <Users className="w-4 h-4" />;
      case 'master':
        return <Zap className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: Achievement['category']) => {
    switch (category) {
      case 'starter':
        return 'Pemula';
      case 'story':
        return 'Petualangan';
      case 'leaderboard':
        return 'Kompetisi';
      case 'social':
        return 'Sosial';
      case 'master':
        return 'Master';
    }
  };

  const filterAchievements = (achievements: Achievement[]) => {
    if (activeTab === 'all') return achievements;
    if (activeTab === 'unlocked') return achievements.filter(a => isUnlocked(a.id));
    if (activeTab === 'locked') return achievements.filter(a => !isUnlocked(a.id));
    return achievements.filter(a => a.category === activeTab);
  };

  const filteredAchievements = filterAchievements(ACHIEVEMENTS);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-display flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            Lambang Pencapaian
          </DialogTitle>
          <DialogDescription className="space-y-2">
            <p>Kumpulkan semua lambang dengan menyelesaikan misi dan tantangan.</p>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary">
                <Star className="w-4 h-4" />
                <span className="font-medium">Klik ikon bintang untuk memilih (1-3 lambang)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted">
                <Check className="w-4 h-4 text-primary" />
                <span className="font-medium">= Terpilih</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
          <TabsList className="grid w-full grid-cols-7 mb-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="unlocked">Terbuka</TabsTrigger>
            <TabsTrigger value="locked">Terkunci</TabsTrigger>
            <TabsTrigger value="starter">Pemula</TabsTrigger>
            <TabsTrigger value="story">Story</TabsTrigger>
            <TabsTrigger value="leaderboard">Rank</TabsTrigger>
            <TabsTrigger value="social">Sosial</TabsTrigger>
          </TabsList>
        </Tabs>

        <ScrollArea className="h-[500px] px-6 ">
          <div className="grid grid-cols-3 gap-4 pb-6">
            {filteredAchievements.map((achievement) => {
              const unlocked = isUnlocked(achievement.id);
              const isDisplayed = selectedForDisplay.includes(achievement.id);

              return (
                <button
                  key={achievement.id}
                  onClick={() => setSelectedAchievement(achievement)}
                  className={cn(
                    "relative p-4 rounded-2xl border-2 transition-all duration-300 text-left group",
                    unlocked
                      ? "border-border hover:border-primary/50 hover:shadow-lg bg-card"
                      : "border-border/50 bg-muted/30 opacity-60 hover:opacity-80",
                    isDisplayed && "ring-2 ring-primary ring-offset-2"
                  )}
                >
                  {/* Badge Icon */}
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-3 mx-auto transition-transform group-hover:scale-110",
                    unlocked
                      ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} shadow-lg`
                      : "bg-muted"
                  )}>
                    {unlocked ? achievement.icon : <Lock className="w-8 h-8 text-muted-foreground" />}
                  </div>

                  {/* Badge Info */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={cn(
                        "font-bold text-sm line-clamp-1",
                        unlocked ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {achievement.name}
                      </h3>
                      {unlocked && isDisplayed && (
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {achievement.description}
                    </p>

                    <div className="flex items-center gap-2 pt-2">
                      <Badge variant="outline" className={cn("text-[10px] px-2 py-0", getRarityTextColor(achievement.rarity))}>
                        {getRarityLabel(achievement.rarity)}
                      </Badge>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        {getCategoryIcon(achievement.category)}
                        <span className="text-[10px]">{getCategoryLabel(achievement.category)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Display Toggle for Unlocked */}
                  {unlocked && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleDisplay(achievement.id);
                      }}
                      className={cn(
                        "absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                        isDisplayed
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted-foreground/20"
                      )}
                    >
                      {isDisplayed ? <Check className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                    </button>
                  )}
                </button>
              );
            })}
          </div>
        </ScrollArea>

        {/* Selected Achievement Detail */}
        {selectedAchievement && (
          <div className="border-t border-border p-6 bg-muted/30">
            <div className="flex items-start gap-4">
              <div className={cn(
                "w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shrink-0",
                isUnlocked(selectedAchievement.id)
                  ? `bg-gradient-to-br ${getRarityColor(selectedAchievement.rarity)} shadow-lg`
                  : "bg-muted"
              )}>
                {isUnlocked(selectedAchievement.id) ? selectedAchievement.icon : <Lock className="w-10 h-10 text-muted-foreground" />}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{selectedAchievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedAchievement.description}</p>
                  </div>
                  <Badge className={getRarityTextColor(selectedAchievement.rarity)}>
                    {getRarityLabel(selectedAchievement.rarity)}
                  </Badge>
                </div>
                
                <div className="mt-3 p-3 rounded-lg bg-background/50 border border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Persyaratan:</p>
                  <p className="text-sm">{selectedAchievement.requirement.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="border-t border-border p-6 flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="text-sm">
              <span className="text-muted-foreground">Dipilih: </span>
              <span className={cn(
                "font-bold text-lg",
                selectedForDisplay.length > 0 ? "text-primary" : "text-foreground"
              )}>
                {selectedForDisplay.length}
              </span>
              <span className="text-muted-foreground ml-1">dari maksimal 3 lambang</span>
            </div>
            {selectedForDisplay.length === 3 && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Check className="w-3 h-3" />
                <span>Maksimal tercapai</span>
              </div>
            )}
            {selectedForDisplay.length > 0 && selectedForDisplay.length < 3 && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium">
                <Star className="w-3 h-3" />
                <span>Bisa tambah {3 - selectedForDisplay.length} lagi</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button 
              onClick={handleSaveDisplayed} 
              disabled={selectedForDisplay.length === 0}
              className={cn(
                selectedForDisplay.length > 0 && "shadow-lg"
              )}
            >
              <Check className="w-4 h-4 mr-2" />
              Simpan {selectedForDisplay.length > 0 ? `(${selectedForDisplay.length})` : 'Pilihan'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

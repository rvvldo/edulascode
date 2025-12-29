import { Trophy, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRarityColor } from '@/data/achievements';
import { useAchievements } from '@/hooks/useAchievements';

interface AchievementDisplayProps {
  onClick?: () => void;
  className?: string;
}

export function AchievementDisplay({ onClick, className }: AchievementDisplayProps) {
  const { getDisplayedAchievementsWithDetails, unlockedCount, totalAchievements, loading } = useAchievements();
  const displayedAchievements = getDisplayedAchievementsWithDetails();

  // Debug log
  console.log('AchievementDisplay - displayedAchievements:', displayedAchievements);
  console.log('AchievementDisplay - loading:', loading);

  // Fill empty slots
  const slots = [...displayedAchievements];
  while (slots.length < 3) {
    slots.push(null);
  }

  if (loading) {
    return (
      <div className={cn(
        "w-full p-4 rounded-xl border-2 border-border bg-card",
        className
      )}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-base">Pencapaian</h3>
            <p className="text-xs text-muted-foreground">Loading...</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300 bg-card hover:shadow-lg group",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-base">Pencapaian</h3>
            <p className="text-xs text-muted-foreground">
              {unlockedCount}/{totalAchievements} terbuka
            </p>
          </div>
        </div>
        <div className="text-xs text-primary font-medium group-hover:translate-x-1 transition-transform">
          Lihat Semua →
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="grid grid-cols-3 gap-2">
        {slots.map((achievement, index) => (
          <div
            key={achievement?.id || `empty-${index}`}
            className={cn(
              "aspect-square rounded-lg flex flex-col items-center justify-center p-2 transition-all",
              achievement
                ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} shadow-md group-hover:scale-105`
                : "bg-muted border-2 border-dashed border-border"
            )}
          >
            {achievement ? (
              <>
                <div className="text-5xl mb-2">{achievement.icon}</div>
                <p className="text-xl font-bold text-white text-center line-clamp-1 leading-tight">
                  {achievement.name}
                </p>
              </>
            ) : (
              <Lock className="w-5 h-5 text-muted-foreground/50" />
            )}
          </div>
        ))}
      </div>

      {displayedAchievements.length === 0 && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          Klik untuk memilih lambang yang ingin ditampilkan
        </p>
      )}
    </button>
  );
}

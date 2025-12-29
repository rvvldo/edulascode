import { useEffect, useState } from 'react';
import { ref, get, set, update } from 'firebase/database';
import { database } from '@/lib/firebase.config';
import { ACHIEVEMENTS, Achievement } from '@/data/achievements';
import { useAuth } from '@/contexts/AuthContext';

export interface UserAchievement {
  id: string;
  unlockedAt: number; // timestamp
  displayOnProfile?: boolean;
}

export interface AchievementProgress {
  storiesCompleted: number;
  totalPoints: number;
  leaderboardRank: number | null;
  storiesPerfect: number;
  loginStreak: number;
}

export const useAchievements = () => {
  const { currentUser } = useAuth();
  const [unlockedAchievements, setUnlockedAchievements] = useState<UserAchievement[]>([]);
  const [displayedAchievements, setDisplayedAchievements] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user achievements from Firebase
  useEffect(() => {
    if (!currentUser) return;

    const loadAchievements = async () => {
      try {
        const achievementsRef = ref(database, `users/${currentUser.uid}/achievements`);
        const snapshot = await get(achievementsRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          const unlocked: UserAchievement[] = Object.values(data.unlocked || {});
          const displayed: string[] = data.displayed || [];
          
          setUnlockedAchievements(unlocked);
          setDisplayedAchievements(displayed);
        } else {
          // First time - unlock "Pendatang Baru"
          await unlockAchievement('newcomer');
        }
      } catch (error) {
        console.error('Error loading achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, [currentUser]);

  // Check if achievement is unlocked
  const isUnlocked = (achievementId: string): boolean => {
    return unlockedAchievements.some(a => a.id === achievementId);
  };

  // Unlock achievement
  const unlockAchievement = async (achievementId: string): Promise<boolean> => {
    if (!currentUser) return false;
    if (isUnlocked(achievementId)) return false;

    try {
      const newAchievement: UserAchievement = {
        id: achievementId,
        unlockedAt: Date.now()
      };

      const achievementsRef = ref(database, `users/${currentUser.uid}/achievements/unlocked/${achievementId}`);
      await set(achievementsRef, newAchievement);

      setUnlockedAchievements(prev => [...prev, newAchievement]);
      
      return true;
    } catch (error) {
      console.error('Error unlocking achievement:', error);
      return false;
    }
  };

  // Check and unlock achievements based on progress
  const checkAchievements = async (progress: AchievementProgress) => {
    const newUnlocks: string[] = [];

    for (const achievement of ACHIEVEMENTS) {
      if (isUnlocked(achievement.id)) continue;
      if (achievement.unlockedByDefault) continue;

      let shouldUnlock = false;

      switch (achievement.requirement.type) {
        case 'stories_completed':
          shouldUnlock = progress.storiesCompleted >= (achievement.requirement.value || 0);
          break;
        case 'total_points':
          shouldUnlock = progress.totalPoints >= (achievement.requirement.value || 0);
          break;
        case 'leaderboard_rank':
          if (progress.leaderboardRank !== null) {
            shouldUnlock = progress.leaderboardRank <= (achievement.requirement.value || 999999);
          }
          break;
        case 'stories_perfect':
          shouldUnlock = progress.storiesPerfect >= (achievement.requirement.value || 0);
          break;
        case 'login_streak':
          shouldUnlock = progress.loginStreak >= (achievement.requirement.value || 0);
          break;
      }

      if (shouldUnlock) {
        const unlocked = await unlockAchievement(achievement.id);
        if (unlocked) {
          newUnlocks.push(achievement.id);
        }
      }
    }

    // Check master achievement (Eco Warrior)
    if (!isUnlocked('eco_warrior')) {
      const allOtherAchievements = ACHIEVEMENTS.filter(a => a.id !== 'eco_warrior');
      const allUnlocked = allOtherAchievements.every(a => isUnlocked(a.id));
      
      if (allUnlocked) {
        await unlockAchievement('eco_warrior');
        newUnlocks.push('eco_warrior');
      }
    }

    return newUnlocks;
  };

  // Set displayed achievements (max 3)
  const setDisplayedAchievementsOnProfile = async (achievementIds: string[]) => {
    if (!currentUser) return false;
    if (achievementIds.length > 3) return false;

    // Verify all achievements are unlocked
    const allUnlocked = achievementIds.every(id => isUnlocked(id));
    if (!allUnlocked) return false;

    try {
      const displayedRef = ref(database, `users/${currentUser.uid}/achievements/displayed`);
      await set(displayedRef, achievementIds);
      setDisplayedAchievements(achievementIds);
      return true;
    } catch (error) {
      console.error('Error setting displayed achievements:', error);
      return false;
    }
  };

  // Get achievement details
  const getAchievementDetails = (achievementId: string): Achievement | undefined => {
    return ACHIEVEMENTS.find(a => a.id === achievementId);
  };

  // Get unlocked achievements with details
  const getUnlockedAchievementsWithDetails = () => {
    return unlockedAchievements
      .map(ua => {
        const details = getAchievementDetails(ua.id);
        return details ? { ...ua, ...details } : null;
      })
      .filter(Boolean) as (UserAchievement & Achievement)[];
  };

  // Get displayed achievements with details
  const getDisplayedAchievementsWithDetails = () => {
    return displayedAchievements
      .map(id => {
        const achievement = getAchievementDetails(id);
        const userAchievement = unlockedAchievements.find(ua => ua.id === id);
        return achievement && userAchievement ? { ...userAchievement, ...achievement } : null;
      })
      .filter(Boolean) as (UserAchievement & Achievement)[];
  };

  return {
    unlockedAchievements,
    displayedAchievements,
    loading,
    isUnlocked,
    unlockAchievement,
    checkAchievements,
    setDisplayedAchievementsOnProfile,
    getAchievementDetails,
    getUnlockedAchievementsWithDetails,
    getDisplayedAchievementsWithDetails,
    totalAchievements: ACHIEVEMENTS.length,
    unlockedCount: unlockedAchievements.length
  };
};

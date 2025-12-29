// Achievement Types & Data

export type AchievementCategory = 'starter' | 'story' | 'leaderboard' | 'social' | 'master';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji or icon name
  category: AchievementCategory;
  requirement: {
    type: 'auto' | 'stories_completed' | 'total_points' | 'leaderboard_rank' | 'stories_perfect' | 'login_streak';
    value?: number;
    description: string;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedByDefault?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  // STARTER ACHIEVEMENTS
  {
    id: 'newcomer',
    name: 'Pendatang Baru',
    description: 'Selamat datang di EDULAD! Perjalananmu dimulai dari sini.',
    icon: '🌱',
    category: 'starter',
    requirement: {
      type: 'auto',
      description: 'Otomatis didapat saat pertama kali login'
    },
    rarity: 'common',
    unlockedByDefault: true
  },
  {
    id: 'first_step',
    name: 'Langkah Pertama',
    description: 'Menyelesaikan misi pertamamu',
    icon: '👣',
    category: 'story',
    requirement: {
      type: 'stories_completed',
      value: 1,
      description: 'Selesaikan 1 misi story'
    },
    rarity: 'common'
  },
  {
    id: 'explorer',
    name: 'Penjelajah',
    description: 'Telah menjelajahi 3 misi berbeda',
    icon: '🗺️',
    category: 'story',
    requirement: {
      type: 'stories_completed',
      value: 3,
      description: 'Selesaikan 3 misi story'
    },
    rarity: 'common'
  },

  // STORY ACHIEVEMENTS
  {
    id: 'story_master',
    name: 'Master Petualang',
    description: 'Menyelesaikan semua misi yang tersedia',
    icon: '🏆',
    category: 'story',
    requirement: {
      type: 'stories_completed',
      value: 6,
      description: 'Selesaikan semua 6 misi story'
    },
    rarity: 'epic'
  },
  {
    id: 'perfectionist',
    name: 'Perfeksionis',
    description: 'Menyelesaikan 3 misi dengan skor sempurna',
    icon: '⭐',
    category: 'story',
    requirement: {
      type: 'stories_perfect',
      value: 3,
      description: 'Selesaikan 3 misi dengan skor 100%'
    },
    rarity: 'rare'
  },

  // POINTS ACHIEVEMENTS
  {
    id: 'point_collector',
    name: 'Pengumpul Poin',
    description: 'Mengumpulkan 500 XP',
    icon: '💎',
    category: 'story',
    requirement: {
      type: 'total_points',
      value: 500,
      description: 'Kumpulkan total 500 XP'
    },
    rarity: 'common'
  },
  {
    id: 'point_master',
    name: 'Master Poin',
    description: 'Mengumpulkan 1000 XP',
    icon: '💰',
    category: 'story',
    requirement: {
      type: 'total_points',
      value: 1000,
      description: 'Kumpulkan total 1000 XP'
    },
    rarity: 'rare'
  },
  {
    id: 'point_legend',
    name: 'Legenda Poin',
    description: 'Mengumpulkan 2000 XP',
    icon: '👑',
    category: 'story',
    requirement: {
      type: 'total_points',
      value: 2000,
      description: 'Kumpulkan total 2000 XP'
    },
    rarity: 'epic'
  },

  // LEADERBOARD ACHIEVEMENTS
  {
    id: 'top_100',
    name: 'Top 100',
    description: 'Masuk ke 100 besar leaderboard',
    icon: '🥉',
    category: 'leaderboard',
    requirement: {
      type: 'leaderboard_rank',
      value: 100,
      description: 'Capai ranking 100 atau lebih tinggi'
    },
    rarity: 'common'
  },
  {
    id: 'top_50',
    name: 'Top 50',
    description: 'Masuk ke 50 besar leaderboard',
    icon: '🥈',
    category: 'leaderboard',
    requirement: {
      type: 'leaderboard_rank',
      value: 50,
      description: 'Capai ranking 50 atau lebih tinggi'
    },
    rarity: 'rare'
  },
  {
    id: 'top_10',
    name: 'Top 10',
    description: 'Masuk ke 10 besar leaderboard',
    icon: '🥇',
    category: 'leaderboard',
    requirement: {
      type: 'leaderboard_rank',
      value: 10,
      description: 'Capai ranking 10 atau lebih tinggi'
    },
    rarity: 'epic'
  },
  {
    id: 'champion',
    name: 'Juara',
    description: 'Menjadi #1 di leaderboard',
    icon: '🏅',
    category: 'leaderboard',
    requirement: {
      type: 'leaderboard_rank',
      value: 1,
      description: 'Capai ranking #1 di leaderboard'
    },
    rarity: 'legendary'
  },

  // SOCIAL ACHIEVEMENTS
  {
    id: 'consistent',
    name: 'Konsisten',
    description: 'Login 7 hari berturut-turut',
    icon: '🔥',
    category: 'social',
    requirement: {
      type: 'login_streak',
      value: 7,
      description: 'Login selama 7 hari berturut-turut'
    },
    rarity: 'rare'
  },
  {
    id: 'dedicated',
    name: 'Dedikasi Tinggi',
    description: 'Login 30 hari berturut-turut',
    icon: '⚡',
    category: 'social',
    requirement: {
      type: 'login_streak',
      value: 30,
      description: 'Login selama 30 hari berturut-turut'
    },
    rarity: 'epic'
  },

  // MASTER ACHIEVEMENT
  {
    id: 'eco_warrior',
    name: 'Pejuang Lingkungan',
    description: 'Menyelesaikan semua pencapaian lainnya',
    icon: '🌍',
    category: 'master',
    requirement: {
      type: 'auto',
      description: 'Buka semua 14 pencapaian lainnya'
    },
    rarity: 'legendary'
  }
];

// Helper function to get rarity color
export const getRarityColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common':
      return 'from-gray-400 to-gray-500';
    case 'rare':
      return 'from-blue-400 to-blue-600';
    case 'epic':
      return 'from-purple-400 to-purple-600';
    case 'legendary':
      return 'from-yellow-400 to-orange-500';
    default:
      return 'from-gray-400 to-gray-500';
  }
};

// Helper function to get rarity text color
export const getRarityTextColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common':
      return 'text-gray-600 dark:text-gray-400';
    case 'rare':
      return 'text-blue-600 dark:text-blue-400';
    case 'epic':
      return 'text-purple-600 dark:text-purple-400';
    case 'legendary':
      return 'text-yellow-600 dark:text-yellow-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
};

// Helper function to get rarity label
export const getRarityLabel = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common':
      return 'Umum';
    case 'rare':
      return 'Langka';
    case 'epic':
      return 'Epik';
    case 'legendary':
      return 'Legendaris';
    default:
      return 'Umum';
  }
};

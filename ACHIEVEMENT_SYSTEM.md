# 🏆 Sistem Lambang Pencapaian (Achievement System)

## Overview

Sistem gamifikasi lengkap dengan 15 lambang pencapaian yang dapat dibuka berdasarkan progress user dalam menyelesaikan misi, mengumpulkan poin, dan mencapai ranking di leaderboard.

---

## ✨ Fitur Utama

### 1. **15 Lambang Pencapaian**
- **Pendatang Baru** 🌱 - Otomatis didapat saat pertama login
- **14 Lambang Lainnya** - Terkunci dan memerlukan syarat tertentu

### 2. **Kategori Achievement**
- 🌱 **Starter** - Achievement untuk pemula
- 🎯 **Story** - Berdasarkan penyelesaian misi
- 🏆 **Leaderboard** - Berdasarkan ranking
- 👥 **Social** - Berdasarkan aktivitas login
- ⚡ **Master** - Achievement ultimate

### 3. **Rarity System**
- **Common** (Umum) - Abu-abu
- **Rare** (Langka) - Biru
- **Epic** (Epik) - Ungu
- **Legendary** (Legendaris) - Emas

### 4. **Display System**
- User dapat memilih **maksimal 3 lambang** untuk ditampilkan di profil
- Lambang yang terkunci menampilkan ikon gembok
- Klik lambang untuk melihat persyaratan unlock

---

## 📋 Daftar 15 Lambang Pencapaian

### Starter (1)
1. **🌱 Pendatang Baru** (Common)
   - Otomatis didapat saat pertama kali login
   - Tidak perlu syarat

### Story Achievements (4)
2. **👣 Langkah Pertama** (Common)
   - Selesaikan 1 misi story

3. **🗺️ Penjelajah** (Common)
   - Selesaikan 3 misi story

4. **🏆 Master Petualang** (Epic)
   - Selesaikan semua 6 misi story

5. **⭐ Perfeksionis** (Rare)
   - Selesaikan 3 misi dengan skor 100%

### Points Achievements (3)
6. **💎 Pengumpul Poin** (Common)
   - Kumpulkan total 500 XP

7. **💰 Master Poin** (Rare)
   - Kumpulkan total 1000 XP

8. **👑 Legenda Poin** (Epic)
   - Kumpulkan total 2000 XP

### Leaderboard Achievements (4)
9. **🥉 Top 100** (Common)
   - Capai ranking 100 atau lebih tinggi

10. **🥈 Top 50** (Rare)
    - Capai ranking 50 atau lebih tinggi

11. **🥇 Top 10** (Epic)
    - Capai ranking 10 atau lebih tinggi

12. **🏅 Juara** (Legendary)
    - Capai ranking #1 di leaderboard

### Social Achievements (2)
13. **🔥 Konsisten** (Rare)
    - Login selama 7 hari berturut-turut

14. **⚡ Dedikasi Tinggi** (Epic)
    - Login selama 30 hari berturut-turut

### Master Achievement (1)
15. **🌍 Pejuang Lingkungan** (Legendary)
    - Buka semua 14 pencapaian lainnya

---

## 🏗️ Struktur File

### 1. **Data Layer**
```
src/data/achievements.ts
```
- Definisi semua 15 achievements
- Helper functions untuk rarity colors & labels
- Type definitions

### 2. **Logic Layer**
```
src/hooks/useAchievements.tsx
```
- Custom hook untuk manage achievements
- Auto-check & unlock logic
- Firebase integration
- Display management (max 3)

### 3. **UI Components**
```
src/components/AchievementsModal.tsx
```
- Modal popup dengan grid 15 lambang
- Filter by category & status
- Detail view untuk setiap achievement
- Selection system untuk display

```
src/components/AchievementDisplay.tsx
```
- Compact display untuk profile page
- Menampilkan 3 lambang terpilih
- Progress indicator (X/15 terbuka)
- Click to open modal

### 4. **Integration**
```
src/pages/ProfilePage.tsx
```
- Integrated achievement system
- Auto-check achievements on data load
- Modal trigger

---

## 🔄 Cara Kerja System

### 1. **First Login**
```typescript
// Otomatis unlock "Pendatang Baru"
if (!hasAchievements) {
  unlockAchievement('newcomer');
}
```

### 2. **Auto-Check Achievements**
```typescript
// Setiap kali userData berubah
useEffect(() => {
  checkAchievements({
    storiesCompleted: 3,
    totalPoints: 500,
    leaderboardRank: 50,
    storiesPerfect: 1,
    loginStreak: 7
  });
}, [userData]);
```

### 3. **Unlock Logic**
```typescript
// Check setiap achievement
for (const achievement of ACHIEVEMENTS) {
  if (meetsRequirement(achievement, progress)) {
    unlockAchievement(achievement.id);
  }
}
```

### 4. **Display Selection**
```typescript
// User pilih max 3 untuk display
setDisplayedAchievementsOnProfile(['newcomer', 'first_step', 'explorer']);
```

---

## 💾 Firebase Data Structure

### User Achievements Data
```json
{
  "users": {
    "userId": {
      "achievements": {
        "unlocked": {
          "newcomer": {
            "id": "newcomer",
            "unlockedAt": 1703001234567
          },
          "first_step": {
            "id": "first_step",
            "unlockedAt": 1703002345678
          }
        },
        "displayed": ["newcomer", "first_step", "explorer"]
      },
      "completedStories": { ... },
      "totalPoints": 500,
      "leaderboardRank": 50,
      "storiesPerfect": 1,
      "loginStreak": 7
    }
  }
}
```

---

## 🎮 User Flow

### Melihat Achievements
1. User buka Profile Page
2. Lihat section "Pencapaian" dengan 3 lambang terpilih
3. Klik section untuk buka modal

### Memilih Display Achievements
1. Modal terbuka dengan grid 15 lambang
2. Lambang terbuka berwarna, terkunci abu-abu
3. Klik lambang terbuka untuk toggle selection
4. Max 3 lambang bisa dipilih
5. Klik "Simpan Pilihan"

### Melihat Persyaratan
1. Klik lambang terkunci
2. Detail muncul di bawah grid
3. Lihat persyaratan untuk unlock

### Filter Achievements
1. Tab "Semua" - Tampilkan semua 15
2. Tab "Terbuka" - Hanya yang sudah unlock
3. Tab "Terkunci" - Hanya yang masih locked
4. Tab kategori - Filter by category

---

## 🔧 Customization

### Menambah Achievement Baru

**1. Edit `src/data/achievements.ts`:**
```typescript
{
  id: 'new_achievement',
  name: 'Achievement Baru',
  description: 'Deskripsi achievement',
  icon: '🎉',
  category: 'story',
  requirement: {
    type: 'stories_completed',
    value: 10,
    description: 'Selesaikan 10 misi'
  },
  rarity: 'epic'
}
```

**2. Update Logic di `useAchievements.tsx`:**
```typescript
// Jika perlu requirement type baru
case 'new_requirement_type':
  shouldUnlock = checkNewRequirement(progress);
  break;
```

### Mengubah Warna Rarity

**Edit `src/data/achievements.ts`:**
```typescript
export const getRarityColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'legendary':
      return 'from-red-400 to-pink-500'; // Ganti warna
  }
};
```

### Mengubah Max Display

**Edit `src/hooks/useAchievements.tsx`:**
```typescript
// Ganti dari 3 ke angka lain
if (achievementIds.length > 5) return false; // Max 5
```

**Edit `src/components/AchievementDisplay.tsx`:**
```typescript
// Update slots
while (slots.length < 5) { // Max 5
  slots.push(null);
}
```

---

## 🧪 Testing

### Test Unlock Achievement
```typescript
// Di browser console
const { unlockAchievement } = useAchievements();
await unlockAchievement('first_step');
```

### Test Check Achievements
```typescript
const { checkAchievements } = useAchievements();
await checkAchievements({
  storiesCompleted: 6,
  totalPoints: 2000,
  leaderboardRank: 1,
  storiesPerfect: 3,
  loginStreak: 30
});
```

### Simulate Progress
```typescript
// Update user data di Firebase
await updateData(`users/${userId}`, {
  completedStories: { 1: true, 2: true, 3: true },
  totalPoints: 500,
  leaderboardRank: 50
});
```

---

## 📱 UI/UX Features

### Visual Feedback
- ✅ Hover effects pada lambang
- ✅ Scale animation saat hover
- ✅ Gradient backgrounds berdasarkan rarity
- ✅ Lock icon untuk lambang terkunci
- ✅ Check icon untuk lambang terpilih

### Responsive Design
- ✅ Grid 3 kolom di desktop
- ✅ Grid 2 kolom di tablet
- ✅ Grid 1 kolom di mobile
- ✅ Modal full-screen di mobile

### Accessibility
- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ Clear visual hierarchy
- ✅ Color contrast compliant

---

## 🚀 Deployment

Sistem achievement sudah terintegrasi penuh dan siap deploy:

```bash
# Build
npm run build

# Deploy ke Vercel
git add .
git commit -m "Add: Achievement system with 15 badges"
git push origin main
```

---

## 📊 Analytics Ideas

### Track Achievement Unlocks
```typescript
// Log saat achievement unlock
analytics.logEvent('achievement_unlocked', {
  achievement_id: 'first_step',
  user_id: currentUser.uid,
  timestamp: Date.now()
});
```

### Track Display Changes
```typescript
// Log saat user ganti display
analytics.logEvent('achievement_display_changed', {
  displayed: ['newcomer', 'first_step', 'explorer'],
  user_id: currentUser.uid
});
```

---

## 🎯 Future Enhancements

### Possible Additions:
1. **Notification** saat unlock achievement baru
2. **Animation** saat unlock (confetti, sparkles)
3. **Share** achievement ke social media
4. **Leaderboard** berdasarkan total achievements
5. **Seasonal** achievements (limited time)
6. **Secret** achievements (hidden requirements)
7. **Achievement Points** system
8. **Badges** untuk profile picture frame

---

## 🐛 Troubleshooting

### Achievement Tidak Unlock
**Problem:** Achievement tidak unlock meskipun syarat terpenuhi

**Solution:**
1. Check Firebase data structure
2. Verify `checkAchievements` dipanggil
3. Check console untuk errors
4. Verify requirement logic

### Display Tidak Tersimpan
**Problem:** Pilihan display tidak tersimpan

**Solution:**
1. Check Firebase permissions
2. Verify `setDisplayedAchievementsOnProfile` dipanggil
3. Check network tab untuk Firebase calls
4. Verify user authenticated

### Modal Tidak Muncul
**Problem:** Modal tidak terbuka saat klik

**Solution:**
1. Check `achievementsModalOpen` state
2. Verify `setAchievementsModalOpen` dipanggil
3. Check Dialog component import
4. Check z-index conflicts

---

## ✅ Checklist Implementation

- [x] Data structure (15 achievements)
- [x] Achievement types & categories
- [x] Rarity system
- [x] Auto-unlock logic
- [x] Firebase integration
- [x] Display selection (max 3)
- [x] Modal UI dengan grid
- [x] Filter & tabs
- [x] Detail view
- [x] Profile integration
- [x] Responsive design
- [x] Build test passed

---

**Status: ✅ COMPLETE & READY TO USE**

Sistem achievement sudah lengkap dan siap digunakan! User dapat mulai mengumpulkan lambang pencapaian dengan menyelesaikan misi dan tantangan.

🎉 **Selamat bermain dan kumpulkan semua 15 lambang!**

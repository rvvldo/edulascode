# 🔧 Troubleshooting - Lambang Tidak Muncul di Profil

## ❓ Masalah: Lambang yang sudah dipilih tidak muncul di Profile Page

### Kemungkinan Penyebab & Solusi:

---

## 1. Data Belum Tersimpan ke Firebase

### Gejala:
- Sudah klik "Simpan (X)" di modal
- Toast notification muncul "Berhasil"
- Tapi lambang tidak muncul di profil

### Solusi:

#### A. Check Browser Console
1. Buka browser (Chrome/Firefox)
2. Tekan `F12` untuk buka Developer Tools
3. Go to **Console** tab
4. Cari log:
   ```
   AchievementDisplay - displayedAchievements: [...]
   AchievementDisplay - loading: false
   ```

#### B. Check Firebase Database
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project: `edulad-3b03a`
3. Go to **Realtime Database**
4. Navigate ke: `users/{userId}/achievements/`
5. Check struktur data:
   ```json
   {
     "unlocked": {
       "newcomer": {
         "id": "newcomer",
         "unlockedAt": 1703001234567
       }
     },
     "displayed": ["newcomer", "first_step", "explorer"]
   }
   ```

#### C. Verify Data Structure
Pastikan:
- ✅ `displayed` adalah **array** (bukan object)
- ✅ `displayed` berisi **achievement IDs** (string)
- ✅ Achievement IDs di `displayed` juga ada di `unlocked`

---

## 2. Achievement Belum Di-unlock

### Gejala:
- Bisa pilih lambang di modal
- Tapi tidak muncul di profil

### Solusi:

#### Check Unlock Status:
1. Buka modal achievement
2. Pastikan lambang yang dipilih **tidak ada icon gembok** 🔒
3. Pastikan lambang memiliki **gradient background** (bukan abu-abu)

#### Unlock Achievement Manually (Testing):
```javascript
// Di browser console
const { unlockAchievement } = useAchievements();
await unlockAchievement('newcomer');
```

---

## 3. Cache Issue

### Gejala:
- Data ada di Firebase
- Tapi tidak muncul di UI

### Solusi:

#### A. Hard Refresh
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

#### B. Clear Browser Cache
1. Chrome: Settings → Privacy → Clear browsing data
2. Select: Cached images and files
3. Time range: Last hour
4. Click "Clear data"

#### C. Logout & Login
1. Logout dari aplikasi
2. Close browser
3. Open browser baru
4. Login kembali

---

## 4. Component Not Re-rendering

### Gejala:
- Data berubah di Firebase
- Tapi UI tidak update

### Solusi:

#### Check useEffect Dependencies:
File: `src/hooks/useAchievements.tsx`

```typescript
useEffect(() => {
  if (!currentUser) return;
  loadAchievements();
}, [currentUser]); // ← Pastikan dependency ada
```

#### Force Re-render:
1. Navigate ke page lain
2. Kembali ke Profile Page
3. Lambang seharusnya muncul

---

## 5. Loading State Stuck

### Gejala:
- Profil menampilkan "Loading..." terus
- Lambang tidak pernah muncul

### Solusi:

#### Check Console for Errors:
```javascript
// Cari error seperti:
Error loading achievements: ...
Firebase permission denied
```

#### Check Firebase Rules:
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

---

## 6. Wrong Achievement IDs

### Gejala:
- Data tersimpan
- Tapi lambang tidak muncul

### Solusi:

#### Verify Achievement IDs:
File: `src/data/achievements.ts`

```typescript
// Pastikan ID match dengan yang di Firebase
{
  id: 'newcomer', // ← Harus sama persis
  name: 'Pendatang Baru',
  ...
}
```

#### Check Typos:
- ❌ `new_comer` (underscore)
- ✅ `newcomer` (no underscore)

---

## 🔍 Debug Checklist

Jalankan checklist ini step-by-step:

### Step 1: Verify Firebase Data
- [ ] Buka Firebase Console
- [ ] Check `users/{userId}/achievements/displayed`
- [ ] Pastikan array berisi achievement IDs
- [ ] Pastikan IDs ada di `unlocked` juga

### Step 2: Check Browser Console
- [ ] Buka Developer Tools (F12)
- [ ] Check Console tab
- [ ] Cari log: `AchievementDisplay - displayedAchievements`
- [ ] Pastikan array tidak kosong

### Step 3: Verify Component Rendering
- [ ] Check apakah `AchievementDisplay` component di-render
- [ ] Check apakah `loading` state = `false`
- [ ] Check apakah `displayedAchievements.length > 0`

### Step 4: Test Selection Flow
- [ ] Buka modal achievement
- [ ] Pilih 1 lambang yang sudah unlock
- [ ] Klik "Simpan (1)"
- [ ] Check toast notification muncul
- [ ] Refresh page
- [ ] Check lambang muncul

---

## 🧪 Manual Testing

### Test 1: Unlock & Display "Pendatang Baru"

```javascript
// 1. Buka browser console
// 2. Run commands ini:

// Unlock achievement
const achievementsRef = firebase.database().ref('users/YOUR_USER_ID/achievements');
await achievementsRef.set({
  unlocked: {
    newcomer: {
      id: 'newcomer',
      unlockedAt: Date.now()
    }
  },
  displayed: ['newcomer']
});

// 3. Refresh page
// 4. Lambang "Pendatang Baru" 🌱 seharusnya muncul
```

### Test 2: Display Multiple Achievements

```javascript
await achievementsRef.set({
  unlocked: {
    newcomer: { id: 'newcomer', unlockedAt: Date.now() },
    first_step: { id: 'first_step', unlockedAt: Date.now() },
    explorer: { id: 'explorer', unlockedAt: Date.now() }
  },
  displayed: ['newcomer', 'first_step', 'explorer']
});

// Refresh → 3 lambang seharusnya muncul
```

---

## 📊 Expected Behavior

### Saat Lambang Muncul dengan Benar:

#### Profile Page Display:
```
┌─────────────────────────────────────┐
│ 🏆 Pencapaian      1/15 terbuka    │
│                                     │
│  ┌─────┐  ┌─────┐  ┌─────┐        │
│  │ 🌱  │  │ 🔒  │  │ 🔒  │        │
│  │Pend │  │     │  │     │        │
│  │Baru │  │     │  │     │        │
│  └─────┘  └─────┘  └─────┘        │
│                                     │
│  Klik untuk memilih lambang...     │
└─────────────────────────────────────┘
```

#### Console Logs:
```javascript
AchievementDisplay - displayedAchievements: [
  {
    id: 'newcomer',
    name: 'Pendatang Baru',
    icon: '🌱',
    rarity: 'common',
    unlockedAt: 1703001234567,
    ...
  }
]
AchievementDisplay - loading: false
```

---

## 🆘 Still Not Working?

### Last Resort Solutions:

#### 1. Clear All Data & Start Fresh
```javascript
// WARNING: This will delete all achievement data!
const achievementsRef = firebase.database().ref('users/YOUR_USER_ID/achievements');
await achievementsRef.remove();

// Refresh page → "Pendatang Baru" akan auto-unlock
```

#### 2. Check Network Tab
1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Filter: `firebase`
4. Refresh page
5. Check for failed requests (red)

#### 3. Verify Firebase Config
File: `src/lib/firebase.config.ts`

```typescript
const firebaseConfig = {
  databaseURL: "https://edulad-3b03a-default-rtdb.firebaseio.com",
  // ↑ Pastikan URL benar
};
```

#### 4. Check Environment Variables
File: `.env.local`

```env
VITE_FIREBASE_DATABASE_URL=https://edulad-3b03a-default-rtdb.firebaseio.com
```

---

## ✅ Success Indicators

Lambang berhasil muncul jika:

- ✅ Console log: `displayedAchievements: [...]` (tidak kosong)
- ✅ Loading state: `false`
- ✅ Lambang terlihat dengan gradient background
- ✅ Emoji icon muncul (bukan gembok)
- ✅ Nama lambang terlihat di bawah icon
- ✅ Slot kosong menampilkan gembok 🔒

---

## 📞 Need More Help?

### Information to Provide:

1. **Browser Console Logs**:
   - Screenshot console errors
   - Copy log: `AchievementDisplay - displayedAchievements`

2. **Firebase Data**:
   - Screenshot Firebase Database structure
   - Path: `users/{userId}/achievements`

3. **Steps Taken**:
   - Apa yang sudah dicoba
   - Hasil dari setiap step

4. **Environment**:
   - Browser & version
   - Operating system
   - Network status

---

**Good luck! 🍀**

Jika mengikuti troubleshooting guide ini, lambang seharusnya muncul dengan benar di Profile Page.

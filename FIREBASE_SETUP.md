# 🔥 Panduan Setup Firebase untuk Edulascode

Dokumentasi lengkap untuk menghubungkan aplikasi Edulascode dengan Firebase Realtime Database dan Authentication.

---

## 📋 Daftar Isi

1. [Prasyarat](#prasyarat)
2. [Membuat Project Firebase](#membuat-project-firebase)
3. [Konfigurasi Realtime Database](#konfigurasi-realtime-database)
4. [Setup Authentication](#setup-authentication)
5. [Konfigurasi Environment Variables](#konfigurasi-environment-variables)
6. [Integrasi ke Aplikasi](#integrasi-ke-aplikasi)
7. [Testing Koneksi](#testing-koneksi)
8. [Contoh Penggunaan](#contoh-penggunaan)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Prasyarat

Sebelum memulai, pastikan Anda memiliki:

- ✅ Akun Google (untuk akses Firebase Console)
- ✅ Node.js dan npm terinstall
- ✅ Project Edulascode sudah berjalan di local
- ✅ Firebase SDK sudah terinstall (sudah dilakukan via `npm install firebase`)

---

## 🚀 Membuat Project Firebase

### Langkah 1: Akses Firebase Console

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Login dengan akun Google Anda
3. Klik **"Add project"** atau **"Tambahkan project"**

### Langkah 2: Buat Project Baru

1. **Nama Project**: Masukkan nama project (contoh: `edulascode` atau `edulascode-app`)
2. **Google Analytics**: 
   - Anda bisa mengaktifkan atau menonaktifkan
   - Untuk development, bisa dinonaktifkan dulu
3. Klik **"Create project"**
4. Tunggu hingga project selesai dibuat (biasanya 1-2 menit)

### Langkah 3: Registrasi Web App

1. Dari halaman overview project, klik icon **Web** (`</>`)
2. **App nickname**: Masukkan nama app (contoh: `Edulascode Web`)
3. **Jangan** centang "Also set up Firebase Hosting" (tidak diperlukan untuk sekarang)
4. Klik **"Register app"**
5. **PENTING**: Salin konfigurasi Firebase yang muncul (akan digunakan nanti)
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     databaseURL: "https://your-project-default-rtdb.firebaseio.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
6. Klik **"Continue to console"**

---

## 💾 Konfigurasi Realtime Database

### Langkah 1: Buat Database Instance

1. Di sidebar Firebase Console, klik **"Build"** > **"Realtime Database"**
2. Klik **"Create Database"**
3. **Database location**: Pilih lokasi terdekat
   - Untuk Indonesia: pilih **Singapore (asia-southeast1)**
4. Klik **"Next"**

### Langkah 2: Security Rules (Mode Development)

1. Pilih **"Start in test mode"** untuk development
   - ⚠️ **WARNING**: Mode ini membuat database bisa diakses siapa saja!
   - Hanya untuk development/testing
   - Akan diubah nanti untuk production
2. Klik **"Enable"**
3. Database akan dibuat dengan struktur kosong

### Langkah 3: Set Production Rules (Opsional, untuk Production)

Setelah development selesai, ganti rules dengan yang lebih secure:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "leaderboard": {
      ".read": "auth != null",
      ".write": false
    }
  }
}
```

**Penjelasan rules**:
- `users/$uid`: Hanya user yang login bisa read/write data mereka sendiri
- `leaderboard`: Semua user yang login bisa baca, tapi tidak bisa menulis langsung

### Langkah 4: Salin Database URL

1. Di tab **"Data"**, perhatikan URL di atas
2. Formatnya: `https://your-project-default-rtdb.firebaseio.com`
3. **Salin URL ini** - akan digunakan di environment variables

---

## 🔐 Setup Authentication

### Langkah 1: Aktifkan Authentication

1. Di sidebar, klik **"Build"** > **"Authentication"**
2. Klik **"Get started"**

### Langkah 2: Enable Email/Password Provider

1. Klik tab **"Sign-in method"**
2. Pilih **"Email/Password"** dari daftar providers
3. **Toggle** switch "Enable" menjadi ON
4. ❌ **Jangan** enable "Email link (passwordless sign-in)" untuk sekarang
5. Klik **"Save"**

### Langkah 3: (Opsional) Setup Provider Lain

Jika ingin menggunakan Google Sign-In atau provider lain:

1. Pilih provider yang diinginkan (contoh: **Google**)
2. Toggle "Enable"
3. Masukkan informasi yang diperlukan (untuk Google: Project support email)
4. Klik "Save"

> **Note**: Untuk tutorial ini, kita fokus ke Email/Password saja.

---

## ⚙️ Konfigurasi Environment Variables

### Langkah 1: Buka File `.env.local`

Di root folder project (`c:\Users\WINDOWS 11\edulascode`), sudah ada file `.env.local` dengan template berikut:

```env
# Environment Variables untuk Firebase
# JANGAN COMMIT FILE INI KE REPOSITORY!

# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Langkah 2: Ganti dengan Kredensial Firebase Anda

1. Kembali ke **Firebase Console**
2. Klik icon **Gear** (⚙️) di sidebar > **"Project settings"**
3. Scroll ke bawah ke bagian **"Your apps"**
4. Klik app web yang tadi dibuat
5. Di bagian **"SDK setup and configuration"**, pilih **"Config"**
6. Salin nilai-nilai tersebut ke file `.env.local`

**Contoh pengisian** (ganti dengan nilai Anda sendiri):

```env
VITE_FIREBASE_API_KEY=AIzaSyBxxx_your_actual_api_key_xxx
VITE_FIREBASE_AUTH_DOMAIN=edulascode-12345.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://edulascode-12345-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=edulascode-12345
VITE_FIREBASE_STORAGE_BUCKET=edulascode-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### Langkah 3: Restart Dev Server

Setelah mengubah `.env.local`, **WAJIB restart** development server:

```bash
# Stop server yang sedang running (Ctrl+C)
# Kemudian start lagi
npm run dev
```

> ⚠️ **PENTING**: Jangan commit file `.env.local` ke Git! File ini sudah ada di `.gitignore`.

---

## 🔗 Integrasi ke Aplikasi

### Langkah 1: Wrap App dengan AuthProvider

Edit file `src/App.tsx`:

```tsx
import { AuthProvider } from "@/contexts/AuthContext";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>  {/* Tambahkan AuthProvider */}
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* ... routes ... */}
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);
```

### Langkah 2: Protect Routes yang Memerlukan Login

Wrap routes yang memerlukan authentication dengan `ProtectedRoute`:

```tsx
import ProtectedRoute from "@/components/ProtectedRoute";

// Di dalam Routes
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  } 
/>
```

### Langkah 3: Update AuthPage untuk Login/Register

Di `src/pages/AuthPage.tsx`, gunakan `useAuth` hook:

```tsx
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      // Show error toast
    }
  };

  // ... implement UI
};
```

---

## 🧪 Testing Koneksi

### Test 1: Cek Firebase Initialization

1. Buka browser console (F12)
2. Jalankan `npm run dev`
3. Akses `http://localhost:5173`
4. Periksa console, seharusnya **tidak ada error** tentang Firebase
5. Jika ada error "Firebase: Error (auth/invalid-api-key)", cek kembali `.env.local`

### Test 2: Test Registration

1. Akses halaman `/auth`
2. Coba daftar dengan email dan password baru
3. Jika berhasil:
   - Check Firebase Console > Authentication > Users
   - Seharusnya muncul user baru
   - Check Realtime Database, seharusnya ada data di `users/{uid}`

### Test 3: Test Login

1. Logout (jika sudah login)
2. Login dengan kredensial yang tadi didaftarkan
3. Seharusnya redirect ke dashboard tanpa error

### Test 4: Test Real-time Data

Buat test component sederhana:

```tsx
import { useRealtimeData } from "@/hooks/useFirebase";

const TestComponent = () => {
  const { data, loading } = useRealtimeData("test/message");
  
  if (loading) return <div>Loading...</div>;
  
  return <div>Data: {JSON.stringify(data)}</div>;
};
```

Kemudian di Firebase Console > Realtime Database, buat data manual:
```
test/
  message: "Hello Firebase!"
```

Refresh halaman, seharusnya data muncul real-time!

---

## 💡 Contoh Penggunaan

### 1. Membaca Data User Profile

```tsx
import { useRealtimeData } from "@/hooks/useFirebase";
import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { data: userData, loading } = useRealtimeData(
    `users/${currentUser?.uid}`
  );

  if (loading) return <div>Loading profile...</div>;

  return (
    <div>
      <h1>{userData?.displayName}</h1>
      <p>Score: {userData?.totalScore}</p>
    </div>
  );
};
```

### 2. Update Profile

```tsx
import { updateData } from "@/lib/firebase.service";
import { useAuth } from "@/contexts/AuthContext";

const updateProfile = async (bio: string, institution: string) => {
  const { currentUser } = useAuth();
  
  await updateData(`users/${currentUser.uid}`, {
    bio,
    institution,
  });
};
```

### 3. Membaca Leaderboard

```tsx
import { useRealtimeData } from "@/hooks/useFirebase";

const Leaderboard = () => {
  const { data: users, loading } = useRealtimeData("users");

  if (loading) return <div>Loading...</div>;

  // Convert object to array dan sort by score
  const leaderboard = Object.entries(users || {})
    .map(([id, user]: [string, any]) => ({ id, ...user }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 10); // Top 10

  return (
    <div>
      {leaderboard.map((user, index) => (
        <div key={user.id}>
          {index + 1}. {user.displayName} - {user.totalScore} pts
        </div>
      ))}
    </div>
  );
};
```

### 4. Update Score Setelah Menyelesaikan Story

```tsx
import { updateData } from "@/lib/firebase.service";
import { useAuth } from "@/contexts/AuthContext";

const completeStory = async (storyId: string, score: number) => {
  const { currentUser } = useAuth();
  
  // Baca current data dulu
  const userData = await readData(`users/${currentUser.uid}`);
  
  // Update dengan increment
  await updateData(`users/${currentUser.uid}`, {
    totalScore: (userData?.totalScore || 0) + score,
    storiesCompleted: (userData?.storiesCompleted || 0) + 1,
  });
};
```

---

## 🔧 Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"

**Solusi**:
1. Cek file `.env.local` apakah sudah diisi dengan benar
2. Pastikan semua kredensial dari Firebase Console sudah disalin dengan benar
3. Restart dev server (`Ctrl+C` lalu `npm run dev`)

### Error: "Permission denied"

**Solusi**:
1. Cek Firebase Console > Realtime Database > Rules
2. Untuk development, gunakan test mode:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
3. ⚠️ **Jangan lupa ganti** ke production rules sebelum deploy!

### Data tidak muncul/tidak real-time

**Solusi**:
1. Cek console browser untuk error
2. Pastikan path database benar (`users/${uid}` bukan `user/${uid}`)
3. Cek apakah user sudah login (gunakan `useAuth` hook)
4. Pastikan dev server sudah di-restart setelah ubah `.env.local`

### Error: "Database URL is required"

**Solusi**:
1. Pastikan `VITE_FIREBASE_DATABASE_URL` sudah ada di `.env.local`
2. Format harus lengkap: `https://your-project-default-rtdb.firebaseio.com`
3. Restart dev server

### User tidak bisa register

**Solusi**:
1. Cek Firebase Console > Authentication > Sign-in method
2. Pastikan Email/Password sudah di-enable (toggle ON)
3. Cek console browser untuk error message spesifik

---

## 📚 Struktur Data yang Direkomendasikan

### Users Collection

```json
{
  "users": {
    "uid-user-1": {
      "email": "user@example.com",
      "displayName": "Budi Santoso",
      "bio": "Pecinta alam",
      "institution": "Universitas Indonesia",
      "totalScore": 850,
      "rank": 5,
      "storiesCompleted": 8,
      "achievements": ["achievement-id-1", "achievement-id-2"],
      "createdAt": "2025-12-28T08:00:00.000Z"
    }
  }
}
```

### Stories Progress

```json
{
  "userProgress": {
    "uid-user-1": {
      "story-1": {
        "completed": true,
        "score": 100,
        "completedAt": "2025-12-28T10:00:00.000Z"
      }
    }
  }
}
```

### Leaderboard (Denormalized untuk performa)

```json
{
  "leaderboard": {
    "top100": [
      {
        "uid": "uid-user-1",
        "displayName": "Budi Santoso",
        "institution": "UI",
        "totalScore": 850
      }
    ]
  }
}
```

---

## 🎉 Selesai!

Aplikasi Edulascode Anda sekarang sudah terhubung dengan Firebase! 

### Next Steps:
1. ✅ Implement fitur login/register di AuthPage
2. ✅ Update ProfilePage untuk sync dengan Firebase
3. ✅ Implement leaderboard real-time
4. ✅ Tambahkan fitur save progress story
5. ⚠️ **Jangan lupa** ganti security rules sebelum production!

### Referensi Tambahan:
- [Firebase Realtime Database Docs](https://firebase.google.com/docs/database)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firebase Security Rules](https://firebase.google.com/docs/database/security)

---

**Happy Coding! 🚀**

# 📖 Cara Memilih Lambang Pencapaian untuk Ditampilkan (1-3 Lambang)

## 🎯 Overview

Sistem achievement memungkinkan user untuk **memilih 1 hingga 3 lambang** yang akan ditampilkan di halaman profil mereka. Anda bebas memilih:
- ✅ **1 lambang** saja
- ✅ **2 lambang**
- ✅ **3 lambang** (maksimal)

Lambang yang dipilih akan terlihat oleh user lain yang mengunjungi profil Anda.

---

## 📋 Step-by-Step Guide

### Step 1: Buka Profile Page
1. Login ke akun Anda
2. Klik avatar/foto profil di header
3. Pilih "Profil Saya" dari dropdown menu
4. Atau langsung ke `/profile`

### Step 2: Lihat Section Pencapaian
Di halaman profil, Anda akan melihat section **"Pencapaian"** yang menampilkan:
- 🏆 Icon trophy dengan judul "Pencapaian"
- Progress: **X/15 terbuka** (jumlah achievement yang sudah di-unlock)
- 3 slot untuk menampilkan lambang:
  - Slot berisi lambang yang sudah dipilih
  - Slot kosong dengan icon gembok jika belum memilih

### Step 3: Klik Section Pencapaian
Klik pada section "Pencapaian" untuk membuka **modal popup** dengan semua lambang.

### Step 4: Lihat Semua Lambang (Modal)
Modal akan menampilkan:
- **Header**: Judul "Lambang Pencapaian" dengan instruksi
  - 🌟 "Klik ikon bintang untuk memilih (1-3 lambang)"
  - ✓ "= Terpilih"
- **Tabs Filter**:
  - Semua - Tampilkan semua 15 lambang
  - Terbuka - Hanya lambang yang sudah di-unlock
  - Terkunci - Hanya lambang yang masih locked
  - Pemula, Story, Rank, Sosial - Filter by kategori
- **Grid 15 Lambang**: 3 kolom x 5 baris
- **Footer**: Counter "Dipilih: X dari maksimal 3 lambang"

### Step 5: Pilih Lambang (1-3 Lambang)

#### Cara Memilih:
1. **Klik icon bintang (⭐)** di pojok kanan atas lambang yang sudah terbuka
2. Icon bintang akan berubah menjadi **check mark (✓)** berwarna primary
3. Lambang akan mendapat **ring border** berwarna primary
4. Counter di footer akan update: "Dipilih: 1 dari maksimal 3 lambang"
5. Badge muncul: "Bisa tambah 2 lagi" (jika belum 3)

#### Cara Membatalkan Pilihan:
1. Klik lagi icon check mark (✓) pada lambang yang sudah dipilih
2. Icon akan kembali menjadi bintang (⭐)
3. Ring border akan hilang
4. Counter akan berkurang

#### Opsi Jumlah Lambang:
- **1 Lambang**: Pilih 1 saja, langsung bisa simpan
- **2 Lambang**: Pilih 2, badge "Bisa tambah 1 lagi" muncul
- **3 Lambang**: Pilih 3, badge "Maksimal tercapai" muncul

#### Jika Sudah Memilih 3:
- Saat memilih lambang ke-4, lambang pertama akan **otomatis diganti**
- Badge "Maksimal tercapai" akan muncul di footer
- Counter akan tetap "3 dari maksimal 3 lambang"

### Step 6: Simpan Pilihan
1. Setelah memilih lambang (minimal 1, maksimal 3)
2. Button "Simpan" akan menampilkan jumlah: "Simpan (1)", "Simpan (2)", atau "Simpan (3)"
3. Klik tombol **"Simpan (X)"** di footer
4. Toast notification akan muncul: "✅ Berhasil! X lambang pencapaian telah ditampilkan di profilmu"
5. Modal akan tertutup otomatis
6. Lambang terpilih akan langsung muncul di profil

### Step 7: Verifikasi
Kembali ke halaman profil dan lihat section "Pencapaian":
- Lambang yang dipilih (1-3) akan ditampilkan
- Slot kosong akan menampilkan icon gembok
- Lambang akan menampilkan:
  - Icon emoji lambang
  - Nama lambang
  - Gradient background sesuai rarity

---

## 🎨 Visual Indicators

### Lambang Terbuka (Unlocked)
- ✅ Background gradient berwarna (sesuai rarity)
- ✅ Icon emoji terlihat jelas
- ✅ Border solid
- ✅ Hover effect: scale up + shadow
- ✅ Icon bintang (⭐) di pojok kanan atas

### Lambang Terkunci (Locked)
- ❌ Background abu-abu (muted)
- ❌ Icon gembok (🔒) menggantikan emoji
- ❌ Opacity 60%
- ❌ Tidak bisa dipilih untuk display
- ℹ️ Klik untuk melihat persyaratan unlock

### Lambang Terpilih (Selected)
- ✅ Ring border berwarna primary (2px)
- ✅ Icon check mark (✓) di pojok kanan atas
- ✅ Background primary pada icon
- ✅ Check mark (✓) juga muncul di samping nama

### Counter Status
- **0**: Belum memilih, tombol "Simpan Pilihan" disabled
- **1**: "Dipilih: 1 dari maksimal 3 lambang" + Badge "Bisa tambah 2 lagi"
- **2**: "Dipilih: 2 dari maksimal 3 lambang" + Badge "Bisa tambah 1 lagi"
- **3**: "Dipilih: 3 dari maksimal 3 lambang" + Badge "Maksimal tercapai"

---

## 🔄 Mengubah Pilihan

### Cara 1: Hapus & Pilih Baru
1. Buka modal achievement
2. Klik check mark (✓) pada lambang yang ingin dihapus
3. Pilih lambang baru dengan klik bintang (⭐)
4. Simpan pilihan

### Cara 2: Replace Otomatis
1. Jika sudah memilih 3 lambang
2. Klik bintang (⭐) pada lambang baru
3. Lambang pertama akan otomatis diganti
4. Simpan pilihan

---

## 💡 Tips & Best Practices

### Strategi Memilih Lambang:

1. **Minimalis (1 Lambang)**
   - Pilih 1 lambang paling prestisius
   - Fokus pada Legendary atau Epic
   - Contoh: 🌍 Pejuang Lingkungan

2. **Balanced (2 Lambang)**
   - Kombinasi 2 kategori berbeda
   - Contoh: 🏆 Master Petualang + 🥇 Top 10

3. **Showcase All (3 Lambang)**
   - Tunjukkan berbagai pencapaian
   - Mix rarity dan kategori
   - Contoh: 🌍 Pejuang Lingkungan + 🏅 Juara + ⚡ Dedikasi Tinggi

4. **Personal Favorites**
   - Pilih lambang yang paling Anda banggakan
   - Tidak harus yang paling rare
   - Bisa 1, 2, atau 3 sesuai preferensi

### Rekomendasi Kombinasi:

**1 Lambang (Minimalis):**
- 🌍 Pejuang Lingkungan (Ultimate achievement)
- 🏅 Juara (Ranking #1)
- 👑 Legenda Poin (2000 XP)

**2 Lambang (Balanced):**
- 🏆 Master Petualang + 🥇 Top 10
- 👑 Legenda Poin + 🔥 Konsisten
- ⭐ Perfeksionis + 🥈 Top 50

**3 Lambang (Full Showcase):**
- 🌍 Pejuang Lingkungan + 🏅 Juara + ⚡ Dedikasi Tinggi
- 🏆 Master Petualang + 🥇 Top 10 + 🔥 Konsisten
- 👑 Legenda Poin + ⭐ Perfeksionis + 🥈 Top 50

---

## 🐛 Troubleshooting

### Tidak Bisa Memilih Lambang
**Problem:** Klik bintang tapi tidak terjadi apa-apa

**Solution:**
- Pastikan lambang sudah di-unlock (tidak ada icon gembok)
- Refresh halaman dan coba lagi
- Check console browser untuk error

### Pilihan Tidak Tersimpan
**Problem:** Setelah klik "Simpan Pilihan", lambang tidak muncul di profil

**Solution:**
- Check koneksi internet
- Pastikan sudah login
- Coba logout dan login kembali
- Check Firebase permissions

### Modal Tidak Terbuka
**Problem:** Klik section "Pencapaian" tapi modal tidak muncul

**Solution:**
- Refresh halaman
- Clear browser cache
- Coba browser lain
- Check console untuk error

### Lambang Tidak Muncul di Profil
**Problem:** Sudah simpan tapi lambang tidak tampil

**Solution:**
- Refresh halaman profil
- Check apakah data tersimpan di Firebase
- Verify dengan buka modal lagi
- Coba pilih ulang dan simpan

---

## 🎮 Keyboard Shortcuts

Saat modal terbuka:
- **Tab**: Navigate antar lambang
- **Enter**: Select/deselect lambang yang di-focus
- **Esc**: Tutup modal
- **Arrow Keys**: Navigate grid

---

## 📱 Mobile Experience

### Responsive Design:
- **Desktop**: Grid 3 kolom
- **Tablet**: Grid 2 kolom
- **Mobile**: Grid 1-2 kolom
- **Modal**: Full screen di mobile

### Touch Gestures:
- **Tap**: Select/deselect lambang
- **Long Press**: Lihat detail lambang
- **Swipe**: Scroll grid
- **Pinch**: Zoom (jika diperlukan)

---

## 🔐 Privacy & Visibility

### Siapa yang Bisa Melihat?
- ✅ Semua user yang mengunjungi profil Anda
- ✅ User di leaderboard
- ✅ User yang search profil Anda

### Apa yang Ditampilkan?
- ✅ 3 lambang yang Anda pilih
- ✅ Icon emoji lambang
- ✅ Nama lambang
- ✅ Gradient background (rarity)

### Apa yang TIDAK Ditampilkan?
- ❌ Lambang yang tidak dipilih
- ❌ Lambang yang masih locked
- ❌ Tanggal unlock
- ❌ Total achievement count (kecuali di modal)

---

## 📊 Analytics & Stats

### Track Your Progress:
- Total achievements unlocked: **X/15**
- Rarity breakdown:
  - Common: X
  - Rare: X
  - Epic: X
  - Legendary: X
- Category breakdown:
  - Starter: X/1
  - Story: X/4
  - Leaderboard: X/4
  - Social: X/2
  - Master: X/1

---

## 🎯 Goals & Challenges

### Short-term Goals:
- [ ] Unlock 5 achievements
- [ ] Pilih 3 lambang untuk display
- [ ] Unlock 1 Rare achievement

### Mid-term Goals:
- [ ] Unlock 10 achievements
- [ ] Unlock 1 Epic achievement
- [ ] Display 3 Epic/Legendary badges

### Long-term Goals:
- [ ] Unlock semua 15 achievements
- [ ] Unlock 🌍 Pejuang Lingkungan
- [ ] Display 3 Legendary badges

---

## ✅ Quick Reference

### Memilih Lambang:
1. Buka Profile → Klik "Pencapaian"
2. Klik ⭐ pada lambang terbuka (max 3)
3. Klik "Simpan Pilihan"
4. Done! ✅

### Mengubah Pilihan:
1. Buka modal achievement
2. Klik ✓ untuk unselect
3. Klik ⭐ untuk select baru
4. Simpan

### Melihat Persyaratan:
1. Klik lambang terkunci (🔒)
2. Detail muncul di bawah grid
3. Lihat "Persyaratan: ..."

---

**Happy collecting! 🏆**

Kumpulkan semua 15 lambang dan tunjukkan pencapaianmu kepada dunia!

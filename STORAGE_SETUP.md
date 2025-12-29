# Profile Photo Storage - Base64 Method

## Overview
Sistem foto profil menggunakan **Base64 encoding** yang disimpan langsung di **Firebase Realtime Database**. Metode ini lebih sederhana karena tidak memerlukan Firebase Storage.

## Keuntungan Metode Base64:
✅ **Tidak perlu setup Firebase Storage**
✅ **Tidak perlu Storage Rules**
✅ **Lebih sederhana** - hanya butuh Realtime Database
✅ **Langsung tersimpan** di user data
✅ **Tidak perlu URL management**

## Batasan:
⚠️ **Ukuran maksimal: 1MB** (untuk performa database)
⚠️ **Tidak cocok untuk file besar** (Base64 ~33% lebih besar dari file asli)

## Cara Kerja

### 1. Upload Foto
```typescript
// User pilih foto → Convert ke Base64 → Simpan di Database
users/{userId}/photoURL = "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
```

### 2. Display Foto
```tsx
// Langsung gunakan Base64 string sebagai src
<img src={userData.photoURL} alt="Profile" />
```

### 3. Delete Foto
```typescript
// Set photoURL ke null
users/{userId}/photoURL = null
```

## Struktur Data di Realtime Database

```json
{
  "users": {
    "userId123": {
      "displayName": "John Doe",
      "email": "john@example.com",
      "institution": "Universitas Indonesia",
      "photoURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA..."
    }
  }
}
```

## Validasi File

### Tipe File yang Didukung:
- ✅ JPG/JPEG
- ✅ PNG
- ✅ GIF
- ✅ WebP

### Ukuran File:
- **Maksimal: 1MB**
- Rekomendasi: 500KB atau kurang untuk performa optimal

## Cara Menggunakan

### Upload Foto:
1. Buka halaman **Profile**
2. **Hover** mouse di atas avatar
3. Klik tombol **Camera** (ikon kamera)
4. Pilih file gambar (max 1MB)
5. Foto otomatis dikonversi ke Base64 dan tersimpan

### Hapus Foto:
1. Hover mouse di atas avatar yang sudah ada foto
2. Klik tombol **Trash** (ikon tempat sampah merah)
3. Konfirmasi penghapusan
4. Foto terhapus dari database

## Troubleshooting

### Foto tidak muncul setelah upload
1. **Buka Console Browser** (F12)
2. Cek error messages di tab Console
3. Pastikan log menunjukkan:
   ```
   Converting image to Base64...
   Image converted to Base64, length: xxxxx
   Database updated with Base64 photo
   User data loaded: {...}
   Photo URL: data:image/jpeg;base64,...
   ```

### Error: "File Terlalu Besar"
- Ukuran file melebihi 1MB
- **Solusi**: Kompres foto terlebih dahulu atau pilih foto yang lebih kecil
- Tools online: TinyPNG, Compressor.io

### Error: "File Tidak Valid"
- File bukan format gambar
- **Solusi**: Pastikan file berformat JPG, PNG, GIF, atau WebP

### Foto blur atau kualitas rendah
- File terlalu dikompres
- **Solusi**: Gunakan foto dengan resolusi 500x500px - 1000x1000px

## Optimasi Foto

### Rekomendasi Ukuran:
- **Resolusi**: 500x500px atau 800x800px
- **Format**: JPG (untuk foto) atau PNG (untuk logo/grafis)
- **Ukuran file**: 200KB - 500KB

### Tools Kompres Foto:
1. **Online**:
   - [TinyPNG](https://tinypng.com/)
   - [Compressor.io](https://compressor.io/)
   - [Squoosh](https://squoosh.app/)

2. **Desktop**:
   - Paint (Windows) - Save dengan quality 80-90%
   - Preview (Mac) - Export dengan quality Medium

## Database Rules

Pastikan Realtime Database Rules mengizinkan user update photoURL:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

## Performance Tips

1. **Kompres foto sebelum upload** untuk performa lebih baik
2. **Gunakan format JPG** untuk foto (lebih kecil dari PNG)
3. **Hindari foto > 1MB** untuk menghindari database bloat
4. **Cache foto** di browser untuk loading lebih cepat

## Migration dari Storage ke Base64

Jika sebelumnya menggunakan Firebase Storage:

1. **Backup foto lama** dari Storage
2. **Download semua foto** user
3. **Kompres** jika perlu
4. **Re-upload** menggunakan sistem baru
5. **Hapus** dari Storage (opsional)

## Keamanan

✅ **Aman**: Base64 string hanya bisa diakses oleh user yang authenticated
✅ **Private**: Database rules membatasi write hanya untuk owner
✅ **Validasi**: Client-side validation untuk tipe dan ukuran file

## Catatan Penting

- ⚠️ Base64 string **~33% lebih besar** dari file asli
- ⚠️ Foto 1MB akan menjadi ~1.3MB di database
- ⚠️ Jangan upload foto terlalu besar untuk menghindari slow loading
- ✅ Metode ini cocok untuk **foto profil kecil**
- ✅ Untuk **galeri foto besar**, gunakan Firebase Storage

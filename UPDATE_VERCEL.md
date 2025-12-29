# 🚀 Update Kode ke Vercel

## Cara Update Deployment Vercel

### Option 1: Via Git (Recommended - Otomatis)

#### Step 1: Commit Changes
```bash
# Add semua perubahan
git add .

# Commit dengan message
git commit -m "Fix Firebase config & add deployment features"

# Push ke repository
git push origin main
```

#### Step 2: Vercel Auto Deploy
- Vercel akan otomatis detect push ke repository
- Build akan dimulai otomatis
- Tunggu 2-3 menit
- Check di Vercel Dashboard untuk status deployment

---

### Option 2: Via Vercel CLI (Manual)

#### Step 1: Install Vercel CLI (jika belum)
```bash
npm install -g vercel
```

#### Step 2: Login
```bash
vercel login
```

#### Step 3: Deploy
```bash
# Deploy ke production
vercel --prod
```

---

### Option 3: Via Vercel Dashboard (Manual Upload)

#### Step 1: Build Locally
```bash
npm run build
```

#### Step 2: Upload via Dashboard
1. Buka https://vercel.com/dashboard
2. Pilih project Anda
3. Go to Settings > General
4. Scroll ke "Build & Development Settings"
5. Atau deploy via drag & drop folder `dist/`

---

## ⚙️ Set Environment Variables di Vercel

### Step 1: Buka Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Pilih project Anda
3. Click "Settings"
4. Click "Environment Variables"

### Step 2: Add Variables
Tambahkan semua variable ini:

```
VITE_FIREBASE_API_KEY = AIzaSyBINX6pMUHWPor91JEliqkFj21uU9T5ujA
VITE_FIREBASE_AUTH_DOMAIN = edulad-3b03a.firebaseapp.com
VITE_FIREBASE_DATABASE_URL = https://edulad-3b03a-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID = edulad-3b03a
VITE_FIREBASE_STORAGE_BUCKET = edulad-3b03a.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 959680074524
VITE_FIREBASE_APP_ID = 1:959680074524:web:c3e243e4ffdec484f1e0d9
```

**Important:**
- Set untuk: Production, Preview, Development (pilih semua)
- Click "Save" setelah setiap variable

### Step 3: Redeploy
Setelah add environment variables:
1. Go to "Deployments" tab
2. Click "..." pada deployment terakhir
3. Click "Redeploy"
4. Atau push commit baru ke git

---

## 🔍 Verifikasi Deployment

### Check 1: Build Success
Di Vercel Dashboard, pastikan:
- ✅ Build status: "Ready"
- ✅ No build errors
- ✅ Deployment URL aktif

### Check 2: Test Website
1. Buka deployment URL
2. Check browser console (F12)
3. Pastikan tidak ada error Firebase
4. Test login/register
5. Test semua fitur

### Check 3: Firebase Connection
Di browser console, seharusnya muncul:
```
✅ Firebase initialized successfully
```

---

## 🐛 Troubleshooting Vercel

### Build Fails di Vercel

#### Error: "Module not found"
```bash
# Pastikan dependencies terinstall
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

#### Error: "Environment variables not found"
1. Check Vercel Dashboard > Settings > Environment Variables
2. Pastikan semua `VITE_*` variables ada
3. Redeploy setelah add variables

#### Error: "Build timeout"
1. Check build logs di Vercel
2. Mungkin ada infinite loop atau error
3. Fix error locally dulu
4. Test dengan `npm run build`
5. Push setelah berhasil

### Firebase Error di Production

#### Error: "Firebase not initialized"
**Solusi:**
1. Check environment variables di Vercel
2. Pastikan semua `VITE_*` variables set
3. Redeploy

#### Error: "Permission denied"
**Solusi:**
1. Check Firebase Rules di Firebase Console
2. Pastikan rules allow authenticated users
3. Check Firebase project aktif

### 404 on Page Refresh

**Solusi:**
- Sudah dikonfigurasi di `vercel.json`
- Jika masih error, check `vercel.json` ada di root
- Redeploy

---

## 📋 Checklist Sebelum Deploy

- [ ] Code sudah di-commit ke git
- [ ] `npm run build` berhasil locally
- [ ] `npm run preview` berfungsi
- [ ] Environment variables sudah di-set di Vercel
- [ ] Firebase project aktif
- [ ] Firebase Rules sudah dikonfigurasi
- [ ] Semua fitur tested locally

---

## 🚀 Quick Deploy Commands

### If using Git (Automatic):
```bash
git add .
git commit -m "Update: [describe changes]"
git push origin main
# Vercel auto-deploys
```

### If using Vercel CLI (Manual):
```bash
npm run build
vercel --prod
```

---

## 📊 Monitor Deployment

### Vercel Dashboard
- **Deployments**: Lihat history & status
- **Analytics**: Monitor traffic & performance
- **Logs**: Check runtime logs
- **Settings**: Manage environment & domains

### Firebase Console
- **Authentication**: Monitor users
- **Database**: Check data
- **Analytics**: User behavior
- **Performance**: App performance

---

## 🔄 Update Workflow

### Regular Updates:
```bash
# 1. Make changes locally
# 2. Test locally
npm run dev

# 3. Build & preview
npm run build
npm run preview

# 4. Commit & push
git add .
git commit -m "Update: [changes]"
git push origin main

# 5. Vercel auto-deploys
# 6. Verify on production URL
```

---

## 🎯 Post-Deployment

### After Successful Deploy:

1. **Test Everything**:
   - [ ] Homepage loads
   - [ ] Login/Register works
   - [ ] Dashboard accessible
   - [ ] Story viewer works
   - [ ] Profile page works
   - [ ] Photo upload works
   - [ ] Dark/Light mode works

2. **Check Performance**:
   - Run Lighthouse audit
   - Check load times
   - Test on mobile

3. **Monitor**:
   - Check Vercel Analytics
   - Monitor Firebase usage
   - Watch for errors

---

## 💡 Tips

1. **Always test locally first**:
   ```bash
   npm run build && npm run preview
   ```

2. **Use meaningful commit messages**:
   ```bash
   git commit -m "Fix: Firebase config fallback values"
   ```

3. **Check build logs** if deployment fails

4. **Set environment variables** before first deploy

5. **Use Vercel CLI** for quick deploys:
   ```bash
   vercel --prod
   ```

---

## 🆘 Need Help?

### Vercel Issues:
- Check: https://vercel.com/docs
- Support: https://vercel.com/support

### Firebase Issues:
- Check: `TROUBLESHOOTING.md`
- Firebase Docs: https://firebase.google.com/docs

### Build Issues:
- Check: `DEPLOYMENT_GUIDE.md`
- Run: `npm run check-env`

---

## ✅ Success Indicators

Deployment berhasil jika:
- ✅ Vercel status: "Ready"
- ✅ URL accessible
- ✅ No console errors
- ✅ Firebase connected
- ✅ Login works
- ✅ All features functional

---

**Selamat! Kode Anda siap di-update ke Vercel! 🎉**

Pilih salah satu option di atas dan ikuti step-by-step.

# 🔧 Troubleshooting Guide

## Firebase Database URL Error

### Error Message:
```
FIREBASE FATAL ERROR: Can't determine Firebase Database URL. 
Be sure to include a Project ID when calling firebase.initializeApp().
```

### Penyebab:
Environment variable `VITE_FIREBASE_DATABASE_URL` tidak terbaca oleh Vite.

### Solusi:

#### 1. Restart Dev Server (Paling Sering Berhasil)
```bash
# Stop server (Ctrl+C)
# Kemudian start ulang
npm run dev
```

**Catatan**: Vite hanya membaca environment variables saat server start. Perubahan pada `.env.local` memerlukan restart.

#### 2. Verifikasi File .env.local
Pastikan file `.env.local` ada di root project dan berisi:
```env
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
```

**Checklist**:
- [ ] File ada di root project (sejajar dengan package.json)
- [ ] Variable dimulai dengan `VITE_`
- [ ] Tidak ada spasi sebelum/sesudah `=`
- [ ] URL lengkap dengan `https://`

#### 3. Clear Cache & Reinstall
```bash
# Stop server
# Clear node_modules dan cache
rm -rf node_modules .vite dist

# Reinstall
npm install

# Start server
npm run dev
```

#### 4. Check Environment Variables di Browser
Buka browser console dan ketik:
```javascript
console.log(import.meta.env)
```

Pastikan `VITE_FIREBASE_DATABASE_URL` muncul di list.

#### 5. Hardcode Sementara (Testing Only)
Untuk testing, bisa hardcode di `firebase.config.ts`:
```typescript
const firebaseConfig = {
    // ... other config
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    // ... rest
};
```

**⚠️ JANGAN COMMIT HARDCODED VALUES!**

---

## Common Issues

### 1. Environment Variables Tidak Terbaca

**Symptoms**:
- `import.meta.env.VITE_*` returns `undefined`
- Firebase errors

**Solutions**:
1. Restart dev server
2. Check variable names start with `VITE_`
3. Check `.env.local` location (must be in root)
4. No spaces in `.env.local`

### 2. Build Fails

**Symptoms**:
```
Error: Build failed
```

**Solutions**:
```bash
# Clear everything
rm -rf node_modules dist .vite

# Reinstall
npm install

# Try build
npm run build
```

### 3. Firebase Connection Error

**Symptoms**:
- Can't read/write to database
- Authentication fails

**Solutions**:
1. Check Firebase Console > Database
2. Verify Database Rules
3. Ensure project is active
4. Check internet connection

### 4. Images Not Loading

**Symptoms**:
- Broken image icons
- 404 errors for images

**Solutions**:
1. Check image paths:
   - Public folder: `/image.png`
   - Src folder: `import image from '@/assets/image.png'`
2. Verify files exist
3. Check file extensions match

### 5. 404 on Page Refresh

**Symptoms**:
- Works on first load
- 404 when refreshing page

**Solutions**:
- This is normal in development
- Will be fixed in production with proper hosting config
- Already configured in `vercel.json`, `netlify.toml`, `firebase.json`

### 6. Dark Mode Not Working

**Symptoms**:
- Toggle doesn't work
- Theme not persisting

**Solutions**:
1. Check ThemeProvider is in App.tsx
2. Clear localStorage
3. Check browser console for errors

### 7. Photo Upload Fails

**Symptoms**:
- Upload button doesn't work
- Error after selecting photo

**Solutions**:
1. Check file size (max 1MB)
2. Check file type (must be image)
3. Check Firebase Database Rules
4. Check browser console for errors

---

## Debug Commands

### Check Environment Variables
```bash
# In terminal
echo $VITE_FIREBASE_DATABASE_URL

# In browser console
console.log(import.meta.env)
```

### Check Firebase Connection
```javascript
// In browser console
import { database } from './src/lib/firebase.config';
console.log(database);
```

### Check Build Output
```bash
npm run build
ls -lh dist/
```

### Test Production Build Locally
```bash
npm run build
npm run preview
```

---

## Getting Help

### Before Asking for Help:

1. **Check Console**:
   - Browser console (F12)
   - Terminal output
   - Network tab

2. **Try Basic Fixes**:
   - Restart dev server
   - Clear cache
   - Reinstall dependencies

3. **Gather Information**:
   - Error message (full text)
   - Steps to reproduce
   - Browser/OS version
   - Node version: `node --version`

### Useful Commands:

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check installed packages
npm list --depth=0

# Check for outdated packages
npm outdated
```

---

## Quick Fixes Checklist

When something breaks:

- [ ] Restart dev server
- [ ] Check browser console
- [ ] Check terminal output
- [ ] Clear browser cache
- [ ] Check `.env.local` exists
- [ ] Verify Firebase config
- [ ] Check internet connection
- [ ] Try incognito mode
- [ ] Check Firebase Console
- [ ] Review recent changes

---

## Prevention Tips

1. **Always restart dev server** after changing `.env.local`
2. **Never commit** `.env.local` or `.env.production`
3. **Keep dependencies updated** (but test first)
4. **Use version control** (git) to track changes
5. **Test before deploying** with `npm run build && npm run preview`

---

## Still Having Issues?

1. Check `DEPLOYMENT_GUIDE.md` for deployment issues
2. Check `FIREBASE_SETUP.md` for Firebase setup
3. Review error messages carefully
4. Search error message online
5. Check Firebase documentation

---

## Emergency Reset

If everything is broken:

```bash
# 1. Backup your .env.local
cp .env.local .env.local.backup

# 2. Nuclear option - delete everything
rm -rf node_modules dist .vite package-lock.json

# 3. Reinstall from scratch
npm install

# 4. Restore .env.local
cp .env.local.backup .env.local

# 5. Start fresh
npm run dev
```

---

**Remember**: Most issues are solved by restarting the dev server! 🔄

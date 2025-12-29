# 🚀 Lesta Platform - Quick Deployment Guide

## 📦 What's Included

This project is **ready to deploy** with:
- ✅ Vercel configuration (`vercel.json`)
- ✅ Netlify configuration (`netlify.toml`)
- ✅ Firebase Hosting configuration (`firebase.json`)
- ✅ Production environment template (`.env.production.example`)
- ✅ Optimized build settings
- ✅ Security headers
- ✅ SPA routing configured

---

## ⚡ Quick Start (3 Steps)

### 1. Setup Environment
```bash
# Copy environment template
cp .env.production.example .env.production

# Edit with your Firebase credentials
# Get from: Firebase Console > Project Settings
```

### 2. Build & Test
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview locally
npm run preview
```

### 3. Deploy

#### Option A: Vercel (Easiest)
```bash
npm run deploy:vercel
```

#### Option B: Netlify
```bash
npm run deploy:netlify
```

#### Option C: Firebase Hosting
```bash
npm run deploy:firebase
```

---

## 📋 Detailed Guides

- **Full Deployment Guide**: See `DEPLOYMENT_GUIDE.md`
- **Deployment Checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **Firebase Setup**: See `FIREBASE_SETUP.md`

---

## 🔑 Environment Variables

Required for all deployments:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

**Important:** 
- All variables must start with `VITE_`
- Set these in your hosting platform's dashboard
- Never commit `.env.production` to git

---

## 🌐 Recommended Hosting

### Vercel (Best for React/Vite)
- Free tier: Generous
- Setup time: 2 minutes
- Auto HTTPS: Yes
- Global CDN: Yes
- **Command**: `npm run deploy:vercel`

### Netlify (Great Alternative)
- Free tier: Good
- Setup time: 3 minutes
- Auto HTTPS: Yes
- Global CDN: Yes
- **Command**: `npm run deploy:netlify`

### Firebase Hosting (If using Firebase)
- Free tier: Limited
- Setup time: 5 minutes
- Auto HTTPS: Yes
- Global CDN: Yes
- **Command**: `npm run deploy:firebase`

---

## ✅ Pre-Deployment Checklist

- [ ] Firebase project created
- [ ] Environment variables configured
- [ ] Build succeeds locally (`npm run build`)
- [ ] Preview works (`npm run preview`)
- [ ] All features tested
- [ ] Firebase Rules configured

---

## 🔧 Build Configuration

### Vite Config
- Output: `dist/`
- Minification: Terser
- Code splitting: Enabled
- Source maps: Disabled (production)

### Bundle Size
Expected build size: ~500KB (gzipped)

---

## 🛡️ Security

Configured security headers:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

---

## 📊 Performance

Optimizations included:
- Code splitting by vendor
- Image optimization (WebP)
- Asset caching (1 year)
- Lazy loading routes
- Tree shaking enabled

---

## 🆘 Troubleshooting

### Build fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Environment variables not working
- Ensure they start with `VITE_`
- Restart dev server
- Check hosting platform settings

### 404 on page refresh
- SPA routing is configured in all config files
- Redeploy if needed

---

## 📞 Support

- **Issues**: Check `DEPLOYMENT_GUIDE.md`
- **Firebase**: See `FIREBASE_SETUP.md`
- **Checklist**: See `DEPLOYMENT_CHECKLIST.md`

---

## 🎉 Success!

After deployment, your site will be live at:
- Vercel: `https://your-project.vercel.app`
- Netlify: `https://your-project.netlify.app`
- Firebase: `https://your-project.web.app`

**Next:** Add custom domain (optional)

---

Made with ❤️ for the environment 🌱

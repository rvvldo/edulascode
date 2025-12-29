# 🚀 Deployment Guide - Lesta Platform

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Pastikan semua environment variables sudah dikonfigurasi:

#### Development (.env.local)
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Production (.env.production)
```env
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_production_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_production_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_production_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_production_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_production_sender_id
VITE_FIREBASE_APP_ID=your_production_app_id
```

### 2. Firebase Configuration

#### Realtime Database Rules
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "reports": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "system": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

#### Authentication Methods
Aktifkan di Firebase Console:
- ✅ Email/Password
- ✅ Google Sign-In (optional)

### 3. Build Configuration

#### Vite Config Check
File `vite.config.ts` sudah dikonfigurasi dengan benar:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/database'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        }
      }
    }
  }
})
```

### 4. Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "echo \"No tests yet\""
  }
}
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

#### Why Vercel?
- ✅ Free tier generous
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Easy deployment
- ✅ Perfect for React/Vite

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

#### Vercel Configuration (vercel.json)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### Environment Variables di Vercel
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add all VITE_* variables
4. Redeploy

---

### Option 2: Netlify

#### Steps:

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy
   ```

4. **Production Deploy**
   ```bash
   netlify deploy --prod
   ```

#### Netlify Configuration (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### Option 3: Firebase Hosting

#### Steps:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**
   ```bash
   firebase login
   ```

3. **Initialize Hosting**
   ```bash
   firebase init hosting
   ```
   - Select: Use existing project
   - Public directory: `dist`
   - Single-page app: `Yes`
   - GitHub deploys: `No` (optional)

4. **Build**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

#### Firebase Configuration (firebase.json)
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

---

### Option 4: GitHub Pages

#### Steps:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/your-repo/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

---

## 🔧 Build Optimization

### 1. Code Splitting
Already configured in vite.config.ts with manual chunks.

### 2. Image Optimization
- ✅ Using WebP format
- ✅ Thumbnails in `/src/thumbnail/`
- ✅ Maskot in `/public/maskot.webp`

### 3. Bundle Size Analysis
```bash
npm run build
```
Check `dist/` folder size.

### 4. Performance Tips
- Lazy load routes (already implemented)
- Compress images before upload
- Use CDN for static assets
- Enable gzip/brotli compression

---

## 🔒 Security Checklist

### Before Deploy:
- [ ] Remove console.logs in production
- [ ] Check Firebase Rules are restrictive
- [ ] Verify environment variables are set
- [ ] Test authentication flows
- [ ] Check CORS settings
- [ ] Enable Firebase App Check (optional)
- [ ] Set up rate limiting (optional)

### Firebase Security Rules:
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null",
        ".write": "auth != null && auth.uid == $uid",
        ".validate": "newData.hasChildren(['displayName', 'email'])"
      }
    }
  }
}
```

---

## 📊 Monitoring & Analytics

### 1. Firebase Analytics
Already integrated via Firebase SDK.

### 2. Error Tracking (Optional)
Consider adding:
- Sentry
- LogRocket
- Bugsnag

### 3. Performance Monitoring
- Firebase Performance Monitoring
- Lighthouse CI
- Web Vitals

---

## 🚀 Deployment Commands

### Quick Deploy (Vercel)
```bash
# First time
vercel

# Production
vercel --prod
```

### Quick Deploy (Netlify)
```bash
# First time
netlify deploy

# Production
netlify deploy --prod
```

### Quick Deploy (Firebase)
```bash
npm run build
firebase deploy --only hosting
```

---

## 🔄 CI/CD Setup (Optional)

### GitHub Actions (Vercel)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📝 Post-Deployment Checklist

After deployment:
- [ ] Test all routes work
- [ ] Test authentication (login/register/logout)
- [ ] Test Firebase connection
- [ ] Test image loading
- [ ] Test responsive design
- [ ] Test dark/light mode
- [ ] Check console for errors
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Verify environment variables
- [ ] Check performance (Lighthouse)
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS (should be automatic)

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Restart dev server after changes
- Check `.env.production` for production

### Firebase Connection Issues
- Verify Firebase config in console
- Check Firebase Rules
- Ensure project is on Blaze plan (if needed)

### 404 on Refresh
- Ensure SPA redirect is configured
- Check `vercel.json` or `netlify.toml`

### Images Not Loading
- Check image paths (use `/` for public folder)
- Verify images are in `public/` or imported correctly
- Check browser console for 404s

---

## 📞 Support

For deployment issues:
1. Check this guide
2. Check hosting provider docs
3. Check Firebase console
4. Review browser console errors

---

## 🎉 Success!

Your Lesta Platform is now live! 🚀

**Next Steps:**
1. Share the URL with users
2. Monitor performance
3. Gather feedback
4. Iterate and improve

**Recommended URL Structure:**
- Production: `https://lesta-platform.vercel.app`
- Staging: `https://lesta-platform-staging.vercel.app`
- Development: `http://localhost:5173`

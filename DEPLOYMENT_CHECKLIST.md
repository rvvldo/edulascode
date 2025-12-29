# ✅ Deployment Checklist

## Pre-Deployment

### 1. Environment Setup
- [ ] Copy `.env.example` to `.env.production`
- [ ] Fill in all Firebase production credentials
- [ ] Verify all `VITE_*` variables are set
- [ ] Test build locally: `npm run build`

### 2. Firebase Configuration
- [ ] Set up Firebase Realtime Database Rules
- [ ] Enable Email/Password authentication
- [ ] Configure authorized domains
- [ ] Test Firebase connection

### 3. Code Quality
- [ ] Run linter: `npm run lint`
- [ ] Remove console.logs (production)
- [ ] Check for TODO comments
- [ ] Test all features locally

### 4. Assets
- [ ] Optimize images (WebP format)
- [ ] Check all image paths
- [ ] Verify favicon exists
- [ ] Test maskot.webp loads

---

## Deployment Steps

### Option A: Vercel (Recommended)
```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Environment Variables:**
1. Go to Vercel Dashboard
2. Project Settings > Environment Variables
3. Add all `VITE_*` variables
4. Redeploy

### Option B: Netlify
```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Environment Variables:**
1. Go to Netlify Dashboard
2. Site Settings > Environment Variables
3. Add all `VITE_*` variables
4. Redeploy

### Option C: Firebase Hosting
```bash
# Install CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (first time only)
firebase init hosting

# Build & Deploy
npm run build
firebase deploy --only hosting
```

---

## Post-Deployment

### 1. Functional Testing
- [ ] Visit deployed URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test logout
- [ ] Navigate all pages
- [ ] Test story viewer
- [ ] Test profile page
- [ ] Test photo upload
- [ ] Test leaderboard
- [ ] Test dark/light mode

### 2. Performance Testing
- [ ] Run Lighthouse audit
- [ ] Check page load speed
- [ ] Test on mobile device
- [ ] Test on different browsers
- [ ] Check image loading

### 3. Security Check
- [ ] HTTPS enabled (should be automatic)
- [ ] Firebase Rules are restrictive
- [ ] No sensitive data in console
- [ ] Test unauthorized access
- [ ] Verify CORS settings

### 4. Monitoring Setup
- [ ] Set up error tracking (optional)
- [ ] Enable Firebase Analytics
- [ ] Monitor performance
- [ ] Set up alerts (optional)

---

## Quick Commands

### Build for Production
```bash
npm run build
```

### Preview Build Locally
```bash
npm run preview
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

### Deploy to Firebase
```bash
npm run build && firebase deploy --only hosting
```

---

## Troubleshooting

### Build Fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Working
- Restart dev server
- Check variable names start with `VITE_`
- Verify `.env.production` exists

### 404 on Page Refresh
- Check `vercel.json` / `netlify.toml` / `firebase.json`
- Ensure SPA redirect is configured

### Firebase Connection Error
- Verify Firebase config
- Check Firebase Rules
- Ensure project is active

---

## Success Criteria

✅ Site loads without errors
✅ All routes work
✅ Authentication works
✅ Firebase connection works
✅ Images load correctly
✅ Mobile responsive
✅ HTTPS enabled
✅ Performance score > 90

---

## Next Steps After Deployment

1. **Custom Domain** (optional)
   - Add custom domain in hosting dashboard
   - Update DNS records
   - Wait for SSL certificate

2. **Monitoring**
   - Check Firebase Console daily
   - Monitor user activity
   - Review error logs

3. **Maintenance**
   - Regular updates
   - Security patches
   - Feature improvements

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Firebase Docs**: https://firebase.google.com/docs
- **Vite Docs**: https://vitejs.dev/guide/

---

## Emergency Rollback

If deployment fails:

### Vercel
```bash
vercel rollback
```

### Netlify
Go to Deploys > Click previous deploy > Publish

### Firebase
```bash
firebase hosting:rollback
```

---

🎉 **Ready to Deploy!**

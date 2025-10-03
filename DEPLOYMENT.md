# 🚀 Deployment Guide - HedgeGuard AI

## 📋 Pre-Deployment Checklist

- [ ] All features working correctly
- [ ] Responsive design tested on multiple devices
- [ ] Performance optimized
- [ ] Build process successful
- [ ] No console errors
- [ ] Cross-browser compatibility verified

## 🛠️ Build Process

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### 3. Test Production Build Locally
```bash
npm run preview
```

## 🌐 Deployment Options

### Option 1: Firebase Hosting (Recommended)

#### Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting
```

#### Configuration
When prompted:
- Select "Use an existing project" or create new
- Public directory: `dist`
- Single-page app: `Yes`
- Overwrite index.html: `No`

#### Deploy
```bash
firebase deploy
```

Your app will be available at: `https://your-project-id.web.app`

### Option 2: Netlify

#### Method 1: Drag & Drop
1. Build your project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist/` folder to the deploy area

#### Method 2: Git Integration
1. Push your code to GitHub/GitLab
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Option 3: Vercel

#### Setup
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 4: GitHub Pages

#### Setup
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```
3. Deploy: `npm run deploy`

## 🔧 Environment Configuration

### Production Environment Variables
Create `.env.production`:
```env
VITE_API_URL=https://your-api-domain.com
VITE_APP_NAME=HedgeGuard AI
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
```

### Build Optimization
Update `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          globe: ['./src/components/AnimatedGlobe.jsx']
        }
      }
    }
  }
})
```

## 📊 Performance Optimization

### Bundle Analysis
```bash
npm install --save-dev vite-bundle-analyzer
```

Add to `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
  plugins: [
    react(),
    analyzer()
  ]
})
```

### Compression
```bash
npm install --save-dev vite-plugin-compression
```

## 🔒 Security Considerations

### Content Security Policy
Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

### HTTPS
- Ensure all deployments use HTTPS
- Configure redirects from HTTP to HTTPS
- Use secure headers

## 📱 PWA Configuration

### Service Worker
Create `public/sw.js`:
```javascript
const CACHE_NAME = 'hedgeguard-ai-v1'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  )
})
```

### Manifest
Create `public/manifest.json`:
```json
{
  "name": "HedgeGuard AI",
  "short_name": "HedgeGuard",
  "description": "Advanced Financial Risk Management Platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0f",
  "theme_color": "#00ffff",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🔍 Monitoring & Analytics

### Performance Monitoring
```bash
npm install --save-dev web-vitals
```

### Error Tracking
Consider integrating:
- Sentry for error tracking
- Google Analytics for usage analytics
- Hotjar for user behavior

## 🚨 Troubleshooting

### Common Issues

#### Build Fails
- Check for TypeScript errors
- Verify all imports are correct
- Ensure all dependencies are installed

#### Globe Not Rendering
- Check browser console for errors
- Verify canvas support
- Test on different browsers

#### Performance Issues
- Reduce particle count in AnimatedGlobe.jsx
- Optimize animation loops
- Use browser dev tools to profile

### Debug Mode
Add to `vite.config.js`:
```javascript
export default defineConfig({
  define: {
    __DEBUG__: JSON.stringify(true)
  }
})
```

## 📈 Post-Deployment

### Testing Checklist
- [ ] All pages load correctly
- [ ] Globe animation works smoothly
- [ ] Responsive design functions properly
- [ ] No console errors
- [ ] Performance metrics acceptable
- [ ] Cross-browser compatibility

### Monitoring
- Set up uptime monitoring
- Configure error alerts
- Track performance metrics
- Monitor user feedback

## 🔄 Continuous Deployment

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Build
      run: npm run build
    - name: Deploy to Firebase
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
        channelId: live
        projectId: your-project-id
```

---

**Ready to deploy! 🚀**

Choose your preferred deployment method and follow the steps above. The HedgeGuard AI platform is ready for production deployment with its stunning animated globe and advanced financial risk management features.

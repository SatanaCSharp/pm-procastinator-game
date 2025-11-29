# Deployment Guide

This document provides detailed instructions for deploying the PM Procrastinator Game to Vercel.

## Quick Deploy

### 🚀 Vercel (Recommended)

1. **Via Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings from `vercel.json`
   - Click "Deploy"

2. **Via Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel
   ```

**Configuration:** Already set up in `vercel.json`

The `vercel.json` includes:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing support (all routes redirect to index.html)
- Asset caching headers for optimal performance

### 📦 Alternative: GitHub Pages

1. **Automatic Deployment (via GitHub Actions):**
   - Push code to `master` or `main` branch
   - Go to repository Settings → Pages
   - Select source: "GitHub Actions"
   - The workflow will automatically deploy on push

2. **Manual Setup:**
   ```bash
   npm run build
   # Then push dist/ to gh-pages branch
   ```

**Configuration:** Workflow file at `.github/workflows/deploy.yml`

## Build Process

The build process is standardized across all platforms:

```bash
npm install    # Install dependencies
npm run build  # Build the project
```

Output: `dist/` directory with optimized production files

## Environment Setup

Currently, no environment variables are required. The app works out of the box.

If you need to add environment variables in the future:

1. Create `.env` for local development
2. Add variables in your hosting platform's dashboard
3. Use `import.meta.env.VITE_*` in your code

## Custom Domain Setup

### Vercel
- Go to Project Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

### GitHub Pages
- Go to repository Settings → Pages
- Enter custom domain
- Add CNAME file to repository

## Performance Optimization

The build is already optimized with:
- ✅ Code minification
- ✅ Tree-shaking
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Vendor chunk separation

## Troubleshooting

### Build Fails
- Check Node.js version (requires v18+)
- Run `npm ci` to ensure clean install
- Check for linting errors: `npm run lint`

### Routing Issues (404 on refresh)
- Ensure SPA routing is configured in `vercel.json` (already done)
- The rewrite rule `"source": "/(.*)", "destination": "/index.html"` handles all routes

### Assets Not Loading
- Verify `dist/assets/` directory exists after build
- Check that base path is correct in `vite.config.ts`

## Post-Deployment Checklist

- [ ] Test all game features
- [ ] Verify routing works (try refreshing on different pages)
- [ ] Check mobile responsiveness
- [ ] Test on different browsers
- [ ] Verify meta tags for social sharing
- [ ] Check console for errors
- [ ] Test performance (Lighthouse score)

## Support

For deployment issues, check:
- Platform-specific documentation
- GitHub Issues
- Build logs in your hosting platform


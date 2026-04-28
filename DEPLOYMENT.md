# Deployment Guide for Burgerville React App

This guide walks you through uploading your React app to GitHub and hosting it on various platforms.

## Step 1: Push to GitHub

### 1.1 Create a GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the **+** icon in the top right → **New repository**
3. Name it: `burgerville`
4. Add description: "Restaurant website built with React"
5. Choose **Public** (so it can be easily deployed)
6. Click **Create repository**

### 1.2 Initialize Git & Push

Run these commands in your `Burgerville` folder:

```bash
# Initialize git
git init

# Add your GitHub repository (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/burgerville.git

# Rename branch to main (if not already)
git branch -M main

# Stage all files
git add .

# Create first commit
git commit -m "Initial commit: Convert Burgerville website to React"

# Push to GitHub
git push -u origin main
```

Done! Your code is now on GitHub.

---

## Step 2: Deploy to Vercel (Easiest)

Vercel is optimized for React/Vite apps and offers instant deploys.

### 2.1 Deploy

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign up** (you can use your GitHub account)
3. Click **Add New** → **Project**
4. Click **Import Git Repository**
5. Select your `burgerville` repository
6. Click **Import**
7. Vercel automatically detects Vite settings
8. Click **Deploy** ✅

**Your site is live!** Vercel will show you a URL like `https://burgerville.vercel.app`

### 2.2 Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click **Domains**
3. Add your custom domain (e.g., `burgerville-restaurant.com`)
4. Follow DNS setup instructions

---

## Step 3: Deploy to Netlify (Alternative)

### 3.1 Deploy

1. Go to [netlify.com](https://netlify.com)
2. Click **Sign up** (use GitHub)
3. Click **Add new site** → **Import an existing project**
4. Select **GitHub**
5. Choose your `burgerville` repository
6. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Click **Deploy site**

Your site is live! Netlify will generate a URL like `https://burgerville-xxx.netlify.app`

---

## Step 4: Deploy to GitHub Pages (Free)

### 4.1 Update Configuration

1. Open `vite.config.js` and add:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/burgerville/',  // Replace 'burgerville' with your repo name
})
```

2. Update `package.json` scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```

### 4.2 Install & Deploy

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

Your site is live at: `https://YOUR-USERNAME.github.io/burgerville`

---

## Step 5: Update Your Site After Deployment

### Making Changes

1. Edit files locally
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Your message"
   git push
   ```

3. **Vercel/Netlify**: Auto-deploys on every push! 🚀
4. **GitHub Pages**: Run `npm run deploy` to update

---

## Comparison of Hosting Options

| Platform | Cost | Setup Time | Auto-Deploy | Custom Domain |
|----------|------|-----------|------------|----------------|
| **Vercel** | Free | 2 minutes | ✅ Yes | ✅ Paid |
| **Netlify** | Free | 2 minutes | ✅ Yes | ✅ Paid |
| **GitHub Pages** | Free | 5 minutes | ⚠️ Manual | ✅ Yes |

**Recommendation**: Use **Vercel** - it's the fastest for Vite apps and most user-friendly.

---

## Troubleshooting

### "Build failed" error
- Check that all dependencies are installed: `npm install`
- Ensure no syntax errors: `npm run build` locally
- Check build logs in the hosting platform dashboard

### Blank page after deployment
- For GitHub Pages: Make sure `base: '/your-repo-name/'` is set in vite.config.js
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)

### Custom domain not working
- Verify DNS settings are correct (usually takes 24-48 hours)
- For Vercel/Netlify: Check domain settings in dashboard
- Point your domain's nameservers to the hosting provider

---

## Environment Variables (Optional)

If you need to add API keys or secrets:

1. Create a `.env` file (don't commit it):
   ```
   VITE_API_URL=https://api.example.com
   ```

2. Access in code:
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

3. In hosting dashboard, set environment variables in settings

---

## Performance Tips

1. **Minimize bundle size**: Images are already optimized (using external URLs)
2. **Enable caching**: Vercel/Netlify do this automatically
3. **Monitor**: Check Lighthouse scores (Vercel provides this)

---

## Next Steps

- Add a checkout/payment system
- Set up email notifications
- Add user authentication
- Create an admin panel
- Optimize images (consider using WebP)

Good luck! 🎉

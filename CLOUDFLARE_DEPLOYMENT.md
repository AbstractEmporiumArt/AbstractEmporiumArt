# Cloudflare Deployment Guide

This guide will walk you through deploying your Abstract Emporium website to Cloudflare Pages and connecting it with your Git repository.

## Prerequisites

1. **Cloudflare Account** - Sign up at https://dash.cloudflare.com/
2. **GitHub Account** - Sign up at https://github.com/ (recommended)
3. **Git Installed** - Already configured in your project ✓

## Step 1: Push Your Repository to GitHub

### 1.1 Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `AbstractEmporium` (or your preferred name)
3. Description: "Abstract Emporium Art - Official Website"
4. Choose Public or Private
5. Click "Create repository"

### 1.2 Push Your Code to GitHub

Run these commands in your project directory:

```powershell
cd "c:\Users\bookw\OneDrive\Desktop\Abstract Emporium\1Site-AbstractEmporium"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Abstract Emporium website with banner, logo, and social media links"

# Add remote origin (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Cloudflare Pages

### 2.1 Connect Cloudflare to GitHub

1. Go to https://dash.cloudflare.com
2. In the left sidebar, click **"Pages"**
3. Click **"Connect to Git"**
4. Select **"GitHub"**
5. Authorize Cloudflare to access your GitHub account
6. Select your repository (`AbstractEmporium`)
7. Click "Install & Authorize"

### 2.2 Configure Build Settings

1. **Project name**: `abstractemporium` (will create abstractemporium.pages.dev)
2. **Production branch**: `main`
3. **Build command**: Leave empty (static site)
4. **Build output directory**: `/` (root directory)
5. Click **"Save and Deploy"**

## Step 3: Setup Custom Domain (Optional)

### 3.1 Point Your Domain to Cloudflare

If you have a custom domain (e.g., abstractemporiumart.com):

1. In Cloudflare Pages, go to your project settings
2. Click **"Custom domain"**
3. Enter your domain name
4. Follow the instructions to update your domain's nameservers

## Step 4: Future Updates

### Push Updates via Git

After making changes locally:

```powershell
git add .
git commit -m "Your commit message"
git push origin main
```

Cloudflare will automatically redeploy your site!

## Key URLs

- **Cloudflare Pages Dashboard**: https://dash.cloudflare.com/pages
- **Your Site URL**: `https://abstractemporium.pages.dev` (replace with your project name)
- **GitHub Repository**: https://github.com/YOUR_USERNAME/YOUR_REPO_NAME

## Troubleshooting

### Site not updating after git push?
- Check the "Deployments" tab in Cloudflare Pages
- Look at the deployment logs for errors

### Build failed?
- Ensure all files (including the banner image) are in the root directory
- Check that image filenames match exactly in HTML

## File Structure Expected

```
/
├── index.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── abstract-emporium-logo.png
├── the-hug-banner.png
└── README.md
```

## Next Steps

1. Replace placeholder images (`abstract-emporium-logo.png`, `the-hug-banner.png`) with actual images
2. Update social media links if they change
3. Monitor deployment status in Cloudflare dashboard
4. Consider setting up analytics in Cloudflare

---

For more information, visit: https://developers.cloudflare.com/pages/

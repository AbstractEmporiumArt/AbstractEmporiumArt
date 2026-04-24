# GitHub Secrets Setup Guide

## 🔐 Adding Your Personal Access Token as a Secret

### Step 1: Navigate to Repository Settings
1. Go to: https://github.com/AbstractEmporiumArt/AbstractEmporiumArt
2. Click **Settings** (top right)
3. In left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add Your Personal Access Token
1. Click **New repository secret**
2. Name: `GithubToken`
3. Value: Paste your Personal Access Token
4. Click **Add secret**

✅ **Done!** Your token is now secure and accessible to GitHub Actions workflows.

---

## 🌐 Social Media API Secrets Required

To enable automated social media posting, you'll need to add these secrets:

### Mastodon Secrets
1. **`MastodonAccessToken`**
   - Get from: Your Mastodon instance → Settings → Development → New Application
   - Required scopes: `write:statuses`

2. **`MastodonInstanceUrl`**
   - Example: `https://mastodon.social`
   - Your Mastodon server URL

### Bluesky Secrets
1. **`BlueskyHandle`**
   - Your Bluesky username (e.g., `abstractemporium.bsky.social`)

2. **`BlueskyAppPassword`**
   - Generate app password at: https://bsky.app/settings/app-passwords
   - Click "Add App Password" → Name it "GitHub Actions"
   - Copy the password (you can't see it again!)

---

## 📝 How to Add Each Secret

For **each secret** above:

1. Go to: https://github.com/AbstractEmporiumArt/AbstractEmporiumArt/settings/secrets/actions
2. Click **New repository secret**
3. Enter the secret **Name** (exactly as shown above)
4. Paste the **Value**
5. Click **Add secret**

---

## ✅ Verification Checklist

After adding all secrets, you should see:

- [ ] `GithubToken` (Personal Access Token)
- [ ] `MastodonAccessToken`
- [ ] `MastodonInstanceUrl`
- [ ] `BlueskyHandle`
- [ ] `BlueskyAppPassword`

---

## 🚀 Next Steps

Once secrets are added:
1. GitHub Actions workflows will automatically use them
2. Scheduled posts will begin based on your `content-queue.json`
3. Check the **Actions** tab to monitor posting status

---

## 🔒 Security Notes

- ✅ Secrets are encrypted and never shown in logs
- ✅ Only GitHub Actions workflows can access them
- ✅ You can update or delete secrets anytime
- ⚠️ Never commit secrets to your repository code

---

## 🆘 Getting Your API Credentials

### Mastodon
1. Log into your Mastodon account
2. Go to **Settings** → **Development**
3. Click **New application**
4. Name: "Abstract Emporium Bot"
5. Scopes: Select `write:statuses`
6. Click **Submit**
7. Copy your **Access token**

### Bluesky
1. Log into: https://bsky.app
2. Go to **Settings** → **App Passwords**
3. Click **Add App Password**
4. Name: "GitHub Actions Bot"
5. Copy the generated password immediately (can't view again)

---

## 📊 Testing Your Setup

After adding secrets, test by:
1. Go to **Actions** tab in your repo
2. Select "Social Media Auto-Poster" workflow
3. Click **Run workflow** → **Run workflow**
4. Check if posts appear on Mastodon/Bluesky

---

**Need help?** Check GitHub Actions logs in the **Actions** tab for error messages.

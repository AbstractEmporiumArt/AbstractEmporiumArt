# GitHub Authentication Fix

You're getting a permission error. Here are two solutions:

## Option 1: Use GitHub Personal Access Token (Easiest - Recommended)

### Step 1: Create a Personal Access Token on GitHub
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "AbstractEmporium"
4. Check the "repo" checkbox (under scope)
5. Click "Generate token"
6. **Copy the token** (you'll only see it once!)

### Step 2: Use the Token for Authentication

When Git asks for a password, use your personal access token:

```powershell
cd "c:\Users\bookw\OneDrive\Desktop\Abstract Emporium\1Site-AbstractEmporium"

git push -u origin main
```

When prompted:
- **Username**: `AbstractEmporiumArt`
- **Password**: Paste your personal access token

---

## Option 2: Setup SSH (More Secure Long-term)

If you prefer SSH authentication:

```powershell
# Generate SSH key
ssh-keygen -t ed25519 -C "abstractemporiumarrt@outlook.com"

# Follow prompts (press Enter for defaults)

# Copy SSH key to clipboard
$key = Get-Content ~/.ssh/id_ed25519.pub
$key | Set-Clipboard
```

Then add it to GitHub:
1. Go to https://github.com/settings/ssh/new
2. Paste your key
3. Click "Add SSH key"

Update your Git remote:
```powershell
git remote set-url origin git@github.com:AbstractEmporiumArt/AbstractEmporiumArt.git
git push -u origin main
```

---

## Quick Fix - Use Stored Credentials

If you have GitHub Desktop or Git Credential Manager installed:

```powershell
git config --global credential.helper wincred
git push -u origin main
```

This will open a login dialog where you can authenticate once, and it'll remember your credentials.

---

**Recommended**: Go with Option 1 (Personal Access Token) - it's the quickest! Takes 2 minutes.

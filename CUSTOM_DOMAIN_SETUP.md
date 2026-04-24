# Custom Domain Setup Guide

## 🎉 Your New Domain: abstractemporium.art

Congratulations! You've received a **FREE domain for 1 year** from Get.art (Hug.art)!

---

## ✅ What's Been Done

1. **CNAME file created** - Contains `abstractemporium.art`
2. **All website URLs updated** - 6 social media posts + meta tags
3. **Custom domain ready** - Push to GitHub and configure DNS

---

## 🚀 Setup Steps

### Step 1: Push CNAME to GitHub

```powershell
git add CNAME
git commit -m "Add custom domain: abstractemporium.art"
git push origin main
```

### Step 2: Configure DNS at Get.art

1. Log into **Get.art** control panel (https://get.art/cp/account.php)
2. Go to your domain: **abstractemporium.art**
3. Click **DNS Settings** or **Manage DNS**
4. Add these DNS records:

#### A Records (Point to GitHub Pages):
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

#### CNAME Record (For www subdomain):
```
Type: CNAME
Name: www
Value: abstractemporiumart.github.io
TTL: 3600
```

5. **Save changes**

---

### Step 3: Enable Custom Domain in GitHub

1. Go to: https://github.com/AbstractEmporiumArt/AbstractEmporiumArt/settings/pages

2. Under **Custom domain**, enter: `abstractemporium.art`

3. Click **Save**

4. Wait 1-2 minutes for DNS check

5. ✅ Check **Enforce HTTPS** (after DNS propagates)

---

## ⏰ DNS Propagation Time

- **Minimum:** 15-30 minutes
- **Typical:** 1-2 hours
- **Maximum:** 24-48 hours

**Check propagation status:**
- https://www.whatsmydns.net/#A/abstractemporium.art

---

## 🔒 HTTPS/SSL Certificate

GitHub Pages automatically provides a **free SSL certificate** via Let's Encrypt once:
1. DNS is configured correctly
2. Custom domain is saved in GitHub Pages settings
3. DNS has propagated (usually 10-30 minutes)

**Note:** You may see "Certificate error" for the first hour while GitHub provisions the SSL certificate. This is normal!

---

## ✅ Verification Checklist

Once DNS propagates, test these URLs:

- [ ] http://abstractemporium.art → Loads your website
- [ ] https://abstractemporium.art → Loads with HTTPS (green padlock)
- [ ] http://www.abstractemporium.art → Redirects to main domain
- [ ] https://www.abstractemporium.art → Redirects to main domain with HTTPS

---

## 🎯 What This Changes

### Old URL:
`https://abstractemporiumart.github.io/AbstractEmporiumArt/`

### New URL:
`https://abstractemporium.art/`

**Benefits:**
- ✨ Professional branded domain
- 🚀 Easier to remember & share
- 📈 Better for SEO
- 💼 More credible for customers
- 🎁 FREE for 1 year!

---

## 📝 Updated Files

1. **CNAME** - Custom domain configuration
2. **content-queue.json** - All 6 social media post links
3. **index.html** - Meta og:url tag
4. **All future posts** - Will use new domain

---

## 🆘 Troubleshooting

### "Domain is already taken" error on GitHub
- Make sure you own the domain
- Verify CNAME file contains only: `abstractemporium.art`
- Remove any extra whitespace or characters

### Website shows 404 after adding domain
- Wait for DNS propagation (15 min - 2 hours)
- Verify A records point to correct GitHub IPs
- Check CNAME file is in repository root

### SSL certificate not working
- Wait 30-60 minutes after DNS propagates
- Uncheck "Enforce HTTPS", wait 5 minutes, check again
- Clear browser cache and try incognito mode

### "DNS check unsuccessful" in GitHub
- Verify A records are correct
- Make sure DNS has propagated (check whatsmydns.net)
- Wait up to 24 hours in rare cases

---

## 🔄 Domain Renewal

Your domain is **FREE for 1 year** via Get.art/Hug.art!

**Before expiration (around April 2027):**
1. Get.art will send renewal reminder emails
2. Renewal cost: ~$10-15/year (typical .art domain pricing)
3. Or transfer to another registrar (GoDaddy, Namecheap, etc.)

**To keep your domain:**
- Set a calendar reminder 2-3 months before expiration
- Have payment method ready
- Renew through Get.art control panel

---

## 📧 Email Setup (Optional - Future)

Want email at your new domain? (e.g., hello@abstractemporium.art)

**Free options:**
- **ImprovMX** - Free email forwarding to your Outlook
- **Zoho Mail** - Free custom domain email (5 users)
- **Google Workspace** - $6/month, professional Gmail

**Setup later:** Focus on getting website live first!

---

## 🎊 Next Steps

1. ✅ Push CNAME file to GitHub
2. ⏱️ Configure DNS at Get.art
3. ⏱️ Enable custom domain in GitHub Pages settings
4. ☕ Wait for DNS propagation (15 min - 2 hours)
5. 🔒 Enable "Enforce HTTPS" in GitHub Pages
6. 🎉 Test your new domain!

---

## 🌐 Your New URLs

- **Homepage:** https://abstractemporium.art/
- **Gallery:** https://abstractemporium.art/gallery.html
- **Shop:** https://abstractemporium.art/shop.html
- **Contact:** https://abstractemporium.art/contact.html
- **Patterns:** https://abstractemporium.art/pattern.html

---

**🎉 Congratulations on your professional new domain!**

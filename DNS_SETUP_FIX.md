# DNS Setup Fix for Get.art

## ⚠️ Issue: Get.art Only Shows One A Record Field

You're seeing a single A record field with IP `146.190.179.75` (which is incorrect for GitHub Pages).

## ✅ Solution: Use GitHub's Alternative DNS Setup

Since Get.art's DNS panel may not support multiple A records in their interface, use this workaround:

### Option 1: Contact Get.art Support (Recommended)
1. Email Get.art support: support@get.art
2. Request they add these 4 A records for `abstractemporium.art`:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. And 1 CNAME record: `www` → `abstractemporiumart.github.io`

### Option 2: Use Cloudflare DNS (Free & More Control)
1. Sign up at https://cloudflare.com (free plan)
2. Add domain: `abstractemporium.art`
3. Cloudflare will give you 2 nameservers (e.g., `ns1.cloudflare.com`)
4. Go back to Get.art DNS panel
5. Change nameservers to Cloudflare's
6. In Cloudflare DNS, add all 4 A records + CNAME
7. Enable "Proxy" (orange cloud) for better performance

### Option 3: Try Adding Records One at a Time
If Get.art allows multiple A records but only shows one field:
1. Save the first A record: `@` → `185.199.108.153`
2. Click "Add another record" or similar button
3. Repeat for all 4 IPs

### Current DNS Record (What You See)
```
Type: A
Name: @.abstractemporium.art
IPv4: 146.190.179.75
TTL: 14400
```

### What It SHOULD Be (GitHub Pages)
```
Type: A | Name: @ | Value: 185.199.108.153
Type: A | Name: @ | Value: 185.199.109.153
Type: A | Name: @ | Value: 185.199.110.153
Type: A | Name: @ | Value: 185.199.111.153
Type: CNAME | Name: www | Value: abstractemporiumart.github.io
```

## 🚀 Fastest Solution Right Now

**Replace the existing A record IP:**
- Change `146.190.179.75` to `185.199.108.153`
- This will make your site work (not ideal but functional)
- Then contact Get.art support to add the other 3 A records

**Why 4 A records?**
- Redundancy: If one GitHub server is down, others work
- Load balancing: Distributes traffic
- Best practice for GitHub Pages custom domains

## ⏱️ After DNS is Fixed
1. Go to GitHub Pages settings
2. Enter custom domain: `abstractemporium.art`
3. Wait for DNS check (5-30 minutes)
4. Enable "Enforce HTTPS"
5. Test: https://abstractemporium.art/

## 📧 Contact Get.art Support
- Email: support@get.art
- Subject: "Need to add multiple A records for GitHub Pages"
- Body: "Hi, I need to configure my domain abstractemporium.art for GitHub Pages hosting. This requires 4 A records pointing to GitHub's IPs. Can you help me add these records or provide instructions? IPs: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153. Thank you!"

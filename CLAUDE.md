# Abstract Emporium - Project Memory & Conventions

**Last Updated:** July 19, 2026  
**Status:** Live in production, zero sales, GitHub optimized and secured, ready for marketing push

---

## PROJECT OVERVIEW

**What:** Handmade + digital art studio — Z3NW1CK candles/wax melts/incense, Lissa's Knitting Creations (slippers/tuques/cloths/scarves), abstract art prints (POD), therapeutic coloring books (Ko-fi), commissions.  
**Business Model:** Ko-fi coloring books ($7.99-$19.99) + art marketplace presence (Fine Art America, ArtPal, RedBubble, TheHug.art)  
**Tech Stack:** Static HTML/CSS/JS site deployed on Cloudflare Pages  
**Repository:** https://github.com/AbstractEmporiumArt/AbstractEmporiumArt  
**Live Site:** https://abstractemporium.art

---

## CRITICAL CONTEXT (Read First)

### ✅ What Actually Works
- Ko-fi integration: All 4 coloring books published and linked correctly
- Cloudflare Pages deployment: Auto-deploys from GitHub main branch
- Payment flow: Homepage → Ko-fi → Instant PDF delivery (tested, functional)
- Art platforms: All 5 platforms active with product listings

### ❌ What Doesn't Work (Yet)
- **ZERO traffic** - No visitors, no sales, no marketing executed
- Social media automation scripts exist but never run
- Email automation configured but no subscribers
- Knitting *pattern bundles* REMOVED entirely from site (2026-07-19) — too much competition. Lissa's Knitting Creations (slippers/tuques/cloths/scarves) is ACTIVE physical line, site focus.

### 🎯 Current Priority (updated 2026-07-12)
**Site focus (updated 2026-07-19):** Z3NW1CK (candles/wax melts/incense) + Lissa's Knitting Creations (slippers/tuques/cloths/scarves) lead the homepage; POD art prints (ArtPal/FAA/Redbubble/TheHug) follow; Coloring Books (Ko-fi) + Commissions still live. Knitting *pattern bundles* removed entirely.

---

## CORE PRINCIPLES

### 1. **No More Documentation Without Execution**
- 80+ markdown files exist, most never implemented
- Before creating new guides: Execute what exists first
- Bias toward action over planning

### 2. **Active Product Lines (updated 2026-07-12)**
- **Z3nw1ck** (PRIMARY): hand-poured candles (2oz/2.5oz/5oz), wax melts, incense — soy wax + premium FO. Inventory live (see z3nw1ck.html).
- **Lissa's Knitting Creations** (ACTIVE): slippers, tuques, wash cloths, scarves — physical line, NOT bundles.
- **Commissions** (fluid/freehand abstract art): needs page build.
- **Coloring Books** (Ko-fi): 4 books, still live.
- **Art POD** (ArtPal/FAA/RedBubble/TheHug): passive, zero effort.
- Don't add NEW product categories until first 50 sales achieved across existing

### 3. **Traffic Before Features**
- Website works, payment works, products exist on all platforms
- Problem: Zero traffic to Ko-fi OR art marketplace stores
- Solution: Manual marketing (Reddit, Facebook, Pinterest, Instagram) NOW for BOTH coloring books AND art prints
- Don't build automation until manual process validated

### 4. **Surgical Edits Only**
- When touching code: Change only what's broken or blocking sales
- Don't "improve" working pages
- Don't add features nobody requested

---

## TECH STACK & ARCHITECTURE

### Frontend
- **HTML/CSS/JS** - Vanilla, no frameworks (intentional simplicity)
- **No build process** - Static files only
- **Responsive design** - Mobile-first CSS

### Key Files
- `index.html` - Homepage; leads with Z3NW1CK + Lissa's Knitting Creations, PODs follow
- `about.html` - Lissa's story + 3 carousels (4 origin pours, 4 wood pours, 4 freehand drawings)
- `bundle-chaos-calm.html` - Individual coloring book page
- `bundle-invisible-pain.html` - Individual coloring book page  
- `bundle-healing-lines.html` - Individual coloring book page
- `bundle-abstract-mind.html` - Complete 200-page bundle
- `shop-everywhere.html` - Platform comparison page
- `paypal-integration.js` - Ko-fi redirect logic (working)

### Deployment
- **Host:** Cloudflare Pages
- **DNS:** Cloudflare (abstractemporium.art)
- **Deploy:** Auto on push to `main` branch
- **No secrets needed** - All client-side, Ko-fi handles payments

### GitHub Maintenance (Optimized May 31, 2026)
- **Security:** SECURITY.md policy published, zero vulnerabilities
- **Workflows:** 8 GitHub Actions using Node.js 24 (future-proof)
- **Dependabot:** Weekly auto-updates (Mondays 3am) for npm + GitHub Actions
- **Automation:** CodeQL, Gitleaks, npm audit running automatically
- **Status:** ✅ All workflows passing, fully maintained
- **Docs:** See GITHUB_OPTIMIZATION_COMPLETE.md for details

### Analytics
- Cloudflare Web Analytics (basic)
- `analytics-tracking.js` - Custom event tracking (installed, not yet used)

---

## PRODUCT CATALOG

### Coloring Books (Ko-fi)
1. **Chaos & Calm** - $7.99 - https://ko-fi.com/s/5072178dee
2. **Invisible Pain** - $7.99 - https://ko-fi.com/s/055c3fda6c  
3. **Healing Lines** - $7.99 - https://ko-fi.com/s/b3aafaae02
4. **Abstract Mind Collection** - $19.99 - https://ko-fi.com/s/c61dcbbf95

### Art Platforms (Print-on-Demand)
- Fine Art America: https://fineartamerica.com/profiles/lissa-beaulieu/shop
- ArtPal: https://www.artpal.com/Abstractemporium/
- RedBubble: https://www.redbubble.com/people/abstractempco23/explore
- TheHug.art: https://thehug.xyz/artists/AbstractEmporiumArt/shop

### Social Media & Marketing
- **Pinterest:** https://pin.it/2aJQrjp7a
  - Main Profile: https://ca.pinterest.com/abstractemporiumart/
  - ArtPal Board: https://pin.it/dxxyEHejg (17 pins, 3 sections) ✅
  - Fine Art America Board: https://pin.it/6T8P5opBW (20+ pins, 2 sections) ✅
  - Coloring Books Board: https://pin.it/2NaxvqYZB 
  - RedBubble Board: https://pin.it/rATnDMjdV
- **Mastodon:** https://mastodon.social/@AbstractEmporiumArt (automated daily posts)
- **Bluesky:** https://bsky.app/profile/abstractemporium.bsky.social (automated daily posts)
- **Facebook:** 
  - Abstract Emporium Page: https://www.facebook.com/abstractemporium
  - Lissa's Knitting Creations: https://www.facebook.com/LissaKnittingCreations/
  - Manual cross-posts from Mastodon/Bluesky
- **Instagram:** https://www.instagram.com/Abstractemporiumart
- **X/Twitter:** https://x.com/AbstractEmpCo23 (Manual cross-posts from Mastodon/Bluesky)
- **TheHug.art:** https://hug.art/artists/AbstractEmporiumArt

---

## FILE ORGANIZATION

### Active Product Pages
```
bundle-chaos-calm.html          (Coloring book 1)
bundle-invisible-pain.html      (Coloring book 2)
bundle-healing-lines.html       (Coloring book 3)
bundle-abstract-mind.html       (Complete bundle)
```

### Navigation Pages
```
index.html                      (Homepage with Ko-fi CTAs)
gallery.html                    (Art showcase)
shop-everywhere.html            (Platform comparison)
contact.html                    (Contact form)
```

### Marketing Assets (Not Yet Used)
```
FIRST_10_SALES_POSTS.md        (Copy-paste social posts - USE THIS)
social-auto-poster.js           (Automation script - unused)
content-queue.json              (30 days content - unused)
```

### Legacy/Reference (Ignore Unless Needed)
```
KNITTING_*.md                   (80+ files - archive mentally; pattern bundles removed from site 2026-07-19)
```

---

## WORKFLOW RULES

### When Asked to "Fix" or "Improve" Something

1. **Verify it's actually broken first**
   - Check live site: https://abstractemporium.art
   - Test user flow: Homepage → Ko-fi → Purchase
   - If it works, DON'T touch it

2. **Identify the real problem**
   - "No sales" ≠ broken code (it's zero traffic)
   - "Want more features" ≠ blocking issue (marketing first)
   - Only fix what prevents sales

3. **Surgical edit only**
   - Change minimum code necessary
   - Don't refactor working systems
   - Test immediately after change

### When Asked to "Add Marketing Automation"

1. **Check if manual version executed first**
   - Has user posted to Reddit manually? (No → Do that first)
   - Has user tested what content works? (No → Test first)
   - Automate ONLY after manual validation

2. **Prefer existing tools over custom code**
   - Use Buffer/Hootsuite over custom scripts
   - Use Zapier over custom integrations
   - Use Ko-fi's built-in emails over Brevo (simpler)

### When Asked to "Create New Product/Feature"

**DEFAULT for unapproved categories: NO.**

APPROVED active lines (build freely): Z3nw1ck, Lissa's Knitting Creations, Commissions, Coloring Books.
REMOVED: knitting *pattern bundles* (too much competition, deleted from site 2026-07-19). New POD platforms: NO (traffic is bottleneck, not channels).

---

## COMMON PITFALLS (Avoid These)

### ❌ Documentation Paralysis
**Symptom:** "Let's create a guide for X before doing X"  
**Fix:** Do X first, document after if needed

### ❌ Premature Optimization
**Symptom:** "Let's automate social posting before manual testing"  
**Fix:** Post manually for 2 weeks, learn what works, THEN automate

### ❌ Feature Creep
**Symptom:** "Let's add Etsy + Gumroad + a 4th POD + a chatbot"
**Fix:** Master current lines (Z3nw1ck, LKC, Commissions, coloring books) before new platforms

### ❌ Platform Proliferation
**Symptom:** "Let's also sell on Etsy, Gumroad, Shopify, Amazon..."  
**Fix:** Ko-fi + 5 art platforms is already enough. Master these first.

### ❌ Analysis Paralysis
**Symptom:** "Let's research best hashtags/posting times/color theory first"  
**Fix:** Post now with good-enough content. Iterate based on real data.

---

## DECISION TREE

```
User Request
    │
    ├─ Add new feature/product?
    │   └─ Has first 50 sales? → No → DECLINE (focus marketing)
    │
    ├─ Fix broken functionality?
    │   ├─ Test live site first
    │   ├─ Is it actually broken? → No → DON'T TOUCH
    │   └─ Yes → Surgical fix only
    │
    ├─ Create marketing automation?
    │   └─ Manual version tested? → No → DO MANUAL FIRST
    │
    ├─ Write new documentation?
    │   └─ Can we execute existing docs instead? → Yes → EXECUTE, DON'T WRITE
    │
    └─ Marketing/content help?
        └─ FIRST_10_SALES_POSTS.md has ready-to-use content → USE IT
```

---

## SUCCESS METRICS

### Phase 1: Proof of Concept (Current)
- ✅ Website live
- ✅ Payment system working
- ✅ Products published
- ⏳ First 10 sales (BLOCKED: zero traffic)
- ⏳ First customer feedback

### Phase 2: Product-Market Fit (After First 10 Sales)
- Identify which book sells best
- Understand which platform drives traffic
- Collect real customer testimonials
- Validate pricing ($7.99 vs $19.99 bundle uptake)

### Phase 3: Scale (After First 50 Sales)
- Consider automation (social, email)
- Expand product line (IF customers request)
- Invest in paid ads (IF organic validates demand)

**DO NOT SKIP TO PHASE 3 WHILE IN PHASE 1**

---

## QUICK REFERENCE

### Deploy Changes
```bash
git add .
git commit -m "Description"
git push origin main
# Auto-deploys to Cloudflare Pages in ~2 minutes
```

### Test Purchase Flow
1. Go to https://abstractemporium.art
2. Click "Buy Coloring Books on Ko-fi"
3. Verify redirects to https://ko-fi.com/abstractemporium
4. Check all 4 products visible

### Check Analytics
- Cloudflare: https://dash.cloudflare.com/ → Pages → abstractemporium → Analytics
- Ko-fi sales: https://ko-fi.com/manage/shop

### Emergency Contact
- **Email:** abstractemporiumart@outlook.com
- **Ko-fi Support:** https://help.ko-fi.com

---

## AGENT INSTRUCTIONS

When working on Abstract Emporium:

1. **Read this file first** - Context prevents wasted work
2. **Verify before changing** - Test live site, check if actually broken
3. **Execute before documenting** - Bias toward shipping over planning
4. **Build approved lines** - Z3nw1ck, Lissa's Knitting Creations, Commissions, Coloring Books. POD passive. Knitting *pattern bundles* removed entirely.
5. **Marketing > Features** - Traffic is the bottleneck, not product count. Manual marketing (Reddit/FB/Pinterest/IG) for approved lines.
6. **Use FIRST_10_SALES_POSTS.md** - Ready-to-use marketing content exists

**Primary Goal:** Help user get first 10 sales (coloring books OR art prints) via manual Reddit/Facebook/Instagram posting, NOT by building new features.

---

## VERSION HISTORY

- **May 29, 2026** - CLAUDE.md created to prevent documentation paralysis and focus on sales
- **May 10, 2026** - Site deployed to production (19 days ago, still zero sales)
- **April 13, 2026** - Ko-fi products published and integrated

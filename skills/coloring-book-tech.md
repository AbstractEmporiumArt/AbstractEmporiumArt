---
name: coloring-book-tech
description: Technical knowledge for Abstract Emporium coloring book pages and Ko-fi integration. USE THIS when user asks about broken links, payment issues, product updates, or Ko-fi setup. Provides surgical fixes only. DO NOT USE for marketing/content questions.
applyTo: ["**/bundle-*.html", "**/paypal-integration.js", "**/index.html"]
---

# Coloring Book Technical Skill

**Purpose:** Fix technical issues with coloring book pages and Ko-fi integration

**When to invoke:** Broken links, payment flow issues, product page updates

**DO NOT invoke for:** Marketing, new features, automation

---

## Current Product Configuration

### Ko-fi Products (LIVE)
```javascript
const KOFI_LINKS = {
    'chaos-calm': 'https://ko-fi.com/s/5072178dee',
    'invisible-pain': 'https://ko-fi.com/s/055c3fda6c',
    'healing-lines': 'https://ko-fi.com/s/b3aafaae02',
    'abstract-mind': 'https://ko-fi.com/s/c61dcbbf95'
};
```

### Product Pages
- `bundle-chaos-calm.html` → Chaos & Calm ($7.99)
- `bundle-invisible-pain.html` → Invisible Pain ($7.99)
- `bundle-healing-lines.html` → Healing Lines ($7.99)
- `bundle-abstract-mind.html` → Abstract Mind Collection ($19.99)

### Purchase Flow
```
User clicks "Buy Now" button 
→ purchaseColoringBook() function called
→ Redirects to Ko-fi product page
→ Ko-fi handles payment + PDF delivery
```

---

## Common Issues & Fixes

### Issue #1: "Buy Now" button not working

**Symptoms:** Button click does nothing, or shows alert  
**Diagnosis:**
1. Check `paypal-integration.js` is loaded in page
2. Verify Ko-fi link in KOFI_LINKS object
3. Test Ko-fi product page loads manually

**Fix:**
```javascript
// In paypal-integration.js, verify this function exists:
function purchaseColoringBook(productId, price) {
    const kofiLink = KOFI_LINKS[productId];
    
    if (!kofiLink || kofiLink.startsWith('YOUR_')) {
        alert('Ko-fi product link not configured');
        return;
    }
    
    trackPurchaseAttempt(productId, price);
    window.location.href = kofiLink;
}
```

**Surgical edit only if broken. DO NOT REFACTOR if working.**

---

### Issue #2: Wrong product price displayed

**Symptoms:** Price on page doesn't match Ko-fi price  
**Diagnosis:**
1. Check Ko-fi dashboard for actual product price
2. Find price mentions in HTML (search "$7.99" or "$19.99")

**Fix locations in each bundle-*.html:**
```html
<!-- Hero section -->
<p class="price-tag">$7.99 • 50 Pages • Instant PDF</p>

<!-- CTA button -->
<button onclick="purchaseColoringBook('chaos-calm', 7.99)">Buy Now - $7.99</button>

<!-- Purchase section -->
<p class="purchase-price">$7.99</p>
```

**Only update if price changed in Ko-fi first.**

---

### Issue #3: Ko-fi product link changed

**Symptoms:** Button redirects to wrong Ko-fi page or 404  
**Diagnosis:** Ko-fi product URL changed (user republished or edited)

**Fix:**
1. Get new Ko-fi product URL from https://ko-fi.com/manage/shop
2. Update in `paypal-integration.js`:
```javascript
const KOFI_LINKS = {
    'chaos-calm': 'NEW_URL_HERE',
    // ... rest unchanged
};
```
3. Deploy: `git push origin main`

---

### Issue #4: Need to add new coloring book

**Pre-check:** Has user gotten 50+ sales on existing books?  
**If NO → Recommend against. Focus existing products.**  
**If user insists:**

**Steps:**
1. User publishes new product on Ko-fi first
2. Get Ko-fi product URL
3. Create new `bundle-new-name.html` (copy existing bundle page)
4. Update product details (title, description, price, images)
5. Add Ko-fi link to `paypal-integration.js`
6. Add to homepage product grid
7. Test purchase flow
8. Deploy

**Do NOT do this without explicit user confirmation and Ko-fi product ready.**

---

### Issue #5: Product page broken on mobile

**Symptoms:** Layout issues, buttons not clickable, text overlap  
**Diagnosis:**
1. Test on actual mobile device or Chrome DevTools mobile view
2. Check CSS media queries in `styles.css`

**Common fixes:**
```css
/* Ensure buttons are touch-friendly */
.cta-button {
    min-height: 44px;
    min-width: 44px;
    padding: 12px 24px;
}

/* Fix text overflow */
.bundle-hero-content h1 {
    font-size: clamp(1.5rem, 5vw, 3rem);
}
```

**Only fix if user reports actual mobile issue.**

---

## Testing Checklist (After Any Fix)

**Before deploying changes:**
- [ ] Test on desktop browser (Chrome)
- [ ] Test on mobile (Chrome DevTools or real device)
- [ ] Click "Buy Now" button → Verify redirects to Ko-fi
- [ ] Check Ko-fi page loads correctly
- [ ] Verify all images display
- [ ] Check responsive layout (resize browser)
- [ ] Test on https://abstractemporium.art (after deploy)

---

## Ko-fi Integration Details

### How Ko-fi Handles Everything
- **Payment processing** → Ko-fi handles credit cards, PayPal
- **PDF delivery** → Ko-fi emails download link instantly
- **Customer emails** → Ko-fi collects for you
- **Refunds** → Ko-fi manages (30-day policy)
- **Taxes** → Ko-fi handles for digital goods

### What Abstract Emporium Site Does
- Shows product information and previews
- Provides "Buy Now" CTAs
- Redirects to Ko-fi for checkout
- That's it (intentionally simple)

### What We DO NOT Handle
- ❌ Payment forms (Ko-fi does this)
- ❌ File hosting (Ko-fi does this)
- ❌ Email delivery (Ko-fi does this)
- ❌ Customer support refunds (Ko-fi does this)

**Reason:** Simpler = fewer things to break. Ko-fi is proven, tested, secure.

---

## File Structure Reference

### Product Page Anatomy
```
bundle-chaos-calm.html structure:
├── Navigation (reused across site)
├── Hero section (title, price, CTA)
├── "What You Get" features grid
├── Color theory guide (unique per book)
├── FAQ section
├── Purchase section (main CTA)
└── Footer
```

### Key HTML Sections to Update
```html
<!-- If changing product name -->
<h1>🌪️ Chaos & Calm</h1>

<!-- If changing price -->
<p class="price-tag">$7.99 • 50 Pages</p>

<!-- If changing Ko-fi link -->
<button onclick="purchaseColoringBook('chaos-calm', 7.99)">

<!-- If changing description -->
<p>Tap into focus and flow with highly detailed abstract designs</p>
```

---

## Emergency Fixes Only

**If site is down or payment broken:**

1. **Verify issue is real**
   - Check https://abstractemporium.art loads
   - Check Ko-fi shop loads
   - Test purchase flow end-to-end

2. **Identify breaking change**
   - Review recent commits: `git log --oneline -n 5`
   - Check Cloudflare Pages deployment status
   - Check Ko-fi service status

3. **Rollback if needed**
   ```bash
   git revert HEAD
   git push origin main
   ```

4. **Or surgical fix**
   - Fix ONLY the broken part
   - Test immediately
   - Deploy

**Do NOT use emergency as excuse to refactor or add features.**

---

## When to Invoke This Skill

### ✅ Use this skill when:
- "Buy Now button not working"
- "Need to update price"
- "Ko-fi link changed"
- "Mobile layout broken"
- "Product page has typo"

### ❌ Do NOT use this skill when:
- "How do I get more sales?" → Use marketing-execution skill
- "Can we add automation?" → Decline until 50 sales
- "Want to add new product" → Question necessity first
- "Should I use Gumroad instead?" → No, Ko-fi working fine

---

## Integration with CLAUDE.md

This skill enforces:
- **Surgical edits only** - Change minimum necessary
- **Verify before changing** - Test if actually broken
- **No feature creep** - Fix issues, don't add features
- **Deploy and verify** - Always test after changes

---

## Skill Success Criteria

**This skill has succeeded when:**
- ✅ Reported issue is fixed
- ✅ Purchase flow works end-to-end
- ✅ No new issues introduced
- ✅ User can make sales

**This skill has failed when:**
- ❌ "Fix" broke something else
- ❌ Added features not requested
- ❌ Refactored working code unnecessarily
- ❌ Issue wasn't actually a problem

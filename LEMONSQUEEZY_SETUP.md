# LEMONSQUEEZY SETUP GUIDE - DETAILED STEPS

## PART 1: CREATING LEMONSQUEEZY PRODUCTS

### **PRODUCT 1: FREE BEGINNER PATTERN** (Free)

**Go to:** Dashboard → Products → Create New Product

1. **Product Details**
   - Name: `Free Beginner Knitting Pattern`
   - Slug: `free-beginner-pattern`
   - Description: `Get started with knitting! Download your FREE beginner's guide and first simple pattern (dishcloth). Perfect for absolute beginners.`

2. **Pricing**
   - Price: $0 (Free)
   - Currency: USD

3. **Files & Delivery**
   - Add File: `free-bundle.pdf`
   - License Key: NOT needed (uncheck)
   - File License: NOT needed (uncheck)

4. **Product Links**
   - Redirect on purchase: `https://abstractemporiumart.com/index.html`
   - Email: Your email address

5. **Webhooks** (we'll set this up later)
   - We'll add Brevo integration later

6. **Click: Save Product**

**Get Payment Link:**
- Copy the payment link (looks like: `https://abstractemporiumart.lemonsqueezy.com/checkout/buy/...`)
- Update `bundle-free.html` line where button says `onclick="purchaseBundle('free', 0)"` to link there

---

### **PRODUCT 2: BEGINNER BUNDLE** ($19)

**Go to:** Dashboard → Products → Create New Product

1. **Product Details**
   - Name: `Beginner Knitting Bundle`
   - Slug: `beginner-knitting-bundle`
   - Description: `Master the basics with 3 easy patterns, video guides, and printable stitch cheat sheets. Includes dishcloth, scarf, and beanie. Lifetime access to updates.`

2. **Pricing**
   - Price: $19
   - Currency: USD

3. **Files & Delivery**
   - Add File: `beginner-bundle.pdf`
   - Add File: `beginner-video-guide.zip` (optional for now)
   - License Key: NOT needed (uncheck)

4. **Product Links**
   - Redirect on purchase: `https://abstractemporiumart.com/bundle-beginner.html`
   - Email: Your email address

5. **Webhooks** (for Brevo automation)
   - Will set up after Brevo is configured
   - Webhook: Send to Brevo when purchase completes
   - Action: "Add email to Beginner Bundle list"

6. **Click: Save Product**

**Get Payment Link:**
- Copy payment link
- Update `bundle-beginner.html` button to link there

---

### **PRODUCT 3: STARTER PACK** ($39)

**Go to:** Dashboard → Products → Create New Product

1. **Product Details**
   - Name: `Starter Pack - Knitting Course`
   - Slug: `starter-pack-knitting`
   - Description: `Level up with 5 curated patterns, full video course (5 modules), weekly planning system, and community access. Go from beginner to confident knitter in weeks.`

2. **Pricing**
   - Price: $39
   - Currency: USD

3. **Files & Delivery**
   - Add File: `starter-pack.pdf`
   - Add File: `starter-pack-videos.zip` (optional for now)
   - License Key: NOT needed

4. **Product Links**
   - Redirect: `https://abstractemporiumart.com/bundle-starter.html`
   - Email: Your email address

5. **Webhooks**
   - Will configure with Brevo
   - Action: "Add to Starter Pack list + send welcome email"

6. **Click: Save Product**

**Get Payment Link:**
- Copy and update button in `bundle-starter.html`

---

### **PRODUCT 4: MASTER BUNDLE** ($79)

**Go to:** Dashboard → Products → Create New Product

1. **Product Details**
   - Name: `Master Knitting Bundle - Complete Course`
   - Slug: `master-knitting-bundle`
   - Description: `The complete knitting education. 8 patterns + seasonal releases (4x/year) + 10+ video modules + pattern design guide + VIP community. One payment, lifetime access to all content forever.`

2. **Pricing**
   - Price: $79
   - Currency: USD

3. **Files & Delivery**
   - Add File: `master-bundle.pdf`
   - Add File: `master-bundle-videos.zip` (optional)
   - License Key: NOT needed

4. **Product Links**
   - Redirect: `https://abstractemporiumart.com/bundle-master.html`
   - Email: Your email address

5. **Webhooks**
   - Will configure with Brevo
   - Action: "Add to Master Bundle list + VIP community welcome"

6. **Click: Save Product**

**Get Payment Link:**
- Copy and update button in `bundle-master.html`

---

## PART 2: GETTING YOUR PAYMENT LINKS

After creating all 4 products, you'll have 4 payment links. 

**Example format:**
```
Free: https://abstractemporiumart.lemonsqueezy.com/checkout/buy/12345678-...
Beginner: https://abstractemporiumart.lemonsqueezy.com/checkout/buy/87654321-...
Starter: https://abstractemporiumart.lemonsqueezy.com/checkout/buy/11111111-...
Master: https://abstractemporiumart.lemonsqueezy.com/checkout/buy/22222222-...
```

**Save these links to a notes file!** You'll need them in the next step.

---

## PART 3: UPDATE YOUR WEBSITE WITH PAYMENT LINKS

After you have all 4 links, I'll update your HTML files to make the "Buy Now" buttons actually work.

You'll send me the 4 links, and I'll inject them into:
- `bundle-free.html` → Free link
- `bundle-beginner.html` → $19 link
- `bundle-starter.html` → $39 link
- `bundle-master.html` → $79 link

---

## PART 4: WEBHOOK SETUP (Connect Lemonsqueezy → Brevo)

After Brevo is configured, we'll set up webhooks so:

1. When someone buys Free Bundle → Add to Brevo list → Send welcome email
2. When someone buys Beginner → Add to list → Send Beginner welcome
3. When someone buys Starter → Add to list → Send Starter welcome
4. When someone buys Master → Add to list → Send Master welcome

This automates everything. Once set up, you don't have to do anything.

---

## QUICK REFERENCE: WHAT TO COPY INTO LEMONSQUEEZY

### Free Bundle
```
Name: Free Beginner Knitting Pattern
Price: $0
Description: Get started with knitting! Download your FREE beginner's guide and first simple pattern (dishcloth). Perfect for absolute beginners.
File: free-bundle.pdf
```

### Beginner Bundle
```
Name: Beginner Knitting Bundle
Price: $19
Description: Master the basics with 3 easy patterns, video guides, and printable stitch cheat sheets. Includes dishcloth, scarf, and beanie. Lifetime access to updates.
File: beginner-bundle.pdf
```

### Starter Pack
```
Name: Starter Pack - Knitting Course
Price: $39
Description: Level up with 5 curated patterns, full video course (5 modules), weekly planning system, and community access. Go from beginner to confident knitter in weeks.
File: starter-pack.pdf
```

### Master Bundle
```
Name: Master Knitting Bundle - Complete Course
Price: $79
Description: The complete knitting education. 8 patterns + seasonal releases (4x/year) + 10+ video modules + pattern design guide + VIP community. One payment, lifetime access to all content forever.
File: master-bundle.pdf
```

---

## NEXT STEPS

1. **Create 4 products in Lemonsqueezy** (follow steps above)
2. **Get the 4 payment links** (copy from Lemonsqueezy dashboard)
3. **Send me the links** (paste them here)
4. **I'll update your HTML** to make buttons work
5. **Test a purchase** (use Stripe test card: 4242 4242 4242 4242)

---

## TEST CARD FOR LEMONSQUEEZY

When testing your shop:
- **Card Number:** 4242 4242 4242 4242
- **Expiry:** Any future date (e.g., 12/25)
- **CVC:** Any 3 digits (e.g., 123)
- **Cardholder:** Any name

This won't charge you. It's for testing only.


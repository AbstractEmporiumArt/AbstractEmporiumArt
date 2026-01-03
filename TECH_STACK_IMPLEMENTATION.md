# Tech Stack, Automation & Implementation Guide
**Complete Technology Architecture for Bundle-First Business**

---

## PART 1: RECOMMENDED TECH STACK

### Infrastructure & Deployment

**Current Setup: ✅ Already in place**
```
Hosting: Vercel (excellent for static + serverless functions)
CDN: Cloudflare (free tier + features)
Domain: Your custom domain
SSL: Automatic via Vercel
```

**Keep using this.** It's fast, scalable, and low-cost.

---

### Email Marketing Platform

**Recommended: Brevo (formerly Sendinblue)**

Why Brevo?
✓ Free tier: 300 emails/day (huge for starting out)
✓ Affordable: ~$20/month for automation
✓ Easy integration: Webhooks + API
✓ Automation: Multi-step sequences
✓ Segmentation: Tag-based automation
✓ SMTP: For transactional emails (order confirmations)

**Alternative: SendGrid**
- More enterprise-focused
- Free tier: 100 emails/day
- Better for high volume
- Steeper learning curve

```
Setup Cost: $0 (free tier start)
Monthly (scaling): $20-50 (Brevo) or $30-100 (SendGrid)
Integration time: 2-4 hours
```

---

### AI Chatbot Platform

**Recommended: Botpress (Open Source)**

Why Botpress?
✓ Self-hosted or cloud version
✓ AI-powered conversations out of box
✓ Free tier available
✓ Customizable conversation flows
✓ Easy to integrate into website
✓ No vendor lock-in (open source)

**Alternative: Drift or Intercom**
- More expensive ($300-1000/month)
- More features (but you don't need them yet)
- Better support (if budget allows)

```
Setup Cost: $0 (self-hosted) or $50-200 (cloud)
Monthly: Free (self-hosted) or $50-200 (cloud)
Integration time: 4-6 hours
```

**Quick Implementation:**
```javascript
// Botpress Integration (Copy-paste into your site)
<script>
window.botpressWebChat = {
  botId: "YOUR_BOT_ID",
  hostUrl: "https://cdn.botpress.cloud",
};
</script>
<script src="https://cdn.botpress.cloud/webchat/v0/index.js"></script>
```

---

### Social Media Automation

**Recommended: Buffer**

Why Buffer?
✓ $5-99/month (starts affordable)
✓ Schedule across 6+ platforms
✓ Built-in analytics
✓ Content calendar view
✓ Team collaboration
✓ Best-time-to-post suggestions

**Alternative: Later or Hootsuite**
- Later: Pinterest specialist
- Hootsuite: Enterprise/larger teams

```
Setup Cost: $0 (free tier, 3 posts/day)
Monthly: $15-50 (pro tier for full features)
Integration time: 1-2 hours
```

---

### Image Generation for Social

**Option 1: Midjourney (Recommended for quality)**
- $10-120/month (based on usage)
- Highest quality AI images
- Great for product photos
- Learning curve: moderate

**Option 2: Stable Diffusion (Budget-friendly)**
- Free or $10/month cloud version
- Good quality, less control than Midjourney
- Learning curve: high
- Open source alternative

**Option 3: DALL-E 3 (ChatGPT integration)**
- $20/month (ChatGPT Plus)
- Easy to use
- Good for quick images
- Integrates with ChatGPT

**Recommendation:** Start with DALL-E 3 ($20/month with ChatGPT Plus), upgrade to Midjourney once budget allows.

```
Setup Cost: $0 (free trials available)
Monthly: $10-50 (depending on quality needs)
Integration time: 1-2 hours
```

---

### Payment Processing

**Current: PayPal**

Keep using PayPal + add Stripe for better UX.

**Recommended: Stripe + Lemonsqueezy**

Why Lemonsqueezy?
✓ Built for digital products (PDFs!)
✓ Automatic delivery of files
✓ Email receipts + invoices
✓ Affiliate/referral system built-in
✓ Global payment methods
✓ Less technical setup than Stripe raw

**Setup:**
```
Lemonsqueezy Account:
1. Create account (lemonsqueezy.com)
2. Create product (Beginner Bundle)
3. Set price ($19)
4. Upload PDF file
5. Get checkout link
6. Add to website

Cost: 5% commission per sale (vs Stripe 2.9% + $0.30)
Setup time: 30 minutes
```

**Why not pure Stripe?**
- Requires custom checkout code
- Manual file delivery setup
- More technical
- Better for companies, worse for creators

---

### Database (For User Profiles & Tracking)

**Recommended: Supabase (PostgreSQL-based)**

Why Supabase?
✓ Free tier: up to 500 MB storage
✓ Built on PostgreSQL (powerful)
✓ Real-time updates
✓ Easy-to-use UI
✓ JavaScript client library
✓ Row-level security

**Alternative: Firebase**
- More beginner-friendly
- Locked into Google ecosystem
- Less powerful querying

```
Setup Cost: $0 (free tier)
Monthly: $0-50 (as you scale)
Integration time: 3-4 hours

// Example: Store user profile
{
  user_id: "unique_id",
  email: "user@example.com",
  skill_level: "beginner",
  bundles_purchased: ["beginner-bundle"],
  created_at: "2024-01-02",
  last_purchase: "2024-01-02",
  email_opted_in: true
}
```

---

### Website Analytics (Privacy-First)

**Recommended: Plausible Analytics**

Why Plausible?
✓ Privacy-focused (no cookies!)
✓ GDPR compliant (no consent form needed)
✓ Simple, beautiful dashboard
✓ Affordable: $9/month
✓ Events tracking (conversions, clicks)
✓ 30-day retention (good for optimization)

**Alternative: Fathom Analytics**
- Similar pricing/features
- Slightly more features
- Both excellent choices

```
Setup Cost: $9/month
Integration: 2 minutes (copy snippet to header)
Tracking: pageviews, events, conversions

// Example: Track bundle click
<script>
plausible('Bundle Click', {props: {bundle: 'beginner'}})
</script>
```

---

### Email Forms (Lead Capture)

**Recommended: Basin or Formspree**

Why Basin?
✓ Free tier: unlimited submissions
✓ No-code forms
✓ Email notifications
✓ CSV export
✓ GDPR compliant

**Simple implementation:**
```html
<form action="https://usebasin.com/f/[YOUR_ID]" method="POST">
  <input type="email" name="email" placeholder="Your email" required>
  <button type="submit">Get Free Guide</button>
</form>
```

```
Setup Cost: $0 (free tier)
Integration time: 5 minutes
```

---

## PART 2: AUTOMATION WORKFLOWS

### Workflow 1: New Subscriber → Email Sequence

```
TRIGGER: User downloads free guide or signs up for email

STEP 1: Create contact in Brevo
├─ Name: [First Name] (if provided)
├─ Email: [Email address]
├─ Tag: "free-subscriber"
└─ List: "Beginner Knitters"

STEP 2: Send Day 0 Email (Immediate)
├─ Subject: "Your Free Beginner Knitting Guide is Ready 🧶"
├─ Content: Welcome + download link
├─ CTA: "Download guide" or "Explore bundles"
└─ Tracking: Open rate, click-through

STEP 3: Send Day 1 Email (24 hours later)
├─ Subject: "Yarn & Needle Buying Guide (What to Actually Buy)"
├─ Content: Shopping list + recommendations
├─ CTA: "Get supplies" or "Start today"
└─ Update profile: "received-day1"

STEP 4: Send Day 3 Email (72 hours later)
├─ Subject: "How's Your Casting On? (Pro Tip Inside)"
├─ Content: Encouragement + technique tip
├─ CTA: "Tell me how it's going" (reply)
└─ Update profile: "received-day3"

STEP 5: Send Day 5 Email (120 hours later)
├─ Subject: "You MADE Something! 🎉"
├─ Content: Celebration + next options
├─ CTA: "Grab the Beginner Bundle" ($19)
└─ Update profile: "received-day5"

STEP 6: Send Day 7 Email (1 week)
├─ Subject: "You Made It Through Week 1!"
├─ Content: Recap + weekly offer
├─ CTA: "Bundle offer (limited time)" 
└─ Tag: "engaged-subscriber"

AUTOMATION RULE:
If user doesn't open emails in 48 hours:
└─ Remove from this sequence
└─ Tag: "low-engagement"
└─ Move to evergreen sequence (1x/week)
```

**Implementation in Brevo:**
```
1. Create automation workflow
2. Add trigger: "Subscriber added to [list]"
3. Add steps: Email (Day 0, 1, 3, 5, 7)
4. Add condition: "If not opened in 48 hours → pause"
5. Add tag steps for tracking
6. Test with yourself first
7. Go live
```

---

### Workflow 2: Bundle Purchase → Delivery + Upsell

```
TRIGGER: User completes payment (Lemonsqueezy webhook)

STEP 1: Confirm Purchase (Immediate, via Lemonsqueezy)
├─ Send order confirmation email
├─ Include download link (Lemonsqueezy automatic)
├─ Thank you message
└─ CTA: "Start with pattern X"

STEP 2: Update User Profile (in Supabase)
├─ Add purchase: "beginner-bundle"
├─ Set purchase_date: [today]
├─ Set amount_spent: $19
├─ Tag: "beginner-bundle-owner"
└─ Remove: "free-subscriber" tag

STEP 3: Segment for Upsell
├─ Remove from welcome sequence
├─ Add to "Bundle owners" email sequence
└─ Update website: Show different chatbot recommendations

STEP 4: Send Day 3 Checkpoint Email
├─ Subject: "How's the scarf coming? (Day 3 update)"
├─ Content: Encouragement + technique tip
├─ CTA: "Share your progress" or "Ask a question"
└─ Tracking: Engagement level

STEP 5: Send Day 5 Celebration Email
├─ Subject: "You FINISHED! 🎉 What's Next?"
├─ Content: Massive celebration
├─ CTA: "Upgrade to Starter Pack ($39)" - offer $5 discount
└─ Discount code: "BEGINNER5"

STEP 6: Send Day 7 Master Bundle Pitch
├─ Subject: "You're Ready for the Master Bundle"
├─ Content: Level-up messaging
├─ CTA: "Explore Master Bundle ($79)"
└─ Offer: $10 off (code: "MASTER10")

STEP 7: Switch to Evergreen Sequence
├─ Weekly tips (Monday)
├─ Community stories (Wednesday)
├─ New patterns (Friday)
├─ Soft upsells (Sunday)
└─ Forever (unless unsubscribe)
```

**Implementation (Lemonsqueezy → Brevo):**
```
1. In Lemonsqueezy: Enable webhooks
2. Create webhook: https://your-domain.com/api/handle-purchase
3. In your API (Vercel function):

export default async function handler(req, res) {
  const { event, data } = req.body;
  
  if (event === "order:created") {
    // 1. Get customer email from data
    const { customer_email, product_id } = data;
    
    // 2. Create/update contact in Brevo
    const brevoContact = await brevo.createContact({
      email: customer_email,
      attributes: {
        PURCHASE: product_id,
        PURCHASE_DATE: new Date(),
        PURCHASE_AMOUNT: data.total
      },
      tags: ['bundle-owner', product_id]
    });
    
    // 3. Trigger automation in Brevo
    await brevo.triggerAutomation('bundle-purchase-sequence', {
      email: customer_email,
      bundle: product_id
    });
    
    // 4. Update Supabase
    await supabase.from('users').insert({
      email: customer_email,
      bundles: [product_id],
      purchase_date: new Date()
    });
    
    res.json({ success: true });
  }
}
```

---

### Workflow 3: Daily Social Media Auto-Scheduling

```
PROCESS: Content calendar → Buffer auto-post

DAY 0 (Planning):
├─ Create 30-day calendar (Excel or Airtable)
├─ Include: Post copy, hashtags, image prompts
├─ Create/generate images
└─ Prepare links (shortened via short.link)

DAY 1-30 (Scheduling):
├─ Copy post copy to Buffer
├─ Upload image
├─ Add hashtags + links
├─ Set optimal posting time
├─ Schedule (repeat weekly for evergreen content)
└─ Enable analytics

AUTOMATION (Optional - Advanced):
├─ Use Zapier to auto-post from Google Sheet
├─ If: New row in sheet with "Posted=false"
├─ Then: Post to Buffer, mark as posted
└─ Result: Update calendar once, posts everywhere

EXAMPLE ZAPIER FLOW:
Trigger: New row in Google Sheet
├─ Column A: Platform (Instagram, Facebook, TikTok)
├─ Column B: Caption (full post copy)
├─ Column C: Image URL
├─ Column D: Scheduled time
└─ Column E: Posted (yes/no)

Action: Send to Buffer
├─ Buffer API post
├─ Include: caption, image, scheduling info
└─ Update Sheet: Posted = "yes"
```

**Buffer Setup (No-Code):**
```
1. Create Buffer account
2. Connect Instagram, Facebook, TikTok (link accounts)
3. Create content calendar tab
4. Add posts 30 days out:
   - Copy (caption)
   - Image (upload or link)
   - Hashtags (#beginner, #knitting, etc)
5. Set optimal posting times
6. Schedule all posts
7. Monitor analytics daily/weekly
```

---

### Workflow 4: Chatbot Personalization

```
USER VISITS SITE
│
├─ Check localStorage for user_id
│  └─ If yes: Load user profile from Supabase
│  └─ If no: Generate user_id, store locally
│
├─ Fetch user profile data:
│  ├─ Skill level
│  ├─ Bundles purchased
│  ├─ Time on site
│  ├─ Device type
│  └─ Engagement history
│
├─ Determine chatbot greeting:
│  
│  IF new visitor AND no purchase:
│  ├─ Show welcome flow
│  └─ Ask skill level
│  
│  IF returning AND purchased Beginner Bundle:
│  ├─ Show progress check-in
│  └─ Offer Starter Pack upsell
│  
│  IF purchased Starter Pack:
│  ├─ Celebrate progress
│  └─ Offer Master Bundle
│  
│  IF high bounce risk (time < 1 min):
│  ├─ Show exit-intent offer
│  └─ $5 off coupon
│
└─ Track interaction:
   ├─ Log conversation in analytics
   ├─ Update user profile engagement
   └─ Use for personalization next visit
```

**Implementation (JavaScript):**
```javascript
// chatbot-init.js
async function initChatbot() {
  // 1. Get or create user_id
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = generateUuid();
    localStorage.setItem('user_id', userId);
  }
  
  // 2. Fetch user profile
  const userProfile = await fetch(`/api/get-user-profile?id=${userId}`)
    .then(r => r.json());
  
  // 3. Determine greeting based on profile
  let greeting = getGreeting(userProfile);
  
  // 4. Initialize Botpress with greeting
  window.botpressWebChat.onMessage((message) => {
    // Track interaction
    analytics.track('chatbot_interaction', {
      userId: userId,
      message: message,
      userProfile: userProfile
    });
  });
}

function getGreeting(profile) {
  if (!profile.has_purchased && !profile.skill_level) {
    return 'new-visitor-welcome'; // Ask skill level
  } else if (profile.bundles?.includes('beginner-bundle')) {
    return 'returning-customer-progress-check'; // Offer upgrade
  } else if (profile.time_on_site < 60) {
    return 'exit-intent-offer'; // Discount for bouncing user
  }
  // ... more conditions
}

document.addEventListener('DOMContentLoaded', initChatbot);
```

---

### Workflow 5: Weekly Engagement Sequence (All Subscribers)

```
EVERY MONDAY (Every subscriber, forever):
├─ Email type: Beginner Tip or Technique Tutorial
├─ Subject: "Monday Knitting Tip: [Technique]"
├─ Content: 1-2 paragraph tip + visual/video
├─ CTA: "Try this today"
└─ Segmentation: All subscribers (except unengaged)

EVERY WEDNESDAY (Every subscriber, forever):
├─ Email type: Community Spotlight or Success Story
├─ Subject: "[Name]'s Project is AMAZING (Swipe Her Idea!)"
├─ Content: Customer story + photos
├─ CTA: "Share YOUR project" (reply)
└─ Tracking: Opens, replies, engagement

EVERY FRIDAY (Every subscriber, forever):
├─ Email type: New Pattern or Product Offer
├─ Subject: "New Pattern: [Pattern Name] (Seasonal)"
├─ Content: Pattern overview + preview
├─ CTA: "Get pattern" (link to bundle)
└─ Offer: If owned Beginner Bundle, push Starter Pack

EVERY SUNDAY (Every subscriber, forever):
├─ Email type: Soft Upsell or Re-engagement
├─ Subject: "How's Your Knitting Going? (Quick Check)"
├─ Content: Personal question + soft product mention
├─ CTA: "Reply with your wins!"
└─ Offer: Weekend-only discount (code: SUNDAY15)
```

**Implementation in Brevo:**
```
1. Create 4 separate automations:
   - "Monday Tip Email"
   - "Wednesday Story Email"  
   - "Friday Pattern Email"
   - "Sunday Engagement Email"

2. For each, set trigger:
   - "Every Monday at 6 AM" (to all active subscribers)
   - "Every Wednesday at 6 AM"
   - "Every Friday at 6 AM"
   - "Every Sunday at 6 PM"

3. Add content:
   - Email template (from guide above)
   - Personalization: {{FIRST_NAME}}
   - Tracking: Enable open/click tracking

4. Add conditions:
   - Only send if: subscriber active
   - Don't send if: unsubscribed or bounced
   - Skip if: already received in last 24 hours

5. Monitor metrics:
   - Open rate (target: 25%+)
   - Click rate (target: 5%+)
   - Unsubscribe rate (target: <0.5%)
```

---

## PART 3: IMPLEMENTATION TIMELINE

### Week 1: Foundation
- [ ] Set up Brevo email account
- [ ] Create all email templates (welcome sequence + 4 bundle sequences)
- [ ] Set up 4 automations (Day 0, 3, 5, 7)
- [ ] Create Supabase database schema
- [ ] Set up analytics tracking (Plausible)
- [ ] Design chatbot conversation flows (document)

**Time commitment:** 20-30 hours

---

### Week 2: Chatbot + Payments
- [ ] Set up Botpress (self-hosted or cloud)
- [ ] Implement conversation flows in Botpress
- [ ] Integrate with Supabase (track interactions)
- [ ] Set up Lemonsqueezy
- [ ] Create product listings (4 bundles)
- [ ] Set up webhook: Lemonsqueezy → Brevo → Supabase
- [ ] Test end-to-end (free signup → purchase → email delivery)

**Time commitment:** 15-20 hours

---

### Week 3: Social Media + Images
- [ ] Generate or create 30 AI images
- [ ] Set up Buffer account
- [ ] Create 30-day content calendar
- [ ] Schedule all posts (30 days out)
- [ ] Set up analytics tracking in Buffer
- [ ] Create hashtag sets (by platform)
- [ ] Optional: Set up Zapier for automation

**Time commitment:** 15-25 hours

---

### Week 4: Launch + Optimization
- [ ] Refresh website homepage (bundle-first)
- [ ] Create/refine bundle landing pages
- [ ] Implement chatbot widget on all pages
- [ ] Set up email capture forms
- [ ] Create thank you pages (post-purchase)
- [ ] Final testing (all workflows)
- [ ] Go live!
- [ ] Monitor all metrics (first week)

**Time commitment:** 20-30 hours

---

### Ongoing: Monitoring + Optimization
- [ ] Daily: Monitor email open/click rates
- [ ] Daily: Check chatbot conversations (for optimization)
- [ ] Weekly: Review analytics (Plausible + Buffer)
- [ ] Weekly: Optimize email sequences based on performance
- [ ] Monthly: A/B test subject lines, CTAs, images
- [ ] Monthly: Review chatbot conversations (refine flows)
- [ ] Monthly: Check social media engagement (A/B winners)

**Time commitment:** 5-10 hours/week

---

## PART 4: COST BREAKDOWN

### Monthly Expenses (Steady State)

```
Brevo (Email): $20/month
├─ Includes: 300 emails/day unlimited, automation
└─ Scales to: $50+ if volume explodes (but that's good!)

Botpress (Chatbot): $0 (self-hosted) or $50-200 (cloud)
├─ Start: Free tier (self-hosted)
└─ Upgrade: $50-200/month (cloud version, if needed)

Buffer (Social scheduling): $15/month
├─ Includes: Schedule across 6 platforms, analytics
└─ Scales to: $99/month (but basic tier is enough)

Plausible (Analytics): $9/month
├─ Includes: Privacy-first, events tracking
└─ No scaling costs

DALL-E 3 / Image generation: $20/month
├─ Includes: 50 image credits/month
└─ For: 30 social posts + pattern covers

Supabase (Database): $0 (free tier) → $25+ (as you scale)
├─ Free: 500 MB storage, OK for up to 10k users
└─ Pro: $25/month at scale

Lemonsqueezy: 5% per sale (no monthly fee!)
├─ Included: Automatic file delivery, receipts, affiliates

---

TOTAL MONTHLY: $64-100
(Startup) → $100-250 (at scale of 1000+ emails/week)

COMPARISON:
- MailChimp + Shopify + chatbot: $300-500/month
- Your setup: $100-150/month
- You save: $200-350/month

COST PER BUNDLE SALE:
Lemonsqueezy fee: $0.95 (on $19 bundle)
Email/chat/social tools amortized: ~$1-2/sale
Total: ~$2-3 per $19 sale (11-16% of revenue)
```

---

## PART 5: SCALING CHECKLIST

**At 100 email subscribers:**
- [ ] Monitor Brevo usage (check you're under 300/day limit)
- [ ] Review email open rates, optimize subject lines
- [ ] Check chatbot conversation quality

**At 500 email subscribers:**
- [ ] Consider Brevo paid plan ($20/month for unlimited)
- [ ] Set up advanced segmentation (by purchase behavior)
- [ ] Add new email sequences (based on data)

**At 1000+ email subscribers:**
- [ ] Review all system performance
- [ ] Upgrade Botpress to cloud (if needed)
- [ ] Consider hiring VA for community management
- [ ] Expand product offerings (new patterns, bundles)

**At $5000+ monthly revenue:**
- [ ] Upgrade analytics (Keen.io or custom dashboard)
- [ ] Consider dedicated customer support tool
- [ ] Hire designer for pattern covers + graphics
- [ ] Consider SMS marketing layer (Twilio)

---

## PART 6: TOOLS REFERENCE SHEET

| Tool | Cost | Setup Time | Purpose |
|------|------|-----------|---------|
| Brevo | $0-50 | 2 hours | Email automation |
| Botpress | $0-200 | 4 hours | AI chatbot |
| Buffer | $0-99 | 1 hour | Social scheduling |
| Plausible | $9 | 30 min | Analytics |
| Supabase | $0-25 | 3 hours | Database |
| Lemonsqueezy | 5% commission | 30 min | Payments + delivery |
| DALL-E 3 | $20 | 30 min | Image generation |
| Zapier | $0-40 | 2 hours | Automation (optional) |
| Vercel | $0-50 | Already done | Hosting |
| Cloudflare | Free-$200 | Already done | CDN |

---

## PART 7: MIGRATION GUIDE (If You Have Existing System)

**If you have existing payments (PayPal):**
1. Keep PayPal for existing customers
2. Use Lemonsqueezy for new purchases (easier automated delivery)
3. Set up forwarding: PayPal IPN → your email (manual delivery for now)
4. Migrate to full Lemonsqueezy once comfortable

**If you have existing email list:**
1. Export contacts from current provider
2. Import to Brevo
3. Segment by purchase history (tag them)
4. Send win-back campaign before automation sequences
5. Then use automations for new subscribers going forward

**If you have existing pattern deliveries:**
1. Upload PDFs to Lemonsqueezy
2. Test purchase → delivery flow
3. Once working, switch all new customers to Lemonsqueezy
4. Keep existing delivery method for current customers

---


# 📧 Add Brevo Newsletter to Your Website (5 Minutes)

## Quick Integration Guide

### Step 1: Create Brevo Form (3 min)

1. **Login to Brevo:** https://www.brevo.com
2. **Go to Forms:**
   - Left sidebar → "Campaigns" → "Forms"
   - Click "Create a Form"

3. **Choose Form Type:**
   - Pick "Inline form" (embeds directly in your page)
   - Alternative: "Pop-up" (appears after 5 seconds)

4. **Design Your Form:**
   
   **Header Tab:**
   - Title: "Join Our Creative Community!"
   - Subtitle: "Get 10% off your first purchase + exclusive patterns & tips"
   
   **Fields Tab:**
   - ✅ Email (required) - already included
   - ✅ First Name (optional) - click "Add field"
   - Remove: Last Name, Phone (not needed)
   
   **Design Tab:**
   - Background color: `#667eea` (your purple)
   - Button color: `#f5576c` (your pink)
   - Button text: "Get 10% Off"
   - Font: Match your website (Arial or similar)
   
   **Settings Tab:**
   - Success message: "Welcome! Check your email for 10% off code"
   - Add to list: "Newsletter Subscribers"
   - Send confirmation email: YES
   - Double opt-in: NO (faster signup)

5. **Get the Code:**
   - Click "Continue"
   - Click "Get the code"
   - Copy the entire `<script>` block

### Step 2: Add to Your Website (2 min)

**Option A: Footer (Recommended)**

Open `index.html` and find the footer section:

```html
<!-- Find this section in index.html -->
<footer style="background: #2c3e50; color: white; padding: 40px 20px;">
    <div class="container">
        <h3>Abstract Emporium</h3>
        
        <!-- ADD BREVO FORM HERE 👇 -->
        <div style="max-width: 500px; margin: 30px auto;">
            <h4 style="margin-bottom: 15px;">📧 Join Our Newsletter</h4>
            <p style="margin-bottom: 20px;">Get 10% off + exclusive patterns every week!</p>
            
            <!-- PASTE YOUR BREVO SCRIPT HERE -->
            <script>...</script>
            
        </div>
        <!-- END BREVO FORM 👆 -->
        
        <p style="margin-top: 30px;">&copy; 2026 Abstract Emporium</p>
    </div>
</footer>
```

**Option B: Homepage Below Hero Section**

```html
<!-- Add after your main banner in index.html -->
<section style="padding: 60px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div class="container" style="max-width: 600px; margin: 0 auto; text-align: center; color: white;">
        <h2 style="font-size: 2.5em; margin-bottom: 20px;">Get 10% Off Your First Purchase</h2>
        <p style="font-size: 1.2em; margin-bottom: 30px;">
            Join 500+ creative souls getting exclusive patterns, coloring tips, and special offers!
        </p>
        
        <!-- PASTE YOUR BREVO SCRIPT HERE -->
        <script>...</script>
    </div>
</section>
```

**Option C: Sidebar on Blog/Gallery Pages**

```html
<!-- Add to gallery.html or blog pages -->
<aside style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin: 20px 0;">
    <h3 style="color: #667eea;">📬 Weekly Inspiration</h3>
    <p style="margin: 15px 0;">Get new patterns & coloring tips delivered to your inbox!</p>
    
    <!-- PASTE YOUR BREVO SCRIPT HERE -->
    <script>...</script>
</aside>
```

### Step 3: Test It! (1 min)

1. Open your website in browser
2. Find the newsletter form
3. Enter your email (use a test email)
4. Click "Get 10% Off"
5. Check Brevo → Contacts → Should see your test email added!

---

## 🎁 Welcome Email Automation

Set up automatic welcome email when someone subscribes:

### Create Welcome Email (5 min)

1. **Brevo → Automations → Create Workflow**
2. **Trigger:** "Contact added to list: Newsletter Subscribers"
3. **Add Email Block:**

**Subject Line Options (test these):**
- "Welcome! Here's your 10% off code 🎨"
- "Your gift is ready: 10% off coloring books!"
- "Thanks for joining! Save 10% today"

**Email Content:**
```
Hi {{contact.FIRSTNAME}},

Welcome to the Abstract Emporium family! 🎨

AS A THANK YOU, HERE'S 10% OFF YOUR FIRST PURCHASE:

Code: WELCOME10
Valid for 7 days on any product

SHOP OUR COLLECTIONS:
→ Therapeutic Coloring Books ($7.99 - $19.99)
→ Knitting Patterns for All Levels ($19 - $79)

[Shop Now Button] → links to: https://yourwebsite.com/shop.html

WHY PEOPLE LOVE US:
⭐⭐⭐⭐⭐ "The Chaos & Calm book helped my anxiety so much!" - Sarah M.
⭐⭐⭐⭐⭐ "Best knitting patterns I've ever used!" - Emma K.

Questions? Just reply to this email!

Happy Creating,
Abstract Emporium

P.S. Follow us @abstractemporiumart for daily inspiration!

[Instagram] [Pinterest] [Facebook]

---
You're receiving this because you signed up at abstractemporium.com
Unsubscribe | Update Preferences
```

4. **Save & Activate** the workflow

---

## 💰 Track Conversions (Optional but Smart)

### Add UTM Parameters to Email Links

In your Brevo emails, use tracked links:

```
Shop Now: https://yourwebsite.com/shop.html?utm_source=brevo&utm_medium=email&utm_campaign=welcome10

Chaos & Calm: https://yourwebsite.com/bundle-chaos-calm.html?utm_source=brevo&utm_medium=email&utm_campaign=welcome10
```

Then you can see in analytics:
- How many people clicked from emails
- Which emails drive most sales
- ROI of email marketing

---

## 🔄 Connect PayPal Sales to Brevo (Optional)

**Automatically add paying customers to VIP list:**

### Option 1: Zapier (Free Plan Works!)

1. **Create Zapier account:** zapier.com
2. **Make a Zap:**
   - **Trigger:** PayPal → "New Payment"
   - **Action:** Brevo → "Create or Update Contact"
   - **Map fields:**
     - PayPal Customer Email → Brevo Email
     - PayPal Customer Name → Brevo First Name
     - Fixed value "VIP Customers" → Brevo List
     - PayPal Product Name → Brevo Custom Field "Last Purchase"
3. **Test & Turn On**

**Now:** Every customer automatically added to "VIP Customers" list for exclusive offers!

### Option 2: Manual CSV Import (Once a Week)

1. Download sales from PayPal (CSV export)
2. Open in Excel
3. Copy customer emails
4. Brevo → Contacts → Import
5. Assign to "VIP Customers" list

Takes 5 minutes weekly.

---

## 📊 Segmentation Strategy

**Create these lists in Brevo:**

1. **Newsletter Subscribers** (general list)
   - Send: Weekly inspiration, new products, tips
   - Frequency: 1x per week

2. **VIP Customers** (people who bought)
   - Send: Exclusive discounts, early access, advanced tips
   - Frequency: 2x per month

3. **Knitting Enthusiasts** (bought knitting products)
   - Send: New patterns, knitting tips, yarn recommendations
   - Frequency: 1x per week

4. **Coloring Book Fans** (bought coloring books)
   - Send: Coloring challenges, techniques, new releases
   - Frequency: 1x per week

**Pro Tip:** Tag customers on purchase:
- PayPal sale → Zapier → Add tag "Purchased: Beginner Bundle" in Brevo
- Now you can send targeted follow-up emails!

---

## ✅ Complete Setup Checklist

- [ ] Create Brevo account
- [ ] Design newsletter signup form
- [ ] Add form embed code to website footer
- [ ] Create welcome email automation
- [ ] Add 10% discount code (WELCOME10) to Gumroad/Ko-fi
- [ ] Test signup flow with your email
- [ ] Create "VIP Customers" list
- [ ] (Optional) Set up Zapier PayPal → Brevo connection
- [ ] Write first newsletter (to send after 10+ subscribers)

**Time: 15-20 minutes total**

---

## 📧 Your First Newsletter Template

Send when you have 20+ subscribers:

**Subject:** "This Week at Abstract Emporium 🎨"

```
Hi {{contact.FIRSTNAME}},

Happy [Day of Week]! Here's your weekly dose of creative inspiration:

✨ TIP OF THE WEEK:
[Share a coloring technique, knitting trick, or mindfulness practice]
[Include a simple image or illustration]

🎨 NEW THIS WEEK:
[Feature one product - could be new or just rotating spotlight]
Special price: $X.XX (regularly $Y.YY)
[Link to product]

💚 COMMUNITY LOVE:
Check out this beautiful [colored page/finished project] from @username!
[Include customer's Instagram photo]

Want to be featured? Tag #AbstractEmporiumArt in your posts!

📚 FROM THE BLOG:
[Link to a helpful blog post, tutorial, or YouTube video]

See you next week!
Abstract Emporium

P.S. [Quick personal note or upcoming announcement]

---
[Unsubscribe] | [Update Preferences] | [Shop Now]
```

**Send frequency:** Every Wednesday at 10 AM (best open rates!)

---

## 🎯 Expected Results

**Month 1:**
- 20-50 newsletter signups
- 30-40% open rate (great for small list!)
- 5-10% click rate
- 2-5 sales from email ($50-100 revenue)

**Month 3:**
- 100-200 newsletter signups
- 25-35% open rate (still very engaged)
- 3-5% click rate
- 10-20 sales from email ($200-400 revenue)

**The Goal:** Email becomes your #1 sales channel within 3-6 months!

---

## 🆘 Troubleshooting

**Form not showing up:**
- Check you pasted the FULL script (including `<script>` tags)
- Clear browser cache and refresh
- Check browser console for errors (F12)

**Emails going to spam:**
- Set up SPF/DKIM in Brevo (Settings → Senders, Domains & Dedicated IPs)
- Add your domain to Brevo
- Verify sender email address

**Low open rates (<15%):**
- Test different subject lines (use emojis!)
- Send at different times (try 9 AM or 2 PM)
- Clean your list (remove bounced/unengaged emails)

---

## 📞 Quick Reference

**Brevo Dashboard:** https://app.brevo.com  
**Forms:** Campaigns → Forms  
**Automations:** Automations → Create Workflow  
**Contacts:** Contacts → Lists  
**Zapier:** https://zapier.com/apps/sendinblue  

**Your Forms:**
- Homepage footer form
- Thank-you page upsell form
- Pop-up form (after 30 seconds on site)

**Your Automations:**
- Welcome series (5 emails over 14 days)
- Post-purchase thank you (3 days after sale)
- Re-engagement (60 days no open)

**Your Lists:**
- Newsletter Subscribers (general)
- VIP Customers (purchased)
- Knitting Enthusiasts (segment)
- Coloring Book Fans (segment)

---

**DONE! 🎉 You now have email marketing set up!**

Start collecting emails today → Build your audience → Email becomes your best sales channel! 💰

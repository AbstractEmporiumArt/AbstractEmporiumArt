# Brevo Newsletter Setup Guide

## 🎯 Overview

This guide will help you set up **Brevo (formerly Sendinblue)** for automatic newsletter signups on your Abstract Emporium website, replacing the failed Vercel integration.

**Why Brevo?**
- ✅ Free tier: Up to 300 emails/day
- ✅ Easy API integration
- ✅ No server required (works with GitHub Pages)
- ✅ Built-in email templates & automation
- ✅ Contact management & segmentation
- ✅ Analytics & tracking

---

## 📝 Step 1: Create Brevo Account

1. Go to https://www.brevo.com/
2. Click **Sign up free**
3. Fill in your details:
   - Email: `abstractemporiumart@outlook.com`
   - Company name: `Abstract Emporium Art`
   - Plan: **Free** (300 emails/day)
4. Verify your email address
5. Complete the onboarding questionnaire

---

## 🔑 Step 2: Get Your API Key

1. Log into Brevo dashboard
2. Click your name (top right) → **SMTP & API**
3. Scroll to **API Keys** section
4. Click **Create a new API key**
5. Name: `Abstract Emporium Website`
6. **Copy the API key** (save it somewhere safe!)

**Example:** `xkeysib-abc123def456...`

---

## 📋 Step 3: Create Contact List

1. In Brevo dashboard, go to **Contacts** → **Lists**
2. Click **Create a list**
3. List name: `Newsletter Subscribers`
4. Click **Create**
5. Note the **List ID** (you'll see it in the URL or list details)

---

## 💻 Step 4: Update Website Form

### Option A: Direct API Integration (Recommended)

Replace the newsletter form in `index.html` with this:

```html
<!-- Newsletter Section -->
<section class="newsletter-section">
    <div class="container">
        <div class="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to get the latest news, new artworks, and exclusive offers</p>
            <form class="newsletter-form" id="newsletterForm">
                <input type="email" id="newsletterEmail" placeholder="your@email.com" required>
                <button type="submit" class="newsletter-btn">Subscribe</button>
            </form>
            <p class="newsletter-privacy">✓ We respect your privacy. Unsubscribe anytime.</p>
            <div id="newsletter-message" style="display: none; margin-top: 10px;"></div>
        </div>
    </div>
</section>

<script>
document.getElementById('newsletterForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletterEmail').value;
    const messageDiv = document.getElementById('newsletter-message');
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';
    
    try {
        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': 'YOUR_BREVO_API_KEY_HERE', // Replace with your actual API key
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                listIds: [YOUR_LIST_ID_HERE], // Replace with your list ID (number)
                updateEnabled: true
            })
        });
        
        if (response.ok || response.status === 204) {
            messageDiv.style.display = 'block';
            messageDiv.style.color = '#4CAF50';
            messageDiv.textContent = '✓ Successfully subscribed! Check your email for confirmation.';
            this.reset();
        } else {
            throw new Error('Subscription failed');
        }
    } catch (error) {
        messageDiv.style.display = 'block';
        messageDiv.style.color = '#f44336';
        messageDiv.textContent = '✗ Something went wrong. Please try again.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
});
</script>
```

**⚠️ IMPORTANT:** Replace:
- `YOUR_BREVO_API_KEY_HERE` with your actual Brevo API key
- `YOUR_LIST_ID_HERE` with your list ID (as a number, not string)

---

### Option B: Brevo Embedded Form (Easiest)

1. In Brevo, go to **Forms** → **Create a form**
2. Choose **Subscribe** form type
3. Customize the form design
4. Click **Get the code**
5. Copy the embed code
6. Replace the newsletter section in `index.html` with the Brevo embed code

**Pros:**
- No API key needed
- Brevo handles everything
- Built-in double opt-in
- Customizable design

**Cons:**
- Less control over styling
- External dependency

---

## 🎨 Step 5: Customize Welcome Email

1. In Brevo, go to **Automation** → **Templates**
2. Click **Create a template**
3. Choose **Welcome email** template
4. Customize with your branding:

```
Subject: Welcome to Abstract Emporium! 🎨

Hi there!

Thank you for subscribing to Abstract Emporium Art newsletter!

You'll now receive:
✨ New artwork announcements
🎨 Exclusive coloring book releases  
💜 Therapeutic art tips & inspiration
🛍️ Special offers & promotions

Explore our collections:
• ArtPal: https://www.artpal.com/Abstractemporium
• Fine Art America: https://fineartamerica.com/profiles/abstract-emporium
• Hug.art: https://hug.art/artists/AbstractEmporiumArt
• Ko-fi: https://ko-fi.com/abstractemporium

Follow us:
Instagram: @Abstractemporiumart
Facebook: @abstractemporium
Mastodon: @abstractemporiumart
Bluesky: @abstractemporium.bsky.social

Questions? Reply to this email anytime.

With creativity & healing,
Abstract Emporium Art
```

4. Click **Save & activate**

---

## 🤖 Step 6: Set Up Automation (Optional)

### Welcome Series Automation

1. Go to **Automation** → **Create a workflow**
2. Choose **Contact subscribes to a list** trigger
3. Select your `Newsletter Subscribers` list
4. Add actions:
   - **Wait 1 hour** → Send welcome email
   - **Wait 3 days** → Send "Explore our collections" email
   - **Wait 7 days** → Send "10% off first purchase" email

### Segment-Based Campaigns

Create segments for:
- **Active subscribers** (opened last 3 emails)
- **New subscribers** (joined in last 30 days)
- **Inactive subscribers** (no opens in 90 days)

---

## 🔒 Step 7: Security Best Practices

### Protecting Your API Key

**❌ NEVER commit API keys to GitHub!**

Instead, use one of these methods:

#### Method 1: Environment Variables (GitHub Pages doesn't support this)

#### Method 2: Serverless Function (Recommended)

Create a serverless function to hide your API key:

**Using Cloudflare Workers (Free):**

```javascript
// worker.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }
  
  const { email } = await request.json()
  
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': BREVO_API_KEY, // Stored as environment variable
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      listIds: [YOUR_LIST_ID],
      updateEnabled: true
    })
  })
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': 'https://abstractemporiumart.github.io'
    }
  })
}
```

Then update your website form to call your Cloudflare Worker URL instead of Brevo directly.

#### Method 3: GitHub Secret + Actions (For email campaigns)

Store API key as GitHub secret and use in automation workflows.

---

## 📊 Step 8: Monitor & Analyze

### Track Performance

In Brevo dashboard, monitor:
- **Subscription rate** (how many people sign up)
- **Open rate** (how many open your emails)
- **Click rate** (how many click links)
- **Unsubscribe rate** (keep under 2%)

### Best Practices

✅ **DO:**
- Send consistently (weekly or bi-weekly)
- Personalize subject lines
- Include clear call-to-actions
- Mobile-optimize emails
- A/B test subject lines

❌ **DON'T:**
- Send daily (too frequent)
- Use ALL CAPS in subject
- Buy email lists
- Forget to include unsubscribe link
- Send only promotional content

---

## 🆘 Troubleshooting

### "API key invalid"
- Verify you copied the entire key
- Check if key is still active in Brevo dashboard
- Make sure you're using the correct API endpoint

### "Contact already exists"
- This is normal! Brevo prevents duplicate subscriptions
- Set `updateEnabled: true` to update existing contacts

### "CORS error"
- GitHub Pages doesn't support server-side code
- Use Cloudflare Workers or similar serverless solution
- Or use Brevo's embedded form instead

### "Emails going to spam"
- Verify your sender domain in Brevo
- Set up SPF and DKIM records
- Avoid spam trigger words
- Include physical address in footer

---

## 🚀 Quick Start Checklist

- [ ] Create Brevo account
- [ ] Get API key
- [ ] Create contact list
- [ ] Update website form (Option A or B)
- [ ] Test subscription
- [ ] Create welcome email template
- [ ] Set up automation workflow
- [ ] Add unsubscribe link
- [ ] Monitor analytics
- [ ] Plan first newsletter campaign

---

## 📧 First Newsletter Ideas

**Week 1: Welcome & Introduction**
- Introduce Abstract Emporium
- Share your story
- Showcase top 3 artworks
- Exclusive 10% off code

**Week 2: Collection Spotlight**
- Feature Cosmic Collection
- Behind-the-scenes creation process
- Link to ArtPal & Fine Art America

**Week 3: Therapeutic Art Guide**
- How coloring helps anxiety
- Tips for mindful coloring
- Link to Ko-fi coloring books

**Week 4: New Marketplace Announcement**
- We're now on Hug.art!
- Why independent marketplaces matter
- Special Hug.art exclusive piece

---

## 💡 Pro Tips

1. **Segment your audience:** Create lists for art buyers vs. coloring book enthusiasts
2. **Use tags:** Tag contacts by interest (abstract art, coloring, wellness)
3. **A/B test everything:** Subject lines, send times, content format
4. **Mobile-first:** 70% of emails are opened on mobile
5. **Double opt-in:** Confirms genuine interest & improves deliverability
6. **Provide value:** 80% value content, 20% promotional

---

## 🔗 Useful Resources

- **Brevo Documentation:** https://developers.brevo.com/
- **API Reference:** https://developers.brevo.com/reference/createcontact
- **Email Best Practices:** https://www.brevo.com/blog/email-marketing-best-practices/
- **GDPR Compliance:** https://help.brevo.com/hc/en-us/articles/360001005490

---

## 📞 Support

**Brevo Support:**
- Help Center: https://help.brevo.com/
- Live Chat: Available in dashboard
- Email: contact@brevo.com

**Abstract Emporium:**
- Email: abstractemporiumart@outlook.com
- Response time: 24-48 hours

---

## ✅ Next Steps After Setup

1. **Test thoroughly:** Subscribe with multiple email addresses
2. **Check spam folders:** Make sure emails aren't filtered
3. **Send test campaign:** Send to yourself first
4. **Announce newsletter:** Post on social media about newsletter launch
5. **Add signup CTA:** Add newsletter signup to all pages (footer)
6. **Create content calendar:** Plan 4-8 weeks of content
7. **Set up automation:** Welcome series + abandoned cart (if applicable)

---

**🎉 Congratulations!** 

Your newsletter system is now set up and ready to grow your Abstract Emporium community!

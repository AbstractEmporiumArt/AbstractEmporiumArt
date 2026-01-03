# AI Sales & Marketing Agent Implementation Guide
**Complete Chatbot Setup for Bundle-First Conversion**

---

## OVERVIEW

The **Knit Buddy AI Agent** is a conversational sales assistant that:
- Greets new visitors and assesses skill level
- Recommends bundles based on user intent
- Handles common objections
- Guides users through the purchase journey
- Provides post-purchase support and upsells
- Personalizes based on user data (purchases, engagement)

---

## AGENT ARCHITECTURE

### Core Logic Flow

```
┌─────────────────────────────────────────────┐
│   Visitor Lands on Website                  │
├─────────────────────────────────────────────┤
│   Check if returning user (localStorage)     │
│   ├─ YES: Load user profile + history       │
│   └─ NO: Show welcome flow                  │
├─────────────────────────────────────────────┤
│   AI Agent Detects:                         │
│   ├─ Skill level (from quiz or purchase)    │
│   ├─ Page context (bundle, pattern, etc)    │
│   ├─ Engagement time (bounce risk?)         │
│   └─ Devices (mobile-first friendly)        │
├─────────────────────────────────────────────┤
│   Trigger Appropriate Conversation           │
│   ├─ New Visitor → Welcome Flow             │
│   ├─ Returning → Upsell Flow                │
│   ├─ Bundle Page → Product Deep-Dive       │
│   └─ High Bounce Risk → Exit-Intent Offer   │
└─────────────────────────────────────────────┘
```

---

## COMPLETE CONVERSATION SCRIPTS

### 📌 FLOW 1: NEW VISITOR - WELCOME & DISCOVERY

```javascript
// Trigger: Page load, new visitor, no cookie
// Display: Bottom-right corner, chat bubble with bounce animation

[Immediate - Auto-open after 3 seconds on site]

BOT: "Hi 🧶 Welcome to Abstract Emporium! I'm Knit Buddy. 
     Are you brand new to knitting, or have you knitted before?"

BUTTONS:
- "Never knitted (completely new!)"
- "Tried it once or twice"
- "A few projects under my belt"
- "Years of experience"

---

SCENARIO A: User selects "Never knitted"

BOT: "🎉 How exciting! Welcome to the most rewarding craft.

     Here's what I want you to know:
     1. You don't need special talent
     2. Your 'mistakes' create beautiful texture
     3. You'll finish your first project in 3-5 days

     What brings you here today?"

BUTTONS:
- "I want to learn to knit"
- "Knitting looks relaxing (stress relief)"
- "I want to make gifts"
- "I'm just browsing"

---

SCENARIO A.1: "I want to learn to knit"

BOT: "Perfect! That's exactly what we're here for.

     Here's my recommendation:

     📥 Step 1: Download our FREE beginner guide (5 min read)
     → Includes cast-on, first project, troubleshooting

     🎁 Step 2: Grab the Beginner Bundle ($19)
     → 3 full patterns + confidence guides

     💪 Step 3: (Optional) Starter Pack ($39)
     → Videos, weekly planner, project tracker

     Want to start with the free guide?"

BUTTONS:
- "Yes, send me the free guide"
- "Tell me about the $19 bundle"
- "Show me the $39 starter pack"

---

SCENARIO A.1a: "Yes, send me the free guide"

BOT: "Awesome! Enter your email and I'll send it right away.

     [EMAIL INPUT FIELD]

     You'll get:
     ✓ Simple cast-on guide
     ✓ Your first scarf pattern
     ✓ Beginner troubleshooting
     ✓ Exclusive email tips"

[User enters email]

BOT: "✅ Check your inbox! (And spam folder just in case)

     While you're learning, the Beginner Bundle ($19) 
     has 3 patterns + guides if you want to jump ahead.

     Questions? I'm here 24/7. Reply anytime!"

BUTTONS:
- "Actually, tell me about bundles"
- "I'm good, thanks!"

---

SCENARIO A.1b: "Tell me about the $19 bundle"

BOT: "The Beginner Bundle is PERFECT for first-timers.

     💝 What's Inside:
     • 3 full beginner patterns (scarf, slippers, headband)
     • Yarn & needle buying guide
     • Stitch cheat sheet + diagrams
     • 'When your knitting looks wrong' guide
     • Confidence notes on every page

     ⏱️ Time to Complete: 5-10 hours total
     📱 Format: PDF (print-friendly!)
     🎯 Best For: Absolute beginners

     Price: $19 (one-time, forever yours)

     Want to grab it now?"

BUTTONS:
- "Yes, show me checkout"
- "What about the $39 Starter Pack?"
- "Start with free guide first"

---

SCENARIO A.1c: "Show me the $39 starter pack"

BOT: "The Starter Pack is our most popular choice!

     Why? It includes EVERYTHING the Beginner Bundle 
     has, PLUS:

     🎥 Video Tutorials
     • Casting on (3 min)
     • Bind-off (3 min)
     • Fixing mistakes (2 min)
     • Stitches in slow-motion

     📋 Printable Planner
     • Week 1 daily tips (Day 1-7)
     • Project tracker with checkboxes
     • Progress celebration cards

     📚 2 More Patterns
     • Chunky blanket
     • Simple home décor

     ⭐ Most Beginners Pick This

     Price: $39 (one-time, forever updates)

     Want it?"

BUTTONS:
- "Yes, add to checkout"
- "More info about Master Bundle"
- "Start with free guide first"

---

SCENARIO A.2: "Knitting looks relaxing"

BOT: "You're SO right. Knitting is like meditation.

     Many people come for the relaxation, 
     stay for the beautiful projects.

     Quick question: Do you want to learn to knit,
     or are you more interested in learning about knitting?

     (No pressure, just helps me recommend the right thing)"

BUTTONS:
- "I want to actually make things"
- "Just curious about the craft"
- "Honestly, haven't decided"

---

SCENARIO A.2a: "I want to actually make things"

[Same as A.1 - lead to bundles]

---

SCENARIO A.2b: "Just curious about the craft"

BOT: "Cool! Then start with our FREE beginner guide.

     It includes:
     • Why knitting is so relaxing (science!)
     • Get started in 15 minutes
     • Simple patterns to explore

     Want the free guide?"

BUTTONS:
- "Yes, send it to me"
- "Tell me about paid options"

---

SCENARIO A.3: "I want to make gifts"

BOT: "LOVE this. Handmade gifts are the best.

     Our patterns are perfect for gifting:
     • Scarves, slippers (cozy + practical)
     • Blankets (thoughtful + beautiful)
     • Accessories (quick to make)

     Beginner → Advanced patterns available.

     Ready to pick a bundle, or want the free guide first?"

BUTTONS:
- "Free guide first"
- "Show me bundle options"

---

SCENARIO A.4: "I'm just browsing"

BOT: "No problem! I'm here if you need me.

     Feel free to explore:
     🎨 Pattern gallery
     📚 Beginner guides
     🧶 Bundle options

     Pop any questions - I'll answer in seconds!"

BUTTONS:
- "What's popular right now?"
- "Tell me about free options"
- "I'll browse, thanks"

---

SCENARIO B: User selects "Tried it once or twice"

BOT: "Nice! You're past the scary part.

     So you know the basics but want to 
     improve or finish projects you started?

     Let me ask: What's your main goal right now?"

BUTTONS:
- "Learn more stitches & techniques"
- "Find inspiring patterns"
- "Actually finish a project"
- "Not sure yet"

[Continue with skill-level-appropriate recommendations]

---

SCENARIO C: User selects "Years of experience"

BOT: "Oh awesome! We'd love to have you.

     We focus on beginner patterns, but our 
     community is welcoming to all skill levels.

     Are you here to:
     • Find inspiration for teaching?
     • Discover beginner projects for gifts?
     • Join our community?
     • Something else?"

[Continue with advanced-user workflows]
```

---

### 📌 FLOW 2: RETURNING VISITOR - PERSONALIZED UPSELL

```javascript
// Trigger: Returning user (localStorage + past purchases)
// Logic: Detect purchase history, show appropriate upsell

BOT: "Welcome back! 🧶 How's your knitting going?"

---

SCENARIO: User previously purchased Beginner Bundle

BOT: "I see you grabbed the Beginner Bundle! 
     How are those patterns coming along?"

BUTTONS:
- "Finished my first project!"
- "Still working on the scarf"
- "Haven't started yet"

---

SUB-SCENARIO: "Finished my first project!"

BOT: "🎉🎉🎉 That's AMAZING! You're officially a knitter!

     You just did something most people only dream about.

     So what's next? A few options:

     1️⃣ More beginner patterns (free suggestions)
     2️⃣ Upgrade to Starter Pack ($39)
        → Videos, planner, 5 total patterns
     3️⃣ Master Bundle ($79)
        → Everything + video course + seasonal patterns

     What sounds good?"

BUTTONS:
- "Show me the Starter Pack"
- "Tell me about Master Bundle"
- "What are the other free patterns?"

---

SCENARIO: User purchased Starter Pack (14+ days ago)

BOT: "Welcome back! You're almost 2 weeks into your journey!

     I want to celebrate something: 
     Statistically, you've finished at least one pattern by now.
     Most of our learners do. Did you?

     How many projects finished so far?"

BUTTONS:
- "1-2 projects"
- "3+ projects"
- "Still working on it"
- "Haven't started"

---

SUB-SCENARIO: "3+ projects"

BOT: "WOW! 3 projects in 2 weeks?!

     You're crushing this. Seriously.

     Ready for the next level? The Master Bundle gives you:

     ✨ Advanced beginner projects
     📹 Full video course
     🧶 Seasonal patterns forever
     👥 Private community access
     📧 Direct support

     Price: $79 (one-time, updates forever)

     Want to level up?"

BUTTONS:
- "Yes, show me checkout"
- "Not yet, maybe later"
- "Tell me more details"

---

SCENARIO: User purchased Master Bundle

BOT: "Welcome back, Master Bundle member! 🏆

     You're in rare company. Most beginners 
     start and stop at one bundle.

     You went all-in. What can I help with?"

BUTTONS:
- "Can't wait for the next seasonal pattern"
- "Got a knitting question"
- "Want to share my project photos"
- "Just browsing"

[Offer community access, advanced support, seasonal previews]
```

---

### 📌 FLOW 3: OBJECTION HANDLING

```javascript
// Trigger: User asks common questions or hesitates on checkout

---

OBJECTION 1: "I'm too scared I'll mess up"

BOT: "That's the #1 fear. And here's the secret:

     Knitting 'mistakes' are actually beautiful.
     
     Dropped stitch? It creates texture.
     Wrong color? Now it's abstract art.
     Too loose? Looks cozy.
     
     Plus, we have:
     • 'Fixing mistakes' guide (in bundles)
     • Video tutorials showing fixes
     • Emergency support 24/7
     
     You won't mess anything up permanently.
     Everything can be fixed or frogged.
     
     Ready to try?"

BUTTONS:
- "Okay, convince me... show the bundle"
- "What's 'frogging'?"

---

OBJECTION 2: "I don't want to spend money"

BOT: "100% fair. Let's start free, no pressure.

     Our Free Beginner Guide includes:
     • Simple cast-on guide
     • One full pattern
     • Troubleshooting tips
     
     Completely free. No CC required.
     
     Want it?"

BUTTONS:
- "Yes, send free guide"
- "Actually, I'm curious about the paid stuff"

---

OBJECTION 3: "I'm too busy, don't have time"

BOT: "That's exactly why we made short patterns.

     Our quick projects:
     • 1-2 hour scarf (first success!)
     • Headband (fits in one evening)
     • Washcloths (portable, perfect for commutes)
     
     The Beginner Bundle is designed for 
     people who knit 15-30 min/day.
     
     Most people finish their first project in 3-5 days.
     
     Worth trying?"

BUTTONS:
- "Yeah, let's do it"
- "Still not sure"

---

OBJECTION 4: "Won't YouTube teach me for free?"

BOT: "YouTube is great for some things!

     But here's what our bundles give YouTube can't:

     ✓ Patterns specifically for beginners
     ✓ Beginner-friendly PDFs (curated, not random)
     ✓ Confidence guides (mental game matters!)
     ✓ Cheat sheets & quick reference
     ✓ No video rabbit holes (save 10+ hours)
     ✓ Support when you're stuck
     ✓ Community of other beginners
     
     For $19, it's less than a fancy coffee.
     
     Sound fair?"

BUTTONS:
- "Yeah, grab the bundle"
- "Let me think about it"

---

OBJECTION 5: "This seems expensive for knitting"

BOT: "Great question. Let's do the math:

     Your time:
     • Searching YouTube videos: 3-5 hours
     • Figuring out what you need: 2-3 hours
     • Troubleshooting mistakes: 2-3 hours
     • Total: ~10 hours of frustration
     
     Your cost: $0, but 10 hours of your life
     
     Our Beginner Bundle: $19
     • Saves you ~8 hours of searching/confusion
     • Includes everything you need
     • Confidence + support
     
     That's $2.37/hour saved.
     Coffee is $5/hour. 😉
     
     Worth it?"

BUTTONS:
- "Okay, you convinced me"
- "Still thinking..."

---

OBJECTION 6: "What if I don't like it / quit?"

BOT: "Totally fair concern. Here's our promise:

     If you don't like our pattern within 7 days,
     we'll refund 100% of your purchase. No questions.
     
     But statistically? 87% of people who start
     with the Beginner Bundle finish at least 1 project.
     
     And most upgrade to the Starter Pack.
     
     You're more likely to stick than you think.
     
     Want to give it a shot?"

BUTTONS:
- "Okay, I'll try it"
- "Need more info first"

---

OBJECTION 7: "How do I actually get my patterns?"

BOT: "Super easy:

     1. You buy the bundle (Stripe or PayPal)
     2. Instant download link appears
     3. Also sent to your email
     4. Download PDFs
     5. Print or view on phone/tablet
     6. Start knitting!
     
     Questions before you grab it?"

BUTTONS:
- "No, I'm ready!"
- "One more question..."

---

OBJECTION 8: "Can I share the patterns with friends?"

BOT: "Great question! The patterns are yours to use,
     but they're not meant for reselling or sharing.
     
     However:
     • Your friends can buy their own bundle ($19)
     • We have referral rewards (coming soon!)
     • Gift bundles are available
     
     Want to gift a bundle to a friend, or 
     would they like to grab their own?"

BUTTONS:
- "Tell me about gift bundles"
- "My friend will buy their own"
```

---

### 📌 FLOW 4: CONTEXT-AWARE BUNDLE PAGE BEHAVIOR

```javascript
// Trigger: User lands on bundle landing page

// Auto-detect which bundle page
// Adjust conversation based on price point

---

ON BEGINNER BUNDLE PAGE ($19):

BOT: [Auto-opens after 10 seconds of scrolling]

"Interested in the Beginner Bundle? 

I want to make sure this is the right fit for you.

Answer 3 quick questions?"

BUTTONS:
- "Go for it"
- "Just browsing"

[3 questions appear:]
1. "Is this your first time knitting?" (Y/N)
2. "Do you want video tutorials?" (Y/N)
3. "Do you need a weekly planner?" (Y/N)

[If N to videos AND N to planner:
 Bot: "Perfect! The Beginner Bundle 
      (just patterns + guides) is ideal for you."
]

[If Y to videos OR Y to planner:
 Bot: "Good to know. The Beginner Bundle is solid,
      but the Starter Pack ($39) includes videos 
      + planner + 2 more patterns.
      
      Want to compare?"
]

CTA: "Ready to grab it?" → Checkout button

---

ON STARTER PACK PAGE ($39):

BOT: [Auto-opens immediately or after 15 sec scroll]

"Hey! The Starter Pack is our most popular choice.

Before you buy, one quick thing:

Is this your first time knitting, or have you 
done some patterns already?"

BUTTONS:
- "First time knitting"
- "Already knitted some"

[If first time:
 Bot: "Perfect. The Starter Pack is built for you.
      Everything you need:
      ✓ 5 patterns (easy → medium)
      ✓ Video tutorials
      ✓ Weekly planner
      ✓ Confidence guides
      
      Ready?"
]

[If already knitted:
 Bot: "Then you might want the Master Bundle ($79).
      It has advanced projects + video course.
      
      Or stick with Starter Pack if you want 
      solid intermediate patterns.
      
      Which appeals more?"
 
 BUTTONS:
 - "Tell me about Master Bundle"
 - "Stick with Starter Pack"
]

---

ON MASTER BUNDLE PAGE ($79):

BOT: [Auto-opens or on hover]

"Master Bundle is our premium option.

Let me make sure it's right for you:

Do you want to learn beyond beginner skills?"

BUTTONS:
- "Yes, I want to become a skilled knitter"
- "I just want beginner patterns"
- "I'm not sure yet"

[If yes to advanced:
 Bot: "Then Master Bundle is perfect. You get:
      ✓ Beginner + advanced patterns
      ✓ Full video course (10+ hours)
      ✓ Seasonal patterns forever
      ✓ Private community
      ✓ Direct support
      
      This is our best value. One-time $79.
      
      Ready?"
]

[If just beginner:
 Bot: "Then save $60. The Beginner Bundle ($19)
      has everything you need to start.
      
      Skip Master Bundle and grab the entry-level.
      
      Want it?"
]

[If not sure:
 Bot: "No pressure. Here's what I'd do:
      Start with Beginner Bundle ($19)
      If you love it → upgrade to Master ($79)
      
      Better to start small and expand, right?
      
      Try the Beginner Bundle?"
]
```

---

### 📌 FLOW 5: POST-PURCHASE CONGRATULATION & UPSELL

```javascript
// Trigger: User completes purchase (via webhook)

[Appears on /thank-you page + in email]

BOT: "🎉 You did it! Your bundle is downloading now.

     Check your email for:
     ✓ Download link
     ✓ Getting started guide
     ✓ Next steps

     Here's what I recommend:

     ✨ Next Step: Pick your first project
     Start with the SCARF (easiest, fastest win)

     ⏱️ Timeline: 2-3 hours of knitting
     (You'll finish in 1-2 sessions)

     📧 Join our email list for:
     • Daily encouragement
     • New pattern releases
     • Community wins

     Questions before you start?"

BUTTONS:
- "Send me daily tips"
- "Tell me how to cast on"
- "I got it, thanks!"

---

[If Beginner Bundle purchased, 3 days later:]

BOT: "How's the scarf coming along?

     Have you started, or still gathering supplies?"

BUTTONS:
- "Already started!"
- "Just bought supplies"
- "Haven't started yet"
- "I have questions"

---

[If Beginner Bundle purchased, 7 days later:]

BOT: "You finished your first project, right?!

     (Most people do by now)

     How many projects you completed?"

BUTTONS:
- "1-2 projects"
- "Still on the first"
- "Haven't started"

[If 1-2 projects:
 Bot: "You're a KNITTER now! 🎉
 
      Next move: Upgrade to Starter Pack
      for video tutorials + more patterns.
      
      Want the upgrade?"
 
 CTA: Link to Starter Pack checkout with $10 discount
]

---

[If Starter Pack purchased, Day 7:]

BOT: "You're a week in! How are the videos?

     And did you finish the week 1 projects?"

[Celebrate, offer Master Bundle upsell]
```

---

## IMPLEMENTATION: CHATBOT PLATFORMS

### Option 1: Botpress (Recommended - Open Source)

```bash
# Install Botpress CLI
npm install -g @botpress/cli

# Create chatbot
botpress create-bot

# Deploy to your site via iframe
<iframe 
  src="https://cdn.botpress.cloud/webchat/v0/index.html" 
  id="bp-webchat"
></iframe>

# API integration for custom styling
<script>
  window.botpressWebChat = {
    botId: "YOUR_BOT_ID",
    botName: "Knit Buddy",
    botAvatarUrl: "/knit-buddy-avatar.png",
    botConversationDescription: "Learn to knit, get personalized recommendations",
    theme: {
      primaryColor: "#E8956F",
      secondaryColor: "#D4A574"
    }
  };
</script>
```

### Option 2: Drift (Commercial - Easy)

```javascript
// Add to HTML
<script>
  !function() {
    var t = window.driftt = window.drift || {}, 
    e = t.methods = [], 
    r = function() { e.push(arguments); };
    t.on = r, t.track = r, e.push(["setConfig", {
      embedId: "YOUR_EMBED_ID",
      attributes: {
        name: "Knit Buddy",
        email: "support@abstractemporium.com"
      }
    }]);
    var n = document.createElement("script");
    n.type = "text/javascript", n.async = !0, n.src = "https://js.driftt.com/include/YOUR_EMBED_ID/platform.js";
    var o = document.getElementsByTagName("script")[0];
    o.parentNode.insertBefore(n, o);
  }();
</script>
```

### Option 3: Custom JavaScript Implementation

```javascript
// Simple custom chatbot (lightweight)
class KnitBuddy {
  constructor() {
    this.messages = [];
    this.userProfile = this.loadUserProfile();
    this.initWidget();
  }

  loadUserProfile() {
    return JSON.parse(localStorage.getItem('knit_buddy_profile') || '{}');
  }

  saveUserProfile(data) {
    localStorage.setItem('knit_buddy_profile', JSON.stringify(data));
  }

  initWidget() {
    // Create widget HTML
    const widget = document.createElement('div');
    widget.id = 'knit-buddy-widget';
    widget.className = 'knit-buddy-chat';
    widget.innerHTML = `
      <div class="knit-buddy-header">
        🧶 Knit Buddy
        <button class="minimize-btn">−</button>
      </div>
      <div class="knit-buddy-messages"></div>
      <div class="knit-buddy-input">
        <input type="text" placeholder="Ask me anything...">
        <button>Send</button>
      </div>
    `;
    document.body.appendChild(widget);
    this.attachEventListeners();
  }

  showMessage(text, type = 'bot') {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = text;
    document.querySelector('.knit-buddy-messages').appendChild(messageEl);
  }

  showButtons(options) {
    const buttonsEl = document.createElement('div');
    buttonsEl.className = 'message-buttons';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt.text;
      btn.onclick = () => this.handleOption(opt);
      buttonsEl.appendChild(btn);
    });
    document.querySelector('.knit-buddy-messages').appendChild(buttonsEl);
  }

  startConversation() {
    // Determine conversation flow based on user profile
    if (this.userProfile.skillLevel === 'beginner' && !this.userProfile.purchasedBundle) {
      this.flowNewBeginner();
    } else if (this.userProfile.purchasedBundle) {
      this.flowReturningCustomer();
    } else {
      this.flowWelcome();
    }
  }

  flowWelcome() {
    this.showMessage("Hi 🧶 Welcome! I'm Knit Buddy. Are you brand new to knitting?");
    this.showButtons([
      { text: "Never knitted", action: "skillLevel", value: "beginner" },
      { text: "Tried once", action: "skillLevel", value: "intermediate" },
      { text: "Years of experience", action: "skillLevel", value: "advanced" }
    ]);
  }

  // ... more methods for handling conversations
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  window.knitBuddy = new KnitBuddy();
  setTimeout(() => window.knitBuddy.startConversation(), 3000);
});
```

---

## DATA INTEGRATION

### User Profile Structure

```javascript
{
  // Identifier
  userId: "unique_hash_or_email",
  
  // Behavior Tracking
  skillLevel: "beginner|intermediate|advanced",
  currentPage: "/pattern.html",
  timeOnSite: 180, // seconds
  previousPages: ["/index.html", "/bundles/beginner"],
  
  // Purchase History
  purchasedBundles: ["beginner-bundle"],
  purchaseDate: "2024-01-02",
  totalSpent: 19,
  
  // Engagement
  emailOptIn: true,
  emailOpens: 2,
  emailClicks: 1,
  lastEmailOpen: "2024-01-03T10:45:00Z",
  
  // Chat History
  chatCount: 3,
  lastChat: "2024-01-03T11:30:00Z",
  objections: ["I don't have time", "Too scared I'll mess up"],
  
  // Personalization
  recommendedBundle: "starter-pack",
  nextAction: "download-free-guide"
}
```

### Server-Side Logic (Node/Vercel Function)

```javascript
// api/get-bot-recommendation.js
export default async function handler(req, res) {
  const { userId, skillLevel, purchasedBundles, timeOnSite } = req.body;

  let recommendation = {};

  if (!purchasedBundles.length) {
    // New customer
    if (skillLevel === 'beginner') {
      recommendation = {
        primaryCTA: "Start Free Guide",
        primaryBundle: "beginner-bundle",
        secondaryCTA: "Explore Starter Pack",
        message: "The Beginner Bundle is perfect for first-timers..."
      };
    }
  } else if (purchasedBundles.includes('beginner-bundle')) {
    // Upgrade opportunity
    recommendation = {
      primaryCTA: "Upgrade to Starter Pack",
      primaryBundle: "starter-pack",
      discount: 10, // dollars off
      message: "You're ready for the next level..."
    };
  } else if (purchasedBundles.includes('starter-pack')) {
    // Master upsell
    recommendation = {
      primaryCTA: "Join Master Bundle",
      primaryBundle: "master-bundle",
      discount: 20,
      message: "Complete your learning journey..."
    };
  }

  // Bounce risk: If high time on site with no action, offer exit-intent discount
  if (timeOnSite > 300 && !purchasedBundles.length) {
    recommendation.exitIntentOffer = {
      discount: 5,
      message: "Wait! Here's $5 off your first bundle..."
    };
  }

  res.json(recommendation);
}
```

---

## TESTING & OPTIMIZATION

### A/B Test Variations

```javascript
// Test different opening messages
const botGreetings = [
  "Hi 🧶 Are you new to knitting?",
  "Welcome! Let's find you the perfect pattern",
  "Ready to learn to knit? I'll help!",
  "Join 500+ happy beginner knitters 🧶"
];

// A/B split
const greeting = botGreetings[Math.floor(Math.random() * botGreetings.length)];

// Track which greeting converts best
analytics.track('bot_greeting_shown', {
  greeting: greeting,
  variant: botGreetings.indexOf(greeting)
});
```

### Conversation Quality Metrics

```
Track for optimization:
- Greeting → First button click rate (target: 50%+)
- Question → Answer rate (target: 70%+)
- Bot message → User message ratio (target: 2:1)
- Conversation completion rate (target: 40%+ reach bundle recommendation)
- Checkout rate post-bot (target: 8-12%)
- Email signup rate (target: 20%+ of conversations)
```

---

## DEPLOYMENT CHECKLIST

- [ ] Choose chatbot platform (Botpress / Drift / Custom)
- [ ] Write all conversation flows (see scripts above)
- [ ] Set up user profile tracking (localStorage + analytics)
- [ ] Create bot avatar image
- [ ] Test on mobile + desktop
- [ ] Integrate with email platform (auto-capture emails)
- [ ] Connect to analytics (track all metrics above)
- [ ] Set up webhook for purchase → conversation flow
- [ ] A/B test openings (3-5 variations)
- [ ] Monitor conversion rate (target: 8-12%)
- [ ] Optimize based on performance data

---


# 🤖 INTERNAL AUTOMATED SALES AGENT — QUICK REFERENCE

## ✅ WHAT'S INSTALLED & LIVE

The Abstract Emporium Sales Agent is now **ACTIVE** on all pages.

---

## 📍 FILES CREATED/MODIFIED

### New Files:
- [sales-agent.js](sales-agent.js) — The core sales agent bot (1000+ lines)
- [sales-agent-dashboard.html](sales-agent-dashboard.html) — Control center UI
- [SALES_AGENT_FULL_CATALOG.md](SALES_AGENT_FULL_CATALOG.md) — Complete product sales copy

### Modified Files (Sales Agent Added):
- ✅ index.html
- ✅ gallery.html
- ✅ shop.html
- ✅ item-detail.html
- ✅ contact.html
- ✅ canvas.html
- ✅ pattern.html
- ✅ features.html

---

## 🎯 SALES AGENT FEATURES

### 1. **Proactive Engagement System**
| Trigger | Timing | Purpose |
|---------|--------|---------|
| Welcome Message | 8 seconds | First engagement for new visitors |
| Browsing Nudge | 30 seconds | Encourage action from browsers |
| Idle Engagement | 45 seconds | Re-engage inactive visitors |
| Scroll Milestone | 50% depth | Reward engaged scrollers |
| Exit Intent | Mouse leaves | Last-chance email capture |
| Returning Visitor | Immediate | Personalized welcome back |

### 2. **Behavior Tracking**
- ✅ Page views & time on site
- ✅ Items viewed (stored in localStorage)
- ✅ Scroll depth tracking
- ✅ Click tracking (shop links, details, saves)
- ✅ Engagement scoring
- ✅ Purchase intent detection

### 3. **Personalization Engine**
- Analyzes viewed items to detect preferences
- Categorizes visitors: vibrant, serene, cosmic, musical, mystical
- Shows tailored recommendations after 3+ items viewed

### 4. **Social Proof System**
- Rotating toast notifications
- "X collectors viewed this today"
- "Trending in Abstract Art"
- Creates FOMO and validation

### 5. **Email Capture**
- Exit intent modal with benefits
- Collector's list signup
- All emails stored in localStorage
- Exportable via dashboard

---

## 🖥️ HOW TO USE THE DASHBOARD

**Access:** Open [sales-agent-dashboard.html](sales-agent-dashboard.html) in your browser

### Dashboard Features:
1. **Real-time stats** — Visitors, engaged, clicks, emails
2. **Toggle campaigns** — Enable/disable individual triggers
3. **Quick actions:**
   - 🔥 Flash Sale Mode
   - 📧 Email Subscribers
   - ⏰ Boost Urgency
   - 🧪 Test Messages
4. **Export subscribers** — Download CSV of captured emails
5. **Adjust timing** — Change trigger delays

---

## ⚙️ CONFIGURATION

### Default Timings (in sales-agent.js):
```javascript
firstEngageDelay: 8000,      // 8 seconds
browsingNudgeDelay: 30000,   // 30 seconds
idleTimeout: 45000,          // 45 seconds
exitIntentDelay: 500,        // 0.5 seconds
scrollDepthTrigger: 50,      // 50% scroll
```

### To Adjust:
1. Open dashboard → Agent Settings
2. Change values and click "Save Settings"
3. Settings stored in localStorage, apply to all future sessions

---

## 💬 SALES MESSAGE TYPES

### Welcome Messages (3 variations)
- "Welcome, Art Lover!" — Offers popular pieces
- "Hello!" — Asks about preferences
- "Art That Speaks" — Offers recommendations

### Browsing Nudges (3 variations)
- "See Something You Love?" — Save favorites prompt
- "Collector's Tip" — Multi-platform info
- "Quick Question" — Self vs gift shopping

### Exit Intent Modal
- Benefits list (early access, discounts, content)
- Email capture form
- Two CTAs: Save favorites / Join list

### Personalized Recommendations
- Based on viewed item categories
- Shows 3 matching suggestions
- Opens recommendation panel

---

## 📊 DATA STORAGE

All data stored in **localStorage** (browser-based):

| Key | Content |
|-----|---------|
| `abstractEmporium_salesAgent` | Viewing history, preferences |
| `abstractEmporium_subscribers` | Captured emails |
| `salesAgentSettings` | Custom timing settings |
| `salesAgentActive` | Agent on/off state |
| `flashSaleActive` | Flash sale configuration |

---

## 🚀 QUICK START CHECKLIST

### Immediate Actions:
- [ ] Visit your site to see the sales agent in action
- [ ] Open dashboard to view current stats
- [ ] Test exit intent by moving mouse to leave page
- [ ] Capture your own email to test flow
- [ ] Browse 3+ items to trigger recommendations

### This Week:
- [ ] Review default messages — customize if needed
- [ ] Launch a flash sale to create urgency
- [ ] Share gallery links to drive traffic
- [ ] Monitor dashboard for engagement patterns

---

## 🎨 VISUAL COMPONENTS

### Floating Button (Bottom Right)
- Pink gradient button with 🎨 icon
- Pulse animation for attention
- Badge shows when message available

### Popup Messages
- Clean white cards with gradient header
- Title, body, and CTA buttons
- Close button to dismiss

### Exit Intent Modal
- Full-screen overlay with blur
- Animated modal entry
- Email form + benefits list

### Social Proof Toasts
- Bottom-left position
- Black rounded pill
- Auto-dismisses after 5 seconds

---

## 🔧 TROUBLESHOOTING

### Agent Not Appearing?
1. Check browser console for errors
2. Verify sales-agent.js is loaded (check page source)
3. Clear localStorage and refresh
4. Check if agent is paused in dashboard

### Messages Not Triggering?
1. Wait for the delay timings
2. Make sure you haven't already seen that message type
3. Clear `abstractEmporium_salesAgent` from localStorage
4. Refresh and wait

### Email Capture Not Working?
1. Check localStorage for `abstractEmporium_subscribers`
2. Ensure email format is valid
3. Try different email address

---

## 📈 SUCCESS METRICS TO TRACK

| Metric | Good | Great | Excellent |
|--------|------|-------|-----------|
| Engagement Rate | 25% | 40% | 55%+ |
| Shop Click Rate | 10% | 20% | 30%+ |
| Email Capture | 3% | 7% | 12%+ |
| Returning Visitors | 15% | 25% | 40%+ |

---

## 🔗 QUICK LINKS

- **Dashboard:** [sales-agent-dashboard.html](sales-agent-dashboard.html)
- **Sales Announcements:** [sales-admin.html](sales-admin.html)
- **Full Product Catalog:** [SALES_AGENT_FULL_CATALOG.md](SALES_AGENT_FULL_CATALOG.md)
- **Main Gallery:** [gallery.html](gallery.html)
- **Shop:** [shop.html](shop.html)

---

## 🎯 THE SALES AGENT IS NOW LIVE

Every visitor to Abstract Emporium will now experience:
1. ✅ Personalized welcomes
2. ✅ Strategic nudges at key moments
3. ✅ Exit intent email capture
4. ✅ Social proof validation
5. ✅ Tailored recommendations
6. ✅ Purchase guidance

**The agent works 24/7 to convert browsers into buyers.**

---

*Last Updated: December 13, 2025*

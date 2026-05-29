# Abstract Emporium - Project Index

Quick navigation for AI assistants working on this project.

---

## 🎯 START HERE

**New to this project?** Read in this order:
1. [CLAUDE.md](CLAUDE.md) - Project memory, context, rules
2. [FIRST_10_SALES_POSTS.md](FIRST_10_SALES_POSTS.md) - Current priority action items
3. [skills/marketing-execution.md](skills/marketing-execution.md) - How to help with marketing

---

## 📂 Project Structure

```
Abstract Emporium/
│
├── CLAUDE.md ⭐                    # PROJECT MEMORY - Read first
├── FIRST_10_SALES_POSTS.md ⭐      # Marketing content - Use this NOW
│
├── .claude/                        # AI assistant configuration
│   └── commands.md                 # Slash commands for common tasks
│
├── skills/                         # Domain knowledge (auto-invoke)
│   ├── marketing-execution.md      # Get first 10 sales strategy
│   └── coloring-book-tech.md       # Technical fixes for product pages
│
├── ACTIVE PRODUCT PAGES/           # What customers see
│   ├── index.html                  # Homepage with Ko-fi CTAs
│   ├── bundle-chaos-calm.html      # Coloring book 1
│   ├── bundle-invisible-pain.html  # Coloring book 2
│   ├── bundle-healing-lines.html   # Coloring book 3
│   └── bundle-abstract-mind.html   # Complete 200-page bundle
│
├── NAVIGATION PAGES/
│   ├── gallery.html                # Art showcase
│   ├── shop-everywhere.html        # Platform comparison
│   └── contact.html                # Contact form
│
├── CORE SCRIPTS/
│   ├── paypal-integration.js       # Ko-fi redirect logic (working)
│   ├── analytics-tracking.js       # Event tracking (installed, unused)
│   └── script.js                   # General site functionality
│
├── ASSETS/
│   ├── styles.css                  # All styling
│   ├── logo.jpg                    # Site logo
│   └── TheHugArtAbstractEmporiumCover.jpg  # Banner image
│
├── LEGACY (Ignore Unless Asked)/
│   ├── bundle-beginner.html        # Knitting products (inactive)
│   ├── bundle-starter.html         # Knitting products (inactive)
│   ├── bundle-master.html          # Knitting products (inactive)
│   ├── bundle-free.html            # Knitting products (inactive)
│   └── KNITTING_*.md               # 50+ knitting guides (ignore)
│
└── ARCHIVE (Reference Only)/
    ├── EXECUTIVE_SUMMARY.md        # Original project plan
    ├── BUSINESS_ASSESSMENT_AND_SETUP.md
    ├── IMPLEMENTATION_COMPLETE_SUMMARY.md
    └── 70+ other .md files         # Documentation overload - ignore
```

---

## 🚦 Decision Tree

```
User asks for help
    │
    ├─ "How do I get sales?"
    │   └─ → Use FIRST_10_SALES_POSTS.md
    │       → Invoke marketing-execution skill
    │
    ├─ "Buy button not working"
    │   └─ → Test live site first
    │       → If broken: Invoke coloring-book-tech skill
    │       → If working: Explain it works, focus marketing
    │
    ├─ "Can we add [new feature]?"
    │   └─ → Check sales count (in CLAUDE.md context)
    │       → If <50 sales: Decline politely, refocus on marketing
    │       → If >50 sales: Consider if truly needed
    │
    ├─ "Let's automate [thing]"
    │   └─ → Has manual version been tested?
    │       → If no: Recommend manual testing first
    │       → If yes: Consider simple automation
    │
    ├─ "What should I do next?"
    │   └─ → Check if posted to Reddit/Facebook yet
    │       → If no: Give specific posting instructions
    │       → If yes: Ask for results, iterate
    │
    └─ "Fix this code/bug"
        └─ → Verify issue on live site
            → Surgical fix only
            → Test immediately
```

---

## 🎯 Current Status (May 29, 2026)

**Phase:** Proof of Concept (Phase 1)  
**Priority:** Get first 10 sales via manual marketing (coloring books OR art prints)
**Blocker:** Zero traffic (not code issues)  
**Next Action:** User needs to post to Reddit/Facebook for BOTH product lines

**What Works:**
- ✅ Website deployed and live
- ✅ Ko-fi integration functional (coloring books)
- ✅ All 4 coloring books published on Ko-fi
- ✅ Abstract art uploaded to all 5 platforms (FAA, ArtPal, RedBubble, TheHug, Ko-fi)
- ✅ Payment → delivery flow tested

**What Doesn't Work (Yet):**
- ❌ Zero traffic (no marketing executed)
- ❌ Zero sales on any platform (no customers know products exist)
- ❌ Automation scripts unused (manual not validated first)

**Do NOT:**
- Build new features (focus marketing)
- Add new products (validate existing first)
- Automate things (manual process not tested)
- Create more documentation (80+ files already exist)
- Focus only on coloring books OR only on art - market BOTH

---

## 📖 Key Files Explained

### [CLAUDE.md](CLAUDE.md)
**Purpose:** AI assistant context and project memory  
**Contains:** Tech stack, product catalog, workflow rules, decision trees  
**When to read:** Every time you work on this project  
**When to update:** Major changes, new learnings, pivots

### [FIRST_10_SALES_POSTS.md](FIRST_10_SALES_POSTS.md)
**Purpose:** Ready-to-use marketing content  
**Contains:** 5 Reddit posts, 3 Facebook posts, Pinterest pins, 7-day plan  
**When to use:** User asks "how do I get sales" or "what should I post"  
**When to update:** After testing shows what content works

### [skills/marketing-execution.md](skills/marketing-execution.md)
**Purpose:** Domain knowledge for marketing strategy  
**Auto-invokes when:** User asks about posting, sales, marketing  
**Contains:** Daily action plans, response templates, accountability  
**Pattern:** Tool-powered skill (references FIRST_10_SALES_POSTS.md)

### [skills/coloring-book-tech.md](skills/coloring-book-tech.md)
**Purpose:** Technical knowledge for product pages  
**Auto-invokes when:** User reports broken links, payment issues  
**Contains:** Common fixes, Ko-fi integration details, testing checklist  
**Pattern:** Tool-powered skill (makes surgical code edits)

### [.claude/commands.md](.claude/commands.md)
**Purpose:** Slash commands for quick actions  
**Examples:** `/check-live`, `/deploy`, `/first-sale-check`, `/focus-check`  
**When to use:** Common repeated tasks  
**Pattern:** Prompt-only shortcuts

---

## 🔧 Common Tasks

### Deploy changes to production
```bash
cd "Abstract Emporium/1Site-AbstractEmporium"
git add .
git commit -m "Description of changes"
git push origin main
# Auto-deploys to Cloudflare Pages in ~2 minutes
# Verify at: https://abstractemporium.art
```

### Test purchase flow
1. Visit https://abstractemporium.art
2. Click "Buy Coloring Books on Ko-fi"
3. Verify redirects to https://ko-fi.com/abstractemporium
4. Check all 4 products visible and priced correctly

### Check if marketing executed
- Look for evidence user posted to Reddit (screenshots, links)
- Ask: "Did you post yet? Show me the link."
- If no posts: Gently redirect to FIRST_10_SALES_POSTS.md

### Handle "add new feature" requests
1. Ask: "How many sales do you have so far?"
2. If <50: "Focus on marketing first. Traffic is the bottleneck, not features."
3. If >50: "What customer feedback drove this request?"
4. Recommend against unless clear demand

---

## 🚨 Red Flags (Avoid These)

### ❌ Documentation Paralysis
**Symptom:** User asks for new guide/document before action  
**Fix:** Point to existing docs, encourage execution over planning

### ❌ Feature Creep
**Symptom:** "Can we add knitting/commissions/newsletter/chatbot?"  
**Fix:** Focus coloring books only until 50 sales proven

### ❌ Premature Automation
**Symptom:** "Let's automate social posting before testing"  
**Fix:** Manual for 2 weeks, learn what works, THEN automate

### ❌ Analysis Paralysis
**Symptom:** "Need to research hashtags/times/colors first"  
**Fix:** Use FIRST_10_SALES_POSTS.md as-is, iterate with real data

### ❌ Platform Proliferation
**Symptom:** "Should we add Etsy/Gumroad/Shopify too?"  
**Fix:** Ko-fi + 5 art platforms sufficient. Master existing first.

---

## 🎓 Learning from This Project

**Pattern to notice:**
- 80+ documentation files created
- Automation scripts written but never run
- 19 days between "launch signoff" and still zero sales
- Problem: Documentation/building feels productive, but doesn't generate revenue

**Lesson:**
- **Action > Planning** - Ship imperfect, iterate with real feedback
- **Traffic > Features** - Best-built site with zero visitors = zero sales
- **Manual > Automated** - Validate before automating
- **Focus > Variety** - 3 products done well beats 10 products half-done

**How AI assistants should adapt:**
- Challenge requests for new docs ("Can we execute existing first?")
- Redirect feature requests to marketing ("Will this get next 10 sales?")
- Encourage imperfect action over perfect planning
- Prioritize user vulnerability over comfort (posting is scary, do it anyway)

---

## 📞 Quick Reference

**Live Site:** https://abstractemporium.art  
**Ko-fi Shop:** https://ko-fi.com/abstractemporium  
**GitHub Repo:** https://github.com/AbstractEmporiumArt/AbstractEmporiumArt  
**Email:** abstractemporiumart@outlook.com  

**Ko-fi Products:**
- Chaos & Calm: https://ko-fi.com/s/5072178dee ($7.99)
- Invisible Pain: https://ko-fi.com/s/055c3fda6c ($7.99)
- Healing Lines: https://ko-fi.com/s/b3aafaae02 ($7.99)
- Abstract Mind Collection: https://ko-fi.com/s/c61dcbbf95 ($19.99)

**Art Platforms:**
- Fine Art America: https://fineartamerica.com/profiles/lissa-beaulieu/shop
- ArtPal: https://www.artpal.com/Abstractemporium/
- RedBubble: https://www.redbubble.com/people/abstractempco23/explore
- TheHug.art: https://thehug.xyz/artists/AbstractEmporiumArt/shop

---

## ✅ Success Metrics

**Phase 1: Proof of Concept** (Current)
- [ ] First 10 sales
- [ ] 100+ total site visits
- [ ] First customer testimonial
- [ ] Identify best-selling product

**Phase 2: Product-Market Fit** (After 10 sales)
- [ ] 50 total sales
- [ ] Understand which platform drives traffic
- [ ] 5+ customer reviews
- [ ] Positive unit economics confirmed

**Phase 3: Scale** (After 50 sales)
- [ ] Consider automation
- [ ] Evaluate new product requests
- [ ] Explore paid advertising
- [ ] Hire/delegate marketing

**DO NOT SKIP PHASES**

---

*Last updated: May 29, 2026*  
*For AI assistants: Read CLAUDE.md before each session*

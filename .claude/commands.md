# Abstract Emporium - Slash Commands

Quick commands for common Abstract Emporium tasks.

---

## /check-live
**Purpose:** Verify live site is working  
**What it does:**
1. Confirms https://abstractemporium.art is accessible
2. Tests Ko-fi redirect links work
3. Checks all 4 coloring book products load
4. Verifies payment flow functional

**When to use:** Before making changes, after deployment

---

## /deploy
**Purpose:** Deploy changes to production  
**What it does:**
```bash
git add .
git commit -m "Update: [description]"
git push origin main
```
Then monitors Cloudflare Pages deployment status

**When to use:** After testing changes locally

---

## /first-sale-check
**Purpose:** Marketing readiness assessment  
**What it does:**
1. Confirms all Ko-fi products published
2. Verifies FIRST_10_SALES_POSTS.md exists
3. Checks if user has sample images ready
4. Suggests immediate next action

**When to use:** When user asks "what should I do now?"

---

## /audit-docs
**Purpose:** Find redundant documentation  
**What it does:**
1. Lists all .md files in workspace
2. Identifies duplicates/obsolete guides
3. Suggests which to archive
4. Recommends consolidation

**When to use:** When workspace feels cluttered

---

## /test-purchase
**Purpose:** Manual purchase flow walkthrough  
**What it does:**
1. Opens homepage
2. Guides through Ko-fi checkout
3. Verifies all CTAs functional
4. Reports any broken links

**When to use:** After changing payment integration or CTAs

---

## /focus-check
**Purpose:** Prevent feature creep  
**What it does:**
1. Counts current sales (should be tracking toward 50)
2. Asks: "Does this request help get next 10 sales?"
3. Redirects to marketing if answer is no
4. Only proceeds with code changes if truly blocking

**When to use:** When user requests new features/products

---

## /analytics
**Purpose:** Check traffic and sales data  
**What it does:**
1. Reviews Cloudflare Analytics data
2. Checks Ko-fi sales dashboard
3. Identifies traffic sources
4. Reports conversion metrics

**When to use:** Weekly check-ins, performance reviews

---

## /content-ready
**Purpose:** Prepare for social media posting  
**What it does:**
1. Opens FIRST_10_SALES_POSTS.md
2. Asks which platform user wants to post to
3. Provides specific copy-paste content
4. Reminds about image attachment needed

**When to use:** User ready to post but unsure what to write

---

## /product-focus
**Purpose:** Remind team of current product line  
**What it does:**
- Lists 4 active coloring books
- Shows Ko-fi links for each
- Explicitly states: "Knitting products inactive - focus coloring only"

**When to use:** When knitting products mentioned or confusion about offerings

---

## /emergency-fix
**Purpose:** Critical production issue response  
**What it does:**
1. Asks: "What specific error are users seeing?"
2. Tests live site immediately
3. Prioritizes surgical fix
4. Deploys and verifies
5. No refactoring, no "while we're here" additions

**When to use:** Site down, payment broken, critical bug reported

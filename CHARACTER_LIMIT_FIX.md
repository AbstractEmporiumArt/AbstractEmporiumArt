# Character Limit Check & Fix for Social Posts

## Platform Character Limits

- **Bluesky:** 300 characters (STRICT)
- **Mastodon:** 500 characters (default, some instances allow more)
- **Twitter/X:** 280 characters
- **Facebook:** 63,206 characters (no limit concern)

---

## Issue Found

Your `content-queue.json` has posts that exceed Bluesky's 300-character limit!

**Example:**
```
Post-001: 333 characters (33 characters over limit)
"🎨 NEW RELEASE: Chaos & Calm Abstract Coloring Book\n\n50 pages designed to help you find balance between life's intensity and peace.\n\n✨ Includes:\n• Balance Your Palette Color Guide\n• 4 Therapeutic Techniques\n• 50-Day Transformation Challenge\n\nPerfect for anxiety relief & mindfulness practice."
```

**Some posts already have `bluesky_content` field with truncated versions** (good!), but not all.

---

## Solution: Auto-Truncation in social-auto-poster.js

I'll add a truncation function that:
1. Checks character count before posting
2. Truncates if needed (with "..." at the end)
3. Preserves links (adds them back if truncated)
4. Logs warning when truncation happens

---

## CHARACTER COUNT RULES

### Bluesky (300 chars):
- Link counts as 27 characters (Bluesky's link shortening)
- Emojis count as 1-2 characters each
- Newlines count as 1 character
- **Strategy:** Keep core message under 250 chars to allow for link

### Mastodon (500 chars):
- Link counts as 23 characters (Mastodon's link shortening)
- More forgiving, most posts will fit
- **Strategy:** Keep under 470 chars to be safe

---

## Quick Fix Script

Run this to check all posts in content-queue.json:

```javascript
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('content-queue.json', 'utf8'));

data.posts.forEach(post => {
  const contentLen = post.content.length;
  const blueskyLen = post.bluesky_content ? post.bluesky_content.length : contentLen;
  const mastodonLen = post.mastodon_content ? post.mastodon_content.length : contentLen;
  
  if (blueskyLen > 300) {
    console.log(`⚠️  ${post.id}: Bluesky content too long (${blueskyLen} chars)`);
  }
  if (mastodonLen > 500) {
    console.log(`⚠️  ${post.id}: Mastodon content too long (${mastodonLen} chars)`);
  }
});
```

Save as `check-post-lengths.js` and run: `node check-post-lengths.js`

---

## Recommendations

### Option A: Use Platform-Specific Content Fields (BEST)
Already implemented! Many posts have:
- `content` - Full version
- `bluesky_content` - Truncated for 300 chars
- `mastodon_content` - Truncated for 500 chars

**Update social-auto-poster.js to use these fields first, fallback to `content`.**

### Option B: Auto-Truncate on the Fly
Add truncation function that:
1. Checks if post has platform-specific content
2. If not, truncates main content to fit
3. Always adds link at the end

### Option C: Manual Review
Go through content-queue.json and add `bluesky_content` to all posts over 300 chars.

---

## I'm Implementing Option A (Best Approach)

Will update `social-auto-poster.js` to:
1. Check for `bluesky_content` field first
2. If not found, use `content` but truncate to 270 chars (save 30 for link)
3. Same for Mastodon (use `mastodon_content` or truncate to 470)
4. Log warnings when truncation happens

This way:
- ✅ Respects hand-crafted platform-specific content
- ✅ Safely truncates when needed
- ✅ Never fails due to character limits
- ✅ Preserves links

# Store Promotion Monitoring System

## Overview

Your site now automatically tracks when Fine Art America, RedBubble, ArtPal, Ko-fi, and TheHug.art run sales or promotions, then **automatically incorporates them into your social media posts**.

## How It Works

### 1. **Automatic Monitoring** (Twice Daily)
- GitHub Actions workflow runs at **9 AM and 6 PM UTC** every day
- Checks Fine Art America and RedBubble homepages for sale indicators
- Detects patterns like "20% off", "sale", "discount", "promo code"
- Saves results to `data/active-promotions.json`

### 2. **Smart Content Generation** 
When active promotions are detected:
- Your AI content generator **automatically prioritizes** promotion posts
- Creates posts in the "promotion_spotlight" category
- Mentions the sale naturally with Abstract Emporium's warm, non-salesy voice
- Examples:
  - ✅ "Fine Art America is running their spring sale right now — if you've been eyeing prints, good timing."
  - ❌ "DON'T MISS THIS LIMITED TIME OFFER!!!" (never happens)

### 3. **Seamless Integration**
- No changes to your existing posting schedule (3x daily)
- Promotion posts replace 1-2 regular posts when deals are active
- Once the sale ends, posts automatically return to normal rotation

## Platform Coverage

| Platform | Detection Method | Priority |
|----------|-----------------|----------|
| **Fine Art America** | Automatic (homepage scraping) | High |
| **RedBubble** | Automatic (homepage scraping) | Medium |
| **Ko-fi** | Manual notification needed | High |
| **ArtPal** | Manual notification needed | Medium |
| **TheHug.art** | Manual notification needed | Low |

## Manual Promotion Entry

For platforms where auto-detection isn't possible (Ko-fi, ArtPal, TheHug.art), you can manually add promotions:

### Quick Method:
1. Edit `data/active-promotions.json`
2. Add to the `active` array:
```json
{
  "platform": "kofi",
  "platformName": "Ko-fi",
  "type": "creator_sale",
  "discount": "15%",
  "description": "15% off all coloring books",
  "confidence": "high",
  "detectedAt": "2026-05-23T10:00:00Z",
  "priority": "high"
}
```
3. Commit and push — next content generation will include it

### Using the Script:
```powershell
# Check promotions now
node scripts/monitor-promotions.js

# View active promotions
Get-Content data/active-promotions.json | ConvertFrom-Json | Format-List
```

## Testing

### Run Manual Check
```powershell
# Check all platforms now
node scripts/monitor-promotions.js

# Output shows:
# ✨ NEW PROMOTION: Fine Art America - 20% off sitewide sale
# 📊 Promotion Monitor Summary:
#    Active promotions: 1
```

### Trigger Content Generation with Promotion
```powershell
# Generate 2 posts (will prioritize promotion if detected)
$env:GITHUB_TOKEN="your-token"
$env:GENERATE_COUNT="2"
node scripts/generate-content.js
```

### View Promotion History
```powershell
Get-Content data/promotion-history.json | ConvertFrom-Json
```

## Workflow Schedule

| Time (UTC) | Action | What Happens |
|------------|--------|--------------|
| **9 AM** | Monitor promotions | Checks FAA + RedBubble |
| **8 AM** | Post to social | Includes promo if active |
| **2 PM** | Post to social | Includes promo if active |
| **6 PM** | Monitor promotions | Checks FAA + RedBubble |
| **9 PM** | Post to social | Includes promo if active |

## Files Created

```
scripts/monitor-promotions.js         # Promotion detection engine
data/active-promotions.json           # Current promotion state
data/promotion-history.json           # Historical log
.github/workflows/promotion-monitor.yml   # Automation workflow
```

## Example Promotion Post

When Fine Art America runs a sale, your AI might generate:

> **Bluesky (220 chars):**  
> Fine Art America is running their spring sale right now. If you've been thinking about prints, this is good timing — the full gallery is on there. abstractemporium.art/gallery.html #AbstractArt #WallDecor

> **Mastodon (400 chars):**  
> Fine Art America is running their spring sale right now 🖼️  
>   
> If you've been thinking about prints or canvas pieces, this is pretty good timing — the whole Abstract Emporium gallery is on there (40+ pieces). Everything from small prints to large canvas.  
>   
> abstractemporium.art/gallery.html  
>   
> #AbstractArt #WallDecor #ArtSale

## Brand Voice Protection

The system has built-in guardrails to maintain your authentic voice:

❌ **Banned Phrases** (will never appear):
- "limited time", "act now", "don't miss"
- "revolutionary", "game-changer"
- "exclusive deal", "hurry", "buy now"

✅ **Natural Language** (how it actually sounds):
- "running a sale right now"
- "good timing if you've been eyeing"
- "pretty solid discount"
- "might be worth checking out"

## Troubleshooting

### Promotion not detected?
1. Check if platform is running a sale: Visit their homepage
2. Run manual check: `node scripts/monitor-promotions.js`
3. If still not detected, add manually (see Manual Entry above)

### Too many promotion posts?
- System limits to max 2 promo posts per 5 posts
- Once sale ends, posts return to normal

### Want to disable promotion monitoring?
- Delete or disable `.github/workflows/promotion-monitor.yml`
- Or remove promotions from `data/active-promotions.json`

## Future Enhancements

Possible additions:
- Email parsing (monitor promo emails from platforms)
- RSS feed monitoring
- API integration (if platforms offer APIs)
- Discord/Slack notifications when new promotions detected
- Blog post generation for major sales

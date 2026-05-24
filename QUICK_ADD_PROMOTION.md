# Quick Add: Manual Store Promotion

When you see a sale that the automated system didn't catch (targeted ads, emails, geo-specific), add it manually:

## Quick JSON Template

Edit `data/active-promotions.json` and add to the `"active"` array:

```json
{
  "platform": "PLATFORM_ID",
  "platformName": "Display Name",
  "type": "targeted_sale",
  "discount": "20%",
  "description": "Brief description of the sale",
  "confidence": "high",
  "detectedAt": "2026-05-24T00:00:00.000Z",
  "priority": "high",
  "manual": true
}
```

## Platform IDs

| Platform | ID | Priority |
|----------|-----|----------|
| Ko-fi | `kofi` | high |
| Fine Art America | `fineartamerica` | high |
| RedBubble | `redbubble` | medium |
| ArtPal | `artpal` | medium |
| TheHug.art | `thehug` | low |

## One-Command Add

```powershell
# Example: Add Ko-fi 15% off sale
$promo = @{
    platform = "kofi"
    platformName = "Ko-fi"
    type = "creator_sale"
    discount = "15%"
    description = "15% off all coloring books"
    confidence = "high"
    detectedAt = (Get-Date -Format "o")
    priority = "high"
    manual = $true
}

$data = Get-Content data/active-promotions.json | ConvertFrom-Json
$data.active += $promo
$data | ConvertTo-Json -Depth 10 | Set-Content data/active-promotions.json
```

## Commit and Push

```powershell
git add data/active-promotions.json
git commit -m "Add manual promotion: [Platform] [Description]"
git push
```

Next content generation will automatically include it in social posts!

## When to Add Manually

✅ **Add manually if:**
- You got a promotional email from the platform
- You see a targeted ad with a sale
- The sale is geo-specific (Canada/US only, etc.)
- It's a creator-specific promotion (e.g., your Ko-fi shop only)
- Time-limited flash sale

❌ **Don't add manually if:**
- Site-wide sales (Fine Art America, RedBubble) - system detects these
- You're not sure if it's still active - check the platform first

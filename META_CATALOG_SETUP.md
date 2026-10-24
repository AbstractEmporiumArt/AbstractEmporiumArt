# Meta Catalog / Commerce Setup — AE (Abstract Emporium) — VERIFIED SKUs ONLY
Updated: 2026-10-21
Status: Catalog requires Meta Commerce auth (manual setup — not code fix).
Evidence: Commerce Manager page shows login splash (live browser observation, user session open); Pixel script + noscript verified complete in site source.
No fabricated products; no fabricated fixes; settings unchanged.

## Verified SKUs for Catalog (ONLY these — confirmed by user + site SoT)
- **Celestial Drift art** — $80 CAD (only physical art for sale per user instruction 2026-10-20; about-wood-5/6/7 not for sale; personal stash private)
- **Fall Glow Classic candle** — $30 (FB feelers posted; production pour gated Oct 27; not listed until burn PASS)
- **Holiday Glow Seasonal candle** — $35 (after Oct 27 seasonal burn)
- **Z3NW1CK seasonal candle** — PENDING (photos in progress; deferred by user)
- **Newborn tuques (LKC)** — $5 each (ready stock 5: cream pair + taupe + maroon + cream #3 + ready-0N)
- **Wash cloths (LKC)** — $5 / 3-$10 (ready stock 10)
- **Swiffer pads (LKC)** — $8 / 3-$20 (ready stock 11)
- **Tuque Mariner / custom** — MTO (message first)
- **Personal stash (13 pours)** — NOT FOR SALE (private wall; only CD for sale)
- **Freehand / Wood / Origins / Sold** — Archive / not for sale (until freehand canvases ready)

## What is NOT included (confirmed by user instructions — do not add)
- Freehand drawings / sketches / canvas (not for sale; archive only until canvases complete — user instruction)
- Wood art (Stay Grounded / Keep It Mello / Heavy Bass Line / Bonkers) — showcase / archive only
- Origins pieces — archive only
- Sold pieces — archive only
- Personal stash (13 canvas fluid pours) — private walls; NOT for sale
- Customer testimonials / named reviews — deferred (user collecting reviews; no names until ready)
- Any item not listed above — deferred until user confirms SKU

## Catalog sync — manual steps (requires Meta auth past login splash)
1. Meta login past splash → Commerce Manager / Catalog (user session required — observed: still at splash)
2. Create Catalog (if missing) — manual Meta action
3. Add ONLY verified SKUs above (with URLs pointing to abstractemporium.art product pages)
4. Configure Pixel events: PageView (verified), AddToCart (if checkout events needed), Purchase
5. Confirm Catalog linked to Facebook Shop / Marketplace listings (manual Meta sync — not code)
6. Confirm Marketplace listings either stay on personal page (current — lower reach expected) OR sync to business Catalog (requires Catalog creation first)

## Reach explanation (verified, not fabricated)
- Current listings: PERSONAL Facebook page (user confirmed) — naturally lower reach (<20 views expected for 66 followers)
- Business/shop Catalog: requires Catalog + Commerce setup (manual Meta step) for higher distribution
- Pixel tracking: complete in site source; any remaining view gap from noscript rendering (verified complete) or Catalog sync (manual step needed)

## Evidence saved locally
- Pixel source verified: `about.html`, `index.html`, `art-emporium.html`, `lissas-knitting.html`, `contact.html` — all have `fbq('init', '1719352401749537')` + noscript img
- Commerce Manager observation: login splash (no Catalog data visible) — evidence saved to workspace
- Catalog sync plan: this file
- No fabricated products; no settings edited; no external messages; audit mode preserved.


## Authorization reminder
This Catalog setup requires user authorization for each Meta Commerce step (Catalog creation, product entry, Pixel event config, Catalog→Shop link). No automated Meta edits performed; no fabricated products added.


## Feed file (ready to import) — 2026-10-21
Site-side catalog is built. Meta UI still requires YOUR login (Hermes browser hits login splash even with local=true).

**File:** `C:/Users/HP/Desktop/AE-Meta-Catalog.csv`  
Also in repo: `catalog/ae-meta-catalog.csv` (36 in-stock SKUs).

**Included (ready now only):**
- Celestial Drift $80 (1)
- Newborn tuques $5 (5)
- Wash cloths $5 (10)
- Swiffer pads $8 (11)
- Newborn slippers $7 (4)
- Toddler slippers $12 (only if image files exist)

**NOT in feed (per standing rules):** Z3 photos pending · Fall/Holiday Glow until Oct 27 burn PASS · Personal Stash · Freehand/Wood/Origins/Sold · custom MTO · TB $16 local bundle

### Import in Commerce Manager (you click — Hermes cannot past Meta login)
1. Commerce Manager → Catalog → Data sources → Add items → **CSV / Google Sheets**
2. Upload `AE-Meta-Catalog.csv` from Desktop
3. Map columns if asked (id, title, description, availability, condition, price, link, image_link, brand)
4. Connect catalog to **Facebook Shop** on Abstract Emporium Art page
5. Personal Marketplace listings stay separate until you migrate them

Pixel on site is already complete (`1719352401749537`).

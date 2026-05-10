# Abstract Emporium Launch Signoff Checklist
Date: 2026-05-09
Prepared by: GitHub Copilot (GPT-5.3-Codex)

## Final Conversion QA Verdict
Overall status: NO-GO (deployment gap)
Final signoff timestamp: 2026-05-09 21:00:26 -04:00
Deployment commit on `main`: `63b168b`

Reason:
- Local workspace implementation is complete.
- Production site does not yet reflect the new funnel pages or tracking assets.

## Funnel-Mapped Signoff

| Funnel Step | Purpose | Local QA (workspace) | Live QA (production) | Signoff |
|---|---|---|---|---|
| 1. Entry Landing (Home) | Capture and route visitors into gallery/shop/newsletter | PASS: Home nav includes Shop Everywhere + Commissions; Brevo form present; tracking + JSON-LD scripts referenced | FAIL: Home returns 200 but does not include `jsonld-core.js`, `analytics-tracking.js`, or new funnel links | BLOCKED |
| 2. Marketplace Consideration (Shop Everywhere) | Compare platforms and drive outbound clicks | PASS: [shop-everywhere.html](shop-everywhere.html) exists with platform comparison + CTA cards + tracking scripts | FAIL: https://abstractemporium.art/shop-everywhere.html returns 404 | BLOCKED |
| 3. Commission Conversion (Commissions) | Collect high-intent custom project leads | PASS: [commissions.html](commissions.html) exists with Formspree integration and success/error tracking events | FAIL: https://abstractemporium.art/commissions.html returns 404 | BLOCKED |
| 4. Fallback Lead Capture (Contact) | Capture non-commission and commission inquiries | PASS: Contact form dispatches `ae_form_submit_success` and `ae_form_submit_error`; commission subject prefill supported | FAIL: Live contact page missing new funnel links and tracking script references | BLOCKED |
| 5. Outbound Attribution | Preserve referral attribution to marketplaces | PASS: [analytics-tracking.js](analytics-tracking.js) appends UTM params and tracks outbound clicks | FAIL: Script not present on live pages checked | BLOCKED |
| 6. Form Funnel Telemetry | Measure form views, attempts, success, and errors | PASS: standardized event schema and form-type inference implemented in [analytics-tracking.js](analytics-tracking.js) | FAIL: Live pages checked do not load telemetry script | BLOCKED |
| 7. Structured Data + Crawlability | Improve discoverability and brand entity consistency | PASS: [jsonld-core.js](jsonld-core.js), [sitemap.xml](sitemap.xml), [robots.txt](robots.txt) are correct locally | PARTIAL: robots/sitemap domain is canonical, but live page templates appear outdated | BLOCKED |

## Hard Launch Gates

1. Deploy latest workspace build so these routes resolve:
- /shop-everywhere.html
- /commissions.html

2. Verify in production page source (not rendered DOM only):
- `jsonld-core.js` is present on core templates
- `analytics-tracking.js` is present on core templates

3. Verify event flow in GA4 DebugView:
- `ae_form_view`
- `ae_form_submit_attempt`
- `ae_form_submit_success`
- `ae_outbound_click`
- `ae_cta_click`

4. Submit live tests:
- Brevo form on home
- Contact form on contact page
- Commission form on commissions page

5. Re-check production HTTP status:
- Home, Contact, Shop Everywhere, Commissions must all return 200.

## Evidence Snapshot

Post-deploy re-verification run: 2026-05-09 21:00:26 -04:00
- https://abstractemporium.art/ -> 200, but no `jsonld-core.js`/`analytics-tracking.js`, and no new funnel links in source.
- https://abstractemporium.art/shop-everywhere.html -> 404.
- https://abstractemporium.art/commissions.html -> 404.
- https://abstractemporium.art/contact.html -> 200, but no `jsonld-core.js`/`analytics-tracking.js`, and no new funnel links in source.
- https://abstractemporium.art/analytics-tracking.js -> 404.
- https://abstractemporium.art/jsonld-core.js -> 404.
- https://abstractemporium.art/sitemap.xml -> 200.
- https://abstractemporium.art/robots.txt -> 200.

## Final Signoff

Decision: NO-GO

Blocking issues:
1. Funnel pages are not deployed (`/shop-everywhere.html`, `/commissions.html` return 404).
2. Tracking and schema runtime assets are not deployed (`/analytics-tracking.js`, `/jsonld-core.js` return 404).
3. Core live templates are still serving older navigation/telemetry wiring.

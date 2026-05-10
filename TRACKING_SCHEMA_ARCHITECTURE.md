# Tracking and Schema Architecture

## Scope
This architecture standardizes analytics and schema across the Abstract Emporium core experience:
- Home, Gallery, Shop, Contact, Blog, Features, Pattern, Item Detail
- Marketplace hub and commissions funnel pages

## JSON-LD Layer
File: `jsonld-core.js`

Injected graph:
- Organization
- WebSite
- ContactPoint

Key properties:
- Canonical domain: `https://abstractemporium.art/`
- `sameAs` includes marketplaces and social platforms
- Contact email and contact URL are centralized in one source

## Tracking Layer
File: `analytics-tracking.js`

### Data contract
Every pushed event includes:
- `event`
- `event_name`
- `schema_version`
- `site_name`
- `page_type`
- `page_path`
- `page_title`

### Standardized events
- `ae_outbound_click`
- `ae_cta_click`
- `ae_form_view`
- `ae_form_submit_attempt`
- `ae_form_submit_success`
- `ae_form_submit_error`
- `ae_support_payment_attempt`

### Form funnel coverage
Auto-detected forms:
- Brevo newsletter (`sib-form`)
- Contact (`contactForm`)
- Commission (`commissionsForm`)
- Community signup (`communitySignupForm`)
- Pattern email (`patternEmailForm`)
- Free guide (`freeGuideForm`)
- PayPal support forms (action contains `paypal.com`)

Success/error tracking is completed via custom events:
- `ae_form_submit_success`
- `ae_form_submit_error`

## Outbound attribution
Marketplace links are normalized with UTM parameters when missing:
- `utm_source=abstractemporium.art`
- `utm_medium=referral`
- `utm_campaign=marketplace_click`
- `utm_content=<current path>`

## Routing and discovery
- `shop-everywhere.html` and `commissions.html` are included in global navigation and sitemap
- Robots points to canonical sitemap on `.art`

## Validation checklist
- Core templates load `jsonld-core.js` and `analytics-tracking.js`
- Funnel pages appear in `sitemap.xml`
- No lint/diagnostic errors in updated files

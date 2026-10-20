# Canada Post live rates (e-transfer) + PayPal/NetParcel

## Keep as-is
- **PayPal checkout** → NetParcel (already hooked). Do not remove.

## Site e-transfer quotes → Canada Post
Code: `functions/api/shipping-rate.js` calls Canada Post **Get Rates** REST.

### 1. Create Canada Post developer access
1. Open: https://www.canadapost-postescanada.ca/cpc/en/commercial/integrate-apis.page  
   or Developer Program getting started:  
   https://www.canadapost-postescanada.ca/info/mc/business/productsservices/developers/services/gettingstarted.jsf
2. Sign up / sign in for **Developer Program** (free to start; may offer sandbox first).
3. Optional but smart later: **Solutions for Small Business** (discounts) — can add customer number after.
4. In the developer portal get:
   - **API username**
   - **API password**
   - **Customer number** (if you have commercial / SSB — optional for counter rates)

**Do not paste these into Telegram.** Put them only in Cloudflare.

### 2. Cloudflare Pages secrets (Production)
Project for abstractemporium.art → Settings → Environment variables:

| Name | Value |
|------|--------|
| `CANADA_POST_API_USERNAME` | API username |
| `CANADA_POST_API_PASSWORD` | API password |
| `AE_POSTAL` | Your TB postal, no spaces preferred (`P7A1A1`) |
| `CANADA_POST_CUSTOMER_NUMBER` | Optional commercial/SSB number |
| `CANADA_POST_USE_PRODUCTION` | `1` live · `0` sandbox (`ct.soa-gw`) |

Encrypt secrets. Redeploy after save.

### 3. Test
- Cart → postal → **Quote**
- Or: `https://abstractemporium.art/api/shipping-rate?postal=M5V2T6&country=CA`  
  Expect `{ "ok": true, "provider": "canada-post", "rates": [ ... ] }`

### 4. If signup is slow
Until keys are in CF, cart still says: PayPal=NetParcel live · e-transfer=we quote / CP when configured · TB pickup free.

## Sandbox vs production
- Sandbox host: `ct.soa-gw.canadapost.ca` (`CANADA_POST_USE_PRODUCTION=0`)
- Production: `soa-gw.canadapost.ca` (`=1`)

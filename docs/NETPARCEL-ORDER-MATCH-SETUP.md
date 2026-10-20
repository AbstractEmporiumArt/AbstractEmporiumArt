# NetParcel + Order Match + Invoice PDF (one-time Cloudflare setup)

Live quote currently returns: `Shipping quote unavailable (not configured)` until secrets are set.

You never need to paste keys into Telegram. Do this in the browser.

## A. ShipEngine / NetParcel (live shipping quotes)

1. Create/login: https://www.shipengine.com/ (NetParcel often connects through ShipEngine).
2. Dashboard → **API** → create an **API Key** (Production).
3. Optional: note your **NetParcel carrier_id** if you only want that carrier.
4. Cloudflare → **Pages** → project for `abstractemporium.art` → **Settings** → **Environment variables** (Production):
   - `SHIPENGINE_API_KEY` = (your key) — Encrypt
   - `NETPARCEL_CARRIER_ID` = (optional carrier id) — Encrypt
   - `AE_POSTAL` = your ship-from postal (e.g. `P7A …`)
   - `AE_ADDRESS` = ship-from street (optional but better rates)
5. **Save** → trigger a new deploy (or empty commit / “Retry deployment”).
6. Test: open cart → enter a Canadian postal → **Get quote**.  
   Or: `https://abstractemporium.art/api/shipping-rate?postal=M5V2T6&country=CA`  
   Expect `{ "ok": true, "rates": [ … ] }`.

## B. Order match email + invoice PDF attach

Code path: `POST /api/order-match` → KV + Brevo email with **`AE-invoice-{order}.pdf`** attached. Subject starts with **`[AELB]`**.

1. Brevo: https://app.brevo.com → SMTP & API → **API keys** → create key.
2. Verify a **sender** email in Brevo (use your Outlook business address).
3. Cloudflare Pages → Environment variables (Production):
   - `BREVO_API_KEY` = (key) — Encrypt
   - `OWNER_EMAIL` = your Outlook inbox for AE
   - `AE_FROM_EMAIL` = same verified Brevo sender
   - `AE_FROM_NAME` = `Abstract Emporium Orders`
4. **KV**: Workers & Pages → KV → Create namespace `AE_ORDERS`  
   Pages project → Settings → Functions → **KV namespace bindings**:
   - Variable name: `AE_ORDERS`
   - Namespace: the one you created  
   (Production + Preview if you use preview).
5. PayPal (optional but recommended):  
   IPN URL = `https://abstractemporium.art/api/paypal-ipn`  
   Optional secret: `PAYPAL_IPN_VERIFY=1`
6. Redeploy after binding KV + secrets.

### Manual smoke test (after secrets)

```bash
curl -s -X POST https://abstractemporium.art/api/order-match \
  -H "content-type: application/json" \
  -d "{\"order\":\"TEST-001\",\"name\":\"Lissa Test\",\"amount\":25,\"channel\":\"manual\",\"message\":\"smoke test\"}"
```

Expect: `{ "ok": true, "email_sent": true }` and an Outlook mail with `[AELB]` + PDF.

## C. Local invoices (already on laptop)

`node generate-invoices.cjs` rebuilds markdown invoices from `orders.jsonl` into `./invoices/`.  
That is separate from the **auto PDF on match** (Workers). Keep both: local SoT ledger + live match ping.

## D. Privacy note

Public site: email only on **Contact** + **checkout / e-transfer** paths.  
Marketing pages link to the contact form instead of raw address.

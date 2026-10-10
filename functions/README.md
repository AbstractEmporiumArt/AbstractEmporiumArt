# AE Order-Matching Backend (Cloudflare Pages Functions)

These Functions power automatic, continuous order matching for Abstract Emporium.

## Endpoints
- `POST /api/order-match` — eTransfer confirm form + generic match webhook.
  Body: `{ order, amount, name, message, channel }`. Stores the record in KV and emails the owner.
- `POST /api/paypal-ipn` — PayPal IPN handler. Reads the `custom` field (the AE order
  number injected by cart.js) on Completed payments, stores + emails the owner.

## Required Cloudflare Pages settings (dashboard → your project → Settings)
1. **Functions** are auto-detected from the `functions/` folder.
2. **KV namespace binding**: create a KV namespace (e.g. `AE_ORDERS`) and bind it to the
   variable name `AE_ORDERS` (both Production and Preview).
3. **Environment variables / secrets** (Settings → Environment variables):
   - `BREVO_API_KEY` — Brevo transactional email API key (emails the owner on each match).
   - `OWNER_EMAIL` — where notifications go (Abstractemporiumart@outlook.com).
   - `PAYPAL_IPN_VERIFY` — set to `1` to verify IPNs with PayPal in production
     (leave unset/`0` for local/testing; the handler will still record + email).

## PayPal setup
In the PayPal business account, set the IPN Notification URL to:
`https://abstractemporium.art/api/paypal-ipn`

The cart already sends the AE order number in the PayPal `custom` field, so each
Completed payment is matched to its order automatically.

## Privacy
These Functions store order-match records (order #, amount, name, message) in KV.
KV is not the public git repo and contains no code. Records hold minimal PII needed
to match a payment to an order. Do not log full card/PayPal financial detail.

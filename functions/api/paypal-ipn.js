// Cloudflare Pages Function: /api/paypal-ipn
// PayPal Instant Payment Notification handler.
// Validates the IPN with PayPal, then on VERIFIED + Completed,
// reads the `custom` field (the AE order number from cart.js) and
// records + emails the owner the matched order.
// Secrets (Cloudflare Pages dashboard): PAYPAL_IPN_VERIFY (set "1" to enable live verify),
//   BREVO_API_KEY, OWNER_EMAIL
// KV namespace binding: AE_ORDERS

const PAYPAL_IPN_ENDPOINT = 'https://ipnpb.paypal.com/cgi-bin/webscr'; // production

export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.text();

  // 1. Verify with PayPal (only when enabled; sandbox/test can bypass)
  if (env.PAYPAL_IPN_VERIFY === '1') {
    const verifyBody = `cmd=_notify-validate&${body}`;
    try {
      const vres = await fetch(PAYPAL_IPN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: verifyBody
      });
      const vt = await vres.text();
      if (vt.trim() !== 'VERIFIED') {
        return new Response('not_verified', { status: 200 });
      }
    } catch (e) {
      return new Response('verify_error', { status: 200 });
    }
  }

  // 2. Parse fields
  const params = new URLSearchParams(body);
  const order = (params.get('custom') || '').trim();
  const paymentStatus = (params.get('payment_status') || '').trim();
  const txnId = (params.get('txn_id') || '').trim();
  const payerEmail = (params.get('payer_email') || '').trim();
  const gross = Number(params.get('mc_gross') || 0);
  const ts = new Date().toISOString();

  if (paymentStatus !== 'Completed') {
    return new Response('ignored_status', { status: 200 });
  }

  const record = {
    order, txn_id: txnId, payer_email: payerEmail,
    amount: gross, channel: 'paypal_ipn',
    payment_status: paymentStatus, received_at: ts,
    status: order ? 'matched' : 'matched_no_order',
    source_ip: request.headers.get('cf-connecting-ip') || ''
  };

  try {
    const key = `paypal:${txnId}:${ts}`;
    await env.AE_ORDERS.put(key, JSON.stringify(record));
    if (order) {
      const listKey = `order:${order}`;
      const existing = await env.AE_ORDERS.get(listKey);
      const arr = existing ? JSON.parse(existing) : [];
      arr.push(record);
      await env.AE_ORDERS.put(listKey, JSON.stringify(arr));
    }
  } catch (e) {
    record.kv_error = String(e && e.message || e);
  }

  await sendMatchEmail(env, record);
  return new Response('OK', { status: 200 });
}

async function sendMatchEmail(env, rec) {
  const apiKey = env.BREVO_API_KEY;
  const to = env.OWNER_EMAIL || 'Abstractemporiumart@outlook.com';
  if (!apiKey) return;
  const subject = rec.order
    ? `✅ AE PayPal Matched — ${rec.order}`
    : `✅ AE PayPal Payment (no order #) — ${rec.txn_id}`;
  const text =
    `PayPal payment completed and matched.\n\n` +
    (rec.order ? `Order # : ${rec.order}\n` : `Order # : (none in custom field)\n`) +
    `Txn ID  : ${rec.txn_id}\n` +
    `Payer   : ${rec.payer_email}\n` +
    `Amount  : $${rec.amount.toFixed(2)} CAD\n` +
    `Status  : ${rec.payment_status}\n` +
    `Received: ${rec.received_at}\n`;

  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        sender: { name: 'Abstract Emporium Orders', email: to },
        to: [{ email: to }],
        subject, textContent: text
      })
    });
  } catch (e) { /* best-effort */ }
}

// Cloudflare Pages Function: /api/order-match
// Receives eTransfer confirmations AND a generic order-match webhook.
// Stores the record in KV (AE_ORDERS) and emails the owner the match details.
// Secrets (set in Cloudflare Pages dashboard → Settings → Environment variables):
//   BREVO_API_KEY  — Brevo transactional email key
//   OWNER_EMAIL    — where match notifications go (Abstractemporiumart@outlook.com)
// KV namespace binding: AE_ORDERS

export async function onRequestPost(context) {
  const { request, env } = context;
  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  const order = String(payload.order || '').trim();
  const amount = Number(payload.amount || 0);
  const name = String(payload.name || '').trim();
  const message = String(payload.message || '').trim();
  const channel = String(payload.channel || 'webhook').trim();
  const ts = new Date().toISOString();

  if (!order || !name) {
    return json({ ok: false, error: 'order_and_name_required' }, 400);
  }

  const record = {
    order, amount, name, message, channel,
    received_at: ts, status: 'pending_match',
    source_ip: request.headers.get('cf-connecting-ip') || ''
  };

  // Persist to KV (append by order key)
  try {
    const key = `match:${order}:${ts}`;
    await env.AE_ORDERS.put(key, JSON.stringify(record));
    // also keep a per-order list
    const listKey = `order:${order}`;
    const existing = await env.AE_ORDERS.get(listKey);
    const arr = existing ? JSON.parse(existing) : [];
    arr.push(record);
    await env.AE_ORDERS.put(listKey, JSON.stringify(arr));
  } catch (e) {
    // KV not bound or failed — still try to email, but flag
    record.kv_error = String(e && e.message || e);
  }

  // Email the owner
  const emailOk = await sendMatchEmail(env, record);

  return json({
    ok: true,
    order,
    email_sent: emailOk,
    note: emailOk ? 'Match recorded and owner notified.' : 'Match recorded; email not sent (check BREVO_API_KEY).'
  }, 200);
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

async function sendMatchEmail(env, rec) {
  const apiKey = env.BREVO_API_KEY;
  const to = env.OWNER_EMAIL || 'Abstractemporiumart@outlook.com';
  if (!apiKey) return false;
  const subject = `🔔 AE Order Match — ${rec.order} (${rec.channel})`;
  const text =
    `New payment confirmation received.\n\n` +
    `Order # : ${rec.order}\n` +
    `Channel  : ${rec.channel}\n` +
    `Amount   : $${rec.amount.toFixed(2)} CAD\n` +
    `From     : ${rec.name}\n` +
    `Message  : ${rec.message || '(none)'}\n` +
    `Received : ${rec.received_at}\n\n` +
    `Status: pending_match — verify against your Interac/PayPal notification.`;

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: 'Abstract Emporium Orders', email: to },
        to: [{ email: to }],
        subject,
        textContent: text
      })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

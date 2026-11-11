// /api/order-ship — Lissa marks shipped + tracking; customers look up by order #
// POST { secret, order, tracking, carrier? }  env.AE_ORDER_ADMIN_SECRET
// GET  ?order=AE-...  public: status + tracking only (no PII)

export async function onRequestPost(context) {
  const { request, env } = context;
  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }
  const secret = String(payload.secret || payload.admin_secret || '').trim();
  if (!env.AE_ORDER_ADMIN_SECRET) {
    return json({ ok: false, error: 'AE_ORDER_ADMIN_SECRET not set in Cloudflare Pages env.' }, 503);
  }
  if (secret !== env.AE_ORDER_ADMIN_SECRET) {
    return json({ ok: false, error: 'unauthorized' }, 401);
  }
  const order = String(payload.order || '').trim();
  const tracking = String(payload.tracking || payload.tracking_number || '').trim();
  const carrier = String(payload.carrier || 'Canada Post').trim();
  if (!order || !tracking) {
    return json({ ok: false, error: 'order_and_tracking_required' }, 400);
  }
  const ts = new Date().toISOString();
  const rec = { order, tracking, carrier, shipped_at: ts, status: 'shipped' };
  try {
    await env.AE_ORDERS.put('ship:' + order, JSON.stringify(rec));
    const listKey = 'order:' + order;
    const existing = await env.AE_ORDERS.get(listKey);
    const arr = existing ? JSON.parse(existing) : [];
    arr.push(rec);
    await env.AE_ORDERS.put(listKey, JSON.stringify(arr));
  } catch (e) {
    rec.kv_error = String((e && e.message) || e);
  }
  const emailed = await emailCustomerShipped(env, rec);
  return json({ ok: true, order, tracking, carrier, emailed }, 200);
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const order = String(url.searchParams.get('order') || '').trim();
  if (!order) {
    return json({ ok: true, service: 'AE order-ship', note: 'GET ?order=AE-YYMMDD-NNNN' }, 200);
  }
  try {
    const raw = await env.AE_ORDERS.get('ship:' + order);
    if (!raw) {
      return json({ ok: true, order, status: 'not_shipped_yet', tracking: null }, 200);
    }
    const rec = JSON.parse(raw);
    return json({
      ok: true,
      order: rec.order,
      status: rec.status || 'shipped',
      tracking: rec.tracking,
      carrier: rec.carrier || 'Canada Post',
      shipped_at: rec.shipped_at || null,
      track_url: canadaPostTrackUrl(rec.tracking)
    }, 200);
  } catch (e) {
    return json({ ok: false, error: 'lookup_failed' }, 500);
  }
}

function canadaPostTrackUrl(pin) {
  return 'https://www.canadapost-postescanada.ca/track-reperage/en#/details/' + encodeURIComponent(pin);
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

async function emailCustomerShipped(env, rec) {
  const apiKey = env.BREVO_API_KEY;
  const fromEmail = env.AE_FROM_EMAIL || env.OWNER_EMAIL;
  const fromName = env.AE_FROM_NAME || 'Abstract Emporium';
  const owner = env.OWNER_EMAIL;
  if (!apiKey || !fromEmail) return false;
  let customerEmail = '';
  try {
    const existing = await env.AE_ORDERS.get('order:' + rec.order);
    const arr = existing ? JSON.parse(existing) : [];
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] && arr[i].email && String(arr[i].email).indexOf('@') !== -1) {
        customerEmail = arr[i].email;
        break;
      }
      if (arr[i] && arr[i].payer_email && String(arr[i].payer_email).indexOf('@') !== -1) {
        customerEmail = arr[i].payer_email;
        break;
      }
    }
  } catch (e) {}
  const track = canadaPostTrackUrl(rec.tracking);
  const subject = 'Your Abstract Emporium order ' + rec.order + ' has shipped';
  const text =
    'Order ' + rec.order + ' is on the way.\n' +
    'Carrier: ' + rec.carrier + '\n' +
    'Tracking #: ' + rec.tracking + '\n' +
    'Track: ' + track + '\n';
  const html =
    '<p>Your Abstract Emporium order <b>' + rec.order + '</b> has shipped.</p>' +
    '<p>Carrier: ' + rec.carrier + '<br>Tracking #: <b>' + rec.tracking + '</b></p>' +
    '<p><a href="' + track + '">Track on Canada Post</a> · ' +
    '<a href="https://abstractemporium.art/track.html?order=' + encodeURIComponent(rec.order) + '">Track on our site</a></p>';
  const to = [];
  if (customerEmail) to.push({ email: customerEmail });
  if (owner) to.push({ email: owner });
  if (!to.length) return false;
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        sender: { name: fromName, email: fromEmail },
        to: to,
        subject: subject,
        textContent: text,
        htmlContent: html
      })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

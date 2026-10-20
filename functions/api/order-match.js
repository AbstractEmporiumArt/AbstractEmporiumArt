// Cloudflare Pages Function: /api/order-match
// eTransfer confirm + generic match webhook → KV + owner email w/ invoice PDF
// Secrets: BREVO_API_KEY, OWNER_EMAIL, AE_FROM_EMAIL, AE_FROM_NAME (optional)
// KV binding: AE_ORDERS
// See docs/NETPARCEL-ORDER-MATCH-SETUP.md

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
  const email = String(payload.email || payload.customer_email || '').trim();
  const items = Array.isArray(payload.items) ? payload.items : [];
  const shipping = Number(payload.shipping || 0);
  const ts = new Date().toISOString();

  if (!order || !name) {
    return json({ ok: false, error: 'order_and_name_required' }, 400);
  }

  const record = {
    order, amount, name, email, message, channel, items, shipping,
    received_at: ts, status: 'pending_match',
    source_ip: request.headers.get('cf-connecting-ip') || ''
  };

  try {
    const key = 'match:' + order + ':' + ts;
    await env.AE_ORDERS.put(key, JSON.stringify(record));
    const listKey = 'order:' + order;
    const existing = await env.AE_ORDERS.get(listKey);
    const arr = existing ? JSON.parse(existing) : [];
    arr.push(record);
    await env.AE_ORDERS.put(listKey, JSON.stringify(arr));
  } catch (e) {
    record.kv_error = String((e && e.message) || e);
  }

  const emailOk = await sendMatchEmail(env, record);
  return json({
    ok: true,
    order,
    email_sent: emailOk,
    note: emailOk
      ? 'Match recorded; owner emailed with invoice attachment.'
      : 'Match recorded; email not sent (check BREVO_API_KEY / OWNER_EMAIL / AE_FROM_EMAIL).'
  }, 200);
}

export async function onRequestGet() {
  return json({
    ok: true,
    service: 'AE order-match',
    status: 'live',
    methods: ['GET', 'POST'],
    note: 'POST {order, name, amount?, message?, channel?, email?, items?, shipping?} — match + invoice PDF email.'
  }, 200);
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

function buildInvoicePdf(rec) {
  const itemLines = (rec.items && rec.items.length)
    ? rec.items.map(function (it) {
        var t = it.title || it.name || 'Item';
        var q = it.qty != null ? it.qty : 1;
        var p = Number(it.price != null ? it.price : it.line_total || 0);
        return t + '  x' + q + '  $' + p.toFixed(2);
      })
    : ['(Items not provided on match — see cart/order notes)'];

  var full = [
    'ABSTRACT EMPORIUM — INVOICE',
    'abstractemporium.art · Thunder Bay, ON',
    '',
    'Invoice / Order #: ' + rec.order,
    'Date: ' + rec.received_at,
    'Customer: ' + rec.name,
    rec.email ? ('Email: ' + rec.email) : null,
    'Channel: ' + rec.channel,
    'Status: PENDING MATCH — verify Interac/PayPal',
    '',
    '--- Line items ---'
  ].concat(itemLines).concat([
    '',
    rec.shipping ? ('Shipping: $' + Number(rec.shipping).toFixed(2) + ' CAD') : null,
    'TOTAL (reported): $' + Number(rec.amount || 0).toFixed(2) + ' CAD',
    'HST: $0.00 (under $30k small-supplier threshold)',
    '',
    'Customer message: ' + (rec.message || '(none)'),
    '',
    'Match this to your bank/PayPal notification before shipping.',
    'Questions: site contact form (AELB-tagged mail).'
  ]).filter(function (x) { return x !== null && x !== undefined; });

  var escaped = full.join('\n').replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  var contentLines = escaped.split('\n');
  var stream = 'BT /F1 11 Tf 40 780 Td 14 TL\n';
  contentLines.forEach(function (ln, i) {
    if (i === 0) stream += '(' + ln + ') Tj\n';
    else stream += 'T* (' + ln + ') Tj\n';
  });
  stream += 'ET';

  var objects = [
    '1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n',
    '2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n',
    '3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj\n',
    '4 0 obj<< /Length ' + stream.length + ' >>stream\n' + stream + '\nendstream\nendobj\n',
    '5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\n'
  ];

  var pdf = '%PDF-1.4\n';
  var offsets = [0];
  for (var i = 0; i < objects.length; i++) {
    offsets.push(pdf.length);
    pdf += objects[i];
  }
  var xrefStart = pdf.length;
  pdf += 'xref\n0 ' + (objects.length + 1) + '\n';
  pdf += '0000000000 65535 f \n';
  for (var j = 1; j < offsets.length; j++) {
    pdf += String(offsets[j]).padStart(10, '0') + ' 00000 n \n';
  }
  pdf += 'trailer<< /Size ' + (objects.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + xrefStart + '\n%%EOF';
  return pdf;
}

function b64encode(str) {
  var bytes = new TextEncoder().encode(str);
  var bin = '';
  for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendMatchEmail(env, rec) {
  var apiKey = env.BREVO_API_KEY;
  var to = env.OWNER_EMAIL;
  var fromEmail = env.AE_FROM_EMAIL || env.OWNER_EMAIL;
  var fromName = env.AE_FROM_NAME || 'Abstract Emporium Orders';
  if (!apiKey || !to || !fromEmail) return false;

  var subject = '[AELB] Order match ' + rec.order + ' — $' + Number(rec.amount || 0).toFixed(2) + ' CAD (' + rec.channel + ')';
  var text =
    'New payment confirmation received.\n\n' +
    'Order # : ' + rec.order + '\n' +
    'Channel  : ' + rec.channel + '\n' +
    'Amount   : $' + Number(rec.amount || 0).toFixed(2) + ' CAD\n' +
    'Shipping : $' + Number(rec.shipping || 0).toFixed(2) + ' CAD\n' +
    'From     : ' + rec.name + '\n' +
    (rec.email ? ('Email    : ' + rec.email + '\n') : '') +
    'Message  : ' + (rec.message || '(none)') + '\n' +
    'Received : ' + rec.received_at + '\n\n' +
    'Status: pending_match — verify Interac/PayPal before shipping.\n' +
    'Invoice PDF attached.';

  var html =
    '<p><strong>[AELB] Abstract Emporium — order match</strong></p><ul>' +
    '<li><b>Order #</b>: ' + escapeHtml(rec.order) + '</li>' +
    '<li><b>Amount</b>: $' + Number(rec.amount || 0).toFixed(2) + ' CAD</li>' +
    '<li><b>Channel</b>: ' + escapeHtml(rec.channel) + '</li>' +
    '<li><b>Name</b>: ' + escapeHtml(rec.name) + '</li>' +
    (rec.email ? ('<li><b>Email</b>: ' + escapeHtml(rec.email) + '</li>') : '') +
    '<li><b>Message</b>: ' + escapeHtml(rec.message || '(none)') + '</li>' +
    '<li><b>Received</b>: ' + escapeHtml(rec.received_at) + '</li></ul>' +
    '<p>Verify bank/PayPal notice before you ship. Invoice attached.</p>';

  var attachment;
  try {
    attachment = [{ name: 'AE-invoice-' + rec.order + '.pdf', content: b64encode(buildInvoicePdf(rec)) }];
  } catch (e) {
    attachment = undefined;
  }

  var body = {
    sender: { name: fromName, email: fromEmail },
    to: [{ email: to }],
    subject: subject,
    textContent: text,
    htmlContent: html
  };
  if (attachment) body.attachment = attachment;

  try {
    var res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(body)
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

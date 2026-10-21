// AE Shipping Rate quote — Canada Post live rates (e-transfer path).
// PayPal path stays NetParcel-at-PayPal (separate; no change here).
//
// Cloudflare Pages secrets (Production):
//   CANADA_POST_API_USERNAME   — from Canada Post Developer Program
//   CANADA_POST_API_PASSWORD   — API password (not your CPC login)
//   CANADA_POST_CUSTOMER_NUMBER — optional; Solutions for Small Business / commercial discounts
//   AE_POSTAL                  — origin postal, e.g. P7A1A1 (Thunder Bay)
// Optional:
//   CANADA_POST_USE_PRODUCTION = "1" (default production). Set "0" for ct.soa-gw sandbox.
//
// Docs: Get Rates REST — POST /rs/ship/price

export async function onRequestPost(context) {
  return handleQuote(context);
}
export async function onRequestGet(context) {
  return handleQuote(context);
}

async function handleQuote(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const user = env.CANADA_POST_API_USERNAME || env.CANADA_POST_USER;
  const pass = env.CANADA_POST_API_PASSWORD || env.CANADA_POST_PASS;
  if (!user || !pass) {
    return json(
      {
        ok: false,
        error:
          'Canada Post quote not configured yet. PayPal checkout still uses NetParcel. For e-transfer we will quote after you share your address, or set CANADA_POST_API_USERNAME + CANADA_POST_API_PASSWORD in Cloudflare.'
      },
      503
    );
  }

  let postalCode = url.searchParams.get('postal');
  let countryCode = (url.searchParams.get('country') || 'CA').toUpperCase();
  let weightLb = parseFloat(url.searchParams.get('weight') || '') || 1.5;
  if (request.method === 'POST') {
    try {
      const b = await request.json();
      postalCode = b.postal || b.postalCode || postalCode;
      countryCode = (b.country || b.countryCode || countryCode).toUpperCase();
      weightLb = parseFloat(b.weight || b.weightLb) || weightLb;
    } catch (e) {
      /* query fallback */
    }
  }

  if (!postalCode || !/^[A-Za-z0-9 ]{3,10}$/.test(postalCode)) {
    return json({ ok: false, error: 'A valid postal/zip code is required.' }, 400);
  }

  const origin = String(env.AE_POSTAL || 'P7A1A1')
    .replace(/\s+/g, '')
    .toUpperCase();
  const dest = String(postalCode).replace(/\s+/g, '').toUpperCase();
  // Canada Post weight is kg
  const weightKg = Math.max(0.1, Math.round((weightLb * 0.453592) * 1000) / 1000);
  const customerNumber = (env.CANADA_POST_CUSTOMER_NUMBER || '').trim();

  // Domestic CA only for v1 of this endpoint (US/intl can be added later)
  if (countryCode !== 'CA') {
    return json(
      {
        ok: false,
        error:
          'Live Canada Post quotes on-site are Canada-only for now. For US/intl, use PayPal+NetParcel or message us for a quote.'
      },
      400
    );
  }

  const useProd = String(env.CANADA_POST_USE_PRODUCTION || '1') !== '0';
  const host = useProd ? 'https://soa-gw.canadapost.ca' : 'https://ct.soa-gw.canadapost.ca';

  const customerXml = customerNumber
    ? `<customer-number>${escapeXml(customerNumber)}</customer-number>`
    : '';

  // rate-v4 mailing-scenario — omit customer-number for counter rates
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<mailing-scenario xmlns="http://www.canadapost.ca/ws/ship/rate-v4">` +
    customerXml +
    `<parcel-characteristics>` +
    `<weight>${weightKg}</weight>` +
    `</parcel-characteristics>` +
    `<origin-postal-code>${escapeXml(origin)}</origin-postal-code>` +
    `<destination><domestic>` +
    `<postal-code>${escapeXml(dest)}</postal-code>` +
    `</domestic></destination>` +
    `</mailing-scenario>`;

  const auth = (env.CANADA_POST_API_USERNAME || '').trim();
  const bearer = auth ? 'Bearer ' + auth : '';
  // Shipping 8.0 uses OAuth Bearer token via CANADA_POST_API_USERNAME.
  try {
    const resp = await fetch(`${host}/rs/ship/price`, {
      method: 'POST',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/vnd.cpc.ship.rate-v4+xml',
        Accept: 'application/vnd.cpc.ship.rate-v4+xml',
        'Accept-Language': 'en-CA'
      },
      body: xml
    });

    const text = await resp.text();
    if (!resp.ok) {
      const msg = extractCpError(text) || 'Canada Post rate error.';
      return json(
        { ok: false, error: msg, status: resp.status, detail: text.slice(0, 500) },
        resp.status >= 400 && resp.status < 600 ? resp.status : 502
      );
    }

    const rates = parseCpRates(text);
    rates.sort((a, b) => a.amount - b.amount);
    return json({
      ok: true,
      provider: 'canada-post',
      from: 'Thunder Bay, ON',
      origin_postal: origin,
      weight_kg: weightKg,
      rates
    });
  } catch (e) {
    return json(
      { ok: false, error: 'Could not reach Canada Post.', detail: String(e) },
      502
    );
  }
}

function parseCpRates(xml) {
  // price-quotes / price-quote blocks
  const rates = [];
  const blocks = xml.split(/<price-quote[\s>]/i).slice(1);
  for (const block of blocks) {
    const chunk = block.split(/<\/price-quote>/)[0] || '';
    const service = textBetween(chunk, 'service-name') || textBetween(chunk, 'service-code') || 'Canada Post';
    const code = textBetween(chunk, 'service-code') || '';
    // due amount often under <due-amount> or price-details
    let amount = parseFloat(textBetween(chunk, 'due-amount') || '');
    if (!Number.isFinite(amount)) {
      amount = parseFloat(textBetween(chunk, 'base') || '');
    }
    if (!Number.isFinite(amount)) continue;
    const days = textBetween(chunk, 'expected-transit-time') || textBetween(chunk, 'service-standard');
    let est = null;
    if (days && /^\d+$/.test(days.trim())) est = parseInt(days.trim(), 10);
    rates.push({
      carrier: 'Canada Post',
      service: service.trim(),
      service_code: code.trim(),
      amount,
      currency: 'CAD',
      est_delivery_days: est
    });
  }
  return rates;
}

function textBetween(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, 'i');
  const m = xml.match(re);
  return m ? m[1] : '';
}

function extractCpError(xml) {
  const desc = textBetween(xml, 'description') || textBetween(xml, 'message');
  return desc ? desc.trim() : '';
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

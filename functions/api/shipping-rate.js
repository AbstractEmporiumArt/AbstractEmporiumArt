// AE Shipping Rate quote — server-side NetParcel (via ShipEngine) live rates.
// Called by cart.js for the eTransfer path (PayPal path uses NetParcel at PayPal checkout).
// Credentials are CF secrets: SHIPENGINE_API_KEY, NETPARCEL_CARRIER_ID (optional, filters to netParcel).
export async function onRequestPost(context) {
  return handleQuote(context);
}
export async function onRequestGet(context) {
  return handleQuote(context);
}
async function handleQuote(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const apiKey = env.SHIPENGINE_API_KEY;
  if (!apiKey) {
    return json({ ok: false, error: 'Shipping quote unavailable (not configured).' }, 503);
  }
  // postal from body (POST) or query (GET)
  let postalCode = url.searchParams.get('postal');
  let countryCode = (url.searchParams.get('country') || 'CA').toUpperCase();
  let weightLb = parseFloat(url.searchParams.get('weight') || '') || 2;
  if (request.method === 'POST') {
    try {
      const b = await request.json();
      postalCode = b.postal || b.postalCode || postalCode;
      countryCode = (b.country || b.countryCode || countryCode).toUpperCase();
      weightLb = parseFloat(b.weight || b.weightLb) || weightLb;
    } catch (e) { /* ignore body parse, use query */ }
  }
  if (!postalCode || !/^[A-Za-z0-9 ]{3,10}$/.test(postalCode)) {
    return json({ ok: false, error: 'A valid postal/zip code is required.' }, 400);
  }

  const carrierId = env.NETPARCEL_CARRIER_ID || null;
  const shipFrom = {
    name: 'Abstract Emporium',
    phone: env.AE_PHONE || '',
    address_line1: env.AE_ADDRESS || '100 Syndicate Ave S',
    city_locality: 'Thunder Bay',
    state_province: 'ON',
    postal_code: env.AE_POSTAL || 'P7A 0A1',
    country_code: 'CA'
  };
  const shipTo = {
    name: 'Customer',
    address_line1: 'Destination',
    city_locality: '',
    state_province: '',
    postal_code: postalCode.toUpperCase(),
    country_code: countryCode
  };
  const shipment = {
    ship_from: shipFrom,
    ship_to: shipTo,
    packages: [
      {
        weight: { value: weightLb, unit: 'pound' },
        dimensions: { length: 8, width: 6, height: 4, unit: 'inch' }
      }
    ]
  };
  const body = carrierId
    ? { rate_options: { carrier_ids: [carrierId] }, shipment }
    : { shipment };

  try {
    const resp = await fetch('https://api.shipengine.com/v1/rates', {
      method: 'POST',
      headers: {
        'API-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await resp.json();
    if (!resp.ok) {
      return json({ ok: false, error: 'Rate provider error.', detail: data }, resp.status);
    }
    const rates = Array.isArray(data) ? data : (data.rates || []);
    const normalized = rates
      .map(r => ({
        carrier: r.carrier_code || r.carrier_id || '',
        service: r.service_code || '',
        amount: (r.shipping_amount && r.shipping_amount.amount) || r.shipping_amount || 0,
        currency: (r.shipping_amount && r.shipping_amount.currency) || 'CAD',
        est_delivery_days: r.estimated_delivery_days ?? null
      }))
      .sort((a, b) => a.amount - b.amount);
    return json({ ok: true, rates: normalized, from: 'Thunder Bay, ON', carrierId });
  } catch (e) {
    return json({ ok: false, error: 'Could not reach shipping provider.', detail: String(e) }, 502);
  }
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

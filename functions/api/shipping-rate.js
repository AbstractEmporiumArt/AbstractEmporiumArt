// AE shipping quotes — Canada Post Developer Portal Rating 4.0 (OAuth + JSON)
// One production app credential set covers Rating + Shipping + Tracking.
// Secrets (CF Pages Production env AND local .env):
//   CANADA_POST_API_USERNAME  = API Key (client id)
//   CANADA_POST_API_PASSWORD  = API Secret (client secret)
//   CANADA_POST_CUSTOMER_NUMBER
//   AE_POSTAL
//   CANADA_POST_USE_PRODUCTION = 1 (prod host) | 0 unused (same portal prod path)

const TOKEN_URL =
  'https://api.canadapost-postescanada.ca/prod/devportal-portaildesdeveloppeurs/cpc-api-native-oauth-provider/oauth2/token';
const PRICES_URL =
  'https://api.canadapost-postescanada.ca/prod/devportal-portaildesdeveloppeurs/rating/v1/prices';

export async function onRequestPost(context) {
  return handleQuote(context);
}
export async function onRequestGet(context) {
  return handleQuote(context);
}

async function handleQuote(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const clientId = (env.CANADA_POST_API_USERNAME || env.CANADA_POST_USER || '').trim();
  const clientSecret = (env.CANADA_POST_API_PASSWORD || env.CANADA_POST_PASS || '').trim();
  if (!clientId || !clientSecret) {
    return json(
      {
        ok: false,
        error:
          'Canada Post quote not configured yet. PayPal checkout still uses NetParcel. Set CANADA_POST_API_USERNAME + CANADA_POST_API_PASSWORD (Developer Portal API Key + Secret).'
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

  const origin = String(env.AE_POSTAL || 'P7A1A1').replace(/\s+/g, '').toUpperCase();
  const dest = String(postalCode).replace(/\s+/g, '').toUpperCase();
  const weightKg = Math.max(0.1, Math.round(weightLb * 0.453592 * 1000) / 1000);
  const customerNumber = (env.CANADA_POST_CUSTOMER_NUMBER || '').trim();

  const token = await getMerchantToken(clientId, clientSecret);
  if (!token) {
    return json({ ok: false, error: 'Canada Post OAuth token failed.' }, 401);
  }

  const body = {
    parcelCharacteristics: { weight: weightKg },
    originPostalCode: origin,
    destination: { domestic: { postalCode: dest } }
  };
  if (customerNumber) body.customerNumber = customerNumber;

  try {
    const resp = await fetch(PRICES_URL, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-IBM-Client-Id': clientId
      },
      body: JSON.stringify(body)
    });
    const data = await resp.json();
    if (!resp.ok) {
      return json(
        {
          ok: false,
          error: (data && (data.message || data.error)) || 'Canada Post rate error.',
          status: resp.status
        },
        resp.status >= 400 && resp.status < 600 ? resp.status : 502
      );
    }
    const quotes = Array.isArray(data) ? data : data.priceQuotes || data.quotes || [];
    const rates = quotes
      .map(function (q) {
        const pd = q.priceDetails || {};
        const std = q.serviceStandard || {};
        const amount = Number(pd.due != null ? pd.due : pd.base);
        return {
          carrier: 'Canada Post',
          service: q.serviceName || q.serviceCode || 'Canada Post',
          service_code: q.serviceCode || '',
          amount: Number.isFinite(amount) ? amount : 0,
          currency: 'CAD',
          est_delivery_days: std.expectedTransitTime != null ? Number(std.expectedTransitTime) : null
        };
      })
      .filter(function (r) {
        return r.amount > 0;
      })
      .sort(function (a, b) {
        return a.amount - b.amount;
      });
    return json({
      ok: true,
      provider: 'canada-post',
      from: 'Thunder Bay, ON',
      origin_postal: origin,
      weight_kg: weightKg,
      rates: rates
    });
  } catch (e) {
    return json({ ok: false, error: 'Could not reach Canada Post.', detail: String(e) }, 502);
  }
}

async function getMerchantToken(clientId, clientSecret) {
  try {
    const resp = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'X-IBM-Client-Id': clientId,
        'X-IBM-Client-Secret': clientSecret,
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'scope=merchant&grant_type=client_credentials'
    });
    const data = await resp.json();
    if (!resp.ok || !data.access_token) return null;
    return data.access_token;
  } catch (e) {
    return null;
  }
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

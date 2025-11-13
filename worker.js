/**
 * Cloudflare Worker for Abstract Emporium
 * Handles traffic optimization, caching, and routing
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Analytics tracking
    ctx.waitUntil(trackPageView(request, env));

    // Bot detection and traffic optimization
    const isBot = detectBot(request);
    if (isBot) {
      return handleBotRequest(request, env);
    }

    // Cache strategy
    const cacheKey = new Request(url.toString(), { method: 'GET' });
    const cache = caches.default;

    // Check cache
    let response = await cache.match(cacheKey);
    if (response) {
      return response;
    }

    // Fetch from origin
    response = await fetch(request);

    // Cache successful responses
    if (response.status === 200) {
      response = new Response(response.body, response);
      response.headers.append('Cache-Control', 'public, max-age=3600');
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    }

    // Add security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
  },
};

/**
 * Track page views and analytics
 */
async function trackPageView(request, env) {
  try {
    const url = new URL(request.url);
    const analyticsData = {
      timestamp: new Date().toISOString(),
      path: url.pathname,
      referrer: request.headers.get('referer') || 'direct',
      userAgent: request.headers.get('user-agent'),
      method: request.method,
    };

    // Store analytics (can be sent to Analytics Engine, KV, or Durable Objects)
    if (env.ANALYTICS_KV) {
      const key = `analytics_${Date.now()}`;
      await env.ANALYTICS_KV.put(key, JSON.stringify(analyticsData), {
        expirationTtl: 86400,
      });
    }

    return true;
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

/**
 * Detect if request is from a bot
 */
function detectBot(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const botPatterns = [
    /googlebot/i,
    /bingbot/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /pinterest/i,
    /slurp/i,
  ];

  return botPatterns.some((pattern) => pattern.test(userAgent));
}

/**
 * Handle bot requests (search engines, social media crawlers)
 */
function handleBotRequest(request, env) {
  const url = new URL(request.url);

  // Optimize response for bots
  const response = new Response(null, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=86400',
      'Content-Type': 'text/html; charset=utf-8',
    },
  });

  // Add bot-friendly headers
  response.headers.set('robots', 'index, follow');
  response.headers.set('Content-Security-Policy', "default-src 'self'");

  return response;
}

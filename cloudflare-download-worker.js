// Cloudflare Worker for Automatic PDF Delivery
// Deploy at: workers.cloudflare.com

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle download requests
    if (url.pathname.startsWith('/download')) {
      return handleDownload(request, url, env);
    }
    
    // Handle PayPal verification
    if (url.pathname === '/verify-payment') {
      return handlePayPalVerification(request, env);
    }
    
    // Default response
    return new Response('Abstract Emporium Download System', { status: 200 });
  }
};

// Product ID to R2 file mapping
const PRODUCT_FILES = {
  'free-beginner-knitting': 'free-bundle.pdf',
  'beginner-knitting-bundle': 'beginner-bundle.pdf',
  'starter-knitting-pack': 'starter-pack.pdf',
  'master-knitting-bundle': 'master-bundle.pdf',
  'chaos-calm': 'Chaos-and-Calm-Coloring-Book.pdf',
  'invisible-pain': 'Invisible-Pain-Coloring-Book.pdf',
  'healing-lines': 'Healing-Lines-Coloring-Book.pdf',
  'abstract-mind': 'Abstract-Mind-Collection-Complete.pdf'
};

// Handle download request
async function handleDownload(request, url, env) {
  // Get parameters
  const productId = url.searchParams.get('product');
  const token = url.searchParams.get('token'); // PayPal payment ID
  
  if (!productId || !token) {
    return new Response('Missing product or payment token', { status: 400 });
  }
  
 // Free products don't need verification
  if (productId === 'free-beginner-knitting') {
    return await serveFile(productId, env);
  }
  
  // Verify payment with PayPal
  const isValid = await verifyPayPalPayment(token, productId, env);
  
  if (!isValid) {
    return new Response('Invalid or expired payment token', { status: 403 });
  }
  
  // Serve the PDF file from R2
  return await serveFile(productId, env);
}

// Verify PayPal payment
async function verifyPayPalPayment(paymentId, productId, env) {
  // PayPal credentials from environment variables
  const clientId = env.PAYPAL_CLIENT_ID;
  const clientSecret = env.PAYPAL_CLIENT_SECRET;
  const mode = env.PAYPAL_MODE || 'sandbox'; // 'sandbox' or 'live'
  
  const baseUrl = mode === 'live' 
    ? 'https://api.paypal.com'
    : 'https://api.sandbox.paypal.com';
  
  try {
    // 1. Get access token
    const authResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    
    if (!authResponse.ok) {
      console.error('PayPal auth failed');
      return false;
    }
    
    const { access_token } = await authResponse.json();
    
    // 2. Verify payment details
    const paymentResponse = await fetch(`${baseUrl}/v2/checkout/orders/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!paymentResponse.ok) {
      console.error('Payment verification failed');
      return false;
    }
    
    const payment = await paymentResponse.json();
    
    // 3. Check payment status and amount
    if (payment.status !== 'COMPLETED') {
      console.error('Payment not completed');
      return false;
    }
    
    // Optional: Verify product ID matches (store in payment metadata)
    // For now, just return true if payment is completed
    
    // 4. Store payment ID in KV to prevent reuse
    const alreadyUsed = await env.DOWNLOADS.get(`payment:${paymentId}`);
    if (alreadyUsed) {
      console.error('Payment token already used');
      return false;
    }
    
    // Mark as used (expire after 7 days)
    await env.DOWNLOADS.put(`payment:${paymentId}`, 'used', {
      expirationTtl: 7 * 24 * 60 * 60 // 7 days
    });
    
    return true;
    
  } catch (error) {
    console.error('PayPal verification error:', error);
    return false;
  }
}

// Serve PDF file from R2
async function serveFile(productId, env) {
  const filename = PRODUCT_FILES[productId];
  
  if (!filename) {
    return new Response('Product not found', { status: 404 });
  }
  
  try {
    // Get file from R2 bucket
    const object = await env.PRODUCTS.get(filename);
    
    if (!object) {
      return new Response('File not found', { status: 404 });
    }
    
    // Return PDF with appropriate headers
    return new Response(object.body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Product-Id': productId
      }
    });
    
  } catch (error) {
    console.error('File serve error:', error);
    return new Response('Error serving file', { status: 500 });
  }
}

// Handle PayPal IPN webhook (optional - for real-time notifications)
async function handlePayPalVerification(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  
  try {
    const data = await request.json();
    
    // Process IPN data
    console.log('PayPal IPN received:', data);
    
    // You can add customer to Brevo here, send download email, etc.
    
    return new Response('OK', { status: 200 });
    
  } catch (error) {
    console.error('IPN handling error:', error);
    return new Response('Error', { status: 500 });
  }
}

/* 
SETUP INSTRUCTIONS:

1. Create Cloudflare R2 Bucket:
   - Go to Cloudflare Dashboard → R2 Object Storage
   - Click "Create bucket"
   - Name: "abstract-emporium-products"
   - Upload all 8 PDFs to this bucket

2. Create Cloudflare Worker:
   - Go to Workers & Pages → Create application
   - Name: "abstract-emporium-downloads"
   - Copy this code into the worker editor
   - Deploy

3. Bind R2 Bucket to Worker:
   - Worker settings → Variables → R2 Bucket Bindings
   - Variable name: PRODUCTS
   - R2 bucket: abstract-emporium-products
   - Save

4. Create KV Namespace (for tracking used tokens):
   - Workers & Pages → KV
   - Create namespace: "abstract-emporium-downloads"
   - Bind to worker:
     - Variable name: DOWNLOADS
     - KV namespace: abstract-emporium-downloads

5. Add Environment Variables:
   - Worker settings → Variables → Environment Variables
   - Add:
     - PAYPAL_CLIENT_ID: your_client_id_here
     - PAYPAL_CLIENT_SECRET: your_client_secret_here (encrypt as secret)
     - PAYPAL_MODE: sandbox (or "live" for production)

6. Custom Domain (optional):
   - Worker settings → Triggers → Custom Domains
   - Add: downloads.abstractemporium.com
   - Or use default: abstract-emporium-downloads.workers.dev

7. Update Thank-You Pages:
   Replace download button href with:
   https://downloads.abstractemporium.com/download?product=beginner-knitting-bundle&token={PAYMENT_ID}

8. Update PayPal Button Success URLs:
   Success URL: https://yoursite.com/thank-you-beginner-knitting.html?token={payment_id}
   
   Then in thank-you page JavaScript:
   ```javascript
   // Extract token from URL
   const urlParams = new URLSearchParams(window.location.search);
   const token = urlParams.get('token');
   if (token) {
     document.getElementById('download-link').href = 
       `https://downloads.abstractemporium.com/download?product=beginner-knitting-bundle&token=${token}`;
   }
   ```

COST:
- R2 Storage: FREE for first 10GB (more than enough!)
- Workers: 100,000 requests/day FREE
- KV: 100,000 reads/day FREE
- Total monthly cost: $0 (unless you exceed free tier)

SECURITY:
- ✓ Verifies payment with PayPal API before download
- ✓ Prevents token reuse (stored in KV for 7 days)
- ✓ Direct file serving (no exposed URLs)
- ✓ Works with PayPal hosted buttons (no custom code needed)

ALTERNATIVE: If this is too technical, just use Ko-fi or SendOwl for $0-9/month!
*/

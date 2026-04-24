/**
 * Abstract Emporium - Ko-fi Integration
 * 
 * This file handles Ko-fi checkout redirects and automatic sales tracking.
 * 
 * Setup Instructions:
 * 1. Publish products on Ko-fi shop
 * 2. Replace KO-FI PRODUCT LINKS below with your actual product links
 * 3. Update links as you add more products
 */

// ===========================
// KO-FI PRODUCT LINKS
// ===========================
// Get these from your published Ko-fi products

const KOFI_LINKS = {
    // Coloring Books
    'chaos-calm': 'https://ko-fi.com/s/5072178dee',
    'invisible-pain': 'https://ko-fi.com/s/055c3fda6c',
    'healing-lines': 'https://ko-fi.com/s/b3aafaae02',
    'abstract-mind': 'https://ko-fi.com/s/c61dcbbf95',
    
    // Knitting Bundles
    'free-knitting': 'YOUR_FREE_KNITTING_LINK',
    'beginner-knitting': 'YOUR_BEGINNER_KNITTING_LINK',
    'starter-knitting': 'YOUR_STARTER_KNITTING_LINK',
    'master-knitting': 'YOUR_MASTER_KNITTING_LINK'
};

// Product Details (for tracking)
const PRODUCTS = {
    'chaos-calm': {
        name: 'Chaos & Calm Abstract Coloring Book',
        price: 7.99,
        type: 'coloring',
        downloadFile: 'Chaos-and-Calm-Coloring-Book.pdf'
    },
    'invisible-pain': {
        name: 'Invisible Pain Abstract Coloring Book',
        price: 7.99,
        type: 'coloring',
        downloadFile: 'Invisible-Pain-Coloring-Book.pdf'
    },
    'healing-lines': {
        name: 'Healing Lines Abstract Coloring Book',
        price: 7.99,
        type: 'coloring',
        downloadFile: 'Healing-Lines-Coloring-Book.pdf'
    },
    'abstract-mind': {
        name: 'Abstract Mind Collection - Complete Bundle',
        price: 19.99,
        type: 'coloring',
        downloadFile: 'Abstract-Mind-Collection-Complete.pdf'
    },
    'free-knitting': {
        name: 'Free Beginner Knitting Pattern',
        price: 0,
        type: 'knitting',
        downloadFile: 'Free-Beginner-Knitting.pdf'
    },
    'beginner-knitting': {
        name: 'Beginner Knitting Bundle (5 Patterns)',
        price: 19,
        type: 'knitting',
        downloadFile: 'Beginner-Knitting-Bundle.pdf'
    },
    'starter-knitting': {
        name: 'Starter Knitting Bundle (15 Patterns)',
        price: 39,
        type: 'knitting',
        downloadFile: 'Starter-Knitting-Bundle.pdf'
    },
    'master-knitting': {
        name: 'Master Knitting Bundle (25 Patterns)',
        price: 79,
        type: 'knitting',
        downloadFile: 'Master-Knitting-Bundle.pdf'
    }
};

// ===========================
// PURCHASE FUNCTIONS
// ===========================

/**
 * Handle purchase button click for coloring books
 */
function purchaseColoringBook(productId, price) {
    const kofiLink = KOFI_LINKS[productId];
    
    if (!kofiLink || kofiLink.startsWith('YOUR_')) {
        alert('Ko-fi product link not yet configured. Please publish the product on Ko-fi first and update paypal-integration.js');
        return;
    }
    
    // Track click event (for analytics)
    trackPurchaseAttempt(productId, price);
    
    // Redirect to Ko-fi checkout
    window.location.href = kofiLink;
}

/**
 * Handle purchase button click for knitting bundles
 */
function purchaseKnittingBundle(productId, price) {
    const buttonId = PAYPAL_BUTTONS[productId];
    kofiLink = KOFI_LINKS[productId];
    
    if (!kofiLink || kofiLink.startsWith('YOUR_')) {
        alert('Ko-fi product link not yet configured. Please publish the product on Ko-fi first and update paypal-integration.js');
        return;
    }
    
    // Track click event (for analytics)
    trackPurchaseAttempt(productId, price);
    
    // Redirect to Ko-fi checkout
    window.location.href = kofiLink

/**
 * Track purchase attempt in localStorage (client-side analytics)
 */
function trackPurchaseAttempt(productId, price) {
    const product = PRODUCTS[productId];
    
    const event = {
        timestamp: new Date().toISOString(),
        event: 'purchase_attempt',
        product_id: productId,
        product_name: product.name,
        price: price,
        type: product.type
    };
    
    // Save to localStorage
    let events = JSON.parse(localStorage.getItem('ae_purchase_events') || '[]');
    events.push(event);
    localStorage.setItem('ae_purchase_events', JSON.stringify(events));
    
    console.log('Purchase attempt tracked:', event);
}

/**
 * Get all tracked purchase events (for analytics)
 */
function getPurchaseAnalytics() {
    const events = JSON.parse(localStorage.getItem('ae_purchase_events') || '[]');
    
    // Group by product
    const byProduct = {};
    events.forEach(event => {
        if (!byProduct[event.product_id]) {
            byProduct[event.product_id] = {
                name: event.product_name,
                attempts: 0,
                lastAttempt: null
            };
        }
        byProduct[event.product_id].attempts++;
        byProduct[event.product_id].lastAttempt = event.timestamp;
    });
    
    return {
        totalAttempts: events.length,
        byProduct: byProduct,
        allEvents: events
    };
}

// ===========================
// DOWNLOAD LINK GENERATION
// ===========================

/**
 * Generate download link after successful purchase
 * This is called from thank-you pages
 */
function generateDownloadLink(productId) {
    const product = PRODUCTS[productId];
    
    if (!product) {
        console.error('Unknown product ID:', productId);
        return null;
    }
    
    // In production, this should be a secure link from your server
    // For now, return Google Drive or Dropbox link
    const downloadLinks = {
        'chaos-calm': 'https://drive.google.com/file/d/YOUR_FILE_ID/view',
        'invisible-pain': 'https://drive.google.com/file/d/YOUR_FILE_ID/view',
        'healing-lines': 'https://drive.google.com/file/d/YOUR_FILE_ID/view',
        'abstract-mind': 'https://drive.google.com/file/d/YOUR_FILE_ID/view',
        'beginner-knitting': 'https://drive.google.com/file/d/YOUR_FILE_ID/view',
        'starter-knitting': 'https://drive.google.com/file/d/YOUR_FILE_ID/view',
        'master-knitting': 'https://drive.google.com/file/d/YOUR_FILE_ID/view'
    };
    
    return downloadLinks[productId];
}

// ===========================
// HELPER FUNCTIONS
// ===========================

/**
 * Format currency
 */
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

/**
 * Get product details
 */
function getProduct(productId) {
    return PRODUCTS[productId];
}

/**
 * Export analytics data as CSV
 */
function exportAnalyticsCSV() {
    const analytics = getPurchaseAnalytics();
    
    let csv = 'Timestamp,Event,Product ID,Product Name,Price,Type\n';
    
    analytics.allEvents.forEach(event => {
        csv += `${event.timestamp},${event.event},${event.product_id},${event.product_name},${event.price},${event.type}\n`;
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abstract-emporium-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// ===========================
// CONSOLE HELPERS (for debugging)
// ===========================

// View analytics in console
window.viewAnalytics = getPurchaseAnalytics;
window.exportAnalytics = exportAnalyticsCSV;

console.log('Abstract Emporium PayPal Integration loaded');
console.log('Type viewAnalytics() in console to see purchase data');
console.log('Type exportAnalytics() to download CSV');

(function(){
  const BUSINESS_EMAIL = 'abstractemporiumart@outlook.com'; // Interac e-Transfer: sender picks their Canadian bank/credit union from dropdown; receiver (AE) gets it free
  const SHIPPING_THRESHOLD = 100;
  const SHIPPING_RATE = -1; // -1 = QUOTED: no flat rate. Real shipping via NetParcel (PayPal checkout) or quoted for e-Transfer. $12 flat removed — underfunded.
  let priorityOptIn = false;

  function getCart(){
    try { return JSON.parse(localStorage.getItem('artCart') || '[]'); }
    catch(e){ return []; }
  }
  function setCart(cart){ localStorage.setItem('artCart', JSON.stringify(cart)); }

  function calcSubtotal(cart){ return cart.reduce((sum, i) => sum + (Number(i.price) || 0), 0); }
  function calcShipping(sub, count){
    if (count === 0 || sub <= 0) return 0;
    return sub >= SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
  }
  function formatMoney(n){ return '$' + (Number(n) || 0).toFixed(2); }
  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function render(){
    const cart = getCart();
    const wrap = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');
    const empty = document.getElementById('emptyCart');
    const count = document.getElementById('cartCount');
    if(!wrap) return;
    if (count) count.textContent = '(' + cart.length + ')';

    if(!cart.length){
      wrap.innerHTML = '';
      summary.style.display = 'none';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    summary.style.display = 'block';

    wrap.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.image || 'https://abstractemporium.art/logo.jpg'}" alt="${escapeHtml(item.title)}">
        <div class="cart-item-info">
          <div class="cart-item-title">${escapeHtml(item.title)}</div>
          <div class="cart-item-price">${formatMoney(Number(item.price) || 0)}</div>
        </div>
        <button class="remove-btn" data-idx="${idx}">Remove</button>
      </div>
    `).join('');

    const subtotal = calcSubtotal(cart);
    const shipping = calcShipping(subtotal, cart.length);
    const priority = priorityOptIn ? 5 : 0;
    const FALL15_MIN = 60;
    const FALL15_RATE = 0.15;
    const fall15 = subtotal >= FALL15_MIN ? subtotal * FALL15_RATE : 0;
    const discounted = subtotal - fall15;
    const total = discounted + shipping + priority;
    const orderNumber = (window.AE && window.AE.getOrderNumber) ? window.AE.getOrderNumber() : '';

    summary.innerHTML = `
      <div class="cart-row"><span>Subtotal</span><span>${formatMoney(subtotal)}</span></div>
      ${fall15 > 0 ? `<div class="cart-row" style="color:#1a7f37;font-weight:600"><span>FALL15 — 15% off $60+</span><span>-${formatMoney(fall15)}</span></div>` : ''}
      <div class="cart-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : (shipping < 0 ? 'QUOTED' : formatMoney(shipping))}</span></div>
      <div class="cart-row priority-row">
        <label class="priority-label">
          <input type="checkbox" id="priorityCheck" ${priorityOptIn ? 'checked' : ''}>
          <span>🚀 $5 Priority — Rush Order <em>(optional)</em></span>
        </label>
      </div>
      <p class="priority-note">Handmade to order: Z3NW1CK candles, wax melts &amp; incense need curing time, and Lissa's knitting (especially slippers) takes time to create. Add $5 Priority to flag your order as rush during the busy fall/winter season.</p>
      <div class="cart-row cart-total"><span>Total</span><span>${formatMoney(total)}</span></div>
      ${orderNumber ? `<div class="cart-row" style="font-size:0.9em;color:#555"><span>Order #</span><span><strong>${orderNumber}</strong></span></div>` : ''}
      <form id="paypalCheckout" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
        <input type="hidden" name="cmd" value="_cart">
        <input type="hidden" name="upload" value="1">
        <input type="hidden" name="business" value="${BUSINESS_EMAIL}">
        <input type="hidden" name="currency_code" value="CAD">
        <input type="hidden" name="custom" value="${orderNumber}">
        ${fall15 > 0 ? `<input type="hidden" name="discount_amount_cart" value="${fall15.toFixed(2)}">` : ''}
        ${cart.map((item, i) => `
          <input type="hidden" name="item_name_${i+1}" value="${escapeHtml(item.title)}">
          <input type="hidden" name="amount_${i+1}" value="${Number(item.price).toFixed(2)}">
          <input type="hidden" name="quantity_${i+1}" value="1">
        `).join('')}
        ${priorityOptIn ? `
          <input type="hidden" name="item_name_${cart.length+1}" value="Priority - Rush Order">
          <input type="hidden" name="amount_${cart.length+1}" value="5.00">
          <input type="hidden" name="quantity_${cart.length+1}" value="1">
        ` : ''}
        <button type="submit" class="checkout-btn">Checkout with PayPal</button>
      </form>
      ${fall15 > 0 ? `<p style="font-size:0.85em;color:#1a7f37;margin-top:6px;">🎉 FALL15 applied: 15% off your $60+ order.</p>` : `<p style="font-size:0.85em;color:#666;margin-top:6px;">Spend $60+ to unlock code <strong>FALL15</strong> (15% off).</p>`}
      <p style="font-size:0.9em;color:#666;margin-top:10px;">Canada-wide shipping from Thunder Bay, ON — live NetParcel rate at PayPal checkout, or quote for Interac e-transfer after you share your address. TB pickup/drop-off: no shipping fee. Invoice + Order # with every paid order. Free shipping on orders over ${formatMoney(SHIPPING_THRESHOLD)} (when threshold applies).</p>
      <p style="font-size:0.85em;color:#666;margin-top:6px;">Paying by Interac e-Transfer? Send to <strong>[EMAIL]</strong> (auto-deposits to our Canadian bank — free for you) and put your Order # <strong>${orderNumber}</strong> in the message. Then confirm at <a href="etransfer-confirm.html?order=${orderNumber}">eTransfer confirm</a>.</p>
      <div id="etTransferQuote" style="margin-top:10px;border:1px solid #ddd;border-radius:8px;padding:10px;background:#fafaff;">
        <label style="font-size:0.85em;font-weight:600;" for="etPostal">Get your live NetParcel shipping quote (e-Transfer):</label>
        <div style="display:flex;gap:6px;margin-top:6px;">
          <input id="etPostal" type="text" inputmode="latin" placeholder="Postal code (e.g. M5V 2T6)" style="flex:1;padding:8px;border:1px solid #ccc;border-radius:6px;">
          <button id="etQuoteBtn" type="button" style="padding:8px 12px;border:none;border-radius:6px;background:#007a63;color:#fff;cursor:pointer;">Quote</button>
        </div>
        <div id="etQuoteResult" style="font-size:0.85em;margin-top:8px;color:#444;"></div>
      </div>
    `;

    wrap.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-idx'));
        const c = getCart();
        c.splice(idx, 1);
        setCart(c);
        render();
      });
    });

    const priorityBox = document.getElementById('priorityCheck');
    if (priorityBox) {
      priorityBox.addEventListener('change', (e) => {
        priorityOptIn = e.target.checked;
        render();
      });
    }

    const etQuoteBtn = document.getElementById('etQuoteBtn');
    const etPostal = document.getElementById('etPostal');
    const etQuoteResult = document.getElementById('etQuoteResult');
    if (etQuoteBtn && etPostal && etQuoteResult) {
      etQuoteBtn.addEventListener('click', async () => {
        const postal = etPostal.value.trim();
        if (!postal) { etQuoteResult.textContent = 'Enter a postal code.'; return; }
        etQuoteResult.textContent = 'Looking up live NetParcel rates…';
        try {
          const res = await fetch('/api/shipping-rate?postal=' + encodeURIComponent(postal) + '&country=CA', { method: 'POST' });
          const data = await res.json();
          if (!data.ok) { etQuoteResult.textContent = 'Quote unavailable: ' + (data.error || 'try again'); return; }
          if (!data.rates.length) { etQuoteResult.textContent = 'No rates returned.'; return; }
          const lines = data.rates.map(r => `• ${r.service || r.carrier}: ${formatMoney(r.amount)} ${r.currency}` + (r.est_delivery_days != null ? ` (≈${r.est_delivery_days} days)` : '')).join('<br>');
          etQuoteResult.innerHTML = 'From Thunder Bay, ON — NetParcel live rates:<br>' + lines;
        } catch (e) {
          etQuoteResult.textContent = 'Network error fetching quote.';
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', render);
})();

/* Public add-to-cart API (used by product pages) */
(function(){
  function formatMoney(n){ return '$' + (Number(n) || 0).toFixed(2); }
  function pushItem(title, price, image){
    price = Number(price) || 0;
    const cart = JSON.parse(localStorage.getItem('artCart') || '[]');
    cart.push({ id: Date.now(), title: title, price: price, image: image || null, addedAt: new Date().toISOString() });
    localStorage.setItem('artCart', JSON.stringify(cart));
    const badge = document.getElementById('cartCount');
    if (badge) badge.textContent = '(' + cart.length + ')';

    // Visible accessible toast notification (no blocked alerts)
    const existingToast = document.getElementById('ae-cart-toast');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.id = 'ae-cart-toast';
    toast.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);background:#1a1a2e;color:#fff;padding:14px 24px;border-radius:10px;z-index:9999;font-weight:600;font-size:.95rem;box-shadow:0 6px 22px rgba(0,0,0,.35);animation:aeFadeIn .25s ease-out;pointer-events:none;';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = 'Added to cart: ' + title + ' — ' + formatMoney(price) + ' CAD';
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.transition='opacity .3s ease-out'; toast.style.opacity='0'; setTimeout(() => toast.remove(), 350); }, 2200);
    // Fallback alert for browsers that suppress toasts
    try { alert('Added to cart: ' + title + ' — ' + formatMoney(price) + ' CAD'); } catch(e){}

  }

  window.addToCartDirect = function(title, price, image){ pushItem(title, price, image); };

  window.addCandleToCart = function(selectId, title, image){
    const sel = document.getElementById(selectId);
    if(!sel){ pushItem(title, 0, image); return; }
    const price = Number(sel.value) || 0;
    const label = sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].text : '';
    pushItem(title + (label ? ' (' + label + ')' : ''), price, image);
  };

  window.addSelectToCart = function(selectId, title, image){
    const sel = document.getElementById(selectId);
    const price = sel ? Number(sel.value) : 0;
    pushItem(title, price, image);
  };
})();

(function(){
  const s = document.createElement('style');
  s.textContent = '@keyframes aeFadeIn{from{opacity:0;transform:translate(-50%, -8px);}to{opacity:1;transform:translate(-50%, 0);}}';
  document.head.appendChild(s);
})();

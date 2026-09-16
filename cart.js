(function(){
  const BUSINESS_EMAIL = 'abstractemporiumart@outlook.com';
  const SHIPPING_THRESHOLD = 75;
  const SHIPPING_RATE = 12;

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
    const total = subtotal + shipping;

    summary.innerHTML = `
      <div class="cart-row"><span>Subtotal</span><span>${formatMoney(subtotal)}</span></div>
      <div class="cart-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : formatMoney(shipping)}</span></div>
      <div class="cart-row cart-total"><span>Total</span><span>${formatMoney(total)}</span></div>
      <form id="paypalCheckout" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
        <input type="hidden" name="cmd" value="_cart">
        <input type="hidden" name="upload" value="1">
        <input type="hidden" name="business" value="${BUSINESS_EMAIL}">
        <input type="hidden" name="currency_code" value="CAD">
        ${cart.map((item, i) => `
          <input type="hidden" name="item_name_${i+1}" value="${escapeHtml(item.title)}">
          <input type="hidden" name="amount_${i+1}" value="${Number(item.price).toFixed(2)}">
          <input type="hidden" name="quantity_${i+1}" value="1">
        `).join('')}
        <button type="submit" class="checkout-btn">Checkout with PayPal</button>
      </form>
      <p style="font-size:0.9em;color:#666;margin-top:10px;">Shipping to Thunder Bay, ON. Free shipping on orders over ${formatMoney(SHIPPING_THRESHOLD)}.</p>
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
    alert('Added to cart: ' + title + ' — ' + formatMoney(price) + ' CAD');
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
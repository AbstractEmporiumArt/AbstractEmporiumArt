(function(){
  const BUSINESS_EMAIL = 'abstractemporiumart@outlook.com';
  const TAX_RATE = 0.13; // Ontario HST
  const SHIPPING_THRESHOLD = 75; // free shipping over this
  const SHIPPING_RATE = 12;

  function getCart(){
    try { return JSON.parse(localStorage.getItem('artCart') || '[]'); }
    catch(e){ return []; }
  }
  function setCart(cart){ localStorage.setItem('artCart', JSON.stringify(cart)); }

  function calcSubtotal(cart){ return cart.reduce((sum, i) => sum + (Number(i.price) || 0), 0); }
  function calcTax(sub){ return Math.round(sub * TAX_RATE * 100) / 100; }
  function calcShipping(sub){ return sub >= SHIPPING_THRESHOLD && sub > 0 ? 0 : (cart.length ? SHIPPING_RATE : 0); }

  function formatMoney(n){ return '$' + n.toFixed(2); }

  function render(){
    const cart = getCart();
    const wrap = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');
    const empty = document.getElementById('emptyCart');
    const count = document.getElementById('cartCount');
    if(!wrap) return;
    count.textContent = '(' + cart.length + ')';

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
    const tax = calcTax(subtotal);
    const shipping = calcShipping(subtotal);
    const total = subtotal + tax + shipping;

    summary.innerHTML = `
      <div class="cart-row"><span>Subtotal</span><span>${formatMoney(subtotal)}</span></div>
      <div class="cart-row"><span>HST (13%)</span><span>${formatMoney(tax)}</span></div>
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
        <input type="hidden" name="tax_cart" value="${tax.toFixed(2)}">
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

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
  }

  document.addEventListener('DOMContentLoaded', render);
})();

(function(){
  if (typeof addToCartDirect !== 'undefined') return;
  window.addToCartDirect = function(title, price, image){
    price = Number(price) || 0;
    let cart = JSON.parse(localStorage.getItem('artCart') || '[]');
    cart.push({ id: Date.now(), title: title, price: price, image: image || null, addedAt: new Date().toISOString() });
    localStorage.setItem('artCart', JSON.stringify(cart));
    alert('Added: ' + title + ' — ' + price.toFixed(2) + ' CAD');
  };
})();

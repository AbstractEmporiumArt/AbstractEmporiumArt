// order.js — Abstract Emporium order-number helper (z3nw1ck, LKC, physical art)
// Generates a stable per-session order number persisted in localStorage so the
// same number appears in the Email-Order (Formspree) message and the PayPal custom field.
// No server required. Email delivery is handled by Formspree (contact.html) and PayPal receipts.
(function () {
  const STORAGE_KEY = 'ae_order_number';

  function pad(n, w) { return String(n).padStart(w, '0'); }

  function getOrderNumber() {
    let num = localStorage.getItem(STORAGE_KEY);
    if (!num) {
      const now = new Date();
      const yy = String(now.getFullYear()).slice(2);
      const mm = pad(now.getMonth() + 1, 2);
      const dd = pad(now.getDate(), 2);
      const rand = pad(Math.floor(Math.random() * 10000), 4);
      num = `AE-${yy}${mm}${dd}-${rand}`;
      localStorage.setItem(STORAGE_KEY, num);
    }
    return num;
  }

  function getCartTitles() {
    try {
      const cart = JSON.parse(localStorage.getItem('artCart') || '[]');
      return cart.map(i => i.title).filter(Boolean);
    } catch (e) { return []; }
  }

  // Expose for product/cart pages
  window.AE = window.AE || {};
  window.AE.getOrderNumber = getOrderNumber;
  window.AE.getCartTitles = getCartTitles;
})();

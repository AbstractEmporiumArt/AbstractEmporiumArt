(function () {
  'use strict';
  var KEY = 'aeLoyalty';
  var MAX = 10;

  var grid = document.getElementById('stampGrid');
  var progress = document.getElementById('loyaltyProgress');
  var addBtn = document.getElementById('addStamp');
  var redeemBtn = document.getElementById('redeemBtn');
  var rewardMsg = document.getElementById('rewardMsg');

  if (!grid || !progress || !addBtn) return; // page not ready

  function getCount() {
    var n = parseInt(localStorage.getItem(KEY) || '0', 10);
    if (isNaN(n) || n < 0) n = 0;
    if (n > MAX) n = MAX;
    return n;
  }
  function setCount(n) {
    try { localStorage.setItem(KEY, String(n)); } catch (e) { /* storage blocked */ }
  }

  function render() {
    var count = getCount();
    grid.innerHTML = '';

    for (var i = 1; i <= MAX; i++) {
      var s = document.createElement('div');
      var filled = i <= count;
      s.className = 'stamp' + (filled ? ' filled' : '');
      s.textContent = filled ? '✓' : String(i);
      s.setAttribute('aria-label', 'Stamp ' + i + (filled ? ' earned' : ''));
      grid.appendChild(s);
    }

    var free = document.createElement('div');
    var earned = count >= MAX;
    free.className = 'stamp free' + (earned ? ' earned' : '');
    free.textContent = earned ? '★' : '11';
    free.setAttribute('aria-label', '11th item free' + (earned ? ' (earned)' : ''));
    grid.appendChild(free);

    progress.textContent = count + ' of ' + MAX + ' stamps';

    if (earned) {
      rewardMsg.style.display = 'block';
      rewardMsg.textContent = '🎉 You earned a FREE item! Message Lissa to claim it, then tap Redeem & Reset.';
      redeemBtn.style.display = 'inline-block';
    } else {
      rewardMsg.style.display = 'none';
      redeemBtn.style.display = 'none';
    }
  }

  addBtn.addEventListener('click', function () {
    var c = getCount();
    if (c < MAX) { setCount(c + 1); render(); }
  });
  if (redeemBtn) {
    redeemBtn.addEventListener('click', function () {
      setCount(0);
      render();
    });
  }

  render();
})();

import os

# Patch z3nw1ck.html
fn='z3nw1ck.html'
txt=open(fn,encoding='utf-8').read()

# Satsuma Wax Melts
old = '''<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" style="display:inline;margin-right:6px;">
        <input type="hidden" name="cmd" value="_xclick">
        <input type="hidden" name="business" value="abstractemporiumart@outlook.com">
        <input type="hidden" name="item_name" value="Z3NW1CK Satsuma Wax Melts">
        <input type="hidden" name="amount" value="6">
        <input type="hidden" name="currency_code" value="CAD">
        <button type="submit" class="buy-btn">Buy Melts $6</button>
      </form>'''
new = '''<button type="button" class="buy-btn" onclick="addToCartDirect('Z3NW1CK Satsuma Wax Melts', 6, 'z3nw1ck-product-photos/satsuma/satsuma-waxmels-1.jpg')">Add Melts $6</button>'''
txt = txt.replace(old, new, 1)

# Satsuma Candle size selector
old2 = '''<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" style="display:inline;">
        <input type="hidden" name="cmd" value="_xclick">
        <input type="hidden" name="business" value="abstractemporiumart@outlook.com">
        <input type="hidden" name="item_name" value="Z3NW1CK Satsuma Candle">
        <input type="hidden" name="currency_code" value="CAD">
        <select name="amount" class="size-select" required>
          <option value="5">5oz - $5</option>
          <option value="8">8oz - $8</option>
          <option value="10">10oz - $10</option>
        </select>
        <button type="submit" class="buy-btn">Buy Candle</button>
      </form>'''
new2 = '''<select id="satsuma-candle-size" class="size-select" style="padding:8px;border-radius:6px;border:1px solid #ccc;">
          <option value="5">5oz - $5</option>
          <option value="8">8oz - $8</option>
          <option value="10">10oz - $10</option>
        </select>
        <button type="button" class="buy-btn" onclick="addToCartDirect('Z3NW1CK Satsuma Candle', Number(document.getElementById('satsuma-candle-size').value), 'z3nw1ck-product-photos/satsuma/satsuma-incense-1.jpg')">Add Candle</button>'''
txt = txt.replace(old2, new2, 1)

# Fruit Loops Wax Melts
old3 = '''<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" style="display:inline;margin-right:6px;">
        <input type="hidden" name="cmd" value="_xclick">
        <input type="hidden" name="business" value="abstractemporiumart@outlook.com">
        <input type="hidden" name="item_name" value="Z3NW1CK Fruit Loops Wax Melts">
        <input type="hidden" name="amount" value="6">
        <input type="hidden" name="currency_code" value="CAD">
        <button type="submit" class="buy-btn">Buy Melts $6</button>
      </form>'''
new3 = '''<button type="button" class="buy-btn" onclick="addToCartDirect('Z3NW1CK Fruit Loops Wax Melts', 6, 'z3nw1ck-product-photos/fruitloops/fruitloops-waxmels-8.jpg')">Add Melts $6</button>'''
txt = txt.replace(old3, new3, 1)

# Fruit Loops Candle
old4 = '''<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" style="display:inline;">
        <input type="hidden" name="cmd" value="_xclick">
        <input type="hidden" name="business" value="abstractemporiumart@outlook.com">
        <input type="hidden" name="item_name" value="Z3NW1CK Fruit Loops Candle">
        <input type="hidden" name="currency_code" value="CAD">
        <select name="amount" class="size-select" required>
          <option value="5">5oz - $5</option>
          <option value="8">8oz - $8</option>
          <option value="10">10oz - $10</option>
        </select>
        <button type="submit" class="buy-btn">Buy Candle</button>
      </form>'''
new4 = '''<select id="fruit-candle-size" class="size-select" style="padding:8px;border-radius:6px;border:1px solid #ccc;">
          <option value="5">5oz - $5</option>
          <option value="8">8oz - $8</option>
          <option value="10">10oz - $10</option>
        </select>
        <button type="button" class="buy-btn" onclick="addToCartDirect('Z3NW1CK Fruit Loops Candle', Number(document.getElementById('fruit-candle-size').value), 'z3nw1ck-product-photos/fruitloops/fruitloops-incense-1.jpg')">Add Candle</button>'''
txt = txt.replace(old4, new4, 1)

# Simple Daydreams Wax Melts
old5 = '''<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" style="display:inline;margin-right:6px;">
        <input type="hidden" name="cmd" value="_xclick">
        <input type="hidden" name="business" value="abstractemporiumart@outlook.com">
        <input type="hidden" name="item_name" value="Z3NW1CK Simple Daydreams Wax Melts">
        <input type="hidden" name="amount" value="6">
        <input type="hidden" name="currency_code" value="CAD">
        <button type="submit" class="buy-btn">Buy Melts $6</button>
      </form>'''
new5 = '''<button type="button" class="buy-btn" onclick="addToCartDirect('Z3NW1CK Simple Daydreams Wax Melts', 6, 'z3nw1ck-product-photos/simpledaydreams/simpledaydreams-waxmels-1.jpg')">Add Melts $6</button>'''
txt = txt.replace(old5, new5, 1)

# Simple Daydreams Candle
old6 = '''<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" style="display:inline;">
        <input type="hidden" name="cmd" value="_xclick">
        <input type="hidden" name="business" value="abstractemporiumart@outlook.com">
        <input type="hidden" name="item_name" value="Z3NW1CK Simple Daydreams Candle">
        <input type="hidden" name="currency_code" value="CAD">
        <select name="amount" class="size-select" required>
          <option value="5">5oz - $5</option>
          <option value="8">8oz - $8</option>
          <option value="10">10oz - $10</option>
        </select>
        <button type="submit" class="buy-btn">Buy Candle</button>
      </form>'''
new6 = '''<select id="daydream-candle-size" class="size-select" style="padding:8px;border-radius:6px;border:1px solid #ccc;">
          <option value="5">5oz - $5</option>
          <option value="8">8oz - $8</option>
          <option value="10">10oz - $10</option>
        </select>
        <button type="button" class="buy-btn" onclick="addToCartDirect('Z3NW1CK Simple Daydreams Candle', Number(document.getElementById('daydream-candle-size').value), 'z3nw1ck-product-photos/simpledaydreams/simpledaydreams-incense-1.jpg')">Add Candle</button>'''
txt = txt.replace(old6, new6, 1)

open(fn,'w',encoding='utf-8').write(txt)
print('patched z3nw1ck.html')

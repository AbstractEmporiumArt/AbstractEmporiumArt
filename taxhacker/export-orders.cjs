const fs = require('fs')
const path = require('path')

const ORDERS = path.join(__dirname, '..', 'orders.jsonl')
const OUT_DIR = path.join(__dirname, 'exports')
const HST_RATE = 0.13
const SHIPPING_RATE = 12
const FREE_SHIPPING_OVER = 75

fs.mkdirSync(OUT_DIR, { recursive: true })

function money(n){ return Number(n || 0).toFixed(2) }

function parseOrders(){
  const text = fs.readFileSync(ORDERS, 'utf8')
  return text.split(/\r?\n/).filter(Boolean).map(line => {
    try { return JSON.parse(line) } catch { return null }
  }).filter(Boolean)
}

function calc(o){
  const subtotal = o.items.reduce((s,it)=>s + Number(it.price||0) * Number(it.qty||1), 0)
  const shipping = subtotal >= FREE_SHIPPING_OVER ? 0 : (o.items.length ? SHIPPING_RATE : 0)
  const hst = +(subtotal * HST_RATE).toFixed(2)
  const total = +(subtotal + shipping + hst).toFixed(2)
  return { ...o, subtotal, shipping, hst, total }
}

function exportOrders(){
  const orders = parseOrders().map(calc)
  const header = 'order_id,date,customer,note,items,subtotal,shipping,hst,total,status\n'
  const rows = orders.map((o,i) => [
    i+1,
    o.created_at || '',
    (o.customer||'').replace(/,/g,';'),
    (o.note||'').replace(/,/g,';'),
    o.items.map(it => it.title + ' x' + (it.qty||1)).join(';'),
    money(o.subtotal),
    money(o.shipping),
    money(o.hst),
    money(o.total),
    o.status || 'pending'
  ].join(','))
  fs.writeFileSync(path.join(OUT_DIR, 'orders.csv'), header + rows.join('\n'))
}

function exportTax(){
  const orders = parseOrders().map(calc)
  const byMonth = {}
  orders.forEach(o => {
    const m = (o.created_at || '').slice(0,7)
    if (!byMonth[m]) byMonth[m] = { sales:0, hst:0, shipping:0, orders:0 }
    byMonth[m].sales += o.subtotal
    byMonth[m].hst += o.hst
    byMonth[m].shipping += o.shipping
    byMonth[m].orders += 1
  })
  const header = 'month,orders,sales,shipping,hst_owed\n'
  const rows = Object.entries(byMonth).map(([m,v]) => [
    m, v.orders, money(v.sales), money(v.shipping), money(v.hst)
  ].join(','))
  fs.writeFileSync(path.join(OUT_DIR, 'tax-summary.csv'), header + rows.join('\n'))
}

exportOrders()
exportTax()
console.log('exported to', OUT_DIR)

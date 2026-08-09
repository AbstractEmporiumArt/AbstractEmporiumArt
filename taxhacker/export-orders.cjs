const fs = require('fs')
const path = require('path')

const BASE = path.join(__dirname, '..')
const OUT_DIR = path.join(__dirname, 'exports')
const HST_RATE = 0.13
const SHIPPING_RATE = 12
const FREE_SHIPPING_OVER = 75

fs.mkdirSync(OUT_DIR, { recursive: true })

function money(n){ return Number(n || 0).toFixed(2) }
function readJsonl(file){
  const p = path.join(BASE, file)
  if (!fs.existsSync(p)) return []
  return fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(Boolean).map(line => { try { return JSON.parse(line) } catch { return null } }).filter(Boolean)
}
function escCsv(s){ return String(s||'').replace(/"/g,'""') }

function exportSales(){
  const orders = readJsonl('orders.jsonl')
  const header = 'record_type,record_id,date,customer,vendor,note,items,subtotal,shipping,hst,total,status,currency\n'
  const rows = []
  orders.forEach((o,i) => {
    const sub = Number(o.subtotal ?? o.items.reduce((s,it)=>s+Number(it.price||0)*Number(it.qty||1),0))
    const shipping = Number(o.shipping ?? (sub >= FREE_SHIPPING_OVER ? 0 : (o.items.length ? SHIPPING_RATE : 0)))
    const hst = Number((sub * HST_RATE).toFixed(2))
    const total = Number((sub + shipping + hst).toFixed(2))
    rows.push([
      'order', i+1, o.created_at||'', escCsv(o.customer||''), '', escCsv(o.note||''), escCsv(o.items.map(it=>it.title+' x'+(it.qty||1)).join(';')),
      money(sub), money(shipping), money(hst), money(total), o.status||'pending', o.currency||'CAD'
    ].join(','))
  })
  fs.writeFileSync(path.join(OUT_DIR, 'sales.csv'), header + rows.join('\n'))
}

function exportExpenses(){
  const expenses = readJsonl('expenses.jsonl')
  const header = 'record_type,record_id,date,vendor,invoice,order,items,subtotal,shipping,tax,total,currency,paid_via\n'
  const rows = expenses.map((o,i) => [
    'expense', i+1, o.date||'', escCsv(o.vendor||''), escCsv(o.invoice||''), escCsv(o.order||''), escCsv(o.items.map(it=>it.title+' x'+(it.qty||1)).join(';')),
    money(o.subtotal), money(o.shipping||0), money(o.tax||0), money(o.total), o.currency||'CAD', o.paid_via||'Amazon'
  ].join(','))
  fs.writeFileSync(path.join(OUT_DIR, 'expenses.csv'), header + rows.join('\n'))
}

function exportTax(){
  const sales = readJsonl('orders.jsonl').map(o => {
    const sub = Number(o.subtotal ?? o.items.reduce((s,it)=>s+Number(it.price||0)*Number(it.qty||1),0))
    const shipping = Number(o.shipping ?? (sub >= FREE_SHIPPING_OVER ? 0 : (o.items.length ? SHIPPING_RATE : 0)))
    return { month: (o.created_at||'').slice(0,7), sales: sub, shipping, hst: +(sub * HST_RATE).toFixed(2) }
  })
  const byMonth = {}
  sales.forEach(o => {
    if (!o.month) return
    if (!byMonth[o.month]) byMonth[o.month] = { orders:0, sales:0, shipping:0, hst:0 }
    byMonth[o.month].orders += 1
    byMonth[o.month].sales += o.sales
    byMonth[o.month].shipping += o.shipping
    byMonth[o.month].hst += o.hst
  })
  const header = 'month,orders,sales,shipping,hst_owed\n'
  const rows = Object.entries(byMonth).map(([m,v]) => [m, v.orders, money(v.sales), money(v.shipping), money(v.hst)].join(','))
  fs.writeFileSync(path.join(OUT_DIR, 'tax-summary.csv'), header + rows.join('\n'))
}

exportSales()
exportExpenses()
exportTax()
console.log('exported to', OUT_DIR)

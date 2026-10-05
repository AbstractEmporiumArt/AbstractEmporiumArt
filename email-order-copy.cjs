// email-order-copy.cjs — emails Lissa a copy of each NEW AE order from orders.jsonl
// Dry-run safe: if SMTP_PASS is empty, it logs intended emails instead of sending.
require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ORDERS = path.join(ROOT, 'orders.jsonl');
const STATE = path.join(ROOT, '.orders_emailed_state.json');

let state = {};
try { state = JSON.parse(fs.readFileSync(STATE, 'utf8')); } catch (e) { state = { sent: [] }; }
const sent = new Set(state.sent || []);

const lines = fs.readFileSync(ORDERS, 'utf8').split('\n').map(l => l.trim()).filter(Boolean);
const dry = !process.env.SMTP_PASS;
if (dry) console.log('[DRY-RUN] SMTP_PASS empty — logging only, no emails sent.\n');

let count = 0;
(async () => {
  const transporter = dry ? null : nodemailer.createTransport({
    host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT) || 587,
    secure: false, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  for (let i = 0; i < lines.length; i++) {
    if (sent.has(i)) continue;
    let o; try { o = JSON.parse(lines[i]); } catch (e) { sent.add(i); continue; }
    const items = (o.items || []).map(it => `  - ${it.qty || 1}x ${it.title || '?'} @ $${it.price || 0}`).join('\n');
    const body = `New AE order logged:\n\nCustomer: ${o.customer || '?'}\nDate: ${o.created_at || '?'}\nStatus: ${o.status || '?'}\nItems:\n${items}\nTotal: $${o.total || 0}\nNote: ${o.note || '—'}`;
    const subject = `[AE Order] ${o.customer || '?'} — ${o.created_at || ''}`;
    if (dry) {
      console.log(`WOULD EMAIL -> ${process.env.OWNER_EMAIL}: ${subject}\n${body}\n`);
    } else {
      await transporter.sendMail({ from: process.env.SMTP_FROM, to: process.env.OWNER_EMAIL, subject, text: body });
      console.log(`Emailed: ${subject}`);
    }
    sent.add(i); count++;
  }
  state.sent = [...sent];
  fs.writeFileSync(STATE, JSON.stringify(state, null, 2));
  console.log(`\nDone. ${count} new order(s) processed.`);
})();

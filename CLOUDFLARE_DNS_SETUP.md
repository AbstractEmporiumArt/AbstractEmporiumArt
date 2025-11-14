# 🔧 Cloudflare DNS Setup - Step by Step

## Login to Cloudflare

1. Go to: https://dash.cloudflare.com
2. Log in with your email and password
3. You should see your domains listed

---

## Add Record 1: em4804 CNAME

**Location**: DNS tab → Add record

```
┌─────────────────────────────────────┐
│ Type        │ CNAME               │
├─────────────────────────────────────┤
│ Name        │ em4804              │
├─────────────────────────────────────┤
│ Content     │ u57303910.wl161.    │
│             │ sendgrid.net        │
├─────────────────────────────────────┤
│ TTL         │ Auto                │
├─────────────────────────────────────┤
│ Proxy       │ DNS only (gray)     │
└─────────────────────────────────────┘
```

**Click: Save**

---

## Add Record 2: s1._domainkey CNAME

**Location**: DNS tab → Add record

```
┌─────────────────────────────────────┐
│ Type        │ CNAME               │
├─────────────────────────────────────┤
│ Name        │ s1._domainkey       │
├─────────────────────────────────────┤
│ Content     │ s1.domainkey.      │
│             │ u57303910.wl161.   │
│             │ sendgrid.net        │
├─────────────────────────────────────┤
│ TTL         │ Auto                │
├─────────────────────────────────────┤
│ Proxy       │ DNS only (gray)     │
└─────────────────────────────────────┘
```

**Click: Save**

---

## Add Record 3: s2._domainkey CNAME

**Location**: DNS tab → Add record

```
┌─────────────────────────────────────┐
│ Type        │ CNAME               │
├─────────────────────────────────────┤
│ Name        │ s2._domainkey       │
├─────────────────────────────────────┤
│ Content     │ s2.domainkey.      │
│             │ u57303910.wl161.   │
│             │ sendgrid.net        │
├─────────────────────────────────────┤
│ TTL         │ Auto                │
├─────────────────────────────────────┤
│ Proxy       │ DNS only (gray)     │
└─────────────────────────────────────┘
```

**Click: Save**

---

## Add Record 4: _dmarc TXT

**Location**: DNS tab → Add record

```
┌─────────────────────────────────────┐
│ Type        │ TXT                 │
├─────────────────────────────────────┤
│ Name        │ _dmarc              │
├─────────────────────────────────────┤
│ Content     │ v=DMARC1; p=none;   │
├─────────────────────────────────────┤
│ TTL         │ Auto                │
└─────────────────────────────────────┘
```

**Click: Save**

---

## After All 4 Records Are Added

1. **Wait 5-10 minutes** (DNS propagation)
2. **Go back to SendGrid**
3. **Click "Verify Domain"** again
4. **All 4 records should now show ✅ Verified**

---

## Visual Summary - What You'll See in Cloudflare DNS

After adding all 4 records, your DNS page should show:

```
TYPE    NAME              CONTENT
─────────────────────────────────────────────────
CNAME   em4804            u57303910.wl161.sendgrid.net
CNAME   s1._domainkey     s1.domainkey.u57303910.wl161.sendgrid.net
CNAME   s2._domainkey     s2.domainkey.u57303910.wl161.sendgrid.net
TXT     _dmarc            v=DMARC1; p=none;
```

---

## Troubleshooting

**Q: I don't see "DNS" tab?**
A: Make sure you're in the right domain. Click domain name at top, then DNS.

**Q: "Add record" button is grayed out?**
A: You might need to change your Cloudflare plan. The free tier supports this.

**Q: Content field too small?**
A: Just copy and paste the full content, it will fit.

**Q: Still getting errors in SendGrid?**
A: Wait 15 minutes and try again. DNS takes time to propagate.

---

## Need More Help?

If you get stuck:
1. Take a screenshot of your Cloudflare DNS page
2. Email: abstractemporiumart@outlook.com
3. Describe which step you're on

I can help troubleshoot! 🚀

# 🎯 Where to Add DNS Records - Simple Version

## Step 1: Open Cloudflare

1. Go to: https://dash.cloudflare.com
2. Log in
3. **Look for your domain in the list** - you should see something like:
   - `abstractemporium.pages.dev` OR
   - `pages.dev` OR
   - Another domain you set up

4. **Click on it** to enter that domain

---

## Step 2: Find the DNS Section

Once you're inside a domain:

**Look at the LEFT SIDEBAR** - you'll see tabs:
- Overview
- **DNS** ← **CLICK THIS ONE**
- Email Routing
- SSL/TLS
- Speed
- Rules
- etc.

Click on **"DNS"**

---

## Step 3: Add Records (One at a Time)

You should now see a page that looks like:

```
DNS Records

Current DNS Records:
┌─────────────────────────────────────────┐
│ Type    Name    Content    TTL    Proxy │
├─────────────────────────────────────────┤
│ (existing records might be here)        │
└─────────────────────────────────────────┘

[+ Add record]  ← CLICK THIS BUTTON
```

**Click the blue "+ Add record" button**

---

## Step 4: Fill in Record 1 (em4804)

A form will appear. Fill in these fields:

```
Type:     CNAME          (select from dropdown)
Name:     em4804         (type this)
Content:  u57303910.wl161.sendgrid.net  (copy & paste)
TTL:      Auto           (keep as is)
Proxy:    DNS only       (click the gray cloud icon)

[Save]  ← Click this
```

**Then click Save**

---

## Step 5: Add Record 2 (s1._domainkey)

Click "+ Add record" again

```
Type:     CNAME          (select from dropdown)
Name:     s1._domainkey  (type this exactly)
Content:  s1.domainkey.u57303910.wl161.sendgrid.net  (copy & paste)
TTL:      Auto           (keep as is)
Proxy:    DNS only       (click the gray cloud icon)

[Save]
```

---

## Step 6: Add Record 3 (s2._domainkey)

Click "+ Add record" again

```
Type:     CNAME          (select from dropdown)
Name:     s2._domainkey  (type this exactly)
Content:  s2.domainkey.u57303910.wl161.sendgrid.net  (copy & paste)
TTL:      Auto           (keep as is)
Proxy:    DNS only       (click the gray cloud icon)

[Save]
```

---

## Step 7: Add Record 4 (_dmarc)

Click "+ Add record" again

```
Type:     TXT            (select from dropdown - NOT CNAME!)
Name:     _dmarc         (type this)
Content:  v=DMARC1; p=none;  (copy & paste exactly)
TTL:      Auto           (keep as is)

[Save]
```

---

## After All 4 Are Added

Your DNS page should show 4 new records like:

```
CNAME    em4804           u57303910.wl161.sendgrid.net
CNAME    s1._domainkey    s1.domainkey.u57303910.wl161.sendgrid.net
CNAME    s2._domainkey    s2.domainkey.u57303910.wl161.sendgrid.net
TXT      _dmarc           v=DMARC1; p=none;
```

**Then wait 5-15 minutes and go back to SendGrid to verify!**

---

## Still Stuck?

If you can't find the DNS tab:

1. **Take a screenshot** of what you see in Cloudflare
2. **Email it to**: abstractemporiumart@outlook.com
3. **Tell me**: "I can't find the DNS tab" or "The form looks different"
4. I'll help you find it! 📸

---

## Common Issues

**"I don't see + Add record button"**
→ Make sure you're in the DNS tab (not Overview or Email Routing)

**"Type dropdown won't open"**
→ Click directly on the word "CNAME" or "TXT"

**"Content field is too small for the full text"**
→ Just paste it - the field will expand or scroll

**"I see existing records already"**
→ That's normal! Just add your 4 new ones below them

---

## Copy-Paste Values

To make it easier, here are the exact values:

**Record 1:**
- Type: CNAME
- Name: em4804
- Content: u57303910.wl161.sendgrid.net

**Record 2:**
- Type: CNAME
- Name: s1._domainkey
- Content: s1.domainkey.u57303910.wl161.sendgrid.net

**Record 3:**
- Type: CNAME
- Name: s2._domainkey
- Content: s2.domainkey.u57303910.wl161.sendgrid.net

**Record 4:**
- Type: TXT
- Name: _dmarc
- Content: v=DMARC1; p=none;

Just copy and paste these into the form! 🎯

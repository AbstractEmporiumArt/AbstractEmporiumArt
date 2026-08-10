# TaxHacker Import Pack for Abstract Emporium

Exports `orders.jsonl` into accounting-friendly CSVs:
- `taxhacker/exports/orders.csv` — line-item sales with HST
- `taxhacker/exports/tax-summary.csv` — monthly HST totals

Run: `node taxhacker/export-orders.cjs`

Fields:
- HST 13% on taxable goods
- Shipping $12, free over $75
- Currency: CAD

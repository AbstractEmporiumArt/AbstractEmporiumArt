#!/usr/bin/env python3
"""Push catalog/ae-meta-catalog.csv to Meta Catalog API (items_batch upsert).
Reads CATALOG_ACCESS_TOKEN_API + CATALOG_ID from AbstractEmporium/.env
Never prints secrets.
"""
from __future__ import annotations

import csv
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENV = ROOT / ".env"
CSV = ROOT / "catalog" / "ae-meta-catalog.csv"
GRAPH = "https://graph.facebook.com/v21.0"


def load_env(path: Path) -> dict[str, str]:
    raw = path.read_bytes()
    text = None
    for enc in ("utf-8-sig", "utf-8", "utf-16"):
        try:
            text = raw.decode(enc)
            break
        except Exception:
            continue
    if text is None:
        text = raw.decode("utf-8", errors="replace")
    out: dict[str, str] = {}
    for line in text.splitlines():
        s = line.strip()
        if not s or s.startswith("#") or "=" not in s:
            continue
        k, v = s.split("=", 1)
        v = v.strip()
        if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
            v = v[1:-1]
        out[k.strip()] = v
    return out


def graph(method: str, path: str, token: str, data: dict | None = None) -> tuple[int, dict]:
    q = {"access_token": token}
    url = f"{GRAPH}/{path.lstrip('/')}?{urllib.parse.urlencode(q)}"
    body = None
    headers = {"User-Agent": "AE-catalog-sync/1.0"}
    if data is not None:
        body = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=body, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode())
        except Exception:
            return e.code, {"error": {"message": "unreadable"}}


def row_to_item(row: dict) -> dict:
    return {
        "id": row["id"],
        "title": row["title"],
        "description": row.get("description") or "",
        "availability": row.get("availability") or "in stock",
        "condition": row.get("condition") or "new",
        "price": row["price"],
        "link": row["link"],
        "image_link": row["image_link"],
        "brand": row.get("brand") or "Abstract Emporium",
        "google_product_category": row.get("google_product_category") or "",
        "fb_product_category": row.get("fb_product_category") or "",
        "quantity_to_sell_on_facebook": row.get("quantity_to_sell_on_facebook") or "1",
        "status": row.get("status") or "active",
    }


def main() -> int:
    if not ENV.exists():
        print("missing .env")
        return 1
    env = load_env(ENV)
    token = env.get("CATALOG_ACCESS_TOKEN_API") or env.get("CATALOG_API") or env.get("FACEBOOK_ACCESS_TOKEN") or ""
    cat = env.get("CATALOG_ID") or env.get("META_CATALOG_ID") or ""
    if not token or not cat:
        print("need CATALOG_ACCESS_TOKEN_API and CATALOG_ID in .env")
        return 1
    if not CSV.exists():
        print("missing", CSV)
        return 1

    with CSV.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))
    print("csv rows", len(rows))

    st, meta = graph("GET", cat, token, None)
    if "error" in meta:
        err = meta["error"]
        print("catalog GET fail", st, err.get("code"), err.get("message"))
        return 1
    print("catalog", meta.get("name"), "before", meta.get("product_count"))

    requests = [{"method": "UPDATE", "data": row_to_item(r)} for r in rows]
    payload = {
        "item_type": "PRODUCT_ITEM",
        "allow_upsert": True,
        "requests": requests,
    }
    st, res = graph("POST", f"{cat}/items_batch", token, payload)
    if "error" in res:
        err = res["error"]
        print("batch fail", st, err.get("code"), err.get("message"))
        return 1
    handles = res.get("handles") or []
    print("batch ok", st, "handles", len(handles) if isinstance(handles, list) else 1)

    st2, after = graph("GET", cat, token, None)
    if "error" not in after:
        print("catalog after", after.get("name"), "products", after.get("product_count"))
    return 0


if __name__ == "__main__":
    sys.exit(main())

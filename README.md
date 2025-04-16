# 📈 Nadella Spread

**Forecast your Microsoft 365 license margins, CSP costs, and client profit scenarios.**  

This tool helps MSPs analyze their Microsoft 365 licensing profitability—showing what you're currently making, and what you'd make if you switched to annual CSP pricing while keeping client invoices the same.

---

## ⚙️ Features

✅ Upload Sherweb (or Pax8) CSV license exports  
✅ Auto-parses per-SKU quantities, costs, and markup  
✅ Simulate switching to annual CSP commitment  
✅ Forecast profit delta if you keep client billing the same  
✅ Export final calculations to CSV  
✅ No backend setup needed—runs entirely in the browser

---

## 🧪 How to Use

1. Upload a Sherweb invoice export CSV  
2. Enter two numbers:
   - **Annual CSP license cost per user** (what you'd pay for an annual license)
   - **Monthly client billing per user** (what you charge now)  
3. Click **Apply Optimized Values**
4. Review your current margin, optimized margin, and total gain  
5. Download the CSV if you want to share or store it

---

## 🔒 Privacy

All processing happens locally in your browser. Your data never leaves your machine.  
No logins, no tracking, no server-side anything.

---

## 📂 File Format

| tenant | sku | count | billing | your_monthly_price | your_annual_price | client_price |
|--------|-----|-------|---------|---------------------|-------------------|---------------|

Supports files exported from Sherweb with:
- `SKU`, `Qty`, `ListPrice`, `DiscountedPrice NotProrated`, `Organization`

---

[🟢 Try it live on GitHub Pages](https://yourusername.github.io/nadella-spread/)

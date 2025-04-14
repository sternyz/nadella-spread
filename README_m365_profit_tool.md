# M365 Profit Tool

A browser-based tool for MSPs to calculate Microsoft 365 tenant profitability based on license blends (monthly vs. annual), client billing rates, and CSP pricing.

## 🔧 Features

- Upload a CSV of all tenant licenses and pricing
- Calculate:
  - Current CSP cost vs. fully annualized CSP cost
  - Total client billings
  - Profit margins now vs. optimized
  - Profit delta per tenant
  - Percent of licenses already on annual
- Export results to CSV

## 📁 Usage

### 1. Upload a CSV file

Format:

```
tenant,sku,count,billing,your_monthly_price,your_annual_price,client_price
Acme Corp,m365_business_premium,10,monthly,20.00,17.00,25.00
Acme Corp,m365_business_premium,2,annual,20.00,17.00,25.00
Globex,exchange_plan_1,5,monthly,4.00,3.25,6.00
Globex,exchange_plan_1,5,annual,4.00,3.25,6.00
```

### 2. View results

A table will show:
- Costs, profit, and delta per tenant

### 3. Export results

Click "Download CSV" to export your calculated results.

## 🚀 Deploy with GitHub Pages

1. Clone this repo
2. Push to your GitHub account
3. Go to repo → Settings → Pages → Source = `main`, `/ (root)`
4. App will be live at `https://yourusername.github.io/m365-profit-tool/`

## 🧠 Powered By

- [PapaParse](https://www.papaparse.com/) for CSV parsing
- Plain JavaScript + HTML + CSS
- Firebase or your own backend for `/bulk-calculate`

## 🔒 Note

Replace `https://your-project.cloudfunctions.net/api/bulk-calculate` in `script.js` with your actual Firebase Function endpoint.

---

### 👋 Questions or ideas?

Drop a GitHub issue or fork and build your own MSP dashboard!

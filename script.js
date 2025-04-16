
let globalData = [];

function renderTable(data) {
  const container = document.getElementById('results');
  container.innerHTML = "";
  const table = document.createElement('table');
  table.border = 1;
  table.style.marginTop = '20px';

  const header = table.insertRow();
  [
    'Tenant', 'SKU', 'Licenses', 'Client Price ($)', 'Monthly CSP Cost ($)',
    'Annual CSP Cost ($)', 'Profit (Current) ($)', 'Profit (Optimized) ($)', 'Delta Profit ($)'
  ].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    header.appendChild(th);
  });

  data.forEach(row => {
    const r = table.insertRow();
    [
      row.tenant, row.sku, row.count, row.client_price, row.your_monthly_price,
      row.your_annual_price, row.current_profit, row.optimized_profit, row.delta_profit
    ].forEach(cell => {
      const td = r.insertCell();
      td.textContent = typeof cell === 'number' ? cell.toFixed(2) : cell;
    });
  });
  container.appendChild(table);
}

function calculateProfits() {
  globalData = globalData.map(row => {
    const clientAnnual = row.client_price * row.count * 12;
    const currentCSP = row.your_monthly_price * row.count * 12;
    const currentProfit = clientAnnual - currentCSP;
    return {
      ...row,
      current_profit: currentProfit,
      optimized_profit: 0,
      delta_profit: 0
    };
  });
  renderTable(globalData);
}

function applyOptimizedForecast() {
  const annualCSP = parseFloat(document.getElementById('optimizedCost').value);
  const clientMonthly = parseFloat(document.getElementById('clientRate').value);
  const selectedSKU = document.getElementById('targetSKU').value;

  if (isNaN(annualCSP) || isNaN(clientMonthly) || !selectedSKU) return;

  globalData = globalData.map(row => {
    const currentCSP = row.your_monthly_price * row.count * 12;
    const currentProfit = row.client_price * row.count * 12 - currentCSP;

    if (row.sku === selectedSKU) {
      const optimizedProfit = (clientMonthly * row.count * 12) - (annualCSP * row.count);
      const deltaProfit = optimizedProfit - currentProfit;
      return {
        ...row,
        optimized_profit: optimizedProfit,
        delta_profit: deltaProfit
      };
    } else {
      return {
        ...row,
        optimized_profit: 0,
        delta_profit: 0
      };
    }
  });

  renderTable(globalData);
}

document.getElementById('csvInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: function (results) {
      globalData = results.data.filter(row => row.tenant && row.count);
      const skuSet = [...new Set(globalData.map(row => row.sku))].sort();
      const targetSKU = document.getElementById('targetSKU');
      targetSKU.innerHTML = skuSet.map(sku => `<option value="${sku}">${sku}</option>`).join('');
      calculateProfits();
    }
  });
});

document.getElementById('applyOptimized').addEventListener('click', applyOptimizedForecast);

document.getElementById('downloadCSV').addEventListener('click', () => {
  const headers = [
    'Tenant', 'SKU', 'Licenses', 'Client Price ($)', 'Monthly CSP Cost ($)',
    'Annual CSP Cost ($)', 'Profit (Current) ($)', 'Profit (Optimized) ($)', 'Delta Profit ($)'
  ];
  const rows = globalData.map(row => [
    row.tenant, row.sku, row.count, row.client_price, row.your_monthly_price,
    row.your_annual_price, row.current_profit, row.optimized_profit, row.delta_profit
  ]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nadella_profit_analysis.csv';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

document.getElementById('csvInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      const jsonData = results.data.filter(row => row.tenant);

      fetch('https://your-project.cloudfunctions.net/api/bulk-calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: jsonData })
      })
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('results');
        container.innerHTML = "";
        const table = document.createElement('table');
        table.border = 1;
        table.style.marginTop = '20px';

        const header = table.insertRow();
        [
          'Tenant', 'Licenses', 'Annualized %', 'Client Bill ($)',
          'CSP Cost (Current) ($)', 'CSP Cost (Optimized) ($)',
          'Profit (Current) ($)', 'Profit (Optimized) ($)', 'Delta Profit ($)'
        ].forEach(text => {
          const th = document.createElement('th');
          th.textContent = text;
          header.appendChild(th);
        });

        data.tenants.forEach(t => {
          const row = table.insertRow();
          row.insertCell().textContent = t.tenant;
          row.insertCell().textContent = t.total_licenses;
          row.insertCell().textContent = t.annualized_pct + '%';
          row.insertCell().textContent = t.client_bill.toFixed(2);
          row.insertCell().textContent = t.current_cost.toFixed(2);
          row.insertCell().textContent = t.optimized_cost.toFixed(2);
          row.insertCell().textContent = t.current_profit.toFixed(2);
          row.insertCell().textContent = t.optimized_profit.toFixed(2);
          row.insertCell().textContent = t.delta_profit.toFixed(2);
        });

        container.appendChild(table);
      });
    }
  });
});

document.getElementById('downloadCSV').addEventListener('click', () => {
  const headers = [
    'Tenant', 'Licenses', 'Annualized %', 'Client Bill ($)',
    'CSP Cost (Current) ($)', 'CSP Cost (Optimized) ($)',
    'Profit (Current) ($)', 'Profit (Optimized) ($)', 'Delta Profit ($)'
  ];

  const rows = Array.from(document.querySelectorAll('table tr'))
    .slice(1)
    .map(row => Array.from(row.cells).map(cell => cell.textContent));

  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'm365_tenant_profitability.csv';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

/* eslint-disable no-undef */
window.onload = () => {
    const orderFrom = document.getElementById('orderFrom');
    const orderTo = document.getElementById('orderTo');
    const orderWeight = document.getElementById('orderWeight');
    const quickQuote = document.getElementById('quickQuote');
    const getQuickOrder = () => {
      localStorage.setItem('orderFrom', orderFrom.value);
      localStorage.setItem('orderTo', orderTo.value);
      localStorage.setItem('orderWeight', orderWeight.value);
      localStorage.setItem('QuickQuote', 'QuickQuote');
      window.location.href = 'calculateQuickQuote.html';
    };
    if (quickQuote) {
      quickQuote.addEventListener('click', getQuickOrder);
    }
    const pricePerKg = 100;
    const myparcelTable = document.getElementById('parcels');
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <tr>
              <td>${localStorage.getItem('orderFrom')}</td>
              <td>${localStorage.getItem('orderTo')}</td>
              <td>${localStorage.getItem('orderWeight')}</td>
              <td>${localStorage.getItem('orderWeight') * pricePerKg}</td>
            </tr>
          `;
    myparcelTable.appendChild(tr);
  };
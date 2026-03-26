const contractors = [
  { name: "רונן בטיחות", city: "חולון", phone: "050-9909937" },
  { name: "קרן א.נ.א", city: "אשדוד", phone: "052-2537988" },
  { name: "שמיים א", city: "נתניה", phone: "052-2576719" },
];

function initCityFilter() {
  const cities = [...new Set(contractors.map(c => c.city))];
  const select = document.getElementById('filterCity');

  cities.forEach(city => {
    const opt = document.createElement('option');
    opt.value = city;
    opt.textContent = city;
    select.appendChild(opt);
  });
}

function waLink(phone, name) {
  const clean = phone.replace(/-/g, '');
  return `https://wa.me/972${clean.slice(1)}?text=שלום ${name}`;
}

function renderCards(data) {
  const grid = document.getElementById('cardsGrid');

  document.getElementById('visibleCount').textContent = data.length + " תוצאות";
  document.getElementById('totalCount').textContent = contractors.length + " קבלנים";

  grid.innerHTML = data.map(c => `
    <div class="card">
      <h3>${c.name}</h3>
      <p>${c.city}</p>
      <p>${c.phone}</p>

      <a class="btn wa" href="${waLink(c.phone, c.name)}" target="_blank">וואטסאפ</a>
      <a class="btn call" href="tel:${c.phone}">התקשר</a>
    </div>
  `).join('');
}

function filterCards() {
  const text = document.getElementById('searchInput').value.toLowerCase();
  const city = document.getElementById('filterCity').value;

  const filtered = contractors.filter(c => {
    return (
      c.name.toLowerCase().includes(text) &&
      (city ? c.city === city : true)
    );
  });

  renderCards(filtered);
}

initCityFilter();
renderCards(contractors);

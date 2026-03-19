// ══════════════════════════════════════════
//   TechCompare — Lógica de la aplicación
// ══════════════════════════════════════════

// ── BASE DE DATOS DE PRODUCTOS ──
// Para conectar fotos desde Vercel, agrega una propiedad "image"
// a cada producto con la URL directa de la imagen. Ejemplo:
//   image: "https://scrum-ex19.vercel.app/images/hp-victus.jpg"  
// Si el campo "image" está vacío, se muestra el emoji como fallback.

const products = [
  {
    id: 1, brand: "HP", name: "HP Victus 14GK13", category: "Computadores",
    price: 5448900, stores: 4,
    image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8fHwxNzczNDU3NDQ4fDA&ixlib=rb-4.1.0&q=80&w=400",
    emoji: "💻",
    specs: {
      Procesador:       "AMD Ryzen 5 7535HS",
      RAM:              "16 GB DDR5",
      Almacenamiento:   "512 GB SSD NVMe",
      "Tarjeta Gráfica": "NVIDIA RTX 3050 4GB",
      Pantalla:         "14 pulg FHD 144Hz",
      Año:              2023,
      Precio:           5448900
    }
  },
  {
    id: 2, brand: "ASUS", name: "Asus TUF Gaming 15BR45", category: "Computadores",
    price: 5558990, stores: 3,
    image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8fHwxNzczNDU3NDQ4fDA&ixlib=rb-4.1.0&q=80&w=400",
    emoji: "🎮",
    specs: {
      Procesador:       "Intel Core i7-12700H",
      RAM:              "16 GB DDR4",
      Almacenamiento:   "1 TB SSD NVMe",
      "Tarjeta Gráfica": "NVIDIA RTX 3060 6GB",
      Pantalla:         "15.6 pulg FHD 144Hz",
      Año:              2022,
      Precio:           5558990
    }
  },
  {
    id: 3, brand: "Dell", name: "Dell Vostro 16GR56", category: "Computadores",
    price: 4334900, stores: 4,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8fHwxNzczNDU3NDQ4fDA&ixlib=rb-4.1.0&q=80&w=400",
    emoji: "🖥️",
    specs: {
      Procesador:       "Intel Core i5-1235U",
      RAM:              "8 GB DDR4",
      Almacenamiento:   "256 GB SSD",
      "Tarjeta Gráfica": "Intel Iris Xe",
      Pantalla:         "16 pulg FHD 60Hz",
      Año:              2023,
      Precio:           4334900
    }
  },
];

// ── ESTADO DE LA APLICACIÓN ──
let compareSlots = [null, null]; // [idProductoA, idProductoB]

// ── UTILIDADES ──

// Formatea número como precio colombiano
function fmt(n) {
  return '$ ' + n.toLocaleString('es-CO');
}

// Devuelve el HTML de imagen del producto (foto real o emoji fallback)
function cardImageHTML(p) {
  if (p.image) {
    return `<img src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <span style="font-size:64px;display:none">${p.emoji}</span>`;
  }
  return `<span style="font-size:64px">${p.emoji}</span>`;
}

// ══════════════════════════════════════════
//   RENDERIZADO DEL CATÁLOGO
// ══════════════════════════════════════════

function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  grid.innerHTML = '';

  products.forEach(p => {
    const isA = compareSlots[0] === p.id;
    const isB = compareSlots[1] === p.id;
    const btnLabel = isA ? '✓ Producto A' : isB ? '✓ Producto B' : '+ Comparar';
    const btnClass = (isA || isB) ? 'card-compare-btn selected' : 'card-compare-btn';

    const specsHTML = Object.entries(p.specs)
      .filter(([k]) => k !== 'Precio' && k !== 'Año')
      .slice(0, 3)
      .map(([, v]) => `<span class="spec-tag">${v}</span>`)
      .join('');

    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = p.id;
    card.innerHTML = `
      <div class="card-img">
        ${cardImageHTML(p)}
        <span class="card-category">${p.category}</span>
        <button class="${btnClass}" onclick="addToCompare(${p.id}, event)">${btnLabel}</button>
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-specs">${specsHTML}</div>
        <div class="card-footer">
          <div>
            <div class="card-price-label">Desde</div>
            <div class="card-price">${fmt(p.price)}</div>
          </div>
          <div class="card-stores">${p.stores} tiendas</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ══════════════════════════════════════════
//   LÓGICA DEL COMPARADOR
// ══════════════════════════════════════════

function addToCompare(id, e) {
  e.stopPropagation();

  if (compareSlots[0] === id) { compareSlots[0] = null; showToast('Producto A eliminado');                   renderAll(); return; }
  if (compareSlots[1] === id) { compareSlots[1] = null; showToast('Producto B eliminado');                   renderAll(); return; }
  if (compareSlots[0] === null) { compareSlots[0] = id; showToast('Agregado como Producto A');               renderAll(); return; }
  if (compareSlots[1] === null) { compareSlots[1] = id; showToast('Agregado como Producto B — ¡compara!');   renderAll(); return; }

  // Ambos slots llenos → reemplazar A
  compareSlots[0] = id;
  showToast('Producto A reemplazado');
  renderAll();
}

function clearSlot(i) {
  compareSlots[i] = null;
  renderAll();
}

function renderSlots() {
  ['A', 'B'].forEach((letter, i) => {
    const box = document.getElementById('slot' + letter);
    const p   = products.find(x => x.id === compareSlots[i]);

    box.className = 'selector-box' + (p ? ' has-product' : '');

    if (p) {
      box.innerHTML = `
        <div class="selector-label">Producto ${letter}</div>
        <div class="selector-product-name">${p.name}</div>
        <div class="selector-product-brand">${p.brand} · ${fmt(p.price)}</div>
        <button class="clear-btn" onclick="clearSlot(${i})">✕ Quitar</button>
      `;
    } else {
      box.innerHTML = `
        <div class="selector-label">Producto ${letter}</div>
        <div class="selector-empty">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>
          </svg>
          Selecciona desde el catálogo
        </div>
      `;
    }
  });
}

// ── Orden de especificaciones a comparar ──
const specOrder = ['Procesador', 'RAM', 'Almacenamiento', 'Tarjeta Gráfica', 'Pantalla', 'Año', 'Precio'];

function compareSpecs(pA, pB) {
  return specOrder.map(spec => {
    const a = pA.specs[spec];
    const b = pB.specs[spec];
    if (a == null || b == null) return { spec, valA: a || '—', valB: b || '—', winner: 'tie' };

    let winner = 'tie';

    if (spec === 'Precio') {
      const nA = parseFloat(String(a).replace(/\D/g, ''));
      const nB = parseFloat(String(b).replace(/\D/g, ''));
      winner = nA < nB ? 'A' : nB < nA ? 'B' : 'tie'; // menor precio gana

    } else if (spec === 'Año') {
      winner = a > b ? 'A' : b > a ? 'B' : 'tie';

    } else if (spec === 'RAM') {
      winner = parseInt(a) > parseInt(b) ? 'A' : parseInt(b) > parseInt(a) ? 'B' : 'tie';

    } else if (spec === 'Almacenamiento') {
      const toGB = s => { const n = parseInt(s); return s.includes('TB') ? n * 1024 : n; };
      winner = toGB(a) > toGB(b) ? 'A' : toGB(b) > toGB(a) ? 'B' : 'tie';

    } else if (spec === 'Tarjeta Gráfica') {
      const tier = s => {
        if (s.includes('RTX 4090')) return 90; if (s.includes('RTX 4080')) return 80;
        if (s.includes('RTX 4070')) return 70; if (s.includes('RTX 4060')) return 60;
        if (s.includes('RTX 3080')) return 58; if (s.includes('RTX 3070')) return 55;
        if (s.includes('RTX 3060')) return 50; if (s.includes('RTX 3050 Ti')) return 42;
        if (s.includes('RTX 3050')) return 40; if (s.includes('GTX 1660')) return 35;
        if (s.includes('M2')) return 38;        if (s.includes('M1')) return 32;
        return parseInt(s.match(/(\d+)\s*GB/)?.[1] || 0) * 5;
      };
      winner = tier(a) > tier(b) ? 'A' : tier(b) > tier(a) ? 'B' : 'tie';

    } else if (spec === 'Pantalla') {
      const hz = s => parseInt(s.match(/(\d+)Hz/)?.[1] || 60);
      winner = hz(a) > hz(b) ? 'A' : hz(b) > hz(a) ? 'B' : 'tie';

    } else if (spec === 'Procesador') {
      const gen = s => {
        const m = s.match(/i[357]-(\d{2})\d{3}/) || s.match(/Ryzen \d (\d{4})/);
        if (!m) { if (s.includes('M2')) return 99; if (s.includes('M1')) return 95; return 0; }
        return parseInt(m[1]);
      };
      winner = gen(a) > gen(b) ? 'A' : gen(b) > gen(a) ? 'B' : 'tie';
    }

    return {
      spec,
      valA: spec === 'Precio' ? fmt(a) : String(a),
      valB: spec === 'Precio' ? fmt(b) : String(b),
      winner
    };
  });
}

function renderComparison() {
  const el = document.getElementById('compareResult');
  const [idA, idB] = compareSlots;

  if (!idA || !idB) {
    el.innerHTML = `<div class="no-compare-msg">Selecciona <strong>2 productos</strong> del catálogo de arriba para ver la comparación detallada aquí.</div>`;
    return;
  }

  const pA = products.find(x => x.id === idA);
  const pB = products.find(x => x.id === idB);
  const rows  = compareSpecs(pA, pB);
  const winsA = rows.filter(r => r.winner === 'A').length;
  const winsB = rows.filter(r => r.winner === 'B').length;
  const overall      = winsA > winsB ? pA.name : winsB > winsA ? pB.name : 'Empate';
  const overallColor = winsA !== winsB ? 'var(--win)' : 'var(--accent)';

  el.innerHTML = `
    <div class="compare-header">
      <div class="col-label">Especificación</div>
      <div><div class="col-label">${pA.brand}</div><div class="col-name">${pA.name}</div></div>
      <div class="col-vs">VS</div>
      <div><div class="col-label">${pB.brand}</div><div class="col-name">${pB.name}</div></div>
    </div>
    ${rows.map(r => `
      <div class="compare-row">
        <div class="row-spec">${r.spec}</div>
        <div class="row-val ${r.winner === 'A' ? 'winner' : r.winner === 'B' ? 'loser' : 'tie'}">${r.valA} ${r.winner === 'A' ? '✓' : ''}</div>
        <div class="row-center" style="font-family:'DM Mono',monospace;font-size:11px;color:#50505f">
          ${r.winner === 'tie' ? '≡' : r.winner === 'A' ? '◀' : '▶'}
        </div>
        <div class="row-val ${r.winner === 'B' ? 'winner' : r.winner === 'A' ? 'loser' : 'tie'}">${r.valB} ${r.winner === 'B' ? '✓' : ''}</div>
      </div>
    `).join('')}
    <div class="verdict-bar">
      <div>
        <div class="verdict-text">Ganador general</div>
        <div class="verdict-winner" style="color:${overallColor}">🏆 ${overall}</div>
      </div>
      <div class="verdict-score">
        ${pA.name.split(' ').slice(-1)[0]}: ${winsA} victorias &nbsp;|&nbsp;
        ${pB.name.split(' ').slice(-1)[0]}: ${winsB} victorias
      </div>
    </div>
  `;
}

// ── Renderiza todo junto ──
function renderAll() {
  renderCatalog();
  renderSlots();
  renderComparison();
}

// ══════════════════════════════════════════
//   NOTIFICACIONES TOAST
// ══════════════════════════════════════════

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// ── ARRANQUE ──
renderAll();

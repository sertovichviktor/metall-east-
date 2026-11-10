let state = {
  products: PRODUCTS_DATA,
  currentCategory: 'all',
  selectedSteel: 'all',
  searchQuery: '',
  cart: JSON.parse(localStorage.getItem('metall_ist_cart')) || []
};

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  setupListeners();
  lucide.createIcons();
});

function setupListeners() {
  // Живой поиск
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Открытие/закрытие корзины
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartBackdrop');

  const toggleCart = (open) => {
    if (open) {
      cartBackdrop.classList.remove('hidden');
      cartDrawer.classList.remove('translate-x-full');
    } else {
      cartBackdrop.classList.add('hidden');
      cartDrawer.classList.add('translate-x-full');
    }
  };

  openCartBtn?.addEventListener('click', () => toggleCart(true));
  closeCartBtn?.addEventListener('click', () => toggleCart(false));
  cartBackdrop?.addEventListener('click', () => toggleCart(false));

  // Оформление заявки
  const orderModal = document.getElementById('orderModal');
  const quickOrderBtn = document.getElementById('quickOrderBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const closeOrderModal = document.getElementById('closeOrderModal');

  quickOrderBtn?.addEventListener('click', () => {
    orderModal.classList.remove('hidden');
  });

  checkoutBtn?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      alert('Спецификация пуста. Выберите позиции в каталоге.');
      return;
    }
    toggleCart(false);
    orderModal.classList.remove('hidden');
  });

  closeOrderModal?.addEventListener('click', () => {
    orderModal.classList.add('hidden');
  });

  // Отправка формы
  document.getElementById('orderForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderNum = 'КП-МИ-' + Math.floor(10000 + Math.random() * 90000);
    alert(`Заявка №${orderNum} успешно зарегистрирована!\nСчет с НДС 20% отправлен на указанную почту.`);
    orderModal.classList.add('hidden');
    state.cart = [];
    saveCart();
    updateCartUI();
    e.target.reset();
  });
}

// Выбор категории по клику на карточки макета
window.selectCategory = function(cat) {
  state.currentCategory = cat;
  renderProducts();
  
  // Плавный скролл к каталогу
  document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' });
};

// Фильтр по стали
window.filterSteel = function(steel) {
  state.selectedSteel = steel;

  const buttons = document.querySelectorAll('.steel-btn');
  buttons.forEach(b => {
    b.className = 'steel-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-navy-850 text-slate-300 hover:text-white border border-white/5 transition';
  });
  event.target.className = 'steel-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-electric-500 text-slate-950 transition';

  renderProducts();
};

// Отрисовка товаров
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = state.products.filter(item => {
    const matchCat = state.currentCategory === 'all' || item.category === state.currentCategory;
    const matchSteel = state.selectedSteel === 'all' || item.steel.includes(state.selectedSteel);
    const matchSearch = item.name.toLowerCase().includes(state.searchQuery) ||
                        item.sku.toLowerCase().includes(state.searchQuery) ||
                        item.steel.toLowerCase().includes(state.searchQuery);
    return matchCat && matchSteel && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 glass-card rounded-2xl">
        <p class="text-sm text-slate-400">По вашему запросу товары не найдены</p>
        <button onclick="selectCategory('all'); filterSteel('all');" class="mt-3 text-xs text-electric-400 hover:underline">Сбросить фильтры</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="glass-card rounded-2xl overflow-hidden p-5 flex flex-col justify-between group transition-all duration-300">
      <div>
        <div class="h-44 w-full rounded-xl overflow-hidden mb-4 relative bg-navy-950 border border-white/5">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <span class="absolute top-2.5 left-2.5 bg-navy-950/80 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10">
            ${item.categoryName}
          </span>
          <span class="absolute top-2.5 right-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
            В наличии
          </span>
        </div>

        <div class="text-[11px] font-mono text-slate-500 mb-1">Арт: ${item.sku}</div>
        <h3 class="font-display font-bold text-sm text-white mb-3 line-clamp-2 leading-snug">${item.name}</h3>

        <div class="grid grid-cols-2 gap-2 text-[11px] bg-navy-950/60 p-2.5 rounded-xl border border-white/5 text-slate-300 mb-4">
          <div>Сталь: <b class="text-white">${item.steel}</b></div>
          <div>Размер: <b class="text-white">${item.dn}</b></div>
          <div>Стандарт: <span>${item.standard}</span></div>
          <div>Остаток: <span class="text-emerald-400">${item.stockQty} шт</span></div>
        </div>
      </div>

      <div class="pt-3 border-t border-white/5 flex items-center justify-between">
        <div>
          <div class="text-lg font-display font-black text-white">${item.price.toLocaleString('ru-RU')} ₽</div>
          <div class="text-[10px] text-slate-500">с НДС 20% / шт</div>
        </div>
        <button onclick="addToCart(${item.id})" class="bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-sky-400 text-white p-2.5 rounded-xl transition shadow-glow-blue active:scale-95">
          <i data-lucide="plus" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

window.addToCart = function(id) {
  const item = state.products.find(p => p.id === id);
  if (!item) return;

  const exist = state.cart.find(c => c.id === id);
  if (exist) {
    exist.qty += 1;
  } else {
    state.cart.push({ ...item, qty: 1 });
  }

  saveCart();
  updateCartUI();
};

window.changeQty = function(id, delta) {
  const idx = state.cart.findIndex(c => c.id === id);
  if (idx === -1) return;

  state.cart[idx].qty += delta;
  if (state.cart[idx].qty <= 0) {
    state.cart.splice(idx, 1);
  }
  saveCart();
  updateCartUI();
};

window.removeFromCart = function(id) {
  state.cart = state.cart.filter(c => c.id !== id);
  saveCart();
  updateCartUI();
};

function saveCart() {
  localStorage.setItem('metall_ist_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  const total = state.cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const vat = Math.round(total * 0.20 / 1.20);

  document.getElementById('cartCountBadge').textContent = count;
  document.getElementById('cartDrawerTotal').textContent = `${total.toLocaleString('ru-RU')} ₽`;
  document.getElementById('cartVatTotal').textContent = `${vat.toLocaleString('ru-RU')} ₽`;

  const list = document.getElementById('cartItemsList');
  if (!list) return;

  if (state.cart.length === 0) {
    list.innerHTML = `
      <div class="text-center py-16 text-slate-500">
        <i data-lucide="package-open" class="w-12 h-12 mx-auto mb-2 opacity-30"></i>
        <p class="text-xs">Спецификация пуста</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  list.innerHTML = state.cart.map(item => `
    <div class="flex items-center gap-3 bg-navy-850 p-3 rounded-xl border border-white/5 text-xs">
      <img src="${item.image}" alt="" class="w-12 h-12 object-cover rounded-lg">
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-white truncate">${item.name}</h4>
        <div class="text-[10px] text-slate-400">${item.steel} | ${item.dn}</div>
        <div class="font-bold text-electric-400 mt-0.5">${(item.price * item.qty).toLocaleString('ru-RU')} ₽</div>
      </div>
      <div class="flex items-center bg-navy-950 border border-white/10 rounded-lg">
        <button onclick="changeQty(${item.id}, -1)" class="w-6 h-6 text-slate-400 hover:text-white">-</button>
        <span class="w-5 text-center text-white font-bold">${item.qty}</span>
        <button onclick="changeQty(${item.id}, 1)" class="w-6 h-6 text-slate-400 hover:text-white">+</button>
      </div>
      <button onclick="removeFromCart(${item.id})" class="text-slate-500 hover:text-rose-400 p-1">
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    </div>
  `).join('');

  lucide.createIcons();
}

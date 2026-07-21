// TICKORA - shared cart (localStorage) + drawer UI.
// Requires products-data.js (PRODUCTS, PRODUCT_PHOTOS, waLink, pName/pDesc) and
// analytics.js (logEvent) loaded first. i18n.js (t()) is optional - falls back to English.

const CART_KEY = 'tickora_cart';

function getCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartBadge();
  renderCartDrawer();
}

function addToCart(productId) {
  const cart = getCart();
  const line = cart.find(l => l.id === productId);
  if (line) line.qty += 1;
  else cart.push({ id: productId, qty: 1 });
  saveCart(cart);
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) logEvent('add_to_cart', { productId: product.id, productName: product.name });
}

function removeFromCart(productId) {
  saveCart(getCart().filter(l => l.id !== productId));
}

function cartCount() {
  return getCart().reduce((sum, l) => sum + l.qty, 0);
}

function tr(key, fallback) {
  return typeof t === 'function' ? t(key) : fallback;
}
function localName(p) {
  return typeof pName === 'function' ? pName(p) : p.name;
}

function renderCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const count = cartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function priceToNumber(priceStr) {
  return parseFloat(String(priceStr).replace(/[^\d.]/g, '')) || 0;
}

function renderCartDrawer() {
  const itemsEl = document.getElementById('cartDrawerItems');
  const footEl = document.getElementById('cartDrawerFoot');
  const headEl = document.getElementById('cartDrawerTitle');
  if (headEl) headEl.textContent = tr('cartTitle', 'Your Cart');
  if (!itemsEl || !footEl) return;
  const cart = getCart();

  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty">${tr('cartEmpty', 'Your cart is empty.')}</div>`;
    footEl.innerHTML = '';
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map(line => {
    const p = PRODUCTS.find(pr => pr.id === line.id);
    if (!p) return '';
    const lineTotal = priceToNumber(p.price) * line.qty;
    total += lineTotal;
    return `
      <div class="cart-line">
        <img src="${PRODUCT_PHOTOS[p.id]}" alt="${localName(p)}">
        <div class="cart-line-body">
          <h4>${localName(p)}</h4>
          <div class="cart-line-meta">
            <span class="cart-line-price mono">${p.price} &times; ${line.qty}</span>
            <button class="cart-line-remove" data-remove-id="${p.id}">${tr('cartRemove', 'Remove')}</button>
          </div>
        </div>
      </div>`;
  }).join('');

  const isAr = typeof getCurrentLang === 'function' && getCurrentLang() === 'ar';
  const waMsg = (isAr ? 'مرحبًا تيكورا، أرغب في الحصول على عرض سعر لـ:\n' : 'Hi TICKORA, I\'d like a quotation for:\n') + cart.map(line => {
    const p = PRODUCTS.find(pr => pr.id === line.id);
    return p ? `- ${localName(p)} x${line.qty} (${p.price})` : '';
  }).filter(Boolean).join('\n');
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  footEl.innerHTML = `
    <div class="cart-total"><span>${tr('cartTotal', 'Total')}</span><span class="amt mono">AED ${total}</span></div>
    <a class="btn btn-primary" style="width:100%; margin-bottom:10px;" href="${waHref}" target="_blank" rel="noopener noreferrer">${tr('cartQuoteWa', 'Get a Quotation on WhatsApp')}</a>
  `;
}

function openCartDrawer() {
  document.getElementById('cartBackdrop').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
}
function closeCartDrawer() {
  document.getElementById('cartBackdrop').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
}

function injectCartDrawer() {
  if (document.getElementById('cartDrawer')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="cart-backdrop" id="cartBackdrop"></div>
    <div class="cart-drawer" id="cartDrawer">
      <div class="cart-drawer-head">
        <h3 id="cartDrawerTitle">Your Cart</h3>
        <button class="cart-drawer-close" id="cartDrawerClose" aria-label="Close cart">&times;</button>
      </div>
      <div class="cart-drawer-items" id="cartDrawerItems"></div>
      <div class="cart-drawer-foot" id="cartDrawerFoot"></div>
    </div>`;
  document.body.appendChild(wrap);
  document.getElementById('cartBackdrop').addEventListener('click', closeCartDrawer);
  document.getElementById('cartDrawerClose').addEventListener('click', closeCartDrawer);
  document.getElementById('cartDrawerItems').addEventListener('click', e => {
    const id = e.target.getAttribute('data-remove-id');
    if (id) removeFromCart(parseInt(id, 10));
  });
}

function initCart() {
  injectCartDrawer();
  const toggle = document.getElementById('cartToggle');
  if (toggle) toggle.addEventListener('click', openCartDrawer);
  renderCartBadge();
  renderCartDrawer();
  document.addEventListener('tickora:langchange', renderCartDrawer);
}

document.addEventListener('DOMContentLoaded', initCart);

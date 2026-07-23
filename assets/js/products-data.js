// TICKORA - product catalog, now admin-managed in Supabase instead of hardcoded here.
// Keeps the same shape/API the rest of the site already uses (products, PRODUCTS, photos,
// PRODUCT_PHOTOS, pName/pDesc/pTag/pStockLabel, waLink) so downstream code barely changed -
// only the loading is now async. Consumers should `await productsReady` before their first render.

const products = [];
const PRODUCTS = products;
const photos = {};
const PRODUCT_PHOTOS = photos;

let _productsReadyResolve;
const productsReady = new Promise(resolve => { _productsReadyResolve = resolve; });

async function loadProducts() {
  try {
    const { data, error } = await supabaseClient
      .from('products').select('*').order('sort_order', { ascending: true });
    if (error) throw error;
    (data || []).forEach(row => {
      products.push({
        id: row.id,
        name: row.name_en, name_ar: row.name_ar,
        desc: row.desc_en, desc_ar: row.desc_ar,
        tag: row.tag_en || '', tag_ar: row.tag_ar || '',
        price: `AED ${row.price}`,
        stock: row.stock,
        stockQty: row.stock_qty || 0,
      });
      photos[row.id] = row.photo_url;
    });
  } catch (e) {
    console.error('Failed to load products', e);
  } finally {
    _productsReadyResolve();
  }
}
loadProducts();

function pName(p) { return (getCurrentLang() === 'ar' && p.name_ar) ? p.name_ar : p.name; }
function pDesc(p) { return (getCurrentLang() === 'ar' && p.desc_ar) ? p.desc_ar : p.desc; }
function pTag(p) { return (getCurrentLang() === 'ar' ? p.tag_ar : p.tag) || ''; }
function pStockLabel(p) {
  const isAr = typeof getCurrentLang === 'function' && getCurrentLang() === 'ar';
  if (p.stock === 'out') return isAr ? 'نفذ من المخزون' : 'Sold Out';
  if (p.stock === 'low') return isAr ? `متبقي ${p.stockQty} فقط` : `Only ${p.stockQty} Left`;
  return '';
}
function pStockCount(p) {
  if (p.stock !== 'in') return '';
  const isAr = typeof getCurrentLang === 'function' && getCurrentLang() === 'ar';
  return isAr ? `${p.stockQty} قطعة متوفرة` : `${p.stockQty} in stock`;
}

const WHATSAPP_NUMBER = '971568171463';
function waLink(productName){
  const isAr = typeof getCurrentLang === 'function' && getCurrentLang() === 'ar';
  const msg = isAr
    ? `مرحبًا تيكورا، أرغب في الحصول على عرض سعر لساعة ${productName}.`
    : `Hi TICKORA, I'd like a quotation for the ${productName} watch.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Shared product catalog for Farmcart pages (index.html, order.html, admin.html)
// Catalog source order: Claude preview storage (if present) -> products.json in the same folder -> built-in defaults.

const STORAGE_KEY = 'products';

const DEFAULT_PRODUCTS = [
  { id: "tomato", name: "Tomato", price: 24 },
  { id: "onion", name: "Onion", price: 31 },
  { id: "potato", name: "Potato", price: 22 },
  { id: "garlic", name: "Garlic (peeled)", price: 142 },
  { id: "ginger", name: "Ginger", price: 68 },
  { id: "cabbage", name: "Cabbage", price: 18 },
  { id: "capsicum", name: "Green Capsicum", price: 36 },
  { id: "chilli", name: "Green Chilli", price: 44 },
  { id: "beans", name: "French Beans", price: 38 },
  { id: "drumstick", name: "Drumstick", price: 52 },
  { id: "gourd", name: "Bitter Gourd", price: 46 },
  { id: "peas", name: "Green Peas", price: 40 },
];

// Hand-drawn icons, keyed by a normalized version of the product name.
// Anything that doesn't match falls back to DEFAULT_ICON (generic crate icon).
const ICONS = {
  "tomato": '<svg viewBox="0 0 80 80"><circle cx="40" cy="46" r="24" fill="#C4841E"/><path d="M40 22 C34 10, 26 12, 24 16 C30 16, 34 20, 40 22 Z" fill="#3C5B3E"/><path d="M40 22 C46 10, 54 12, 56 16 C50 16, 46 20, 40 22 Z" fill="#3C5B3E"/></svg>',
  "onion": '<svg viewBox="0 0 80 80"><path d="M40 60 C24 60,20 44,26 32 C30 22,50 22,54 32 C60 44,56 60,40 60 Z" fill="#8A5A34"/><path d="M32 32 C36 40,44 40,48 32" fill="none" stroke="#F7F1E1" stroke-width="2" opacity="0.5"/><path d="M40 22 L40 12" stroke="#3C5B3E" stroke-width="3" stroke-linecap="round"/></svg>',
  "potato": '<svg viewBox="0 0 80 80"><path d="M20 44 C16 30,30 20,44 22 C58 24,64 36,58 48 C52 60,36 62,26 56 C20 52,22 48,20 44 Z" fill="#C4841E"/><circle cx="32" cy="38" r="2" fill="#8A5A34"/><circle cx="46" cy="46" r="2" fill="#8A5A34"/><circle cx="40" cy="30" r="2" fill="#8A5A34"/></svg>',
  "garlic (peeled)": '<svg viewBox="0 0 80 80"><path d="M40 58 C28 58,22 46,26 34 C29 24,51 24,54 34 C58 46,52 58,40 58 Z" fill="#F0E4C8" stroke="#8A5A34" stroke-width="2"/><path d="M40 34 L40 56 M32 36 L32 54 M48 36 L48 54" stroke="#8A5A34" stroke-width="1.5"/><path d="M40 24 L40 14" stroke="#3C5B3E" stroke-width="3" stroke-linecap="round"/></svg>',
  "garlic": '<svg viewBox="0 0 80 80"><path d="M40 58 C28 58,22 46,26 34 C29 24,51 24,54 34 C58 46,52 58,40 58 Z" fill="#F0E4C8" stroke="#8A5A34" stroke-width="2"/><path d="M40 34 L40 56 M32 36 L32 54 M48 36 L48 54" stroke="#8A5A34" stroke-width="1.5"/><path d="M40 24 L40 14" stroke="#3C5B3E" stroke-width="3" stroke-linecap="round"/></svg>',
  "ginger": '<svg viewBox="0 0 80 80"><path d="M22 48 C18 36,26 26,36 28 C34 22,44 18,50 24 C58 22,64 32,58 40 C64 46,60 58,48 56 C44 62,30 60,28 52 C22 54,20 52,22 48 Z" fill="#E2A63B"/></svg>',
  "cabbage": '<svg viewBox="0 0 80 80"><circle cx="40" cy="42" r="22" fill="#87A878"/><circle cx="40" cy="42" r="15" fill="none" stroke="#3C5B3E" stroke-width="2" opacity="0.6"/><circle cx="40" cy="42" r="8" fill="none" stroke="#3C5B3E" stroke-width="2" opacity="0.6"/></svg>',
  "green capsicum": '<svg viewBox="0 0 80 80"><path d="M40 20 C24 20,20 36,26 48 C30 58,50 58,54 48 C60 36,56 20,40 20 Z" fill="#3C5B3E"/><path d="M38 20 C36 14,42 12,44 16" fill="none" stroke="#8A5A34" stroke-width="3" stroke-linecap="round"/></svg>',
  "capsicum": '<svg viewBox="0 0 80 80"><path d="M40 20 C24 20,20 36,26 48 C30 58,50 58,54 48 C60 36,56 20,40 20 Z" fill="#3C5B3E"/><path d="M38 20 C36 14,42 12,44 16" fill="none" stroke="#8A5A34" stroke-width="3" stroke-linecap="round"/></svg>',
  "green chilli": '<svg viewBox="0 0 80 80"><path d="M26 24 C40 22,58 32,56 46 C54 58,40 58,34 50 C42 48,46 40,40 34 C34 30,28 32,26 24 Z" fill="#3C5B3E"/><path d="M24 20 C26 22,26 24,26 24" stroke="#8A5A34" stroke-width="3" stroke-linecap="round" fill="none"/></svg>',
  "chilli": '<svg viewBox="0 0 80 80"><path d="M26 24 C40 22,58 32,56 46 C54 58,40 58,34 50 C42 48,46 40,40 34 C34 30,28 32,26 24 Z" fill="#3C5B3E"/><path d="M24 20 C26 22,26 24,26 24" stroke="#8A5A34" stroke-width="3" stroke-linecap="round" fill="none"/></svg>',
  "french beans": '<svg viewBox="0 0 80 80"><path d="M20 30 C30 26,50 26,60 34 C64 44,54 54,44 50 C34 60,20 52,22 42 C18 38,18 34,20 30 Z" fill="#3C5B3E"/></svg>',
  "drumstick": '<svg viewBox="0 0 80 80"><path d="M14 60 C24 48,36 36,48 24 C54 18,62 18,64 24 C58 30,46 42,34 54 C28 60,20 64,14 60 Z" fill="#5B7A4A"/></svg>',
  "bitter gourd": '<svg viewBox="0 0 80 80"><ellipse cx="40" cy="42" rx="14" ry="26" fill="#5B7A4A"/><path d="M32 20 Q40 42 32 64 M48 20 Q40 42 48 64" stroke="#3C5B3E" stroke-width="1.5" fill="none"/></svg>',
  "green peas": '<svg viewBox="0 0 80 80"><path d="M18 44 C18 30,26 22,40 22 C54 22,62 30,62 44 C62 52,54 56,40 56 C26 56,18 52,18 44 Z" fill="#3C5B3E"/><circle cx="28" cy="42" r="6" fill="#87A878"/><circle cx="40" cy="42" r="6" fill="#87A878"/><circle cx="52" cy="42" r="6" fill="#87A878"/></svg>',
};

const DEFAULT_ICON = '<svg viewBox="0 0 80 80"><rect x="18" y="26" width="44" height="34" rx="3" fill="none" stroke="#8A5A34" stroke-width="3"/><path d="M18 38 L62 38 M30 26 L30 60 M50 26 L50 60" stroke="#8A5A34" stroke-width="2" opacity="0.6"/></svg>';

function getIcon(name) {
  const key = (name || '').trim().toLowerCase();
  return ICONS[key] || DEFAULT_ICON;
}

// Loads the product list. Never throws and never hangs: worst case you get DEFAULT_PRODUCTS.
async function loadProducts() {
  // 1) Claude preview environment (shared artifact storage)
  if (typeof window !== 'undefined' && window.storage) {
    try {
      const result = await window.storage.get(STORAGE_KEY, true);
      if (result && result.value) {
        const parsed = JSON.parse(result.value);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch (e) { /* key not saved yet - fall through */ }
  }
  // 2) Real website (GitHub Pages etc.): products.json sitting next to the pages
  try {
    const res = await fetch('products.json?v=' + Date.now(), { cache: 'no-store' });
    if (res.ok) {
      const parsed = await res.json();
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (e) { /* file missing or opened from disk - fall through */ }
  // 3) Built-in defaults
  return DEFAULT_PRODUCTS;
}

// Saves inside the Claude preview only. On a real website, edits are published via products.json (see admin.html).
async function saveProducts(products) {
  if (typeof window !== 'undefined' && window.storage) {
    return await window.storage.set(STORAGE_KEY, JSON.stringify(products), true);
  }
  return null;
}

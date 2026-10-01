/**
 * Helper Client untuk mengambil data dari backend Golang CandyzFlorist
 */

export const API_BASE_URL = import.meta.env?.PUBLIC_API_BASE_URL || 'https://myincoe.my.id/api/public';

// Fetch Categories from Golang Backend
export async function fetchCategories() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    try {
      const res = await fetch(`${API_BASE_URL}/kategori`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return json.data.map((cat: any) => ({
            id: cat.slug,
            label: cat.nama_kategori,
          }));
        }
      }
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    // Fallback diam-diam ke data lokal jika backend tidak aktif
  }

  // Fallback jika backend belum aktif saat build
  return [
    { id: 'ready-stock', label: 'Bouquet Ready Stock' },
    { id: 'wisuda', label: 'Bouquet Wisuda' },
    { id: 'bag-charm', label: 'Bag Charm Bouquet' },
    { id: 'snack', label: 'Snack Bouquet' },
    { id: 'mini', label: 'Mini Bouquet' },
    { id: 'wedding', label: 'Hand Bouquet Wedding' },
    { id: 'flower-box', label: 'Flower Box / Bloom Box' },
    { id: 'vase', label: 'Vase Bouquet' },
    { id: 'custom', label: 'Custom Bouquet' },
    { id: 'karangan', label: 'Karangan Bunga' },
    { id: 'money', label: 'Money Bouquet' },
  ];
}

// Fetch Products from Golang Backend
export async function fetchProducts(options: { page?: number; limit?: number; kategori?: string; search?: string } = {}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    try {
      const searchParams = new URLSearchParams();
      if (options.page) searchParams.append('page', String(options.page));
      if (options.limit) searchParams.append('limit', String(options.limit));
      if (options.kategori) searchParams.append('kategori', options.kategori);
      if (options.search) searchParams.append('search', options.search);

      const qs = searchParams.toString();
      const url = qs ? `${API_BASE_URL}/katalog?${qs}` : `${API_BASE_URL}/katalog?limit=100`;

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const json = await res.json();
        const rawList = json.data?.items || (Array.isArray(json.data) ? json.data : null);

        if (json.success && Array.isArray(rawList) && rawList.length > 0) {
          return rawList.map((p: any) => ({
            name: p.name || p.nama_produk,
            category: p.category || (p.categories && p.categories[0]) || 'ready-stock',
            price: Number(p.price || p.harga || 0),
            image: p.image || (p.foto_produk && p.foto_produk[0]) || '/catalog/ready-stock/01-colorful.png',
            deskripsi: p.deskripsi || '',
          }));
        }
      }
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    // Fallback silent
  }

  return null;
}

// Fetch Store Settings from Golang Backend
export async function fetchStoreSettings() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    try {
      const res = await fetch(`${API_BASE_URL}/pengaturan`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return {
            whatsapp: json.data.whatsapp || '089688035866',
            instagram: json.data.instagram || 'https://instagram.com/crandyzflorist',
            tiktok: json.data.tiktok || 'https://tiktok.com/@crandyzflorist',
            email: json.data.email || 'crandyzflorist@gmail.com',
            alamat: json.data.alamat || 'Blok F No. 528, Perumahan Bumi Telukjambe, Kec. Telukjambe Timur, Karawang, Jawa Barat 41361',
            templateWa: json.data.template_wa || 'Halo CandyzFlorist, saya tertarik untuk memesan produk...',
          };
        }
      }
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    // Fallback silent
  }

  return {
    whatsapp: '089688035866',
    instagram: 'https://instagram.com/crandyzflorist',
    tiktok: 'https://tiktok.com/@crandyzflorist',
    email: 'crandyzflorist@gmail.com',
    alamat: 'Blok F No. 528, Perumahan Bumi Telukjambe, Kec. Telukjambe Timur, Karawang, Jawa Barat 41361',
    templateWa: 'Halo CandyzFlorist, saya tertarik untuk memesan produk...',
  };
}

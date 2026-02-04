import { Coupon, Brand, Category } from '@/types';

const WP_API_URL = 'https://cms.coupondine.com/wp-json/wp/v2';

// ✅ Centralized fetch function with error handling
async function wpFetch(endpoint: string, revalidate = 60) {
  try {
    const url = `${WP_API_URL}${endpoint}`;
    console.log('🔍 Fetching:', url);
    
    const res = await fetch(url, {
      next: { revalidate },
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) {
      console.error(`❌ ${endpoint} failed:`, res.status);
      return null;
    }
    
    const data = await res.json();
    console.log(`✅ ${endpoint} success:`, data.length || 'single item');
    return data;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error);
    return null;
  }
}

// ==================== COUPONS ====================

export async function getCoupons(limit = 100): Promise<Coupon[]> {
  const data = await wpFetch(`/coupon?_embed&per_page=${limit}`);
  return data || [];
}

export async function getCouponBySlug(slug: string): Promise<Coupon | null> {
  const data = await wpFetch(`/coupon?slug=${slug}&_embed`);
  return data?.[0] || null;
}

export async function getCouponsByBrand(brandSlug: string): Promise<Coupon[]> {
  // Step 1: Get brand ID
  const brands = await wpFetch(`/brand?slug=${brandSlug}`);
  if (!brands?.[0]) return [];
  
  const brandId = brands[0].id;
  console.log(`✅ Brand "${brands[0].name}" ID: ${brandId}`);
  
  // Step 2: Get coupons by brand ID
  const coupons = await wpFetch(`/coupon?brand=${brandId}&_embed&per_page=100`);
  return coupons || [];
}

export async function getCouponsByCategory(categorySlug: string): Promise<Coupon[]> {
  // Step 1: Get category ID
  const categories = await wpFetch(`/coupon_category?slug=${categorySlug}`);
  if (!categories?.[0]) return [];
  
  const categoryId = categories[0].id;
  console.log(`✅ Category "${categories[0].name}" ID: ${categoryId}`);
  
  // Step 2: Get coupons by category ID
  const coupons = await wpFetch(`/coupon?coupon_category=${categoryId}&_embed&per_page=100`);
  return coupons || [];
}

// ==================== BRANDS ====================

export async function getBrands(): Promise<Brand[]> {
  const data = await wpFetch('/brand?per_page=100');
  return data || [];
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const data = await wpFetch(`/brand?slug=${slug}`);
  return data?.[0] || null;
}

export async function getBrandsByCategory(categorySlug: string): Promise<Brand[]> {
  // Get all coupons in category first
  const coupons = await getCouponsByCategory(categorySlug);
  
  // Extract unique brands from embedded data
  const brandMap = new Map<number, Brand>();
  
  coupons.forEach((coupon: Coupon) => {
    // TypeScript safe access for embedded terms
    const embeddedTerms = coupon._embedded?.['wp:term'];
    
    // Check if terms exist and take the FIRST array (which is usually Taxonomy terms like Brands/Categories)
    // Note: WordPress REST API puts tags/categories/custom_taxonomies in arrays inside 'wp:term'
    if (Array.isArray(embeddedTerms)) {
      // Loop through all term arrays (Brand groups, Category groups etc)
      embeddedTerms.forEach((termGroup) => {
        // Now loop through individual terms in that group
        termGroup.forEach((term) => {
           // Basic check to see if it looks like a Brand (has 'brand' in taxonomy or slug if available)
           // Or simply collect everything and rely on the frontend to filter
           // Since we can't easily distinguish types here without 'taxonomy' field,
           // we assume terms with ACF 'brand_logo' are brands, or filter by logic later.
           
           // Safer Approach: Just verify it has an ID and Name
           if (typeof term === 'object' && term !== null && 'id' in term && 'name' in term) {
             // Cast to Brand to satisfy TS
             const potentialBrand = term as Brand;
             
             // Check if already added
             if (!brandMap.has(potentialBrand.id)) {
               brandMap.set(potentialBrand.id, potentialBrand);
             }
           }
        });
      });
    }
  });
  
  const brands = Array.from(brandMap.values());
  console.log(`✅ Found ${brands.length} unique brands/terms in category`);
  return brands;
}

// ==================== CATEGORIES ====================

export async function getCategories(): Promise<Category[]> {
  const data = await wpFetch('/coupon_category?per_page=100');
  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await wpFetch(`/coupon_category?slug=${slug}`);
  return data?.[0] || null;
}

// ==================== STATS (for Homepage) ====================

export async function getStats() {
  const [coupons, brands, categories] = await Promise.all([
    getCoupons(1), // Just need count
    getBrands(),
    getCategories()
  ]);
  
  return {
    totalCoupons: coupons.length || 0,
    totalBrands: brands.length || 0,
    totalCategories: categories.length || 0,
  };
}

// ==================== POPULAR BRANDS (Top by coupon count) ====================

export async function getPopularBrands(limit = 12): Promise<Brand[]> {
  const brands = await getBrands();
  
  // Ab ye error nahi dega
  return brands
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, limit);
}

// ==================== SEARCH ====================

export async function searchCoupons(query: string): Promise<Coupon[]> {
  const data = await wpFetch(`/coupon?search=${encodeURIComponent(query)}&_embed&per_page=50`);
  return data || [];
}

// ==================== HEALTH CHECK ====================

export async function testWPConnection(): Promise<boolean> {
  try {
    const res = await fetch(`${WP_API_URL}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.ok;
  } catch {
    return false;
  }
}

import { Coupon, Brand, Category } from '@/types';

const WP_API_URL = 'https://cms.coupondine.com/wp-json/wp/v2';

export async function getCoupons(limit = 100): Promise<Coupon[]> {
  try {
    const url = `${WP_API_URL}/coupon?_embed&per_page=${limit}`;
    console.log('Fetching coupons from:', url);
    
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      console.error('❌ API Error:', res.status, res.statusText);
      const errorText = await res.text();
      console.error('Error Body:', errorText);
      throw new Error(`Failed to fetch coupons: ${res.status} - ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('✅ Fetched coupons:', data.length);
    return data;
  } catch (error) {
    console.error('❌ Fetch Error:', error);
    throw error;
  }
}

export async function getCouponBySlug(slug: string): Promise<Coupon | null> {
  try {
    const url = `${WP_API_URL}/coupon?slug=${slug}&_embed`;
    console.log('Fetching coupon by slug:', url);
    
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      console.error('❌ Coupon by slug error:', res.status, res.statusText);
      return null;
    }
    
    const coupons: Coupon[] = await res.json();
    console.log('✅ Found coupon:', coupons.length > 0 ? coupons[0].title.rendered : 'Not found');
    return coupons[0] || null;
  } catch (error) {
    console.error('❌ Error fetching coupon by slug:', error);
    return null;
  }
}

export async function getCouponsByBrand(brandSlug: string): Promise<Coupon[]> {
  try {
    console.log('Fetching brand:', brandSlug);
    
    // First, get brand by slug
    const brandRes = await fetch(`${WP_API_URL}/brand?slug=${brandSlug}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!brandRes.ok) {
      console.error('❌ Brand fetch error:', brandRes.status);
      return [];
    }
    
    const brands: Brand[] = await brandRes.json();
    
    if (!brands[0]) {
      console.warn('⚠️ Brand not found:', brandSlug);
      return [];
    }
    
    console.log('✅ Found brand:', brands[0].name, 'ID:', brands[0].id);
    
    // Then get coupons for that brand
    const res = await fetch(`${WP_API_URL}/coupon?brand=${brands[0].id}&_embed`, {
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      console.error('❌ Coupons by brand error:', res.status);
      return [];
    }
    
    const coupons = await res.json();
    console.log('✅ Found coupons for brand:', coupons.length);
    return coupons;
  } catch (error) {
    console.error('❌ Error fetching coupons by brand:', error);
    return [];
  }
}

export async function getBrands(): Promise<Brand[]> {
  try {
    const url = `${WP_API_URL}/brand?per_page=100`;
    console.log('Fetching brands from:', url);
    
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      console.error('❌ Brands API Error:', res.status, res.statusText);
      const errorText = await res.text();
      console.error('Error Body:', errorText);
      throw new Error(`Failed to fetch brands: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('✅ Fetched brands:', data.length);
    return data;
  } catch (error) {
    console.error('❌ Brands Fetch Error:', error);
    return []; // Return empty array instead of throwing
  }
}

// Additional helper function to test API connection
export async function testWPConnection(): Promise<boolean> {
  try {
    const res = await fetch(`${WP_API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return res.ok;
  } catch (error) {
    console.error('❌ WordPress connection test failed:', error);
    return false;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const url = `${WP_API_URL}/coupon_category?per_page=100`; // ✅ Exact name
    console.log('Fetching categories from:', url);
    
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      console.error('❌ Categories API Error:', res.status, res.statusText);
      return [];
    }
    
    const data = await res.json();
    console.log('✅ Fetched categories:', data.length);
    return data;
  } catch (error) {
    console.error('❌ Categories Fetch Error:', error);
    return [];
  }
}


// Get brands by category
export async function getBrandsByCategory(categorySlug: string): Promise<Brand[]> {
  try {
    console.log('Fetching brands for category:', categorySlug);
    
    // First get category ID
    const catRes = await fetch(`${WP_API_URL}/coupon_category?slug=${categorySlug}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!catRes.ok) {
      console.error('❌ Category fetch error:', catRes.status);
      return [];
    }
    
    const categories = await catRes.json();
    if (!categories[0]) {
      console.warn('⚠️ Category not found:', categorySlug);
      return [];
    }
    
    const categoryId = categories[0].id;
    console.log('✅ Found category:', categories[0].name, 'ID:', categoryId);
    
    // Get all coupons in this category
    const couponsRes = await fetch(`${WP_API_URL}/coupon?coupon_category=${categoryId}&_embed&per_page=100`, {
      next: { revalidate: 3600 },
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!couponsRes.ok) {
      console.error('❌ Coupons fetch error:', couponsRes.status);
      return [];
    }
    
    const coupons = await couponsRes.json();
    console.log('✅ Found coupons in category:', coupons.length);
    
    // Extract unique brands from coupons
    const brandMap = new Map<number, Brand>();
    
    coupons.forEach((coupon: Coupon) => {
      const brandTerms = coupon._embedded?.['wp:term']?.[0] || [];
      brandTerms.forEach((brand: Brand) => {
        if (!brandMap.has(brand.id)) {
          brandMap.set(brand.id, brand);
        }
      });
    });
    
    const brands = Array.from(brandMap.values());
    console.log('✅ Unique brands found:', brands.length);
    
    return brands;
  } catch (error) {
    console.error('❌ Error fetching brands by category:', error);
    return [];
  }
}

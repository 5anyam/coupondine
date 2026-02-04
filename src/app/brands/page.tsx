import { getBrands, getCoupons } from '@/lib/wordpress';
import { Brand } from '@/types';
import BrandsPageClient from './BrandsPageClient';

// Cache revalidation settings (Optional: 1 hour)
export const revalidate = 3600;

export const metadata = {
  title: 'All Brands - CouponDine',
  description: 'Browse all brands and find the best discount codes',
};

export default async function BrandsPage() {
  // Parallel Fetching for better performance
  const [brands, coupons] = await Promise.all([
    getBrands(),
    getCoupons(100)
  ]);

  // Count coupons per brand
  const brandCouponCount: Record<number, number> = {};
  
  coupons.forEach((coupon) => {
    // 1. Safe access to nested terms
    const termGroups = coupon._embedded?.['wp:term'];
    
    // 2. Check if the first group (Taxonomies) exists
    const brandTerms = termGroups && termGroups[0] ? termGroups[0] : [];
    
    // 3. Loop with generic type, then cast to Brand
    brandTerms.forEach((term) => {
      // ✅ Type Assertion Fix: Treat 'term' as Brand explicitly
      const brand = term as Brand;
      
      if (brand && brand.id) {
        brandCouponCount[brand.id] = (brandCouponCount[brand.id] || 0) + 1;
      }
    });
  });

  const brandsWithCount = brands.map(brand => ({
    ...brand,
    // Use calculated count OR fallback to API provided count if available
    couponCount: brandCouponCount[brand.id] || brand.count || 0
  }));

  return <BrandsPageClient brands={brandsWithCount} />;
}

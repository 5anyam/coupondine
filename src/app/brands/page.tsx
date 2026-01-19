import { getBrands, getCoupons } from '@/lib/wordpress';
import { Brand, Coupon } from '@/types';
import BrandsPageClient from './BrandsPageClient';

export const metadata = {
  title: 'All Brands - CouponDine',
  description: 'Browse all brands and find the best discount codes',
};

export default async function BrandsPage() {
  const brands: Brand[] = await getBrands();
  const coupons: Coupon[] = await getCoupons(100);

  // Count coupons per brand
  const brandCouponCount: Record<number, number> = {};
  
  coupons.forEach((coupon) => {
    const brandTerms = coupon._embedded?.['wp:term']?.[0] || [];
    brandTerms.forEach((brand: Brand) => {
      brandCouponCount[brand.id] = (brandCouponCount[brand.id] || 0) + 1;
    });
  });

  const brandsWithCount = brands.map(brand => ({
    ...brand,
    couponCount: brandCouponCount[brand.id] || 0
  }));

  return <BrandsPageClient brands={brandsWithCount} />;
}

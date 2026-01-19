import { getCouponsByBrand, getBrands } from '@/lib/wordpress';
import CouponCard from '@/components/CouponCard';
import { Coupon, Brand } from '@/types';

export async function generateStaticParams() {
  const brands: Brand[] = await getBrands();
  return brands.map((brand) => ({ slug: brand.slug }));
}

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const coupons: Coupon[] = await getCouponsByBrand(slug);
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 capitalize">
        {slug.replace(/-/g, ' ')} Coupons
      </h1>
      
      {coupons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">
          No coupons found for this brand.
        </p>
      )}
    </main>
  );
}

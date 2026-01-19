import { getBrandsByCategory, getCategories, getCoupons } from '@/lib/wordpress';
import { Brand, Coupon } from '@/types';
import BrandCard from '@/components/BrandsCard';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const categories = await getCategories();
  const category = categories.find(cat => cat.slug === params.slug);
  
  return {
    title: `${category?.name || params.slug} Brands & Coupons - CouponDine`,
    description: `Explore top brands and deals in ${category?.name || params.slug}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Get brands in this category
  const brands: Brand[] = await getBrandsByCategory(params.slug);
  
  // Get all coupons to count per brand
  const allCoupons: Coupon[] = await getCoupons(100);
  
  // Count coupons per brand
  const brandCouponCount: Record<number, number> = {};
  allCoupons.forEach((coupon) => {
    const brandTerms = coupon._embedded?.['wp:term']?.[0] || [];
    brandTerms.forEach((brand: Brand) => {
      brandCouponCount[brand.id] = (brandCouponCount[brand.id] || 0) + 1;
    });
  });
  
  // Get category info
  const categories = await getCategories();
  const category = categories.find(cat => cat.slug === params.slug);
  const categoryName = category?.name || params.slug;
  const categoryDesc = category?.description?.replace(/<[^>]*>/g, '') || '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-blue-100 mb-4 justify-center">
            <Link href="/categories" className="hover:text-white transition">
              Categories
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">{categoryName}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {categoryName} Brands
          </h1>
          
          {categoryDesc && (
            <p className="text-lg text-blue-100 text-center max-w-2xl mx-auto mb-4">
              {categoryDesc}
            </p>
          )}
          
          <p className="text-xl text-blue-100 text-center">
            {brands.length} {brands.length === 1 ? 'brand' : 'brands'} available
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {brands.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Popular Brands in {categoryName}
              </h2>
              <Link 
                href="/categories" 
                className="text-blue-600 font-semibold hover:underline"
              >
                ← All Categories
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {brands.map((brand) => (
                <BrandCard 
                  key={brand.id} 
                  brand={brand}
                  couponCount={brandCouponCount[brand.id] || 0}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No brands found</h3>
            <p className="text-gray-500 mb-6">This category does not have any brands yet.</p>
            <Link 
              href="/categories" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              ← Browse All Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

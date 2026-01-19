import { getCategories, getCouponsByCategory, getBrandsByCategory } from '@/lib/wordpress'; // Adjust path
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Coupon, Brand, Category } from '@/types';
import { decode } from 'html-entities';

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategories(); // Fetch to get dynamic title
  const cat = category.find(c => c.slug === slug);
  
  const title = cat ? `${decode(cat.name)} Coupons & Deals | CouponDine` : 'Category Not Found';
  const description = cat ? `Latest ${decode(cat.name)} coupons, promo codes & deals. Save with verified discounts.` : 'Explore coupons on CouponDine.';
  
  return {
    title,
    description,
    keywords: `${decode(cat?.name || 'coupons')}, promo codes, deals, discounts`,
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const queryParams = await searchParams;

  // Fetch data
  const [categoryRes, couponsRes, brandsRes] = await Promise.allSettled([
    getCategories(),
    getCouponsByCategory ? getCouponsByCategory(slug) : [], // Use your func or fallback
    getBrandsByCategory ? getBrandsByCategory(slug) : [],
  ]);

  const categories: Category[] = categoryRes.status === 'fulfilled' ? categoryRes.value : [];
  const coupons: Coupon[] = couponsRes.status === 'fulfilled' ? couponsRes.value : [];
  const brands: Brand[] = brandsRes.status === 'fulfilled' ? brandsRes.value : [];

  const category = categories.find(c => c.slug === slug);
  if (!category) notFound();

  // Filter by query if present
  const q = (queryParams.q as string)?.toLowerCase() || '';
  const filteredCoupons = q 
    ? coupons.filter(c => 
        decode(c.title.rendered).toLowerCase().includes(q) ||
        decode(c.excerpt?.rendered || '').toLowerCase().includes(q)
      )
    : coupons;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Header */}
      <div className="text-center mb-16 bg-gradient-to-r from-orange-50 to-yellow-50 p-12 rounded-3xl">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
          {decode(category.name)} Coupons
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Latest verified promo codes, deals & cashback for {decode(category.name)}. Save up to {category.count || '50%'} off top brands!
        </p>
        {q && (
          <p className="text-sm text-orange-600 mt-4 bg-orange-100 p-2 rounded-xl inline-block">
            Showing results for {q}
          </p>
        )}
      </div>

      {/* Top Brands in Category */}
      {brands.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Top Brands ({brands.length})</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {brands.slice(0, 12).map((brand) => (
              <Link
                key={brand.id}
                href={`/brand/${brand.slug}`}
                className="group p-6 bg-white border rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all text-center"
              >
                <h4 className="font-semibold text-lg text-gray-800 group-hover:text-orange-600 mb-2">
                  {brand.name}
                </h4>
                <span className="text-sm text-gray-500">View Deals</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Coupons Grid */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Latest Coupons ({filteredCoupons.length})
          </h2>
          <Link href={`/category/${slug}?sort=newest`} className="text-orange-600 hover:underline font-semibold">
            View All →
          </Link>
        </div>
        {filteredCoupons.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCoupons.map((coupon) => (
              <Link
                key={coupon.id}
                href={`/coupon/${coupon.slug}`}
                className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
              >
                <div className="relative h-40 bg-gradient-to-br from-gray-100">
                  {coupon._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <Image
                      src={coupon._embedded['wp:featuredmedia'][0].source_url}
                      alt={coupon.title.rendered}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                  {coupon.acf?.discount_amount && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {coupon.acf.discount_amount} OFF
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg line-clamp-2 mb-2" dangerouslySetInnerHTML={{ __html: coupon.title.rendered }} />
                  {coupon.excerpt?.rendered && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3" dangerouslySetInnerHTML={{ __html: coupon.excerpt.rendered }} />
                  )}
                  {coupon.acf?.coupon_code && (
                    <div className="bg-orange-50 p-3 rounded-lg mb-3">
                      <code className="block text-orange-800 font-mono bg-white px-2 py-1 rounded text-sm">
                        {coupon.acf.coupon_code}
                      </code>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Expires soon</span>
                    <span className="text-orange-600 font-semibold">Get Deal →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-700">No Coupons Yet</h3>
            <p className="text-gray-600 mb-8">Check back soon for {decode(category.name)} deals!</p>
            <Link href="/" className="bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600">
              All Categories
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

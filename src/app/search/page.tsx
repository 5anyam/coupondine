import { getCoupons, getCategories, getBrands } from '@/lib/wordpress'; // Adjust path if needed
import Image from 'next/image';
import Link from 'next/link';
import { decode } from 'html-entities';
import { Metadata } from 'next';
import { Coupon, Brand, Category } from '@/types';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://coupondine.com';
  const canonicalUrl = `${baseUrl}/search`;
  
  const title = 'Search Coupons & Deals | CouponDine - Promo Codes, Discounts';
  const description = 'Search verified coupons, promo codes, deals & cashback offers on CouponDine. Find discounts for fashion, electronics, SaaS tools, travel & more.';
  
  return {
    title,
    description,
    keywords: 'coupon search, promo codes, deals search, discount codes, cashback, CouponDine',
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'CouponDine',
      images: [{ url: `${baseUrl}/coupons-hero.jpg`, width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/coupons-hero.jpg`],
    },
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
  };
}

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params?.q?.toLowerCase()?.trim() || '';

  if (!query) {
    return (
      <div className="max-w-6xl mt-20 mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Search Coupons</h1>
        <p className="text-xl text-gray-600 mb-8">Enter a keyword like hosting or amazon to find deals!</p>
        <Link href="/" className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition">
          Browse All Deals
        </Link>
      </div>
    );
  }

  const [couponsPromise, categoriesPromise, brandsPromise] = await Promise.allSettled([
    getCoupons(100),
    getCategories(),
    getBrands(),
  ]);

  const coupons: Coupon[] = couponsPromise.status === 'fulfilled' ? couponsPromise.value : [];
  const categories: Category[] = categoriesPromise.status === 'fulfilled' ? categoriesPromise.value : [];
  const brands: Brand[] = brandsPromise.status === 'fulfilled' ? brandsPromise.value : [];

  // Filter coupons
  const filteredCoupons = coupons.filter((coupon) => {
    const title = decode(coupon.title.rendered || '').toLowerCase();
    const excerpt = decode(coupon.excerpt?.rendered || '').toLowerCase();
    return title.includes(query) || excerpt.includes(query);
  });

  // Filter categories
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(query) || cat.slug.includes(query)
  );

  // Filter brands
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(query) || brand.slug.includes(query)
  );

  const resultsCount = filteredCoupons.length + filteredCategories.length + filteredBrands.length;

  return (
    <div className="max-w-6xl mt-20 mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
          {resultsCount} Results for {params.q}
        </h1>
        <p className="text-lg text-gray-600">Coupons, brands & categories matching your search.</p>
      </div>

      {/* Matching Categories */}
      {filteredCategories.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Categories ({filteredCategories.length})</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border hover:shadow-xl transition-all hover:bg-orange-50"
              >
                <h4 className="font-semibold text-xl text-gray-800 group-hover:text-orange-600 mb-2">{cat.name}</h4>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Matching Brands */}
      {filteredBrands.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Brands ({filteredBrands.length})</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brand/${brand.slug}`}
                className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border hover:shadow-xl transition-all hover:bg-indigo-50"
              >
                <h4 className="font-semibold text-xl text-gray-800 group-hover:text-indigo-600 mb-2">{brand.name}</h4>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Matching Coupons */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Coupons & Deals ({filteredCoupons.length})</h2>
        {filteredCoupons.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCoupons.slice(0, 12).map((coupon) => (
              <Link
                key={coupon.id}
                href={`/coupon/${coupon.slug}`}
                className="group bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  {coupon._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <Image
                      src={coupon._embedded['wp:featuredmedia'][0].source_url}
                      alt={coupon.title.rendered}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                  {coupon.acf?.discount_amount && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {coupon.acf.discount_amount} OFF
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold line-clamp-2 mb-3" dangerouslySetInnerHTML={{ __html: coupon.title.rendered }} />
                  {coupon.excerpt?.rendered && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: coupon.excerpt.rendered }} />
                  )}
                  {coupon.acf?.coupon_code && (
                    <div className="bg-gray-100 p-3 rounded-lg mb-4">
                      <strong className="text-sm block mb-1">Code:</strong>
                      <code className="bg-white px-3 py-1 rounded font-mono text-orange-600 font-semibold">
                        {coupon.acf.coupon_code}
                      </code>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">View Deal</span>
                    <span className="text-orange-600 font-semibold text-lg">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-12">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No Coupons Found</h3>
            <p className="text-gray-600 mb-8">Try  hosting coupon or amazon deals for better results.</p>
            <Link href="/" className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-xl hover:shadow-lg font-semibold">
              All Coupons
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

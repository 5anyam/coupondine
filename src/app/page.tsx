import { getCoupons } from '@/lib/wordpress';
import CouponCard from '@/components/CouponCard';
import { Coupon } from '@/types';

export default async function Home() {
  const coupons: Coupon[] = await getCoupons(20);
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Save Money with Verified Coupons
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Discover exclusive discount codes and deals on top brands
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-full p-2 flex items-center shadow-lg">
              <input
                type="text"
                placeholder="Search for brands, stores, or products..."
                className="flex-1 px-6 py-3 text-gray-800 outline-none"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Active Coupons</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600">Top Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">$2M+</div>
              <div className="text-gray-600">Saved by Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Coupons Grid */}
      <main className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            🔥 Trending Deals
          </h2>
          <button className="text-blue-600 font-semibold hover:underline">
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </main>
    </>
  );
}

// src/app/page.tsx
import Link from 'next/link';
import { getCoupons, getPopularBrands, getStats } from '@/lib/wordpress';
import FeaturedStores from '@/components/featuredStores';
import CouponCard from '@/components/CouponCard';
import { Metadata } from 'next';

// 1. Dynamic SEO Metadata for 2026 Standards
export const metadata: Metadata = {
  title: 'Best Coupons & Promo Codes 2026 | Save Money Online',
  description: 'Verified discount codes for Amazon, Flipkart, Myntra and 500+ top brands. Save up to 80% on your online shopping today.',
};

export default async function Home() {
  // 2. Parallel Data Fetching for Maximum Speed
  const [coupons, brands, stats] = await Promise.all([
    getCoupons(12),       // Fetch 12 latest coupons
    getPopularBrands(12), // Fetch 12 top brands
    getStats()            // Fetch site statistics
  ]);

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative bg-slate-900 text-white overflow-hidden pb-32 pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-300">
              {stats.totalCoupons}+ Active Coupons Verified Today
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Stop Paying <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Full Price.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Our AI automatically finds and tests coupon codes for thousands of stores so you do not have to.
          </p>
          
          {/* Search Bar Component */}
          <div className="max-w-xl mx-auto mb-12">
            <form action="/search" className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              <div className="relative flex items-center bg-white rounded-xl p-2 shadow-2xl">
                <svg className="w-6 h-6 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  name="q"
                  placeholder="Search stores (e.g. Amazon, Nike)..."
                  className="w-full px-4 py-3 text-gray-800 outline-none text-lg bg-transparent placeholder-gray-400"
                />
                <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-[1.02]">
                  Search
                </button>
              </div>
            </form>
            
            {/* Quick Links */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-500">
              <span>Trending:</span>
              <Link href="/brand/amazon" className="hover:text-blue-400 transition underline decoration-slate-700">Amazon</Link>
              <Link href="/brand/flipkart" className="hover:text-blue-400 transition underline decoration-slate-700">Flipkart</Link>
              <Link href="/brand/myntra" className="hover:text-blue-400 transition underline decoration-slate-700">Myntra</Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 max-w-4xl mx-auto border-t border-slate-800 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stats.totalCoupons}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Coupons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stats.totalBrands}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Stores</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">$2M+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Saved</div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-24 relative z-20 pb-20">
        
        {/* ==================== FEATURED BRANDS ==================== */}
        <section className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-10 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Featured Stores</h2>
              <p className="text-slate-500 mt-1">Top brands with the highest discounts this week</p>
            </div>
            <Link 
              href="/brands" 
              className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 group text-sm"
            >
              View all brands 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          
          <FeaturedStores stores={brands} />
        </section>

        {/* ==================== LATEST COUPONS ==================== */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-900">Trending Deals Today</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p>No active coupons found. Our scrapers are running...</p>
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center">
             <Link 
               href="/latest" 
               className="inline-flex items-center justify-center px-8 py-3 border border-slate-200 text-slate-700 font-medium rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all focus:ring-4 focus:ring-slate-100"
             >
               Load More Offers
             </Link>
          </div>
        </section>

        {/* ==================== SEO CONTENT (Bottom) ==================== */}
        <section className="mt-24 border-t border-slate-100 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Trust CouponDine?</h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              We are not just another coupon site. Our proprietary technology monitors thousands of brands in real-time. 
              When a code stops working, we remove it instantly. Join over 1 million shoppers who save with us every month.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-2">✅ Verified Codes</h3>
                <p className="text-sm text-slate-500">Every code is tested by hand and by our automated bots daily.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-2">⚡ Real-time Updates</h3>
                <p className="text-sm text-slate-500">New deals appear on our site within minutes of being released.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-2">🎁 Exclusive Offers</h3>
                <p className="text-sm text-slate-500">We partner directly with brands to get you deals found nowhere else.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

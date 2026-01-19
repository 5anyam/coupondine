import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://coupondine.com';
  const canonicalUrl = `${baseUrl}/about`;
  
  const title = 'About CouponDine – Your Trusted Coupons & Deals Hub';
  const description = 'Discover how CouponDine helps you find verified coupons, promo codes & exclusive deals. Compare offers from top brands for shopping, SaaS, travel & more.';
  
  return {
    title,
    description,
    keywords: 'coupons, deals, promo codes, discounts, cashback, affiliate deals, CouponDine',
    authors: [{ name: 'CouponDine' }],
    creator: 'CouponDine',
    publisher: 'CouponDine',
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'CouponDine',
      images: [{ url: `${baseUrl}/coupondine-hero.jpg`, width: 1200, height: 630, alt: 'CouponDine coupons and deals' }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/coupondine-hero.jpg`],
      creator: '@coupondine',
    },
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    category: 'Coupons & Deals',
  };
}

export default function AboutPage() {
  return (
    <main className="max-w-6xl mt-24 lg:mt-0 mx-auto px-4 py-12 space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
          About CouponDine
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Your go-to platform for verified coupons, exclusive promo codes, cashback deals & affiliate partnerships. Save big on shopping, SaaS tools, travel & more – nationwide & global.
        </p>
      </section>
      
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image 
            src="/coupons-comparison.jpg" 
            alt="Coupon comparison" 
            width={600} 
            height={400} 
            className="rounded-2xl shadow-md object-cover w-full h-auto" 
            priority 
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Deals Discovery Hub</h2>
          <p className="text-gray-700 leading-relaxed">
            As a leading coupon affiliate platform, we aggregate & verify deals from top brands. Compare discounts, codes, cashback & exclusive offers so you always get the best savings.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-orange-50 to-yellow-50 p-12 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Why CouponDine?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Verified Deals</h3>
            <p className="text-gray-600">Hand-tested coupons & exclusive codes from 1000+ brands.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">💰</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Cashback + Savings</h3>
            <p className="text-gray-600">Compare rates, track cashback & stack discounts for max savings.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Affiliate Partnerships</h3>
            <p className="text-gray-600">Connect with brands for exclusive deals & commissions.</p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            To be the most trusted hub for coupons, deals & savings. We compare offers, verify codes & deliver unbiased insights – no hidden agendas, just real value.
          </p>
          <ul className="space-y-2 text-gray-600 list-disc list-inside">
            <li>Honest comparisons & user reviews</li>
            <li>Exclusive partnerships with top brands</li>
            <li>Smart matching for your shopping needs</li>
          </ul>
        </div>
        <div>
          <Image 
            src="/deals-vision.jpg" 
            alt="Deals vision" 
            width={600} 
            height={400} 
            className="rounded-2xl shadow-md object-cover w-full h-auto" 
          />
        </div>
      </section>

      <section className="bg-white p-12 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          <div className="space-y-3">
            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto text-2xl">🔍</div>
            <h4 className="font-semibold">Search Deals</h4>
            <p className="text-sm text-gray-600">Browse verified coupons</p>
          </div>
          <div className="space-y-3">
            <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto text-2xl">📱</div>
            <h4 className="font-semibold">Grab Code</h4>
            <p className="text-sm text-gray-600">Copy exclusive promo</p>
          </div>
          <div className="space-y-3">
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto text-2xl">🛒</div>
            <h4 className="font-semibold">Shop & Save</h4>
            <p className="text-sm text-gray-600">Apply at checkout</p>
          </div>
          <div className="space-y-3">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto text-2xl">💸</div>
            <h4 className="font-semibold">Earn Cashback</h4>
            <p className="text-sm text-gray-600">Track & redeem rewards</p>
          </div>
          <div className="space-y-3">
            <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto text-2xl">⭐</div>
            <h4 className="font-semibold">Rate & Review</h4>
            <p className="text-sm text-gray-600">Help others save</p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image 
            src="/why-coupondine.jpg" 
            alt="Why CouponDine" 
            width={600} 
            height={400} 
            className="rounded-2xl shadow-md object-cover w-full h-auto" 
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Trusted by Shoppers</h2>
          <p className="text-gray-700 leading-relaxed">
            Join thousands saving with our verified deals. From daily discounts to exclusive affiliate offers, we make smart shopping simple.
          </p>
        </div>
      </section>

      <section className="text-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-12 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold mb-6">Ready to Save Big?</h2>
        <p className="text-xl mb-8 opacity-90">Find your next deal today – coupons, cashback & more!</p>
        <Link 
          href="/coupons" 
          className="bg-white text-orange-500 px-12 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all inline-block"
        >
          Explore Deals Now
        </Link>
      </section>
    </main>
  );
}

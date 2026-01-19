import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-2xl px-3 py-1 rounded-lg">
              CD
            </div>
            <span className="text-xl font-bold text-gray-800">
              Coupon<span className="text-blue-600">Dine</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Home
            </Link>
            <Link href="/brands" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Brands
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Categories
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Blog
            </Link>
          </nav>

          {/* CTA Button */}
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition">
            Submit Deal
          </button>
        </div>
      </div>
    </header>
  );
}

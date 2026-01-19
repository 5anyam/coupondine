import Link from 'next/link';
import { Brand } from '@/types';

interface BrandCardProps {
  brand: Brand;
  couponCount?: number;
}

export default function BrandCard({ brand, couponCount = 0 }: BrandCardProps) {
  const brandLogo = brand.acf?.brand_logo?.url;
  
  return (
    <Link 
      href={`/brand/${brand.slug}`}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center"
    >
      {/* Brand Logo */}
      {brandLogo ? (
        <div className="h-20 w-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <img 
            src={brandLogo} 
            alt={brand.name} 
            className="max-h-16 w-auto object-contain"
          />
        </div>
      ) : (
        <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <span className="text-white text-2xl font-bold">
            {brand.name.charAt(0)}
          </span>
        </div>
      )}

      {/* Brand Name */}
      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
        {brand.name}
      </h3>

      {/* Coupon Count */}
      {couponCount > 0 && (
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z"/>
          </svg>
          {couponCount} {couponCount === 1 ? 'Coupon' : 'Coupons'}
        </div>
      )}

      {/* View Button */}
      <div className="mt-4 text-blue-600 font-semibold text-sm group-hover:underline">
        View Deals →
      </div>
    </Link>
  );
}

'use client';
import { Coupon } from '@/types';
import { useState } from 'react';

export default function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false);
  
  const brand = coupon._embedded?.['wp:term']?.[0]?.[0];
  const brandLogo = brand?.acf?.brand_logo?.url;
  
  const handleCopyCode = () => {
    if (coupon.acf.coupon_code) {
      navigator.clipboard.writeText(coupon.acf.coupon_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    window.open(coupon.acf.affiliate_link, '_blank');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
      {/* Verified Badge */}
      {coupon.acf.is_verified && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          Verified
        </div>
      )}

      {/* Brand Logo */}
      {brandLogo && (
        <div className="mb-4 h-16 flex items-center">
          <img src={brandLogo} alt={brand.name} className="h-12 w-auto object-contain" />
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition">
        {coupon.title.rendered}
      </h3>
      
      {/* Description */}
      {coupon.acf.short_desc && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {coupon.acf.short_desc}
        </p>
      )}

      {/* Discount Badge */}
      {coupon.acf.discount_amount && (
        <div className="mb-4">
          <span className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md">
            🎉 Save {coupon.acf.discount_amount}
          </span>
        </div>
      )}
      
      {/* CTA Button */}
      {coupon.acf.coupon_code ? (
        <button
          onClick={handleCopyCode}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          {copied ? (
            <span className="flex items-center justify-center gap-2">
              ✓ Code Copied!
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              Copy Code: {coupon.acf.coupon_code}
            </span>
          )}
        </button>
      ) : (
        <a
          href={coupon.acf.affiliate_link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
        >
          Get Deal →
        </a>
      )}

      {/* Expiry */}
      {coupon.acf.expiry_date && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          Expires: {new Date(coupon.acf.expiry_date).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

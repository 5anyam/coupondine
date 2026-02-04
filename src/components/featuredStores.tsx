import Link from 'next/link';
import Image from 'next/image';
import { Brand } from '@/types';

export default function FeaturedStores({ stores }: { stores: Brand[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {stores.map((store) => {
        // ✅ Type-safe URL extraction logic
        // Check if acf and brand_logo exist and are correct types
        let logoUrl: string | null = null;

        if (store.acf?.brand_logo?.url) {
            logoUrl = store.acf.brand_logo.url;
        }

        // Check if URL is valid (starts with http/https)
        const hasValidImage = typeof logoUrl === 'string' && 
                             (logoUrl.startsWith('http://') || logoUrl.startsWith('https://'));

        return (
          <Link 
            href={`/brand/${store.slug}`} 
            key={store.id}
            className="group bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="relative w-16 h-16 mb-3 flex items-center justify-center">
              {hasValidImage && logoUrl ? (
                // ✅ Option A: Show Logo if available
                <div className="relative w-full h-full">
                  <Image 
                    src={logoUrl} 
                    alt={`${store.name} logo`} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-1"
                  />
                </div>
              ) : (
                // ✅ Option B: Fallback to First Letter
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-xl font-bold text-blue-600 uppercase">
                    {store.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <span className="font-semibold text-gray-700 text-sm text-center group-hover:text-blue-600 line-clamp-1 w-full">
              {store.name}
            </span>
            
            <span className="text-xs text-gray-400 mt-1">
              {store.count || 0} Offers
            </span>
          </Link>
        );
      })}
    </div>
  );
}

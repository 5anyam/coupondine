'use client';

import { useState, useMemo } from 'react';
import { Brand } from '@/types';
import BrandCard from '@/components/BrandsCard';

interface BrandWithCount extends Brand {
  couponCount: number;
}

export default function BrandsPageClient({ brands }: { brands: BrandWithCount[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'popular'>('name');

  // Filter and Sort
  const filteredBrands = useMemo(() => {
    const filtered = brands.filter(brand =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.couponCount - a.couponCount);
    }

    return filtered;
  }, [brands, searchQuery, sortBy]);

  // Get alphabet index
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const availableLetters = new Set(
    brands.map(b => b.name.charAt(0).toUpperCase())
  );

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Group brands by first letter
  const brandsByLetter = useMemo(() => {
    const grouped: Record<string, BrandWithCount[]> = {};
    filteredBrands.forEach(brand => {
      const letter = brand.name.charAt(0).toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(brand);
    });
    return grouped;
  }, [filteredBrands]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Browse All Brands
          </h1>
          <p className="text-xl text-blue-100 text-center mb-8">
            Discover discount codes from {brands.length}+ top brands
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 sticky top-20 z-40">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative w-full">
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'popular')}
              className="px-6 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
            >
              <option value="name">Sort A-Z</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* Results Count */}
            <div className="text-gray-600 font-semibold whitespace-nowrap">
              {filteredBrands.length} Brands
            </div>
          </div>
        </div>

        {/* Alphabet Filter (Desktop) */}
        {sortBy === 'name' && (
          <div className="hidden lg:block mb-8">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {alphabet.map(letter => (
                  <button
                    key={letter}
                    onClick={() => scrollToLetter(letter)}
                    disabled={!availableLetters.has(letter)}
                    className={`w-10 h-10 rounded-lg font-semibold transition ${
                      availableLetters.has(letter)
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer'
                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Brands Grid */}
        {sortBy === 'name' ? (
          // Grouped by Letter
          Object.keys(brandsByLetter).sort().map(letter => (
            <div key={letter} id={`letter-${letter}`} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center">
                  {letter}
                </span>
                <span>{letter}</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {brandsByLetter[letter].map(brand => (
                  <BrandCard 
                    key={brand.id} 
                    brand={brand} 
                    couponCount={brand.couponCount}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          // Simple Grid
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBrands.map(brand => (
              <BrandCard 
                key={brand.id} 
                brand={brand} 
                couponCount={brand.couponCount}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredBrands.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No brands found</h3>
            <p className="text-gray-500">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
}

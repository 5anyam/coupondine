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
  const [activeLetter, setActiveLetter] = useState<string>('');

  // Filter and Sort Logic
  const filteredBrands = useMemo(() => {
    const filtered = brands.filter(brand =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.couponCount || 0) - (a.couponCount || 0));
    }

    return filtered;
  }, [brands, searchQuery, sortBy]);

  // Alphabet Logic
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const availableLetters = useMemo(() => 
    new Set(brands.map(b => b.name.charAt(0).toUpperCase())), 
  [brands]);

  // Grouping Logic
  const brandsByLetter = useMemo(() => {
    const grouped: Record<string, BrandWithCount[]> = {};
    if (sortBy === 'name' && !searchQuery) {
      filteredBrands.forEach(brand => {
        const letter = brand.name.charAt(0).toUpperCase();
        if (!grouped[letter]) grouped[letter] = [];
        grouped[letter].push(brand);
      });
    }
    return grouped;
  }, [filteredBrands, sortBy, searchQuery]);

  // Enhanced Scroll Function
  const scrollToLetter = (letter: string) => {
    setActiveLetter(letter);
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      // Offset for sticky header
      const offset = 180; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. Modern Hero Section with Pattern */}
      <section className="bg-slate-900 text-white pt-24 pb-20 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-6 tracking-wide uppercase">
            Official Directory
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Browse All Stores
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Find active coupons and discount codes for over <span className="text-white font-semibold">{brands.length}+</span> verified brands.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20 pb-20">
        
        {/* 2. Glassmorphism Sticky Control Bar */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-4 mb-8 sticky top-4 z-40">
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search brands (e.g. Nike, Amazon)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Sort Toggle (Better than Select) */}
            <div className="bg-slate-100 p-1 rounded-xl flex shrink-0 w-full md:w-auto">
              <button
                onClick={() => setSortBy('name')}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  sortBy === 'name'
                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                A-Z Sort
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  sortBy === 'popular'
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Popular
              </button>
            </div>
          </div>

          {/* 3. Horizontal Scrollable Alphabet (Mobile Friendly) */}
          {sortBy === 'name' && !searchQuery && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 mask-gradient-right">
                {alphabet.map(letter => {
                  const isDisabled = !availableLetters.has(letter);
                  const isActive = activeLetter === letter;

                  return (
                    <button
                      key={letter}
                      onClick={() => scrollToLetter(letter)}
                      disabled={isDisabled}
                      className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-md scale-105'
                          : isDisabled 
                            ? 'text-slate-300 cursor-not-allowed bg-transparent'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Brands Content */}
        <div className="min-h-[50vh]">
          {sortBy === 'name' && !searchQuery ? (
            // A-Z Grouped View
            Object.keys(brandsByLetter).sort().map(letter => (
              <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-48">
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xl font-bold border border-blue-600/20">
                    {letter}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  {brandsByLetter[letter].map(brand => (
                    <BrandCard key={brand.id} brand={brand} couponCount={brand.couponCount} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Search/Popular View
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {filteredBrands.map(brand => (
                <BrandCard key={brand.id} brand={brand} couponCount={brand.couponCount} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredBrands.length === 0 && (
            <div className="text-center py-24">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No brands match {searchQuery}</h3>
              <p className="text-slate-500 mb-6">Try checking your spelling or browse the A-Z list.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSortBy('name');}}
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

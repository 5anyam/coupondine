import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const categoryImage = category.acf?.category_image?.url;
  const categoryIcon = category.acf?.category_icon;
  
  return (
    <Link 
      href={`/category/${category.slug}`}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
    >
      {/* Icon/Image */}
      <div className="mb-4 h-16 flex items-center justify-center">
        {categoryImage ? (
          <img 
            src={categoryImage} 
            alt={category.name} 
            className="h-14 w-14 object-contain group-hover:scale-110 transition-transform"
          />
        ) : (
          <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-white text-2xl">
              {categoryIcon || '📁'}
            </span>
          </div>
        )}
      </div>

      {/* Category Name */}
      <h3 className="text-lg font-bold text-gray-800 mb-2 text-center group-hover:text-blue-600 transition">
        {category.name}
      </h3>

      {/* Description */}
      {category.description && (
        <p className="text-sm text-gray-600 mb-3 text-center line-clamp-2">
          {category.description.replace(/<[^>]*>/g, '')}
        </p>
      )}

      {/* Count */}
      <div className="flex items-center justify-center gap-2 text-sm text-blue-600 font-semibold">
        <span>{category.count} Brands</span>
        <span>→</span>
      </div>
    </Link>
  );
}

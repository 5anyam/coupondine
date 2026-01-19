import { getCategories } from '@/lib/wordpress';
import { Category } from '@/types';
import CategoryCard from '@/components/CategoryCard';

export const metadata = {
  title: 'Browse by Categories - CouponDine',
  description: 'Explore coupons and deals by category',
};

export default async function CategoriesPage() {
  const categories: Category[] = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Browse by Categories
          </h1>
          <p className="text-xl text-blue-100 text-center">
            Find deals from {categories.length}+ categories
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No categories found</p>
          </div>
        )}
      </div>
    </div>
  );
}

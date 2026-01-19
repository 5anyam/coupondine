// lib/queries.ts
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://cms.coupondine.com/wp-json/wp/v2';

interface WPPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  yoast_head_json?: {
    og_image?: Array<{
      url: string;
    }>;
  };
  acf?: {
    coupon_code?: string;
    discount_amount?: string;
    affiliate_link?: string;
  };
}

interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

// Fetch all coupons (posts - assume 'coupon' post type or filter)
export async function getAllPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?per_page=100&_embed=wp:featuredmedia&acf_format=standard`, {
      next: { revalidate: 3600 }, // 1 hour cache
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    const posts: WPPost[] = await res.json();
    return posts;
  } catch (error) {
    console.error('getAllPosts error:', error);
    return [];
  }
}

// Fetch all categories
export async function getAllCategories(): Promise<WPCategory[]> {
  try {
    const res = await fetch(`${WP_API_URL}/categories?per_page=100`, {
      next: { revalidate: 3600 }, // 1 hour cache
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const categories: WPCategory[] = await res.json();
    return categories.map(cat => ({
      ...cat,
      count: cat.count || 0,
    }));
  } catch (error) {
    console.error('getAllCategories error:', error);
    return [];
  }
}

// Bonus: Get coupons by category slug
export async function getPostsByCategory(slug: string): Promise<WPPost[]> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?categories_slug=${slug}&per_page=50&_embed=wp:featuredmedia&acf_format=standard`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error('Failed to fetch category posts');
    return await res.json();
  } catch (error) {
    console.error('getPostsByCategory error:', error);
    return [];
  }
}

// Bonus: Get coupon by slug
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed=wp:featuredmedia&acf_format=standard`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    const posts: WPPost[] = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.error('getPostBySlug error:', error);
    return null;
  }
}

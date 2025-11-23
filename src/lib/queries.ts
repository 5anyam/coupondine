const baseUrl = "https://static.saynopest.com";
import { ExtendedPost, Category, Author } from "@/lib/types";

const revalidateTime: number = 300; // 5 minutes cache

export async function getAllPosts(
  pageNumber: number = 1,
  perPage: number = 100,
  searchTerm: string = "",
  categories: number = 0
): Promise<{ posts: ExtendedPost[]; totalPages: number }> {
  const params = new URLSearchParams({
    per_page: perPage.toString(),
    page: pageNumber.toString(),
    search: searchTerm,
    _embed: "true",
    status: "publish", // ✅ FIX 1: Only published posts
    orderby: "date", // ✅ FIX 2: Order by date
    order: "desc", // ✅ FIX 3: Latest first (descending)
  });
  
  if (categories !== 0) {
    params.set("categories", categories.toString());
  }

  const response = await fetch(`${baseUrl}/wp-json/wp/v2/posts?${params.toString()}`, {
    next: {
      revalidate: revalidateTime,
      tags: ['blog-posts'], // Optional: for on-demand revalidation
    },
  });

  if (!response.ok) {
    console.error(`Error fetching page ${pageNumber}: ${response.status}`);
    return { posts: [], totalPages: 1 };
  }

  const posts = await response.json();
  const totalPages = parseInt(response.headers.get("X-WP-TotalPages") ?? "1");

  return { posts, totalPages };
}

export async function getPostBySlug(slug: string): Promise<ExtendedPost | null> {
  const response = await fetch(
    `${baseUrl}/wp-json/wp/v2/posts?_embed=true&slug=${slug}&status=publish`, // ✅ Only published
    {
      next: {
        revalidate: revalidateTime,
      },
    }
  );
  const post = await response.json();
  return post[0];
}

export async function getAuthorById(id: number): Promise<Author | null> {
  const response = await fetch(`${baseUrl}/wp-json/wp/v2/users/${id}`);
  const author: Author = await response.json();
  return author;
}

export async function getCategoriesByIds(ids: number[]): Promise<Category[]> {
  const response = await fetch(`${baseUrl}/wp-json/wp/v2/categories?include=${ids.join(",")}`);
  const categories: Category[] = await response.json();
  return categories;
}

export async function getCategoryBySlug(slug: string) {
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/categories?slug=${slug}`);
  const data = await res.json();
  return data[0] || null;
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${baseUrl}/wp-json/wp/v2/categories`);
  const data = await response.json();
  return data;
}

export async function getPostsByCategory(
  categoryId: number, 
  limit: number = 10
): Promise<ExtendedPost[]> {
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${limit}&_embed&status=publish&orderby=date&order=desc`, // ✅ Fixed
    {
      next: {
        revalidate: revalidateTime,
      },
    }
  );
  if (!res.ok) {
    console.error("Failed to fetch posts by category:", await res.text());
    return [];
  }
  const posts: ExtendedPost[] = await res.json();
  return posts;
}

export async function getAllCategories() {
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/categories?per_page=100`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

// For sitemap - fetch ALL published posts
export async function getAllPostsForSitemap(): Promise<ExtendedPost[]> {
  let currentPage = 1;
  let allPosts: ExtendedPost[] = [];
  let totalPages = 1;

  do {
    const params = new URLSearchParams({
      per_page: "100",
      page: currentPage.toString(),
      _embed: "true",
      status: "publish", // ✅ Only published
      orderby: "date", // ✅ Latest first
      order: "desc",
    });

    const response = await fetch(`${baseUrl}/wp-json/wp/v2/posts?${params.toString()}`, {
      next: {
        revalidate: revalidateTime,
      },
    });

    if (!response.ok) {
      console.error(`Error fetching page ${currentPage}: ${response.status}`);
      break;
    }

    const posts = await response.json();
    const pageTotal = parseInt(response.headers.get("X-WP-TotalPages") ?? "1");
    allPosts = [...allPosts, ...posts];
    totalPages = pageTotal;

    currentPage++;
  } while (currentPage <= totalPages);

  return allPosts;
}

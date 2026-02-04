// src/types/index.ts

export interface Coupon {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  // ✅ ACF fields matched with your WP setup
  acf: {
    coupon_code?: string;
    discount_amount?: string;
    affiliate_link?: string; // Made optional to prevent crashes if empty
    expiry_date?: string;
    is_verified?: boolean;
    is_featured?: boolean;
    short_desc?: string;
    store_name?: string;     // Added commonly used field
  };
  _embedded?: {
    // ✅ WP returns terms as Array of Arrays (Brands mixed with Categories)
    'wp:term'?: Array<Array<Brand | Category>>; 
    'wp:featuredmedia'?: Media[];
  };
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  count?: number; // ✅ Optional is safer for embedded data
  description?: string; // Optional because embedded terms usually lack this
  link?: string;
  acf?: {
    brand_logo?: {
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };
    brand_website?: string;
    brand_color?: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count?: number; // ✅ Optional
  description?: string;
  link?: string;
  acf?: {
    category_icon?: string;
    category_image?: {
      url: string;
    };
  };
}

export interface Media {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width: number;
    height: number;
  };
}

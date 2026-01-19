export interface Coupon {
    id: number;
    slug: string;
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
    };
    excerpt?: {  // ✅ Added excerpt (WP standard)
      rendered: string;
    };
    acf: {
      coupon_code?: string;
      discount_amount?: string;
      affiliate_link: string;
      expiry_date?: string;
      is_verified?: boolean;
      is_featured?: boolean;
      short_desc?: string;
    };
    _embedded?: {
      'wp:term'?: Brand[][];
      'wp:featuredmedia'?: Media[];
    };
  }
  
  export interface Brand {
    id: number;
    name: string;
    slug: string;
    acf?: {
      brand_logo?: {
        url: string;
        alt: string;
      };
      brand_website?: string;
      brand_color?: string;
    };
  }
  
  export interface Media {
    source_url: string;
    alt_text: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    count: number;
    acf?: {
      category_icon?: string;
      category_image?: {
        url: string;
      };
    };
  }
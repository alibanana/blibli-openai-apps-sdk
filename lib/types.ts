export interface ProductStore {
  name: string;
  official?: boolean;
  city?: string;
}

export interface Product {
  id: string;
  title: string;
  brand?: string;
  category: string;
  tags?: string[];
  image: string;
  url: string;
  price: number;
  wasPrice?: number;
  discountPct?: number;
  rating?: number;
  sold?: number;
  freeShipping?: boolean;
  store?: ProductStore;
}

export type SortKey = "relevance" | "price-asc" | "price-desc" | "rating" | "sold";

export interface ProductQuery {
  query?: string;
  category?: string;
  sort?: SortKey;
  limit?: number;
  offset?: number;
}

export interface ProductListResult {
  items: Product[];
  total: number;
}

export interface Category {
  slug: string;
  label: string;
  count: number;
}

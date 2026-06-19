import catalog from "@/data/products.json";
import type { Product, ProductQuery, ProductListResult, SortKey, Category } from "./types";

const PRODUCTS: Product[] = catalog as Product[];
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 24;

const norm = (s: string) => s.toLowerCase().normalize("NFKD").trim();

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCategories(): Category[] {
  const map = new Map<string, number>();
  for (const p of PRODUCTS) map.set(p.category, (map.get(p.category) ?? 0) + 1);
  return [...map].map(([slug, count]) => ({ slug, label: labelize(slug), count }));
}

function labelize(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function scoreMatch(p: Product, terms: string[]): number {
  if (terms.length === 0) return 1;
  const hay = {
    title: norm(p.title),
    brand: norm(p.brand ?? ""),
    category: norm(p.category),
    tags: norm((p.tags ?? []).join(" ")),
  };
  let score = 0;
  for (const t of terms) {
    if (hay.title.includes(t)) score += 4;
    else if (hay.brand.includes(t)) score += 3;
    else if (hay.tags.includes(t)) score += 2;
    else if (hay.category.includes(t)) score += 1;
    else return 0; // AND semantics: every term must hit somewhere
  }
  return score;
}

function sortItems(
  items: Product[],
  sort: SortKey,
  scores?: Map<string, number>
): Product[] {
  const by = [...items];
  switch (sort) {
    case "price-asc":
      by.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      by.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      by.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case "sold":
      by.sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0));
      break;
    case "relevance":
    default:
      if (scores)
        by.sort(
          (a, b) =>
            scores.get(b.id)! - scores.get(a.id)! || (b.sold ?? 0) - (a.sold ?? 0)
        );
      else by.sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0));
  }
  return by;
}

function paginate(
  items: Product[],
  limit = DEFAULT_LIMIT,
  offset = 0
): ProductListResult {
  const lim = Math.min(Math.max(1, limit), MAX_LIMIT);
  return { items: items.slice(offset, offset + lim), total: items.length };
}

export function listProducts(q: ProductQuery = {}): ProductListResult {
  let items = PRODUCTS;
  if (q.category) items = items.filter((p) => p.category === norm(q.category!));
  items = sortItems(items, q.sort ?? "sold");
  return paginate(items, q.limit, q.offset);
}

export function searchProducts(q: ProductQuery): ProductListResult {
  const terms = norm(q.query ?? "")
    .split(/\s+/)
    .filter(Boolean);
  const scores = new Map<string, number>();
  let items = PRODUCTS.filter((p) => {
    const s = scoreMatch(p, terms);
    if (s > 0) scores.set(p.id, s);
    return s > 0;
  });
  if (q.category) items = items.filter((p) => p.category === norm(q.category!));
  items = sortItems(items, q.sort ?? "relevance", scores);
  return paginate(items, q.limit, q.offset);
}

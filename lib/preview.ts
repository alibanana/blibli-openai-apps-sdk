import catalog from "@/data/products.json";
import type { Product } from "./types";

export const previewOutput = {
  kind: "search" as const,
  title: 'Hasil pencarian "sepatu pria"',
  query: "sepatu pria",
  sort: "relevance" as const,
  total: (catalog as Product[]).length,
  products: (catalog as Product[]).slice(0, 8),
};

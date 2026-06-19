import type { Product, SortKey } from "./types";

export const WIDGET_URI = "ui://widget/blibli-products.html";

export const widgetMeta = {
  "openai/outputTemplate": WIDGET_URI,
  "openai/toolInvocation/invoking": "Mencari produk Blibli…",
  "openai/toolInvocation/invoked": "Produk Blibli siap",
  "openai/widgetAccessible": false,
  "openai/resultCanProduceWidget": true,
} as const;

export const resourceMeta = {
  "openai/widgetDescription":
    "Blibli product results — image-first cards with price, discount, rating and free-shipping badges.",
  "openai/widgetPrefersBorder": true,
} as const;

export function narrate(title: string, total: number) {
  return total === 0
    ? `Tidak ada produk untuk ${title}.`
    : `Menampilkan ${total} produk untuk ${title}.`;
}

export function listPayload(args: {
  category: string | null;
  sort: SortKey;
  total: number;
  products: Product[];
}) {
  return {
    kind: "list" as const,
    title: args.category ? labelOf(args.category) : "Produk pilihan",
    category: args.category,
    sort: args.sort,
    total: args.total,
    products: args.products,
  };
}

export function searchPayload(args: {
  query: string;
  sort: SortKey;
  total: number;
  products: Product[];
}) {
  return {
    kind: "search" as const,
    title: `Hasil pencarian "${args.query}"`,
    query: args.query,
    sort: args.sort,
    total: args.total,
    products: args.products,
  };
}

const labelOf = (slug: string) =>
  slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

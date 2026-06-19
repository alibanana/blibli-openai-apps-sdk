import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  fullscreen?: boolean;
}

export function ProductGrid({ products, fullscreen }: ProductGridProps) {
  return (
    <div
      className={`grid gap-3 ${fullscreen ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}
    >
      {products.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}

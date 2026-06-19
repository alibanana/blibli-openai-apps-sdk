"use client";
import { useWidgetProps, useMaxHeight, useDisplayMode, useIsChatGptApp } from "./hooks";
import type { Product, SortKey } from "@/lib/types";
import { Brand } from "./components/Brand";
import { ResultsHeader } from "./components/ResultsHeader";
import { ProductGrid } from "./components/ProductGrid";
import { EmptyState } from "./components/EmptyState";
import { previewOutput } from "@/lib/preview";

type ToolOutput = {
  kind: "list" | "search";
  title: string;
  query?: string;
  category?: string | null;
  sort: SortKey;
  total: number;
  products: Product[];
};

export default function Widget() {
  const live = useWidgetProps<ToolOutput>();
  const inChatGpt = useIsChatGptApp();
  const maxHeight = useMaxHeight() ?? undefined;
  const displayMode = useDisplayMode();

  const data = live ?? (!inChatGpt ? previewOutput : null);

  return (
    <div
      className="mx-auto w-full max-w-5xl p-3 sm:p-4 text-[--color-ink]"
      style={{ maxHeight, overflowY: "auto" }}
    >
      <div className="rounded-[8px] border border-[--color-muted] bg-[--color-surface] p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between">
          <Brand />
          {!inChatGpt && (
            <span className="text-xs text-[--color-ink]/50">preview</span>
          )}
        </div>

        {!data ? (
          <EmptyState
            title="Mulai dari ChatGPT"
            subtitle="Minta daftar atau cari produk Blibli."
          />
        ) : data.products.length === 0 ? (
          <EmptyState
            title="Tidak ada hasil"
            subtitle={data.query ? `untuk "${data.query}"` : undefined}
          />
        ) : (
          <>
            <ResultsHeader
              title={data.title}
              total={data.total}
              sort={data.sort}
            />
            <ProductGrid
              products={data.products}
              fullscreen={displayMode === "fullscreen"}
            />
          </>
        )}
      </div>
    </div>
  );
}

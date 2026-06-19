import type { SortKey } from "@/lib/types";

const SORT_LABELS: Record<SortKey, string> = {
  relevance: "Relevansi",
  "price-asc": "Termurah",
  "price-desc": "Termahal",
  rating: "Rating",
  sold: "Terlaris",
};

interface ResultsHeaderProps {
  title: string;
  total: number;
  sort?: SortKey;
}

export function ResultsHeader({ title, total, sort }: ResultsHeaderProps) {
  return (
    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
      <div>
        <h2 className="text-[20px] font-bold leading-[24px] text-[--color-ink]">{title}</h2>
        <p className="mt-0.5 text-xs text-[--color-ink]/60">{total} produk</p>
      </div>
      {sort && (
        <div className="flex items-center gap-1 text-xs text-[--color-ink]/60">
          <span>Urut:</span>
          <span className="font-semibold text-[--color-primary]">{SORT_LABELS[sort]}</span>
        </div>
      )}
    </div>
  );
}

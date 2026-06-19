import { compact } from "@/lib/format";

interface RatingProps {
  rating?: number;
  sold?: number;
}

export function Rating({ rating, sold }: RatingProps) {
  if (!rating && !sold) return null;

  const parts: string[] = [];
  if (rating) parts.push(`★ ${rating.toFixed(1)}`);
  if (sold) parts.push(`Terjual ${compact(sold)}`);

  return (
    <div
      className="text-xs text-[--color-ink]/60"
      aria-label={`Rating: ${rating?.toFixed(1) ?? "N/A"}, Terjual: ${sold ?? 0}`}
    >
      {parts.join(" · ")}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[--color-muted] bg-[--color-surface]">
      <div className="aspect-square w-full animate-pulse bg-[--color-soft]" />
      <div className="flex flex-col gap-2 p-3">
        <div className="h-3 w-full animate-pulse rounded bg-[--color-soft]" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-[--color-soft]" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-[--color-soft]" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-[--color-soft]" />
      </div>
    </div>
  );
}

interface SkeletonProps {
  count?: number;
  fullscreen?: boolean;
}

export function Skeleton({ count = 4, fullscreen }: SkeletonProps) {
  return (
    <div
      className={`grid gap-3 ${fullscreen ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

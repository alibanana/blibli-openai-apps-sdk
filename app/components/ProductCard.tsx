"use client";
import type { Product } from "@/lib/types";
import { Price } from "./Price";
import { Rating } from "./Rating";

export function ProductCard({ p }: { p: Product }) {
  const open = () => {
    try {
      window.openai?.openExternal({ href: p.url });
    } catch {}
  };

  return (
    <button
      onClick={open}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[8px] border border-muted
                 bg-surface text-left transition-colors hover:border-primary-60"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {p.store?.official && (
          <span
            className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5
                       text-[11px] font-bold text-white"
          >
            Official
          </span>
        )}
        {p.freeShipping && (
          <span
            className="absolute bottom-2 left-2 rounded-full bg-success px-2 py-0.5
                       text-[11px] font-bold text-white"
          >
            GRATIS ONGKIR
          </span>
        )}
        {p.discountPct && (
          <span
            className="absolute right-2 top-2 rounded-full bg-danger px-2 py-0.5
                       text-[11px] font-bold text-white"
          >
            {p.discountPct}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-2 min-h-[42px] text-sm leading-[21px] text-ink">
          {p.title}
        </p>
        <div className="mt-auto flex flex-col gap-1 pt-1">
          <Price price={p.price} wasPrice={p.wasPrice} discountPct={p.discountPct} />
          <Rating rating={p.rating} sold={p.sold} />
          {p.store?.city && (
            <div className="text-xs text-ink/60">◍ {p.store.city}</div>
          )}
        </div>
      </div>
    </button>
  );
}

import { rupiah } from "@/lib/format";

interface PriceProps {
  price: number;
  wasPrice?: number;
  discountPct?: number;
}

export function Price({ price, wasPrice, discountPct }: PriceProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
      <span className="text-base font-bold leading-tight text-[--color-ink]">
        {rupiah(price)}
      </span>
      {wasPrice && (
        <span className="text-xs text-[--color-ink]/50 line-through">
          {rupiah(wasPrice)}
        </span>
      )}
      {discountPct && (
        <span className="text-[11px] font-bold leading-none text-[--color-danger]">
          {discountPct}%
        </span>
      )}
    </div>
  );
}

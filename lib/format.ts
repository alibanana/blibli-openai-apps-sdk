const idr = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const rupiah = (n: number) => idr.format(n).replace(/\s/g, " ");
export const compact = (n: number) =>
  new Intl.NumberFormat("id-ID", { notation: "compact" }).format(n);

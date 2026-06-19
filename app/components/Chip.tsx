interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export function Chip({ children, selected, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none transition-colors
        ${
          selected
            ? "border-[--color-primary] text-[--color-primary] bg-[--color-soft]"
            : "border-[--color-muted] bg-[--color-soft] text-[--color-ink]"
        }`}
    >
      {children}
    </button>
  );
}

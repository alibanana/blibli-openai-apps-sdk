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
            ? "border-primary text-primary bg-soft"
            : "border-muted bg-soft text-ink"
        }`}
    >
      {children}
    </button>
  );
}

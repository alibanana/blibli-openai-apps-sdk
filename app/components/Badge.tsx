interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-[11px] font-bold leading-none text-white ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

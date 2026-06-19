interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

export function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-3 text-4xl opacity-30">🛍️</div>
      <h3 className="text-[20px] font-bold text-[--color-ink]">{title}</h3>
      {subtitle && (
        <p className="mt-1 text-sm text-[--color-ink]/60">{subtitle}</p>
      )}
    </div>
  );
}

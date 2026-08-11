type MarqueeProps = {
  items: string[];
  className?: string;
};

export function Marquee({ items, className = "" }: MarqueeProps) {
  const row = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="false">
      <div className="marquee-track items-center gap-10 py-3">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 text-sm font-bold uppercase tracking-[0.22em] text-muted-foreground"
          >
            {item}
            <span aria-hidden className="text-primary">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

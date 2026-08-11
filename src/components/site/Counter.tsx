import { useEffect, useRef, useState } from "react";

type CounterProps = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

export function Counter({ value, label, prefix = "", suffix = "" }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let start: number | null = null;
    const duration = 1400;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const step = (t: number) => {
          if (start === null) start = t;
          const p = Math.min((t - start) / duration, 1);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div
      ref={ref}
      className="border-l-2 border-primary bg-card px-5 py-6 transition-colors hover:bg-accent"
    >
      <div className="font-display text-4xl tabular-nums sm:text-5xl">
        {prefix}
        {shown.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

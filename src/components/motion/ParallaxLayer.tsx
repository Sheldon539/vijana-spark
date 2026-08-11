import { useEffect, useRef, useState, type ReactNode } from "react";

type ParallaxLayerProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export function ParallaxLayer({ children, speed = 0.2, className = "" }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      setOffset(progress * speed * 100);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div style={{ transform: `translate3d(0, ${offset}px, 0)`, willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

interface TickerProps {
  stats: { label: string; value: number; suffix?: string }[];
}

function AnimatedNumber({ target, suffix }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame: number;
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString() + (suffix || "");
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, suffix]);

  return <span ref={ref}>0</span>;
}

export default function LiveTicker({ stats }: TickerProps) {
  const items = [...stats, ...stats];

  return (
    <div className="overflow-hidden">
      <div className="animate-ticker flex whitespace-nowrap py-4">
        {items.map((stat, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 text-sm text-gray-400 mx-8 shrink-0"
          >
            <span className="font-bold text-green-500 tabular-nums text-lg">
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
            </span>
            <span>{stat.label}</span>
            <span className="text-gray-300 ml-6">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

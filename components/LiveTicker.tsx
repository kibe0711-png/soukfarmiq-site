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
      // Ease out cubic
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
  return (
    <div className="bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-x-12 gap-y-2">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
            <span className="font-semibold text-gray-600 tabular-nums">
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
            </span>
            <span>{stat.label}</span>
            {i < stats.length - 1 && (
              <span className="hidden sm:inline text-gray-200 ml-10">·</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

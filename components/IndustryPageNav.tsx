"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Tab {
  id: string;
  label: string;
}

interface IndustryPageNavProps {
  parentLabel?: string;
  parentHref?: string;
  pageTitle: string;
  tabs: Tab[];
}

export default function IndustryPageNav({
  parentLabel = "Industries",
  parentHref = "/industries",
  pageTitle,
  tabs,
}: IndustryPageNavProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Find all sections on the page matching tab ids
    const map = new Map<string, HTMLElement>();
    for (const tab of tabs) {
      const el = document.getElementById(tab.id);
      if (el) map.set(tab.id, el);
    }
    sectionsRef.current = map;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    map.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [tabs]);

  return (
    <nav className="sticky top-14 z-40 bg-white border-b border-gray-200/80">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-5">
          {/* Left: breadcrumb + page title */}
          <div className="hidden sm:block shrink-0">
            <Link
              href={parentHref}
              className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 transition-colors leading-none mb-0.5"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
              <span>/ {parentLabel}</span>
            </Link>
            <p className="text-sm font-semibold text-gray-900 font-[family-name:var(--font-display)] leading-tight">
              {pageTitle}
            </p>
          </div>
          <div className="hidden sm:block w-px h-7 bg-gray-200" />

          {/* Right: tabs */}
          <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={`relative px-3 py-4 text-[13px] font-medium whitespace-nowrap transition-colors ${
                  active === tab.id
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}
                {active === tab.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-blue-600 rounded-full" />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* CTA button */}
        <Link
          href="/book"
          className="hidden sm:inline-flex text-[13px] font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-[10px] transition-colors shrink-0"
        >
          Request a demo
        </Link>
      </div>
    </nav>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS: { href: string; label: string; hasMega?: boolean }[] = [
  { href: "/method", label: "Method" },
  { href: "/industries", label: "Industries", hasMega: true },
  { href: "/product", label: "FarmIQ" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/about", label: "About" },
];

const INDUSTRY_COLUMNS = [
  {
    heading: "Services",
    items: [
      { label: "Professional services", href: "/industries/professional-services" },
      { label: "Financial services", href: "/industries/financial-services" },
      { label: "Public sector", href: "/industries/public-sector" },
      { label: "Telecommunications", href: "/industries/telecommunications" },
    ],
  },
  {
    heading: "Consumer Industries",
    items: [
      { label: "Agribusiness", href: "/industries/agribusiness" },
      { label: "Consumer products", href: "/industries/consumer-products" },
      { label: "Life sciences and healthcare", href: "/industries/life-sciences" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Wholesale distribution", href: "/industries/wholesale-distribution" },
    ],
  },
  {
    heading: "Manufacturing",
    items: [
      { label: "Aerospace and defense", href: "/industries/aerospace-defense" },
      { label: "Automotive", href: "/industries/automotive" },
      { label: "High tech", href: "/industries/high-tech" },
      { label: "Industrial manufacturing", href: "/industries/industrial-manufacturing" },
      { label: "Mill products", href: "/industries/mill-products" },
    ],
  },
  {
    heading: "Energy and Natural Resources",
    items: [
      { label: "Chemicals", href: "/industries/chemicals" },
      { label: "Mining", href: "/industries/mining" },
      { label: "Oil, gas, and energy", href: "/industries/oil-gas-energy" },
      { label: "Utilities", href: "/industries/utilities" },
    ],
  },
];

export default function NavBar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setMegaOpen(false);
      }
    }
    if (megaOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [megaOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMegaOpen(false);
    }
    if (megaOpen) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [megaOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/altiora-logo.png" alt="Altiora" width={28} height={28} />
          <span className="text-base font-semibold tracking-tight text-gray-900 font-[family-name:var(--font-display)]">
            Altiora
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-5">
          {NAV_ITEMS.map((item) =>
            item.hasMega ? (
              <button
                key={item.href}
                ref={triggerRef}
                onClick={() => setMegaOpen(!megaOpen)}
                className={`hidden sm:inline-flex items-center gap-1 text-[13px] font-medium transition-colors px-2 py-1 ${
                  megaOpen ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="hidden sm:inline text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors px-2 py-1"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/book"
            className="text-[13px] font-semibold text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-[10px] transition-colors ml-2"
          >
            Book a call
          </Link>
        </div>
      </div>

      {/* Mega Dropdown */}
      {megaOpen && (
        <div
          ref={megaRef}
          className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg shadow-gray-200/50 animate-mega-enter"
        >
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Top row: 4 columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {INDUSTRY_COLUMNS.map((col) => (
                <div key={col.heading}>
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2 font-[family-name:var(--font-display)]">
                    {col.heading}
                  </h3>
                  <hr className="border-gray-200 mb-3" />
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMegaOpen(false)}
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom CTA strip */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Don&apos;t see your industry?{" "}
                <Link
                  href="/book"
                  onClick={() => setMegaOpen(false)}
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  Let&apos;s talk — we build for any ops-heavy business.
                </Link>
              </p>
              <Link
                href="/industries"
                onClick={() => setMegaOpen(false)}
                className="text-xs font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                View all industries →
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

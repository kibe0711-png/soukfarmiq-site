"use client";

import { useState, useEffect, useCallback } from "react";
import LiveTicker from "./LiveTicker";
import CtaButton, { WhatsAppCta } from "./CtaButton";

interface HeroProps {
  tickerStats: { label: string; value: number; suffix?: string }[];
}

const slides = [
  {
    badge: "The next generation of ERP",
    headline: (
      <>
        Put AI to work for your business{" "}
        <span className="text-blue-600">with Altiora.</span>
      </>
    ),
    subtext:
      "Ask your system questions in plain language. Get instant answers about financials, operations, and performance — no digging through dashboards or waiting for reports.",
    cta: { label: "Book a 30-min discovery call", href: "/book" },
    secondary: { label: "See how we built FarmIQ", href: "/case-studies/karakuta" },
    showChat: true,
  },
  {
    badge: "Operations digitisation",
    headline: (
      <>
        Your operations are too big for spreadsheets.{" "}
        <span className="text-blue-600">We build the system you actually need.</span>
      </>
    ),
    subtext:
      "Altiora digitises ops-heavy businesses — agriculture, fisheries, fuel distribution, processing, manufacturing, logistics. If your weekly report is built by hand on Sunday night, we should talk.",
    cta: { label: "Book a 30-min discovery call", href: "/book" },
    secondary: { label: "See how we built FarmIQ", href: "/case-studies/karakuta" },
    showChat: false,
  },
  {
    badge: "Custom-built ERP",
    headline: (
      <>
        Off-the-shelf software doesn&apos;t fit.{" "}
        <span className="text-blue-600">We build around your operation.</span>
      </>
    ),
    subtext:
      "Every system we ship is scoped and built around the way you actually operate — your workflows, your vocabulary, your reporting cadence. Working software every Friday.",
    cta: { label: "See our method", href: "#how-it-works" },
    secondary: { label: "Industries we serve", href: "#industries" },
    showChat: false,
  },
  {
    badge: "Live in production",
    headline: (
      <>
        Real systems. Real operations.{" "}
        <span className="text-blue-600">Real numbers from day one.</span>
      </>
    ),
    subtext:
      "From packhouse intake to export sales, from fuel dispatches to fleet costing — our systems run 24/7 across East Africa. Every record below is live from our database.",
    cta: { label: "Book a discovery call", href: "/book" },
    secondary: { label: "Read a case study", href: "/case-studies/karakuta" },
    showChat: false,
  },
];

export default function Hero({ tickerStats }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-to-b from-gray-50/80 via-white to-white">
      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* Main content — grows to fill screen */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text content */}
            <div>
              {/* Badge */}
              <div
                key={`badge-${current}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 mb-6 animate-fade-up"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">
                  {slide.badge}
                </span>
              </div>

              {/* Headline */}
              <h1
                key={`headline-${current}`}
                className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-gray-900 leading-[1.12] font-[family-name:var(--font-display)] animate-fade-up animation-delay-100"
              >
                {slide.headline}
              </h1>

              {/* Subtext */}
              <p
                key={`subtext-${current}`}
                className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl animate-fade-up animation-delay-200"
              >
                {slide.subtext}
              </p>

              {/* CTAs */}
              <div
                key={`cta-${current}`}
                className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up animation-delay-300"
              >
                <CtaButton label={slide.cta.label} href={slide.cta.href} variant="primary" />
                <CtaButton label={slide.secondary.label} href={slide.secondary.href} variant="secondary" />
              </div>

              <div className="mt-4 animate-fade-up animation-delay-300">
                <WhatsAppCta label="Or message us on WhatsApp →" />
              </div>
            </div>

            {/* Right: graphic/SVG */}
            <div
              key={`graphic-${current}`}
              className="hidden lg:block animate-fade-up animation-delay-200"
            >
              {slide.showChat ? <AIChatMockup /> : <DashboardMockup slideIndex={current} />}
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex items-center gap-2 mt-14">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-8 bg-blue-600"
                    : "w-3 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
            <span className="ml-3 text-xs text-gray-400 tabular-nums">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Live ticker — more prominent */}
      <div className="relative border-t border-gray-200/60 bg-gray-50/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 pt-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                Live from our database
              </p>
            </div>
          </div>
        </div>
        <div className="py-4">
          <LiveTicker stats={tickerStats} />
        </div>
      </div>
    </section>
  );
}

/* ─── AI Chat Mockup SVG ─── */
function AIChatMockup() {
  return (
    <div className="relative">
      {/* Glow behind the card */}
      <div className="absolute -inset-4 bg-blue-100/40 rounded-[28px] blur-2xl" />

      <div className="relative bg-white border border-gray-200 rounded-[20px] shadow-xl shadow-gray-200/50 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50/80">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <span className="ml-3 text-[11px] font-medium text-gray-400">Altiora AI Assistant</span>
        </div>

        {/* Chat body */}
        <div className="p-5 space-y-4">
          {/* Sarah's message */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-blue-700">S</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-900">Sarah Kimani</span>
                <span className="text-[10px] text-gray-400">COO</span>
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2.5">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Are we meeting key financial targets this week? Show me margin per kg across all farms.
                </p>
              </div>
            </div>
          </div>

          {/* AI response */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-900">Altiora AI</span>
                <span className="text-[10px] text-emerald-600 font-medium">● Live</span>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl rounded-tl-md px-4 py-2.5">
                <p className="text-sm text-gray-700 leading-relaxed">
                  This week&apos;s margin per kg across all farms:
                </p>
                {/* Mini data table */}
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Mulindi Farm</span>
                    <span className="font-semibold text-gray-900">$2.14/kg</span>
                    <span className="text-emerald-600 text-[10px]">▲ 8%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Gatsibo Farm</span>
                    <span className="font-semibold text-gray-900">$1.87/kg</span>
                    <span className="text-emerald-600 text-[10px]">▲ 3%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Musha Farm</span>
                    <span className="font-semibold text-gray-900">$1.62/kg</span>
                    <span className="text-red-500 text-[10px]">▼ 2%</span>
                  </div>
                </div>
                <p className="mt-2.5 text-xs text-gray-500">
                  Overall you&apos;re 4% above target. Musha dipped due to Tuesday&apos;s rain delay — recovered Thursday.
                </p>
              </div>
            </div>
          </div>

          {/* Typing indicator */}
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-[10px] text-gray-400">Sarah is typing...</span>
          </div>
        </div>

        {/* Input bar */}
        <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-3">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-400">
            Ask anything about your operations...
          </div>
          <div className="w-8 h-8 rounded-[10px] bg-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Dashboard Mockup for other slides ─── */
function DashboardMockup({ slideIndex }: { slideIndex: number }) {
  const configs = [
    null, // slot 0 not used (showChat is true)
    { title: "Weekly Operations", metric: "1,247", label: "records this week", change: "+12%" },
    { title: "System Modules", metric: "6", label: "live modules", change: "active" },
    { title: "Uptime", metric: "99.9%", label: "this quarter", change: "stable" },
  ];
  const config = configs[slideIndex] || configs[1]!;

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gray-100/60 rounded-[28px] blur-2xl" />

      <div className="relative bg-white border border-gray-200 rounded-[20px] shadow-xl shadow-gray-200/50 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50/80">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <span className="ml-3 text-[11px] font-medium text-gray-400">Altiora Dashboard</span>
        </div>

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">{config.title}</h3>
            <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {config.change}
            </span>
          </div>

          {/* Big metric */}
          <div className="mb-5">
            <p className="text-4xl font-semibold text-gray-900 tabular-nums font-[family-name:var(--font-display)]">
              {config.metric}
            </p>
            <p className="text-xs text-gray-500 mt-1">{config.label}</p>
          </div>

          {/* Mini chart bars */}
          <div className="flex items-end gap-1.5 h-20">
            {[40, 65, 45, 80, 60, 90, 75, 85, 50, 70, 95, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-blue-100 hover:bg-blue-200 transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[9px] text-gray-400">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </div>

          {/* Mini table */}
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Attendance logged</span>
              <span className="font-medium text-gray-900">342</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Schedules completed</span>
              <span className="font-medium text-gray-900">89%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Feedings recorded</span>
              <span className="font-medium text-gray-900">516</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

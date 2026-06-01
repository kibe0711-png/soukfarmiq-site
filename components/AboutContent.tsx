"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "our-story", label: "Our story" },
  { id: "what-we-build", label: "What we build" },
  { id: "our-strategy", label: "Our strategy" },
  { id: "team", label: "Team" },
];

export default function AboutContent() {
  const [active, setActive] = useState("overview");
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    sectionsRef.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const registerSection = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionsRef.current.set(id, el);
  };

  return (
    <>
      {/* Sticky Secondary Nav */}
      <nav className="sticky top-14 z-40 bg-white border-b border-gray-200/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 flex items-center h-12 gap-6">
          {/* Page title */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <div>
              <p className="text-[10px] text-gray-400 leading-none">About Altiora</p>
              <p className="text-sm font-semibold text-gray-900 font-[family-name:var(--font-display)] leading-tight">
                Company Information
              </p>
            </div>
            <div className="w-px h-6 bg-gray-200" />
          </div>

          {/* Anchor links */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative px-3 py-3 text-[13px] font-medium whitespace-nowrap transition-colors ${
                  active === s.id
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {s.label}
                {active === s.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-blue-600 rounded-full" />
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Blue Hero Banner */}
      <section className="relative bg-blue-700 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 flex flex-col lg:flex-row items-center gap-10">
          {/* Left: text */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-[family-name:var(--font-display)]">
              Global Company Information
            </h1>
            <p className="mt-4 text-blue-100 text-base sm:text-lg leading-relaxed max-w-xl">
              Altiora builds custom operations systems for businesses that have outgrown
              spreadsheets but don&apos;t fit inside generic ERP. We work in agriculture,
              fisheries, fuel, manufacturing, and logistics across East Africa and beyond.
            </p>
          </div>
          {/* Right: geometric image */}
          <div className="relative w-full lg:w-[420px] h-[240px] shrink-0">
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl"
              style={{ clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)" }}
            >
              <Image
                src="/promo/ops-shot-1.jpg"
                alt="Altiora operations"
                fill
                className="object-cover"
                sizes="420px"
              />
            </div>
          </div>
        </div>
        {/* Decorative diagonal */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />
      </section>

      {/* ─── Sections ─── */}

      {/* Overview */}
      <section id="overview" ref={registerSection("overview")} className="py-16 sm:py-24 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-blue-700 tracking-widest uppercase mb-3">
              Overview
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight font-[family-name:var(--font-display)]">
              Operations software, built from the ground up.
            </h2>
            <p className="mt-4 text-base text-gray-500 leading-relaxed">
              Altiora is a software engineering company that builds custom digital operations systems
              for businesses in sectors that mainstream ERP vendors ignore. We don&apos;t sell licences.
              We don&apos;t resell modules. We sit with your team, map how data moves through your
              business, and build a system around it — in your vocabulary, on your devices, in your timezone.
            </p>
            <p className="mt-4 text-base text-gray-500 leading-relaxed">
              Our clients range from 20-person farms to multi-site export operations. What they
              share: they&apos;ve outgrown spreadsheets, tried off-the-shelf tools, and need something
              that actually fits.
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "2022", label: "Founded" },
              { value: "6+", label: "Industries served" },
              { value: "4", label: "Countries operating" },
              { value: "99.9%", label: "System uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-semibold text-gray-900 tabular-nums font-[family-name:var(--font-display)]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" ref={registerSection("our-story")} className="py-16 sm:py-24 bg-gray-50/70 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-blue-700 tracking-widest uppercase mb-3">
                Our story
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight font-[family-name:var(--font-display)]">
                Born from a frustration with generic software.
              </h2>
              <p className="mt-4 text-base text-gray-500 leading-relaxed">
                Altiora started when our founder watched a farming operation in Rwanda spend every
                Sunday night rebuilding the same weekly report — by hand, from WhatsApp screenshots and
                paper tallies. The data existed. It just lived in 12 different places, in 12 different formats.
              </p>
              <p className="mt-4 text-base text-gray-500 leading-relaxed">
                We built the first version of FarmIQ in six weeks. Within a month, it was running the
                entire operation: attendance, packhouse intake, sorting, export sales, and weekly board
                reporting — all from one system. That Sunday-night ritual disappeared.
              </p>
              <p className="mt-4 text-base text-gray-500 leading-relaxed">
                Since then, we&apos;ve expanded into fisheries, fuel distribution, and light
                manufacturing. The pattern is always the same: a real operator, a real mess, and a system
                built precisely for them.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="/promo/karakuta-main.jpeg"
                alt="Early Altiora deployment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section id="what-we-build" ref={registerSection("what-we-build")} className="py-16 sm:py-24 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold text-blue-700 tracking-widest uppercase mb-3">
              What we build
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight font-[family-name:var(--font-display)]">
              Full-stack operations systems — not modules you configure.
            </h2>
            <p className="mt-4 text-base text-gray-500 leading-relaxed">
              Every system is custom-built. But they share an architecture: mobile-first data capture
              on the ground, real-time dashboards for management, and automated reporting that removes
              the Sunday-night spreadsheet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Mobile data capture",
                desc: "Field staff log directly — attendance, intake, grading, dispatch. Works offline, syncs when connected.",
              },
              {
                title: "Real-time dashboards",
                desc: "Management sees live operational data — not last week's. Filterable by site, phase, crew, or date.",
              },
              {
                title: "Automated reporting",
                desc: "Weekly digests, board packs, and P&L summaries generated and emailed automatically. No human assembly.",
              },
              {
                title: "AI-powered insights",
                desc: "Ask your system questions in plain language. Get answers about cost, yield, labour, and performance instantly.",
              },
              {
                title: "Workflow automation",
                desc: "Approvals, escalations, and notifications triggered by your operational rules — not manual follow-up.",
              },
              {
                title: "Integration layer",
                desc: "Connect to accounting (Xero, QuickBooks), payments (M-Pesa), and logistics systems via API.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200/80 rounded-2xl p-6 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="text-sm font-semibold text-gray-900 font-[family-name:var(--font-display)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Strategy */}
      <section id="our-strategy" ref={registerSection("our-strategy")} className="py-16 sm:py-24 bg-gray-50/70 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold text-blue-700 tracking-widest uppercase mb-3">
              Our strategy
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight font-[family-name:var(--font-display)]">
              Go deep, not wide.
            </h2>
            <p className="mt-4 text-base text-gray-500 leading-relaxed">
              We don&apos;t chase thousands of customers. We work with a small number of operators,
              build systems that run their businesses, and stay alongside them as they grow. Every client
              gets a dedicated engineering team that knows their operation as well as they do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                title: "Sector expertise over scale",
                desc: "We go deep into each industry we serve — learning the vocabulary, the workflows, the pain. This means our systems fit from day one.",
              },
              {
                number: "02",
                title: "Own the full stack",
                desc: "We design, build, deploy, and operate. No handoffs to third parties. One team, one relationship, one throat to choke.",
              },
              {
                number: "03",
                title: "AI-native from the start",
                desc: "Every system we build is designed for AI from the ground up — structured data, clean APIs, and natural language interfaces built in, not bolted on.",
              },
            ].map((item) => (
              <div key={item.number} className="relative">
                <span className="text-4xl font-semibold text-gray-200 tabular-nums font-[family-name:var(--font-display)]">
                  {item.number}
                </span>
                <h3 className="mt-2 text-base font-semibold text-gray-900 font-[family-name:var(--font-display)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" ref={registerSection("team")} className="py-16 sm:py-24 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold text-blue-700 tracking-widest uppercase mb-3">
              Team
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight font-[family-name:var(--font-display)]">
              Engineers who understand operations.
            </h2>
            <p className="mt-4 text-base text-gray-500 leading-relaxed">
              We&apos;re a small, focused team of software engineers, product designers, and
              operations consultants. Everyone at Altiora has spent time on a client site —
              walking packhouse floors, riding fuel trucks, sitting in board meetings. We build
              for operators because we&apos;ve stood next to them.
            </p>
          </div>

          {/* Team placeholder */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "Moses Kibeka", role: "Founder & Lead Engineer" },
              { name: "Team Member", role: "Full-Stack Engineer" },
              { name: "Team Member", role: "Operations Consultant" },
              { name: "Team Member", role: "Product Designer" },
            ].map((person, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-400">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-900">{person.name}</p>
                <p className="text-xs text-gray-500">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24 bg-gray-50/70">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight font-[family-name:var(--font-display)]">
            Want to work with us?
          </h2>
          <p className="mt-3 text-base text-gray-500 max-w-xl mx-auto">
            Whether you&apos;re an operator looking for a system, or an engineer who wants to build
            for real businesses — we&apos;d like to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/book"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-[10px] transition-colors"
            >
              Book a discovery call →
            </a>
            <a
              href="mailto:hello@altiora.io"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-gray-900 bg-white border border-gray-200 hover:border-gray-300 rounded-[10px] transition-colors"
            >
              Email us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

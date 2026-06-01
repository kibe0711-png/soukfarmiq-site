import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import IndustryPageNav from "@/components/IndustryPageNav";

export const metadata = {
  title: "Agribusiness — Altiora",
  description:
    "Custom-built operations systems for agribusiness: farm management, packhouse intake, harvest tracking, labour costing, and automated reporting.",
};

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "solutions", label: "Solutions" },
  { id: "customer-stories", label: "Customer stories" },
];

export default function AgribusinessPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <IndustryPageNav pageTitle="Agribusiness" tabs={TABS} />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-emerald-50">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 flex flex-col lg:flex-row items-center gap-10">
          {/* Left: text */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-[1.1] font-[family-name:var(--font-display)]">
              Agribusiness
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Digitise your farm-to-export operation with a system built around your workflows —
              from sowing schedules and labour costing to packhouse grading, export sales, and
              automated weekly reporting.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-[10px] transition-colors"
              >
                Request a demo
              </Link>
              <a
                href="#solutions"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-gray-900 bg-white border border-gray-200 hover:border-gray-300 rounded-[10px] transition-colors"
              >
                Explore agribusiness solutions
              </a>
            </div>
          </div>

          {/* Right: tilted image card */}
          <div className="relative w-full lg:w-[460px] shrink-0">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/10 rotate-1 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/promo/tractor.jpeg"
                alt="Aerial view of farmland"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 460px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── OVERVIEW ─── */}
      <section id="overview" className="py-16 sm:py-24 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight font-[family-name:var(--font-display)]">
              Transform your value chain with AI-enabled agribusiness solutions
            </h2>
            <p className="mt-4 text-base text-gray-500 leading-relaxed">
              From nursery to export container, every kilogram passes through dozens of hands and
              decisions. Altiora connects the entire chain into one live system — so you see margin
              per kg the day after you ship, not the week after your accountant finishes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: value chain image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="/promo/value-chain.jpg"
                alt="Agricultural value chain operations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right: benefits */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-[family-name:var(--font-display)] mb-4">
                Our agribusiness solutions help you:
              </h3>
              <ul className="space-y-3">
                {[
                  "Track every phase from sowing to harvest with real-time field data",
                  "Automate labour costing — cost per kg, per phase, per crew, visible in a click",
                  "Run packhouse intake, grading, and sorting from one system on any device",
                  "Generate weekly board reports automatically — no Sunday-night spreadsheet",
                  "See margin per kg across farms, crops, and export customers in real time",
                  "Integrate with M-Pesa for casual worker payments and supplier disbursements",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#solutions"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Learn about our agribusiness modules
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOLUTIONS ─── */}
      <section id="solutions" className="py-16 sm:py-24 bg-gray-50/70 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold text-blue-700 tracking-widest uppercase mb-3">
              FarmIQ Modules
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight font-[family-name:var(--font-display)]">
              Every module your operation needs — nothing it doesn&apos;t.
            </h2>
            <p className="mt-4 text-base text-gray-500 leading-relaxed">
              Each system is scoped to your operation. These are the modules we&apos;ve built and
              deployed across live agribusiness clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Farm Phase Management",
                desc: "Track every crop from sowing to archive. Define phases by crop code, farm, area, and sowing date. See what's growing where, at a glance.",
                icon: "🌱",
              },
              {
                title: "Harvest Scheduling & Logging",
                desc: "Schedule harvest days per phase, log actual kg picked, and track grade splits (Grade 1, Grade 2, rejects). Compare pledge vs actual weekly.",
                icon: "📦",
              },
              {
                title: "Labour & Attendance",
                desc: "Register casual workers, log daily attendance by activity, apply daily or piece rates, and calculate pay automatically. Cost per phase, per crew, per kg.",
                icon: "👷",
              },
              {
                title: "Packhouse & Grading",
                desc: "Record intake at the packhouse door. Grade, sort, and weigh. Track reject rates and shrinkage from farm gate to export pallet.",
                icon: "⚖️",
              },
              {
                title: "Nutrition & Spray Schedules",
                desc: "SOP-driven feeding and spray plans by crop and week. Log actual applications vs plan. Track variance and compliance automatically.",
                icon: "💧",
              },
              {
                title: "Automated Weekly Reporting",
                desc: "Board packs, P&L summaries, and operational digests generated and emailed every Friday. No human assembly. No Sunday night.",
                icon: "📊",
              },
              {
                title: "Export Sales Tracking",
                desc: "Log sales by customer, shipment, and crop. Track revenue per kg, freight costs, and customer payment status across all export channels.",
                icon: "🚢",
              },
              {
                title: "Inventory & Inputs",
                desc: "Track fertiliser, chemicals, and packaging stock by farm. Auto-deduct from feeding records. Alert when stock falls below reorder level.",
                icon: "🏪",
              },
              {
                title: "AI Operations Assistant",
                desc: "Ask your system questions in plain language. 'What's our margin per kg this week?' — and get an instant answer from live data.",
                icon: "🤖",
              },
            ].map((mod) => (
              <div
                key={mod.title}
                className="bg-white border border-gray-200/80 rounded-2xl p-6 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <span className="text-2xl">{mod.icon}</span>
                <h3 className="mt-3 text-sm font-semibold text-gray-900 font-[family-name:var(--font-display)]">
                  {mod.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CUSTOMER STORIES ─── */}
      <section id="customer-stories" className="py-16 sm:py-24 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold text-blue-700 tracking-widest uppercase mb-3">
              Customer stories
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight font-[family-name:var(--font-display)]">
              See how agribusinesses run on Altiora.
            </h2>
          </div>

          {/* Karakuta case study */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="/promo/karakuta-main.jpeg"
                alt="Karakuta Fresh Produce harvest operations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-100 mb-4">
                <span className="text-xs font-semibold text-emerald-700">Case study</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 font-[family-name:var(--font-display)]">
                Karakuta Fresh Produce
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Multi-farm export operation · Rwanda → UK
              </p>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                Karakuta runs farms in Mulindi, Musha, Gatsibo, and Imigongo and exports fresh chilli,
                beans, and green-leaf crops to MWW, Wealmoor, and Fresh4u in the UK. Altiora built
                FarmIQ for them: every intake at the packhouse, every grade and reject at the sorting
                bench, every export sale and freight cost flows through one system.
              </p>
              <blockquote className="mt-5 border-l-2 border-gray-300 pl-4">
                <p className="text-sm text-gray-900 italic">
                  &ldquo;FarmIQ runs my operation. I see margin per kg the day after we ship.
                  I don&apos;t need to ask anyone.&rdquo;
                </p>
                <footer className="mt-2 text-xs text-gray-500">— Karakuta operations lead</footer>
              </blockquote>
              <Link
                href="/case-studies/karakuta"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Read the full case study
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-16 sm:py-24 bg-gray-50/70">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[20px] bg-gray-900 px-8 py-14 sm:px-14 sm:py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-[family-name:var(--font-display)]">
              Ready to digitise your agribusiness?
            </h2>
            <p className="mt-4 text-gray-400 text-base max-w-xl mx-auto">
              30 minutes, no slides. We&apos;ll map your operation and show you what a custom
              system looks like for your business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-[10px] transition-all"
              >
                Book a discovery call →
              </Link>
              <a
                href="https://wa.me/447522196521?text=Hi%20Altiora%2C%20I%27d%20like%20to%20discuss%20an%20agribusiness%20system."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 rounded-[10px] transition-colors"
              >
                Or WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

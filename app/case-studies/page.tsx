import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Case studies — Altiora",
  description: "Real customers running on Altiora-built systems.",
};

const studies = [
  {
    href: "/case-studies/karakuta",
    customer: "Karakuta Fresh Produce",
    sector: "Agriculture & packhouse · Rwanda → UK retail",
    headline: "One source of truth for 4 farms, 30+ crops, and a packhouse.",
    bigNumber: "100+",
    bigCaption: "hours per week of manual reconciliation eliminated",
    photo: "/promo/karakuta-main.jpeg",
  },
  {
    href: "/case-studies/tfh",
    customer: "The Fresh Hub (TFH)",
    sector: "Trader / aggregator · multi-org rollout",
    headline: "Onboarded as a second tenant. Live in 14 days.",
    bigNumber: "3,844",
    bigCaption: "historical sales records loaded on day one",
    photo: "/promo/ops-shot-2.jpg",
  },
];

export default function CaseStudiesIndex() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <section className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">
              Case studies
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Real operations. Real numbers.
            </h1>
            <p className="mt-5 text-lg text-gray-500 leading-relaxed">
              Two operators live on Altiora today. The numbers below are pulled live from the
              database that runs their operation.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {studies.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-[5/3] bg-gray-100">
                <Image src={s.photo} alt={s.customer} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">{s.sector}</p>
                <h2 className="text-xl font-semibold text-gray-900">{s.customer}</h2>
                <p className="mt-3 text-base text-gray-700 leading-snug">{s.headline}</p>
                <div className="mt-6 border-l-4 border-blue-600 pl-4">
                  <p className="text-3xl font-bold text-gray-900 tabular-nums leading-none">{s.bigNumber}</p>
                  <p className="mt-1 text-xs text-gray-500 leading-snug">{s.bigCaption}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  Read the study →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

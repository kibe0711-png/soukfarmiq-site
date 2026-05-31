import Image from "next/image";
import LiveTicker from "./LiveTicker";
import CtaButton, { WhatsAppCta } from "./CtaButton";

interface HeroProps {
  tickerStats: { label: string; value: number; suffix?: string }[];
}

export default function Hero({ tickerStats }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50/80 to-white">
      {/* Subtle background photo strip on the right */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block pointer-events-none">
        <div className="relative h-full w-full">
          <Image
            src="/promo/ops-shot-1.jpg"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover opacity-[0.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/80 to-white" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-8 sm:pt-18 sm:pb-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">
              Operations digitisation
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-[1.12] font-[family-name:var(--font-display)]">
            Your operations are too big for spreadsheets.{" "}
            <span className="text-blue-700">We build the system you actually need.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl">
            Altiora digitises ops-heavy businesses — agriculture, fisheries, fuel distribution,
            processing, manufacturing, logistics. If your weekly report is built by hand on Sunday
            night, we should talk.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CtaButton label="Book a 30-min discovery call" variant="primary" />
            <CtaButton
              label="See how we built FarmIQ"
              href="/case-studies/karakuta"
              variant="secondary"
            />
          </div>

          <div className="mt-3">
            <WhatsAppCta label="Or message us on WhatsApp →" />
          </div>
        </div>
      </div>

      <div className="relative border-t border-gray-200/60">
        <div className="max-w-6xl mx-auto px-6 py-2">
          <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400 pt-1.5">
            Live from our database
          </p>
        </div>
        <LiveTicker stats={tickerStats} />
      </div>
    </section>
  );
}

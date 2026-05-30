import Image from "next/image";
import LiveTicker from "./LiveTicker";
import CtaButton, { WhatsAppCta } from "./CtaButton";

interface HeroProps {
  tickerStats: { label: string; value: number; suffix?: string }[];
}

export default function Hero({ tickerStats }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background photo strip on the right — readable on light surface */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block pointer-events-none">
        <div className="relative h-full w-full">
          <Image
            src="/promo/ops-shot-1.jpg"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/70 to-white" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="max-w-3xl">
          <Image
            src="/altiora-logo.png"
            alt="Altiora"
            width={104}
            height={104}
            className="mb-6"
            priority
          />
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-4">
            Altiora · operations digitisation
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.05]">
            Your operations are too big for spreadsheets.{" "}
            <span className="text-blue-600">We build the system you actually need.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl">
            Altiora digitises ops-heavy businesses — agriculture, fisheries, fuel distribution,
            processing, manufacturing, logistics. If your weekly report is built by hand on Sunday
            night, we should talk.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <CtaButton label="Book a 30-min discovery call" variant="primary" />
            <CtaButton
              label="See how we built FarmIQ"
              href="/case-studies/karakuta"
              variant="secondary"
            />
          </div>

          <div className="mt-6">
            <WhatsAppCta label="Or message us on WhatsApp →" />
          </div>
        </div>
      </div>

      <div className="relative border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-2">
          <p className="text-xs uppercase tracking-wide text-gray-400 pt-2">
            What our system runs today — live from the database
          </p>
        </div>
        <LiveTicker stats={tickerStats} />
      </div>

      {/* Soft brand-blue blob for depth without dark/glass treatment */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-50 via-transparent to-transparent rounded-full blur-3xl opacity-60 -z-10" />
    </section>
  );
}

import Image from "next/image";
import LiveTicker from "./LiveTicker";

const WA_LINK = "https://wa.me/447522196521?text=Hi%20Altiora%2C%20I%27d%20like%20to%20request%20a%20demo%20of%20FarmIQ.";

interface HeroProps {
  tickerStats: { label: string; value: number; suffix?: string }[];
}

export default function Hero({ tickerStats }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="max-w-3xl">
          <Image
            src="/altiora-logo.png"
            alt="Altiora"
            width={120}
            height={120}
            className="mb-6"
          />
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-4">
            FarmIQ by Altiora
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            Farm Operations Intelligence,{" "}
            <span className="text-blue-600">Simplified</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl">
            From planning to harvest — one platform for modern agricultural
            enterprises. Schedule labor, track compliance, forecast yields, and
            manage payroll.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all hover:shadow-lg"
            >
              Request Demo
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#features"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <LiveTicker stats={tickerStats} />
      </div>
      {/* Subtle gradient blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-50 via-transparent to-transparent rounded-full blur-3xl opacity-60 -z-10" />
    </section>
  );
}

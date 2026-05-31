import Link from "next/link";

const WA_LINK =
  "https://wa.me/447522196521?text=Hi%20Altiora%2C%20I%27d%20like%20to%20book%20a%20discovery%20call.";

export default function CTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[20px] bg-gray-900 px-8 py-14 sm:px-14 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-[family-name:var(--font-display)]">
            Stop reconciling.
            <br />
            Start operating.
          </h2>
          <p className="mt-4 text-gray-400 text-base max-w-xl mx-auto">
            30 minutes, no slides. We&apos;ll ask about your operation, share what we&apos;ve
            built for other businesses, and if it fits we&apos;ll scope a discovery engagement.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-[10px] transition-all"
            >
              Book a discovery call →
            </Link>
            <a
              href={WA_LINK}
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
  );
}

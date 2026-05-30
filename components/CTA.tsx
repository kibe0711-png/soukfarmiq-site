import Link from "next/link";

const WA_LINK =
  "https://wa.me/447522196521?text=Hi%20Altiora%2C%20I%27d%20like%20to%20book%20a%20discovery%20call.";

export default function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-16 sm:px-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Stop reconciling.
            <br />
            Start operating.
          </h2>
          <p className="mt-4 text-blue-100 text-lg max-w-xl mx-auto">
            30 minutes, no slides. We&apos;ll ask about your operation, share what we built for
            Karakuta and TFH, and if it fits we&apos;ll scope a discovery engagement.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 rounded-full transition-all hover:shadow-lg"
            >
              Book a discovery call →
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white border border-white/30 hover:bg-white/10 rounded-full transition-colors"
            >
              Or WhatsApp us
            </a>
          </div>
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}

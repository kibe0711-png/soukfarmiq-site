import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Book a discovery call — Altiora",
  description: "30 minutes, no slides. We'll ask about your operation and scope a build if it fits.",
};

const WA_LINK =
  "https://wa.me/447522196521?text=Hi%20Altiora%2C%20I%27d%20like%20to%20book%20a%20discovery%20call.";

export default function BookPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <NavBar />
      <section className="flex-1 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">
            Book a call
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            30 minutes, no slides.
          </h1>
          <p className="mt-5 text-lg text-gray-500 leading-relaxed">
            We&apos;ll ask about your operation, share what we built for Karakuta and TFH, and if
            it fits we&apos;ll scope a discovery engagement.
          </p>

          {/* Calendar embed placeholder — wire up Cal.com or Calendly in Phase B */}
          <div className="mt-10 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center bg-gray-50">
            <p className="text-sm text-gray-500">
              The calendar embed lands here next. In the meantime, message us on WhatsApp and
              we&apos;ll find a time today.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all hover:shadow-md"
            >
              Message us on WhatsApp →
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Length</p>
              <p className="text-gray-900 font-medium">30 minutes</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Format</p>
              <p className="text-gray-900 font-medium">Video or WhatsApp call</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Outcome</p>
              <p className="text-gray-900 font-medium">A written summary, not a quote</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
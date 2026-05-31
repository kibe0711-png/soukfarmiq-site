import Image from "next/image";
import Link from "next/link";

interface CaseStudyStripProps {
  /** The big number we lead with — universal-operator units (hours / records / etc.). */
  bigNumber: string;
  /** Short caption under the big number. */
  bigCaption: string;
  /** Customer name. */
  customer: string;
  /** One-paragraph story under the headline. */
  story: string;
  /** Optional quote from the operator. */
  quote?: { text: string; attribution: string };
  /** Photo src (under /public). */
  photoSrc: string;
  photoAlt: string;
  /** Where the "Read the full study" link goes. */
  href: string;
}

export default function CaseStudyStrip({
  bigNumber,
  bigCaption,
  customer,
  story,
  quote,
  photoSrc,
  photoAlt,
  href,
}: CaseStudyStripProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Photo */}
          <div className="relative aspect-[5/4] rounded-2xl overflow-hidden bg-gray-100 order-2 lg:order-1">
            <Image
              src={photoSrc}
              alt={photoAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Story */}
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold text-blue-700 tracking-widest uppercase mb-3">
              Case study · {customer}
            </p>
            <div className="border-l-2 border-gray-900 pl-5 mb-5">
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 tabular-nums leading-none font-[family-name:var(--font-display)]">
                {bigNumber}
              </p>
              <p className="mt-2 text-sm text-gray-500 leading-snug">{bigCaption}</p>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{story}</p>

            {quote && (
              <blockquote className="mt-6 border-t border-gray-200 pt-6">
                <p className="text-base text-gray-900 italic leading-relaxed">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <footer className="mt-2 text-sm text-gray-500">— {quote.attribution}</footer>
              </blockquote>
            )}

            <Link
              href={href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Read the full study
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

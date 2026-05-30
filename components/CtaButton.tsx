import Link from "next/link";

const BOOK_HREF = "/book";
const WA_LINK = "https://wa.me/447522196521?text=Hi%20Altiora%2C%20I%27d%20like%20to%20book%20a%20discovery%20call.";

type Variant = "primary" | "secondary" | "tertiary";

interface CtaButtonProps {
  label?: string;
  href?: string;
  variant?: Variant;
  external?: boolean;
}

const VARIANT_CLS: Record<Variant, string> = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md",
  secondary:
    "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-300",
  tertiary:
    "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900",
};

export default function CtaButton({
  label = "Book a discovery call",
  href = BOOK_HREF,
  variant = "primary",
  external,
}: CtaButtonProps) {
  const cls = `inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full transition-all ${VARIANT_CLS[variant]}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {label}
        <ArrowRight />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
      <ArrowRight />
    </Link>
  );
}

export function WhatsAppCta({ label = "Or message us on WhatsApp" }: { label?: string }) {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-600"
    >
      {label}
    </a>
  );
}

function ArrowRight() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: "/method", label: "Method" },
  { href: "/industries", label: "Industries" },
  { href: "/product", label: "FarmIQ" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/altiora-logo.png" alt="Altiora" width={28} height={28} />
          <span className="text-base font-semibold tracking-tight text-gray-900 font-[family-name:var(--font-display)]">
            Altiora
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden sm:inline text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors px-2 py-1"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="text-[13px] font-semibold text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-[10px] transition-colors ml-2"
          >
            Book a call
          </Link>
        </div>
      </div>
    </nav>
  );
}

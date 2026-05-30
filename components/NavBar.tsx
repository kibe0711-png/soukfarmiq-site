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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/altiora-logo.png" alt="Altiora" width={32} height={32} />
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            Altiora
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden sm:inline text-sm text-gray-500 hover:text-gray-900 transition-colors px-2 py-1"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors ml-2"
          >
            Book a call
          </Link>
        </div>
      </div>
    </nav>
  );
}

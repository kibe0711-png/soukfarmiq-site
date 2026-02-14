import Image from "next/image";

const WA_LINK = "https://wa.me/447522196521?text=Hi%20Altiora%2C%20I%27d%20like%20to%20request%20a%20demo%20of%20SoukFarmIQ.";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/altiora-logo.png"
            alt="Altiora"
            width={32}
            height={32}
          />
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            Altiora
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#features"
            className="hidden sm:inline text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Features
          </a>
          <a
            href="#consultancy"
            className="hidden sm:inline text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Consultancy
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors"
          >
            Request Demo
          </a>
        </div>
      </div>
    </nav>
  );
}

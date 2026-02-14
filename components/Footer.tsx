import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Image
              src="/souk-circle.png"
              alt="Altiora"
              width={28}
              height={28}
            />
            <span className="text-sm font-semibold text-white">Altiora</span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#consultancy" className="hover:text-white transition-colors">
              Consultancy
            </a>
            <a
              href="https://wa.me/447522196521"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Altiora. All rights reserved.</p>
          <p className="text-gray-500">
            Building software for East African SMEs
          </p>
        </div>
      </div>
    </footer>
  );
}

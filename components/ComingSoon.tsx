import Link from "next/link";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface ComingSoonProps {
  pageName: string;
  tagline?: string;
}

export default function ComingSoon({ pageName, tagline }: ComingSoonProps) {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <NavBar />
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-xl text-center py-32">
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-4">
            {pageName}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Coming soon.
          </h1>
          {tagline && (
            <p className="mt-5 text-lg text-gray-500 leading-relaxed">{tagline}</p>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all hover:shadow-md"
            >
              Book a discovery call →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

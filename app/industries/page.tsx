import NavBar from "@/components/NavBar";
import IndustryGrid from "@/components/IndustryGrid";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Industries — where Altiora digitises operations",
  description:
    "Agriculture, fisheries, fuel, processing, manufacturing, logistics. Same method, different vocabulary.",
};

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <section className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">
              Industries
            </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Same method, different vocabulary.
          </h1>
            <p className="mt-5 text-lg text-gray-500 leading-relaxed">
              Altiora is one company that builds operations systems for sectors generic ERPs
              ignore. FarmIQ is our agri product. The others are on request — we&apos;ve scoped
              them, we haven&apos;t shipped them all yet.
            </p>
          </div>
        </div>
      </section>
      <IndustryGrid bare />
      <div className="h-16" />
      <CTA />
      <Footer />
    </main>
  );
}

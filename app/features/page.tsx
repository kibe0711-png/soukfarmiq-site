import Link from "next/link";
import NavBar from "@/components/NavBar";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Features — FarmIQ by Altiora",
  description:
    "Explore FarmIQ features: farm blocks, SOPs, weekly scheduling, compliance, production planning, labor & payroll.",
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-8 pb-4 max-w-7xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Home
        </Link>
      </div>
      <FeaturesShowcase />
      <Features />
      <Footer />
    </main>
  );
}

import { prisma } from "@/lib/db";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Consultancy from "@/components/Consultancy";
import UseCases from "@/components/UseCases";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const revalidate = 3600; // Revalidate every hour

async function getStats() {
  try {
    const [cropCount, activityCount, farmCount, hectaresResult] =
      await Promise.all([
        prisma.farmPhase.findMany({
          where: { archived: false },
          distinct: ["cropCode"],
          select: { cropCode: true },
        }),
        prisma.attendanceRecord.count(),
        prisma.farm.count(),
        prisma.farmPhase.aggregate({
          _sum: { areaHa: true },
          where: { archived: false },
        }),
      ]);

    return {
      crops: cropCount.length,
      activities: activityCount,
      farms: farmCount,
      hectares: Number(hectaresResult._sum.areaHa ?? 0),
    };
  } catch {
    return { crops: 0, activities: 0, farms: 0, hectares: 0 };
  }
}

export default async function Home() {
  const stats = await getStats();

  const tickerStats = [
    { label: "crops tracked", value: stats.crops },
    { label: "labor activities logged", value: stats.activities },
    { label: "active farms", value: stats.farms },
    { label: "Ha managed", value: Math.round(stats.hectares), suffix: "+" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <Hero tickerStats={tickerStats} />

      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">
            Platform
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Everything you need to run a farm
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            A complete operations toolkit built for agricultural enterprises across East Africa.
          </p>
          <Link
            href="/features"
            className="mt-8 inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all hover:shadow-lg"
          >
            Explore Features
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <HowItWorks />
      <Consultancy />
      <UseCases />
      <CTA />
      <Footer />
    </main>
  );
}

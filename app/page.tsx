import { prisma } from "@/lib/db";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
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
      <Features />
      <HowItWorks />
      <Consultancy />
      <UseCases />
      <CTA />
      <Footer />
    </main>
  );
}

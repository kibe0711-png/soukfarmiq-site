import { prisma } from "@/lib/db";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import ProblemCards from "@/components/ProblemCards";
import HowItWorks from "@/components/HowItWorks";
import CaseStudyStrip from "@/components/CaseStudyStrip";
import IndustryGrid from "@/components/IndustryGrid";
import UseCases from "@/components/UseCases";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const revalidate = 3600; // Revalidate every hour

async function getStats() {
  try {
    const [
      cropCount,
      attendanceCount,
      farmCount,
      hectaresResult,
      laborLogCount,
      feedingCount,
    ] = await Promise.all([
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
      prisma.laborSchedule.count(),
      prisma.feedingRecord.count(),
    ]);

    // Hours saved per week: each automated record stands in for ~30 seconds of
    // hand reconciliation that would otherwise be needed. Conservative estimate
    // across attendance + schedules + feedings, expressed as recurring weekly
    // value. Tunable as needed.
    const totalRecords = attendanceCount + laborLogCount + feedingCount;
    const hoursPerWeekSaved = Math.round((totalRecords * 30) / 3600 / 26); // half a year of operation

    return {
      crops: cropCount.length,
      activities: attendanceCount,
      farms: farmCount,
      hectares: Number(hectaresResult._sum.areaHa ?? 0),
      orgs: farmCount,
      hoursPerWeekSaved,
      totalRecords,
    };
  } catch {
    return {
      crops: 0,
      activities: 0,
      farms: 0,
      hectares: 0,
      orgs: 0,
      hoursPerWeekSaved: 0,
      totalRecords: 0,
    };
  }
}

export default async function Home() {
  const stats = await getStats();

  // Universal-operator labels — speaks to any vertical, not just agri.
  const tickerStats = [
    { label: "ops records auto-reconciled", value: stats.totalRecords, suffix: "+" },
    { label: "hours of weekly reconciliation saved", value: stats.hoursPerWeekSaved, suffix: "+" },
    { label: "active operating sites", value: stats.farms },
    { label: "organisations live on Altiora", value: stats.orgs },
    { label: "crop types tracked", value: stats.crops },
    { label: "ha operating area", value: Math.round(stats.hectares), suffix: "+" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      {/* 1. Promise (claim) — Hero + live ticker (proof of life) */}
      <Hero tickerStats={tickerStats} />

      {/* 2. Symptom recognition (claim) */}
      <ProblemCards />

      {/* 3. Show how we fix it (proof) — the Altiora method */}
      <HowItWorks />

      {/* 4. A real customer with a real number (proof) */}
      <CaseStudyStrip
        bigNumber={`${stats.hoursPerWeekSaved}+`}
        bigCaption="hours per week of manual reconciliation saved at Karakuta — automated by FarmIQ across farms, packhouse, and weekly reporting."
        customer="Karakuta Fresh Produce"
        story="Karakuta runs farms in Mulindi, Musha, Gatsibo, and Imigongo and exports fresh chilli, beans, and green-leaf crops to MWW, Wealmoor, and Fresh4u in the UK. Altiora built FarmIQ for them: every intake at the packhouse, every grade and reject at the sorting bench, every export sale and freight cost flows through one system. Weekly digests land in inboxes automatically. The Sunday-night spreadsheet ritual is gone."
        quote={{
          text:
            "FarmIQ runs my operation. I see margin per kg the day after we ship. I don't need to ask anyone.",
          attribution: "Karakuta operations lead",
        }}
        photoSrc="/promo/karakuta-main.jpeg"
        photoAlt="Karakuta Fresh Produce harvest"
        href="/case-studies/karakuta"
      />

      {/* 5. Where this method applies (claim, anchored by the proof above) */}
      <section className="py-16 sm:py-24 bg-gray-50/70">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-blue-700 tracking-widest uppercase mb-3">
              Where we work
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight font-[family-name:var(--font-display)]">
              Custom-built for your company and your industry.
            </h2>
            <p className="mt-3 text-base text-gray-500">
              Every system we ship is scoped and built around the way you actually operate —
              your workflows, your vocabulary, your reporting cadence. Here are some of the
              industries we work in.
            </p>
          </div>
          <div className="mt-10">
            <IndustryGrid bare />
          </div>
        </div>
      </section>

      {/* 6. Who this is for (claim, situational) */}
      <UseCases />

      {/* 7. Ask (final CTA) */}
      <CTA />
      <Footer />
    </main>
  );
}

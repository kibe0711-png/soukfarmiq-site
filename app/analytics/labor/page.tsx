import { getSession } from "@/lib/analytics-auth";
import { redirect } from "next/navigation";
import {
  fetchLaborReport,
  getCurrentWeekStart,
} from "@/lib/labor-api";
import KpiCard from "@/components/analytics/KpiCard";
import ComplianceChart from "@/components/analytics/labor/ComplianceChart";
import MissedTasksTable from "@/components/analytics/labor/MissedTasksTable";
import ActualActivitiesChart from "@/components/analytics/labor/ActualActivitiesChart";
import PhaseAttentionGrid from "@/components/analytics/labor/PhaseAttentionGrid";
import HarvestEfficiencyChart from "@/components/analytics/labor/HarvestEfficiencyChart";

export default async function LaborPage() {
  const user = await getSession();
  if (!user) redirect("/analytics/auth/error");

  let data;
  let error: string | null = null;

  try {
    const weekStart = getCurrentWeekStart();
    data = await fetchLaborReport(weekStart, 8);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load labor data";
  }

  // Derive KPI values
  const avgCompliance = data?.complianceByFarm.length
    ? Math.round(
        data.complianceByFarm.reduce((s, r) => s + r.compliancePct, 0) /
          data.complianceByFarm.length
      )
    : null;

  const totalMissed = data ? data.missedTasks.length : null;

  const totalWorkers = data?.actualActivities.length
    ? data.actualActivities.reduce((s, r) => s + r.workerCount, 0)
    : null;

  const bestEfficiency = data?.harvestEfficiency.length
    ? Math.max(...data.harvestEfficiency.map((r) => r.kgPerPerson))
    : null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Labor Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          8-week labor performance overview for {user.farm}.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-700 font-medium">
            Unable to load labor data
          </p>
          <p className="text-xs text-red-500 mt-1">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard
          title="Avg Compliance"
          value={avgCompliance !== null ? `${avgCompliance}%` : undefined}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          }
          trend={
            avgCompliance !== null
              ? avgCompliance >= 80
                ? "up"
                : avgCompliance >= 50
                  ? "neutral"
                  : "down"
              : undefined
          }
          placeholder={!data}
        />
        <KpiCard
          title="Missed Tasks"
          value={totalMissed ?? undefined}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          }
          trend={
            totalMissed !== null
              ? totalMissed === 0
                ? "up"
                : "down"
              : undefined
          }
          placeholder={!data}
        />
        <KpiCard
          title="Total Workers"
          value={totalWorkers ?? undefined}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          }
          placeholder={!data}
        />
        <KpiCard
          title="Best Harvest Efficiency"
          value={
            bestEfficiency !== null
              ? `${bestEfficiency.toFixed(1)} kg/p`
              : undefined
          }
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
          }
          trend={bestEfficiency !== null ? "up" : undefined}
          placeholder={!data}
        />
      </div>

      {data && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ComplianceChart data={data.complianceByFarm} />
            <HarvestEfficiencyChart data={data.harvestEfficiency} />
          </div>

          <div className="mb-6">
            <ActualActivitiesChart data={data.actualActivities} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PhaseAttentionGrid data={data.phaseAttention} />
            <MissedTasksTable data={data.missedTasks} />
          </div>
        </>
      )}
    </div>
  );
}

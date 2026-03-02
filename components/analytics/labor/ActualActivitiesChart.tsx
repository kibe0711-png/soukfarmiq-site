"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ActivityRow } from "@/lib/labor-api";

interface Props {
  data: ActivityRow[];
}

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#6366f1",
  "#84cc16",
];

export default function ActualActivitiesChart({ data }: Props) {
  // Pivot: group by weekStart, spread activities as columns (workerCount)
  const activities = [...new Set(data.map((r) => r.activity))];
  const byWeek = new Map<string, Record<string, number | string>>();

  for (const row of data) {
    const week = row.weekStart.split("T")[0];
    if (!byWeek.has(week)) {
      byWeek.set(week, { week });
    }
    const existing = byWeek.get(week)![row.activity];
    byWeek.get(week)![row.activity] =
      ((typeof existing === "number" ? existing : 0) as number) +
      row.workerCount;
  }

  const chartData = [...byWeek.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, val]) => val);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Actual Activities (Workers by Week)
      </h3>
      {chartData.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No activity data.
        </p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="week" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {activities.map((act, i) => (
                <Bar
                  key={act}
                  dataKey={act}
                  stackId="a"
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

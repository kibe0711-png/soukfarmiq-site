"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { ComplianceRow } from "@/lib/labor-api";

interface Props {
  data: ComplianceRow[];
}

function getColor(pct: number) {
  if (pct >= 80) return "#22c55e";
  if (pct >= 50) return "#f59e0b";
  return "#ef4444";
}

export default function ComplianceChart({ data }: Props) {
  // Average compliance per farm across all weeks and types
  const byFarm = new Map<string, { sum: number; count: number }>();
  for (const row of data) {
    const prev = byFarm.get(row.farm) ?? { sum: 0, count: 0 };
    byFarm.set(row.farm, {
      sum: prev.sum + row.compliancePct,
      count: prev.count + 1,
    });
  }

  const chartData = [...byFarm.entries()]
    .map(([farm, { sum, count }]) => ({
      farm,
      compliance: Math.round(sum / count),
    }))
    .sort((a, b) => b.compliance - a.compliance);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Compliance Score by Farm
      </h3>
      {chartData.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No compliance data.
        </p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="farm"
                tick={{ fontSize: 11 }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={50}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11 }}
              />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="compliance" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={getColor(entry.compliance)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

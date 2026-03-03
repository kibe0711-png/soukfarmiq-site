"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { HarvestRow } from "@/lib/labor-api";

interface Props {
  data: HarvestRow[];
}

export default function HarvestEfficiencyChart({ data }: Props) {
  // Aggregate kgPerPerson by cropCode (weighted average across farms/weeks)
  const byCrop = new Map<
    string,
    { totalKg: number; totalWorkers: number }
  >();
  for (const row of data) {
    const prev = byCrop.get(row.cropCode) ?? {
      totalKg: 0,
      totalWorkers: 0,
    };
    byCrop.set(row.cropCode, {
      totalKg: prev.totalKg + row.totalKg,
      totalWorkers: prev.totalWorkers + row.workerCount,
    });
  }

  const chartData = [...byCrop.entries()]
    .map(([cropCode, { totalKg, totalWorkers }]) => ({
      cropCode,
      kgPerPerson:
        totalWorkers > 0
          ? Math.round((totalKg / totalWorkers) * 10) / 10
          : 0,
    }))
    .sort((a, b) => b.kgPerPerson - a.kgPerPerson);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Harvest Efficiency (kg per Person)
      </h3>
      {chartData.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No harvest data.
        </p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="cropCode" tick={{ fontSize: 11 }} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `${v}`}
              />
              <Tooltip
                formatter={(v) => `${Number(v).toFixed(1)} kg/person`}
              />
              <Bar
                dataKey="kgPerPerson"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

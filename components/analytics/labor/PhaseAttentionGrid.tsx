"use client";

import type { PhaseRow } from "@/lib/labor-api";

interface Props {
  data: PhaseRow[];
}

function getStatusStyle(pct: number) {
  if (pct >= 80) return "bg-green-100 text-green-700";
  if (pct >= 50) return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
}

export default function PhaseAttentionGrid({ data }: Props) {
  // Show latest week per farm+phase, sorted by coverage ascending (worst first)
  const latest = new Map<string, PhaseRow>();
  for (const row of data) {
    const key = `${row.farm}|${row.phaseId}`;
    const prev = latest.get(key);
    if (!prev || row.weekStart > prev.weekStart) {
      latest.set(key, row);
    }
  }

  const rows = [...latest.values()].sort(
    (a, b) => a.coveragePct - b.coveragePct
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Phase Attention
      </h3>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No phase data.
        </p>
      ) : (
        <div className="overflow-auto max-h-80">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-gray-500">
                  Farm
                </th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">
                  Phase
                </th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">
                  Crop
                </th>
                <th className="text-right px-3 py-2 font-medium text-gray-500">
                  Planned
                </th>
                <th className="text-right px-3 py-2 font-medium text-gray-500">
                  Actual
                </th>
                <th className="text-center px-3 py-2 font-medium text-gray-500">
                  Coverage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-900">{row.farm}</td>
                  <td className="px-3 py-2 text-gray-500">{row.phaseId}</td>
                  <td className="px-3 py-2 text-gray-500">{row.cropCode}</td>
                  <td className="px-3 py-2 text-right text-gray-500">
                    {row.plannedMandays}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-500">
                    {row.actualMandays}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusStyle(row.coveragePct)}`}
                    >
                      {Math.round(row.coveragePct)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

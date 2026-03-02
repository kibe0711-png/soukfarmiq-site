"use client";

import { useState, useMemo } from "react";
import type { PhaseRow } from "@/lib/labor-api";

interface Props {
  phases: PhaseRow[];
}

function getCellBg(pct: number) {
  if (pct > 100) return "bg-blue-500";
  if (pct >= 80) return "bg-green-500";
  if (pct >= 50) return "bg-green-700";
  if (pct >= 30) return "bg-amber-500";
  if (pct > 0) return "bg-red-500";
  return "bg-red-700";
}

function getCellText(pct: number) {
  if (pct > 100) return "text-blue-100";
  if (pct >= 50) return "text-green-100";
  if (pct >= 30) return "text-amber-100";
  return "text-red-100";
}

export default function CoverageHeatmap({ phases }: Props) {
  const [selectedFarm, setSelectedFarm] = useState<string>("all");
  const [selected, setSelected] = useState<PhaseRow | null>(null);

  // Get latest week per farm+phase
  const latest = useMemo(() => {
    const m = new Map<string, PhaseRow>();
    for (const row of phases) {
      const key = `${row.farm}|${row.phaseId}`;
      const prev = m.get(key);
      if (!prev || row.weekMonday > prev.weekMonday) {
        m.set(key, row);
      }
    }
    return [...m.values()];
  }, [phases]);

  const farms = useMemo(
    () => [...new Set(latest.map((r) => r.farm))].sort(),
    [latest]
  );

  // Filter by farm
  const filtered = useMemo(
    () =>
      selectedFarm === "all"
        ? latest
        : latest.filter((r) => r.farm === selectedFarm),
    [latest, selectedFarm]
  );

  // Group by farm for the treemap sections
  const byFarm = useMemo(() => {
    const m = new Map<string, PhaseRow[]>();
    for (const row of filtered) {
      const arr = m.get(row.farm) ?? [];
      arr.push(row);
      m.set(row.farm, arr);
    }
    // Sort phases within each farm by plannedMandays desc
    for (const arr of m.values()) {
      arr.sort((a, b) => b.plannedMandays - a.plannedMandays);
    }
    return m;
  }, [filtered]);

  // Total planned across all filtered phases (for proportional sizing)
  const grandTotal = useMemo(
    () => filtered.reduce((s, r) => s + Math.max(r.plannedMandays, 1), 0),
    [filtered]
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Phase Coverage Map
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Each block = one phase, sized by planned mandays. Click for detail.
          </p>
        </div>
        <select
          value={selectedFarm}
          onChange={(e) => {
            setSelectedFarm(e.target.value);
            setSelected(null);
          }}
          className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Farms</option>
          {farms.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mb-4 text-[10px] text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-red-700" /> 0%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-red-500" /> 1-29%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-amber-500" /> 30-49%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-green-700" /> 50-79%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-green-500" /> 80-100%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-blue-500" /> &gt;100%
        </span>
      </div>

      {/* Treemap */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No phase data available.
        </p>
      ) : (
        <div className="space-y-3">
          {[...byFarm.entries()].map(([farm, rows]) => {
            const farmTotal = rows.reduce(
              (s, r) => s + Math.max(r.plannedMandays, 1),
              0
            );
            // Farm section height proportional to its share of grandTotal
            const farmPct = (farmTotal / grandTotal) * 100;
            const minHeight = Math.max(60, Math.round(farmPct * 4));

            return (
              <div key={farm}>
                {selectedFarm === "all" && (
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    {farm}
                  </p>
                )}
                <div
                  className="flex flex-wrap gap-[2px] rounded-lg overflow-hidden"
                  style={{ minHeight }}
                >
                  {rows.map((row) => {
                    const weight = Math.max(row.plannedMandays, 1);
                    const pct = (weight / farmTotal) * 100;
                    const isSelected =
                      selected?.farm === row.farm &&
                      selected?.phaseId === row.phaseId;
                    // Minimum width so labels fit
                    const basis = Math.max(pct, 4);

                    return (
                      <button
                        key={`${row.farm}|${row.phaseId}`}
                        onClick={() =>
                          setSelected(isSelected ? null : row)
                        }
                        className={`relative flex flex-col items-center justify-center rounded-[3px] transition-all ${getCellBg(row.coveragePct)} ${
                          isSelected
                            ? "ring-2 ring-white ring-offset-1 ring-offset-gray-900 z-10 scale-105"
                            : "hover:brightness-110"
                        }`}
                        style={{
                          flexBasis: `${basis}%`,
                          flexGrow: weight,
                          minWidth: 44,
                          minHeight: 44,
                        }}
                        title={`${row.phaseId} (${row.cropCode}) — ${Math.round(row.coveragePct)}%`}
                      >
                        <span
                          className={`text-[10px] font-bold leading-tight ${getCellText(row.coveragePct)}`}
                        >
                          {row.phaseId.replace("Phase ", "P")}
                        </span>
                        <span
                          className={`text-[9px] font-medium leading-tight opacity-80 ${getCellText(row.coveragePct)}`}
                        >
                          {row.cropCode}
                        </span>
                        <span
                          className={`text-xs font-bold tabular-nums ${getCellText(row.coveragePct)}`}
                        >
                          {Math.round(row.coveragePct)}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-gray-900">
              {selected.phaseId} — {selected.cropCode} @ {selected.farm}
            </h4>
            <button
              onClick={() => setSelected(null)}
              className="text-[10px] text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400 mb-1">Coverage</p>
              <p className="text-lg font-bold text-gray-900 tabular-nums">
                {Math.round(selected.coveragePct)}%
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400 mb-1">Planned</p>
              <p className="text-lg font-bold text-gray-900 tabular-nums">
                {selected.plannedMandays}
              </p>
              <p className="text-[10px] text-gray-400">mandays</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400 mb-1">Actual</p>
              <p className="text-lg font-bold text-gray-900 tabular-nums">
                {selected.actualMandays}
              </p>
              <p className="text-[10px] text-gray-400">mandays</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400 mb-1">WSS</p>
              <p className="text-lg font-bold text-gray-900 tabular-nums">
                {selected.wss}
              </p>
              <p className="text-[10px] text-gray-400">week since start</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

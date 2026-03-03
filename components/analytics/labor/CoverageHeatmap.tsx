"use client";

import { useState, useMemo } from "react";
import type { PhaseRow, SopCoverageRow } from "@/lib/labor-api";

interface Props {
  phases: PhaseRow[];
  sopCoverage: SopCoverageRow[];
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

function getCurrentWeekMonday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.getFullYear(), now.getMonth(), diff);
  return monday.toISOString().split("T")[0];
}

function toDateStr(iso: string): string {
  return iso.split("T")[0];
}

function formatWeek(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function varianceStyle(v: number): string {
  if (v > 0) return "text-blue-600";
  if (v < 0) return "text-red-600";
  return "text-gray-400";
}

function sourceStyle(source: string): { bg: string; label: string } {
  if (source === "sop") return { bg: "bg-green-100 text-green-700", label: "SOP" };
  return { bg: "bg-amber-100 text-amber-700", label: "Unplanned" };
}

function categoryLabel(cat: string): string {
  switch (cat) {
    case "labor_sop": return "Labor";
    case "harvesting": return "Harvest";
    case "operational": return "Ops";
    case "supervisory": return "Supervisor";
    default: return cat;
  }
}

export default function CoverageHeatmap({ phases, sopCoverage }: Props) {
  const [selectedFarm, setSelectedFarm] = useState<string>("all");
  const [selectedWeek, setSelectedWeek] = useState<string>("latest");
  const [selected, setSelected] = useState<PhaseRow | null>(null);

  // Available completed weeks (exclude current incomplete week)
  const weeks = useMemo(() => {
    const currentWeek = getCurrentWeekMonday();
    const all = [...new Set(phases.map((r) => r.weekMonday))].sort();
    return all.filter((w) => toDateStr(w) < currentWeek);
  }, [phases]);

  // The week to display
  const activeWeek = useMemo(
    () => (selectedWeek === "latest" ? weeks[weeks.length - 1] : selectedWeek),
    [selectedWeek, weeks]
  );

  // Phases for the active week
  const weekPhases = useMemo(
    () => (activeWeek ? phases.filter((r) => r.weekMonday === activeWeek) : []),
    [phases, activeWeek]
  );

  const farms = useMemo(
    () => [...new Set(weekPhases.map((r) => r.farm))].sort(),
    [weekPhases]
  );

  // Filter by farm
  const filtered = useMemo(
    () =>
      selectedFarm === "all"
        ? weekPhases
        : weekPhases.filter((r) => r.farm === selectedFarm),
    [weekPhases, selectedFarm]
  );

  // Group by farm for the treemap sections
  const byFarm = useMemo(() => {
    const m = new Map<string, PhaseRow[]>();
    for (const row of filtered) {
      const arr = m.get(row.farm) ?? [];
      arr.push(row);
      m.set(row.farm, arr);
    }
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

  // SOP coverage rows for the selected phase + week
  const selectedTasks = useMemo(() => {
    if (!selected || !activeWeek) return [];
    return sopCoverage
      .filter(
        (r) =>
          r.farm === selected.farm &&
          r.phaseId === selected.phaseId &&
          r.weekMonday === activeWeek
      )
      .sort((a, b) => {
        // SOP tasks first, then unplanned; within each group sort by planned desc
        if (a.source !== b.source) return a.source === "sop" ? -1 : 1;
        return b.plannedMandays - a.plannedMandays || b.actualMandays - a.actualMandays;
      });
  }, [selected, activeWeek, sopCoverage]);

  // Summary stats for selected phase
  const taskSummary = useMemo(() => {
    const sopTasks = selectedTasks.filter((t) => t.source === "sop");
    const unplanned = selectedTasks.filter((t) => t.source === "unplanned");
    const totalPlanned = sopTasks.reduce((s, t) => s + t.plannedMandays, 0);
    const totalActual = selectedTasks.reduce((s, t) => s + t.actualMandays, 0);
    const sopSkipped = sopTasks.filter((t) => t.actualMandays === 0).length;
    return { sopTasks: sopTasks.length, unplanned: unplanned.length, totalPlanned, totalActual, sopSkipped };
  }, [selectedTasks]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Phase Coverage Map
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Each block = one phase, sized by planned mandays. Click for
            SOP breakdown.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedWeek}
            onChange={(e) => {
              setSelectedWeek(e.target.value);
              setSelected(null);
            }}
            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="latest">Latest Week</option>
            {[...weeks].reverse().map((w) => (
              <option key={w} value={w}>
                w/c {formatWeek(w)}
              </option>
            ))}
          </select>
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
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-gray-900">
              {selected.phaseId} — {selected.cropCode} @ {selected.farm}
              <span className="ml-2 text-gray-400 font-normal">
                WSS {selected.wss}
              </span>
            </h4>
            <button
              onClick={() => setSelected(null)}
              className="text-[10px] text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
            >
              Close
            </button>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400 mb-1">Coverage</p>
              <p className="text-lg font-bold text-gray-900 tabular-nums">
                {Math.round(selected.coveragePct)}%
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400 mb-1">Planned</p>
              <p className="text-lg font-bold text-gray-900 tabular-nums">
                {Number(taskSummary.totalPlanned.toFixed(1))}
              </p>
              <p className="text-[10px] text-gray-400">mandays</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400 mb-1">Actual</p>
              <p className="text-lg font-bold text-gray-900 tabular-nums">
                {taskSummary.totalActual}
              </p>
              <p className="text-[10px] text-gray-400">mandays</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400 mb-1">SOP Skipped</p>
              <p className={`text-lg font-bold tabular-nums ${taskSummary.sopSkipped > 0 ? "text-red-600" : "text-green-600"}`}>
                {taskSummary.sopSkipped}
              </p>
              <p className="text-[10px] text-gray-400">of {taskSummary.sopTasks} tasks</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400 mb-1">Unplanned</p>
              <p className={`text-lg font-bold tabular-nums ${taskSummary.unplanned > 0 ? "text-amber-600" : "text-gray-400"}`}>
                {taskSummary.unplanned}
              </p>
              <p className="text-[10px] text-gray-400">activities</p>
            </div>
          </div>

          {/* SOP coverage table */}
          {selectedTasks.length > 0 ? (
            <div className="overflow-auto max-h-72">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium text-gray-500">
                      Task
                    </th>
                    <th className="text-center px-3 py-2 font-medium text-gray-500">
                      Category
                    </th>
                    <th className="text-right px-3 py-2 font-medium text-gray-500">
                      Planned
                    </th>
                    <th className="text-right px-3 py-2 font-medium text-gray-500">
                      Actual
                    </th>
                    <th className="text-right px-3 py-2 font-medium text-gray-500">
                      Variance
                    </th>
                    <th className="text-center px-3 py-2 font-medium text-gray-500">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedTasks.map((t, i) => {
                    const src = sourceStyle(t.source);
                    return (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-gray-900">
                          {t.task}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className="text-[10px] text-gray-500">
                            {categoryLabel(t.category)}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right text-gray-500 tabular-nums">
                          {t.plannedMandays > 0 ? Number(t.plannedMandays.toFixed(1)) : "—"}
                        </td>
                        <td className="px-3 py-2 text-right text-gray-700 tabular-nums font-medium">
                          {t.actualMandays > 0 ? t.actualMandays : "—"}
                        </td>
                        <td className={`px-3 py-2 text-right tabular-nums font-medium ${varianceStyle(t.variance)}`}>
                          {t.variance > 0 ? "+" : ""}{Number(t.variance.toFixed(1))}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${src.bg}`}
                          >
                            {src.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="border-t border-gray-200 bg-gray-50">
                  <tr>
                    <td className="px-3 py-2 font-medium text-gray-700" colSpan={2}>
                      Total
                    </td>
                    <td className="px-3 py-2 text-right font-bold text-gray-900 tabular-nums">
                      {Number(taskSummary.totalPlanned.toFixed(1))}
                    </td>
                    <td className="px-3 py-2 text-right font-bold text-gray-900 tabular-nums">
                      {taskSummary.totalActual}
                    </td>
                    <td className={`px-3 py-2 text-right font-bold tabular-nums ${varianceStyle(taskSummary.totalActual - taskSummary.totalPlanned)}`}>
                      {taskSummary.totalActual - taskSummary.totalPlanned > 0 ? "+" : ""}
                      {Number((taskSummary.totalActual - taskSummary.totalPlanned).toFixed(1))}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center py-4">
              No SOP coverage data for this phase in the selected week.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

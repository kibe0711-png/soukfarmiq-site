"use client";

import { useState, useMemo } from "react";
import type { HeatmapCell, PhaseRow } from "@/lib/labor-api";

interface Props {
  heatmap: HeatmapCell[];
  phases: PhaseRow[];
}

function getCellColor(pct: number) {
  if (pct > 100) return "bg-blue-200 text-blue-900 border-blue-300";
  if (pct >= 70) return "bg-green-200 text-green-900 border-green-300";
  if (pct >= 30) return "bg-amber-200 text-amber-900 border-amber-300";
  return "bg-red-200 text-red-900 border-red-300";
}

function formatWeek(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

function getLastSunday() {
  const now = new Date();
  const day = now.getDay();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - day);
  return sunday.toISOString().split("T")[0];
}

export default function CoverageHeatmap({ heatmap, phases }: Props) {
  const farms = useMemo(
    () => [...new Set(heatmap.map((c) => c.farm))].sort(),
    [heatmap]
  );
  const [selectedFarm, setSelectedFarm] = useState<string>("all");
  const [drilldown, setDrilldown] = useState<{
    farm: string;
    weekMonday: string;
  } | null>(null);
  const [tooltip, setTooltip] = useState<{
    cell: HeatmapCell;
    x: number;
    y: number;
  } | null>(null);

  // Filter heatmap by selected farm
  const filtered = useMemo(
    () =>
      selectedFarm === "all"
        ? heatmap
        : heatmap.filter((c) => c.farm === selectedFarm),
    [heatmap, selectedFarm]
  );

  // Build grid: rows = farms, cols = weeks (sorted chronologically)
  const displayFarms = useMemo(
    () =>
      selectedFarm === "all"
        ? farms
        : farms.filter((f) => f === selectedFarm),
    [farms, selectedFarm]
  );

  const weeks = useMemo(
    () => [...new Set(filtered.map((c) => c.weekMonday))].sort(),
    [filtered]
  );

  // Lookup map for cells
  const cellMap = useMemo(() => {
    const m = new Map<string, HeatmapCell>();
    for (const c of filtered) {
      m.set(`${c.farm}|${c.weekMonday}`, c);
    }
    return m;
  }, [filtered]);

  // Drill-down data: phases for selected farm+week
  const drilldownRows = useMemo(() => {
    if (!drilldown) return [];
    return phases
      .filter(
        (p) =>
          p.farm === drilldown.farm && p.weekMonday === drilldown.weekMonday
      )
      .sort((a, b) => a.coveragePct - b.coveragePct);
  }, [phases, drilldown]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header with title, farm filter */}
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Labor Coverage Heatmap
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Coverage % by farm and week. Click a cell to drill down.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedFarm}
            onChange={(e) => {
              setSelectedFarm(e.target.value);
              setDrilldown(null);
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
          <span className="w-3 h-3 rounded-sm bg-red-200 border border-red-300" />
          0-30%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-amber-200 border border-amber-300" />
          30-70%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-green-200 border border-green-300" />
          70-100%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-blue-200 border border-blue-300" />
          &gt;100%
        </span>
      </div>

      {/* Heatmap grid */}
      {weeks.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No heatmap data available.
        </p>
      ) : (
        <div className="overflow-x-auto relative">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 px-2 py-2 sticky left-0 bg-white z-10">
                  Farm
                </th>
                {weeks.map((w) => (
                  <th
                    key={w}
                    className="text-center text-[10px] font-medium text-gray-500 px-1 py-2 whitespace-nowrap"
                  >
                    {formatWeek(w)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayFarms.map((farm) => (
                <tr key={farm}>
                  <td className="text-xs font-medium text-gray-700 px-2 py-1 sticky left-0 bg-white z-10 whitespace-nowrap">
                    {farm}
                  </td>
                  {weeks.map((w) => {
                    const cell = cellMap.get(`${farm}|${w}`);
                    const isSelected =
                      drilldown?.farm === farm &&
                      drilldown?.weekMonday === w;
                    return (
                      <td key={w} className="p-0.5">
                        {cell ? (
                          <button
                            onClick={() =>
                              setDrilldown(
                                isSelected
                                  ? null
                                  : { farm, weekMonday: w }
                              )
                            }
                            onMouseEnter={(e) => {
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              setTooltip({
                                cell,
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                              });
                            }}
                            onMouseLeave={() => setTooltip(null)}
                            className={`w-full min-w-[48px] h-10 rounded border text-xs font-semibold tabular-nums transition-all ${getCellColor(cell.coveragePct)} ${
                              isSelected
                                ? "ring-2 ring-blue-600 ring-offset-1"
                                : "hover:ring-1 hover:ring-gray-400"
                            }`}
                          >
                            {Math.round(cell.coveragePct)}%
                          </button>
                        ) : (
                          <div className="w-full min-w-[48px] h-10 rounded border border-gray-100 bg-gray-50 flex items-center justify-center text-[10px] text-gray-300">
                            —
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="fixed z-50 pointer-events-none bg-gray-900 text-white rounded-lg px-3 py-2 text-xs shadow-lg"
              style={{
                left: tooltip.x,
                top: tooltip.y - 8,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="font-semibold">{tooltip.cell.farm}</p>
              <p className="text-gray-300">{formatWeek(tooltip.cell.weekMonday)}</p>
              <div className="mt-1 space-y-0.5">
                <p>
                  Planned:{" "}
                  <span className="font-medium">
                    {tooltip.cell.totalPlanned.toFixed(1)}
                  </span>{" "}
                  mandays
                </p>
                <p>
                  Actual:{" "}
                  <span className="font-medium">
                    {tooltip.cell.totalActual}
                  </span>{" "}
                  mandays
                </p>
                <p>
                  Phases:{" "}
                  <span className="font-medium">
                    {tooltip.cell.phaseCount}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Drill-down table */}
      {drilldown && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-gray-900">
              Phase Breakdown — {drilldown.farm},{" "}
              {formatWeek(drilldown.weekMonday)}
            </h4>
            <button
              onClick={() => setDrilldown(null)}
              className="text-[10px] text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
            >
              Close
            </button>
          </div>
          {drilldownRows.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">
              No phase detail for this cell.
            </p>
          ) : (
            <div className="overflow-auto max-h-64">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium text-gray-500">
                      Phase ID
                    </th>
                    <th className="text-left px-3 py-2 font-medium text-gray-500">
                      Crop
                    </th>
                    <th className="text-right px-3 py-2 font-medium text-gray-500">
                      WSS
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
                  {drilldownRows.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-900">
                        {row.phaseId}
                      </td>
                      <td className="px-3 py-2 text-gray-500">
                        {row.cropCode}
                      </td>
                      <td className="px-3 py-2 text-right text-gray-500">
                        {row.wss}
                      </td>
                      <td className="px-3 py-2 text-right text-gray-500">
                        {row.plannedMandays}
                      </td>
                      <td className="px-3 py-2 text-right text-gray-500">
                        {row.actualMandays}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium border ${getCellColor(row.coveragePct)}`}
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
      )}
    </div>
  );
}

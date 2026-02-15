"use client";

import { useState } from "react";

/* ── Crop color system (matching real app) ── */
const CROP_COLORS: Record<string, { bg: string; text: string }> = {
  FB:  { bg: "bg-red-100",    text: "text-red-700" },
  TSB: { bg: "bg-blue-100",   text: "text-blue-700" },
  GC:  { bg: "bg-green-100",  text: "text-green-700" },
  RC:  { bg: "bg-yellow-100", text: "text-yellow-700" },
  KA:  { bg: "bg-pink-100",   text: "text-pink-700" },
  SP:  { bg: "bg-cyan-100",   text: "text-cyan-700" },
};
const DEFAULT_COLOR = { bg: "bg-gray-100", text: "text-gray-700" };
function cropColor(code: string) {
  return CROP_COLORS[code] || DEFAULT_COLOR;
}

/* ── Mock Data ── */

const farmPhases = [
  { crop: "FB",  phase: "P1", sowing: "2024-11-04", farm: "Riara Farm", area: 2.5,  weeks: 12, maxWeek: 8  },
  { crop: "FB",  phase: "P2", sowing: "2024-12-09", farm: "Riara Farm", area: 1.8,  weeks: 7,  maxWeek: 8  },
  { crop: "TSB", phase: "P1", sowing: "2024-10-21", farm: "Molo Farm",  area: 3.2,  weeks: 14, maxWeek: 12 },
  { crop: "GC",  phase: "P1", sowing: "2024-09-16", farm: "Riara Farm", area: 1.0,  weeks: 19, maxWeek: 10 },
  { crop: "RC",  phase: "P1", sowing: "2024-11-18", farm: "Molo Farm",  area: 2.0,  weeks: 10, maxWeek: 14 },
  { crop: "SP",  phase: "P1", sowing: "2024-12-23", farm: "Riara Farm", area: 4.5,  weeks: 5,  maxWeek: 16 },
];

const laborSopData = [
  { crop: "FB", week: 1, task: "Land Preparation", casuals: 8, costPerDay: 2500, days: 3 },
  { crop: "FB", week: 2, task: "Transplanting", casuals: 12, costPerDay: 2500, days: 2 },
  { crop: "FB", week: 3, task: "Weeding (1st)", casuals: 6, costPerDay: 2500, days: 2 },
  { crop: "FB", week: 5, task: "Spraying", casuals: 4, costPerDay: 3000, days: 1 },
  { crop: "FB", week: 6, task: "Weeding (2nd)", casuals: 6, costPerDay: 2500, days: 2 },
  { crop: "FB", week: 8, task: "Harvesting", casuals: 10, costPerDay: 2500, days: 5 },
];

const nutriSopData = [
  { crop: "FB", week: 1, product: "DAP Fertilizer", ingredient: "18-46-0", rateHa: 200, unitPrice: 1800, cost: 360000 },
  { crop: "FB", week: 2, product: "CalciMax Foliar", ingredient: "Calcium Chloride", rateHa: 2.5, unitPrice: 12000, cost: 30000 },
  { crop: "FB", week: 3, product: "NPK 17-17-17", ingredient: "N-P-K Blend", rateHa: 150, unitPrice: 1650, cost: 247500 },
  { crop: "FB", week: 4, product: "Actara 25 WG", ingredient: "Thiamethoxam", rateHa: 0.4, unitPrice: 45000, cost: 18000 },
  { crop: "FB", week: 5, product: "Amistar Top", ingredient: "Azoxystrobin", rateHa: 1.0, unitPrice: 38000, cost: 38000 },
  { crop: "FB", week: 7, product: "KNO3 Foliar", ingredient: "Potassium Nitrate", rateHa: 3.0, unitPrice: 8500, cost: 25500 },
];

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const laborGanttActivities = [
  { crop: "FB",  label: "FB P1 W12 — Weeding (2nd)",    mandays: 6.0,  days: [0, 1] },
  { crop: "FB",  label: "FB P2 W7 — Spraying",          mandays: 4.0,  days: [2] },
  { crop: "TSB", label: "TSB P1 W14 — Harvesting",      mandays: 10.0, days: [0, 1, 2, 3, 4] },
  { crop: "GC",  label: "GC P1 W19 — Pruning",          mandays: 5.0,  days: [3, 4] },
  { crop: "RC",  label: "RC P1 W10 — Transplanting",    mandays: 12.0, days: [0, 1, 2] },
];

const nutriGanttActivities = [
  { crop: "FB",  label: "FB P1 W12 — KNO3 Foliar",       qty: 7.5,  days: [0, 2] },
  { crop: "FB",  label: "FB P2 W7 — CalciMax Foliar",     qty: 5.0,  days: [1] },
  { crop: "TSB", label: "TSB P1 W14 — NPK 17-17-17",     qty: 480.0, days: [0, 1, 2] },
  { crop: "GC",  label: "GC P1 W19 — Amistar Top",        qty: 1.0,  days: [3] },
  { crop: "RC",  label: "RC P1 W10 — DAP Fertilizer",     qty: 400.0, days: [0, 1] },
];

/* ── Traffic light helper ── */
function weekColor(weeks: number, maxWeek: number) {
  const ratio = weeks / maxWeek;
  if (ratio <= 0.75) return "text-green-600";
  if (ratio <= 1) return "text-yellow-600";
  return "text-red-600";
}

/* ── Section 1: Farm Blocks ── */
function FarmBlocksPreview() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-900">
          Uploaded Phases
          <span className="text-gray-400 font-normal ml-1.5">({farmPhases.length})</span>
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>Year:</span>
            <span className="border border-gray-300 rounded px-2 py-0.5 bg-white text-gray-700">2025</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>Week:</span>
            <span className="border border-gray-300 rounded px-2 py-0.5 bg-white text-gray-700">6</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>Farm:</span>
            <span className="border border-gray-300 rounded px-2 py-0.5 bg-white text-gray-700">All Farms</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sowing Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area (Ha)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weeks Since Sowing</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {farmPhases.map((p, i) => {
              const c = cropColor(p.crop);
              return (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${c.bg} ${c.text}`}>
                      {p.crop}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{p.phase}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {new Date(p.sowing).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{p.farm}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 tabular-nums">{p.area.toFixed(1)}</td>
                  <td className={`px-4 py-3 text-sm font-semibold tabular-nums ${weekColor(p.weeks, p.maxWeek)}`}>
                    {p.weeks}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Section 2: SOP Preview ── */
function SopTabsPreview() {
  const [tab, setTab] = useState<"labor" | "nutri">("labor");

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-medium text-gray-900">SOP Preview</h3>
          <p className="text-xs text-gray-400 mt-0.5">French Beans &mdash; Example data</p>
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => setTab("labor")}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === "labor" ? "bg-teal-600 text-white" : "bg-white text-gray-500 hover:text-gray-900"
            }`}
          >
            Labor SOP
          </button>
          <button
            onClick={() => setTab("nutri")}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === "nutri" ? "bg-purple-600 text-white" : "bg-white text-gray-500 hover:text-gray-900"
            }`}
          >
            Feeding SOP
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        {tab === "labor" ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Casuals</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost/Day</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {laborSopData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-teal-100 text-teal-700">
                      {row.crop}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.week}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.task}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.casuals}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 tabular-nums">{row.costPerDay.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Ingredient</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate/Ha</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {nutriSopData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-700">
                      {row.crop}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.week}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.product}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{row.ingredient}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 tabular-nums">{row.rateHa.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 tabular-nums">{row.unitPrice.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 tabular-nums">{row.cost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ── Section 3: Gantt Chart (Tabbed — Labor + Nutrition) ── */
function GanttPreview() {
  const [tab, setTab] = useState<"labor" | "nutri">("labor");
  const isLabor = tab === "labor";

  const activities = isLabor ? laborGanttActivities : nutriGanttActivities;
  const valueKey = isLabor ? "mandays" : "qty";
  const valueLabel = isLabor ? "Mandays" : "Qty";
  const totalLabel = isLabor ? "Total Mandays" : "Total Quantity";

  const dayTotals = DAY_LABELS.map((_, dayIdx) => {
    return activities.reduce((sum, act) => {
      if (!act.days.includes(dayIdx)) return sum;
      const val = (act as Record<string, unknown>)[valueKey] as number;
      return sum + val / act.days.length;
    }, 0);
  });
  const grandTotal = activities.reduce((sum, act) => {
    return sum + ((act as Record<string, unknown>)[valueKey] as number);
  }, 0);

  const accent = {
    summaryBg: isLabor ? "bg-teal-50 border-teal-200" : "bg-purple-50 border-purple-200",
    summaryTitle: isLabor ? "text-teal-800" : "text-purple-800",
    summaryTotal: isLabor ? "text-teal-700" : "text-purple-700",
    dayLabel: isLabor ? "text-teal-600" : "text-purple-600",
    dayValue: isLabor ? "text-teal-700" : "text-purple-700",
    cellActive: isLabor ? "bg-teal-600 text-white" : "bg-purple-600 text-white",
    footerAccent: isLabor ? "text-teal-700" : "text-purple-700",
    tabActive: isLabor ? "bg-teal-600 text-white" : "bg-purple-600 text-white",
  };

  return (
    <div className="space-y-3">
      {/* Tab switcher */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden w-fit">
        <button
          onClick={() => setTab("labor")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            tab === "labor" ? "bg-teal-600 text-white" : "bg-white text-gray-500 hover:text-gray-900"
          }`}
        >
          Labor Schedule
        </button>
        <button
          onClick={() => setTab("nutri")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            tab === "nutri" ? "bg-purple-600 text-white" : "bg-white text-gray-500 hover:text-gray-900"
          }`}
        >
          Nutrition Schedule
        </button>
      </div>

      {/* Summary bar */}
      <div className={`${accent.summaryBg} border rounded-lg px-5 py-4`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`${accent.summaryTitle} font-medium text-base`}>{totalLabel}</span>
          <span className={`text-2xl font-bold ${accent.summaryTotal}`}>{grandTotal.toFixed(1)}</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {DAY_LABELS.map((day, idx) => (
            <div key={day} className="text-center">
              <div className={`text-xs ${accent.dayLabel} font-medium mb-1`}>{day}</div>
              <div className={`text-sm font-bold ${dayTotals[idx] > 0 ? accent.dayValue : "text-gray-400"}`}>
                {dayTotals[idx] > 0 ? dayTotals[idx].toFixed(1) : "0"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse table-fixed">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-2.5 px-3 font-medium text-gray-700 w-[220px] max-w-[220px]">Activity</th>
                {DAY_LABELS.map((day) => (
                  <th key={day} className="text-center py-2.5 px-1 font-medium text-gray-700 w-16">{day}</th>
                ))}
                <th className="text-center py-2.5 px-3 font-medium text-gray-700 w-20">{valueLabel}</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act, idx) => {
                const val = (act as Record<string, unknown>)[valueKey] as number;
                const perDay = val / act.days.length;
                const c = cropColor(act.crop);
                return (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-800 font-medium text-xs w-[220px] max-w-[220px]">
                      <div className="flex items-center gap-1.5">
                        <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${c.bg} ${c.text}`}>
                          {act.crop}
                        </span>
                        <span className="truncate" title={act.label}>{act.label}</span>
                      </div>
                    </td>
                    {DAY_LABELS.map((_, dayIdx) => {
                      const isActive = act.days.includes(dayIdx);
                      return (
                        <td key={dayIdx} className="py-1 px-1 text-center">
                          <div
                            className={`w-full h-10 rounded text-xs font-semibold flex items-center justify-center ${
                              isActive ? accent.cellActive : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {isActive ? perDay.toFixed(1) : ""}
                          </div>
                        </td>
                      );
                    })}
                    <td className="py-2 px-3 text-center font-semibold text-gray-700 text-xs">
                      {val.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300 bg-gray-50">
                <td className="py-2 px-3 font-semibold text-gray-700 text-xs">{totalLabel}</td>
                {dayTotals.map((total, idx) => (
                  <td key={idx} className="py-2 px-1 text-center font-semibold text-xs">
                    <span className={total > 0 ? accent.footerAccent : "text-gray-400"}>
                      {total > 0 ? total.toFixed(1) : "0"}
                    </span>
                  </td>
                ))}
                <td className={`py-2 px-3 text-center font-bold ${accent.footerAccent} text-xs`}>
                  {grandTotal.toFixed(1)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Main Showcase Component ── */
export default function FeaturesShowcase() {
  return (
    <div>
      {/* Section 1: Farm Blocks */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-3">
              <FarmBlocksPreview />
            </div>
            <div className="lg:col-span-2">
              <p className="text-sm font-medium text-teal-600 tracking-wide uppercase mb-2">Farm Blocks</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                Every Crop. Every Phase.
                <br />
                <span className="text-teal-600">One Screen.</span>
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                The moment a crop is planted, FarmIQ tracks it as a &ldquo;phase&rdquo; &mdash; a living record of crop code, sowing date, farm, and area under cultivation.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                The <strong className="text-gray-700">Weeks Since Sowing</strong> column uses traffic-light colors to show crop age against the SOP timeline. Green means on track. Yellow means approaching maturity. Red means overdue &mdash; you need to act now.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Filter by year, week, or farm. Every phase is editable, archivable, and feeds directly into your labor and nutrition schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: SOP Preview */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-3">
              <SopTabsPreview />
            </div>
            <div className="lg:col-span-2">
              <p className="text-sm font-medium text-purple-600 tracking-wide uppercase mb-2">Standard Operating Procedures</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                Two Playbooks.
                <br />
                <span className="text-purple-600">Zero Guesswork.</span>
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Every crop has two SOPs &mdash; a <strong className="text-teal-700">Labor SOP</strong> and a <strong className="text-purple-700">Feeding SOP</strong>. Together they define the complete playbook for that crop&apos;s lifecycle.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                The Labor SOP maps out which tasks happen each week &mdash; weeding, spraying, transplanting &mdash; how many casual workers are needed, and at what cost per day.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                The Feeding SOP prescribes every input &mdash; fertilizers, foliar feeds, pesticides &mdash; with exact rates per hectare and unit costs. Built once by agronomists, used every season.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Weekly Schedule */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium text-teal-600 tracking-wide uppercase mb-2">Weekly Schedule</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
              Monday Morning?
              <br />
              <span className="text-teal-600">Already Sorted.</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              FarmIQ combines your planting dates with your SOPs and auto-generates a visual timeline. Labor tasks and nutrition applications slotted into specific days. Farm clerks open the app on Monday and see exactly what needs to happen, who does it, and what products to use. No meetings. No phone calls.
            </p>
          </div>
          <GanttPreview />
          <p className="mt-6 text-xs text-gray-400 max-w-2xl">
            Switch between Labor and Nutrition schedules. Teal cells show labor mandays, purple cells show nutrition quantities. Each row is a farm phase + activity, with totals per day and for the week.
          </p>
        </div>
      </section>
    </div>
  );
}

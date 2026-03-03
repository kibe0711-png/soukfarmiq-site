"use client";

import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "You Plant It, We Plan It",
    description:
      "It starts with a planting. You tell FarmIQ the crop, the sowing date, and the area. That\u2019s all we need. From that single entry, FarmIQ knows exactly which SOPs apply and what your farm needs week by week.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Two Playbooks. Zero Guesswork.",
    description:
      "Every crop has two SOPs \u2014 a Labor SOP and a Feeding SOP. The Labor SOP defines which tasks happen each week, how many casuals, and at what cost. The Feeding SOP defines which products to apply, the exact rates per hectare, and when. These playbooks are built by agronomists and loaded once.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Monday Morning? Already Sorted.",
    description:
      "FarmIQ combines your planting date with your SOPs and auto-generates a visual timeline \u2014 labor tasks and nutrition applications slotted into specific days. Farm clerks open the app on Monday and see exactly what needs to happen, who does it, and what products to use. No meetings. No phone calls.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "We Catch What You Miss",
    description:
      "At the end of each week, FarmIQ compares what was scheduled against what actually happened. Did the weeding get done? Was the foliar feed applied on time and at the right rate? Every task is logged, timestamped, and flagged. Compliance snapshots give you a clear picture \u2014 green means done, red means missed. You see problems before they cost you money.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
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

function SopPreview() {
  const [activeTab, setActiveTab] = useState<"labor" | "nutri">("labor");

  return (
    <div className="mt-12 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-medium text-gray-900">SOP Preview</h3>
          <p className="text-xs text-gray-400 mt-0.5">French Beans &mdash; Example data</p>
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => setActiveTab("labor")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "labor"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-500 hover:text-gray-900"
            }`}
          >
            Labor SOP
          </button>
          <button
            onClick={() => setActiveTab("nutri")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "nutri"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-500 hover:text-gray-900"
            }`}
          >
            Feeding SOP
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {activeTab === "labor" ? (
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
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                      {row.crop}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{row.week}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.task}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{row.casuals}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap tabular-nums">
                    {row.costPerDay.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{row.days}</td>
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
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                      {row.crop}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{row.week}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.product}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{row.ingredient}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap tabular-nums">
                    {row.rateHa.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap tabular-nums">
                    {row.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap tabular-nums">
                    {row.cost.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
        Sample data &mdash; actual SOPs are built by agronomists for each crop and region
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            We Made Farm Management
            <br />
            <span className="text-blue-600">Stupidly Simple</span>
          </h2>
          <p className="mt-5 text-lg text-gray-500 leading-relaxed">
            It all starts with SOPs &mdash; Standard Operating Procedures.
            Think of them as your farm&apos;s playbook. Set them once, and
            FarmIQ does the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="text-5xl font-black text-blue-100">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -bottom-6 left-1/2 -translate-x-1/2 text-gray-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <SopPreview />

        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-blue-100">
          <p className="text-sm font-semibold text-gray-900 mb-2">
            What&apos;s an SOP?
          </p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
            A Standard Operating Procedure defines exactly how a crop should be
            managed &mdash; week by week. It covers labor tasks (weeding,
            spraying, transplanting), nutrition schedules (foliar feeds,
            fertigation, soil amendments), and harvest timing. SOPs are built by
            agronomists and tailored to each crop variety and region. Once loaded
            into FarmIQ, they drive every schedule, every alert, and every
            compliance check automatically.
          </p>
        </div>
      </div>
    </section>
  );
}

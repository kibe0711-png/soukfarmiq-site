"use client";

import type { MissedTaskRow } from "@/lib/labor-api";

interface Props {
  data: MissedTaskRow[];
}

export default function MissedTasksTable({ data }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Missed Tasks ({data.length})
      </h3>
      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No missed tasks in this period.
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
                  Week
                </th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">
                  Type
                </th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">
                  Task
                </th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">
                  Crop
                </th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">
                  Phase
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-900">{row.farm}</td>
                  <td className="px-3 py-2 text-gray-500">
                    {row.weekStart.split("T")[0]}
                  </td>
                  <td className="px-3 py-2">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                      {row.type}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-900">{row.task}</td>
                  <td className="px-3 py-2 text-gray-500">{row.cropCode}</td>
                  <td className="px-3 py-2 text-gray-500">{row.phaseId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

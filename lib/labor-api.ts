export interface ComplianceRow {
  farm: string;
  weekStart: string;
  type: string;
  totalTasks: number;
  doneTasks: number;
  missedTasks: number;
  pendingTasks: number;
  compliancePct: number;
}

export interface MissedTaskRow {
  farm: string;
  weekStart: string;
  type: string;
  task: string;
  cropCode: string;
  phaseId: string;
}

export interface ActivityRow {
  farm: string;
  weekStart: string;
  activity: string;
  workerCount: number;
  daysActive: number;
  totalCost: number;
}

export interface PhaseRow {
  farm: string;
  phaseId: string;
  cropCode: string;
  weekMonday: string;
  wss: number;
  plannedMandays: number;
  actualMandays: number;
  coveragePct: number;
}

export interface HeatmapCell {
  farm: string;
  weekMonday: string;
  totalPlanned: number;
  totalActual: number;
  coveragePct: number;
  phaseCount: number;
}

export interface PhaseActivityRow {
  farm: string;
  phaseId: string;
  cropCode: string;
  weekMonday: string;
  wss: number;
  activity: string;
  mandays: number;
  workers: number;
  totalCost: number;
  inSop: boolean;
}

export interface SopCoverageRow {
  farm: string;
  phaseId: string;
  cropCode: string;
  areaHa: number;
  weekMonday: string;
  wss: number;
  task: string;
  category: string;
  plannedMandays: number;
  actualMandays: number;
  variance: number;
  source: string;
}

export interface HarvestRow {
  cropCode: string;
  farm: string;
  weekStart: string;
  workerCount: number;
  totalKg: number;
  kgPerPerson: number;
}

export interface LaborReportResponse {
  complianceByFarm: ComplianceRow[];
  missedTasks: MissedTaskRow[];
  actualActivities: ActivityRow[];
  phaseAttention: PhaseRow[];
  phaseHeatmap: HeatmapCell[];
  phaseActivities: PhaseActivityRow[];
  sopCoverage: SopCoverageRow[];
  harvestEfficiency: HarvestRow[];
}

export function getCurrentWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.getFullYear(), now.getMonth(), diff);
  return monday.toISOString().split("T")[0];
}

export async function fetchLaborReport(
  weekStart: string,
  weeks: number = 8
): Promise<LaborReportResponse> {
  const apiUrl = process.env.FARMIQ_API_URL;
  const apiKey = process.env.REPORT_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error("FARMIQ_API_URL and REPORT_API_KEY must be set");
  }

  const res = await fetch(
    `${apiUrl}/api/reports/labor?weekStart=${weekStart}&weeks=${weeks}`,
    {
      headers: { "x-api-key": apiKey },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error(`Labor API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

interface Industry {
  name: string;
  status: "active" | "on-request";
  universalPain: string;
  vocab: string;
}

const industries: Industry[] = [
  {
    name: "Agriculture & packhouse",
    status: "active",
    universalPain: "Floor-to-board reporting that takes a weekend",
    vocab: "Phases, packout, intake, sorting, sales chain, P&L per kg",
  },
  {
    name: "Fisheries",
    status: "on-request",
    universalPain: "Catch reconciliation, grading, cold-chain shrinkage",
    vocab: "Landings, lot tagging, cold-chain logs, grading benches, export packs",
  },
  {
    name: "Fuel & petroleum distribution",
    status: "on-request",
    universalPain: "Tank stock vs sales, driver dispatches, credit ageing",
    vocab: "Wet stock, dips, dispatches, driver runs, dealer AR, dry-loss",
  },
  {
    name: "Agro-processing",
    status: "on-request",
    universalPain: "Raw-input to finished-goods mass balance",
    vocab: "Batches, yields, line scrap, packaging usage, finished-goods inventory",
  },
  {
    name: "Light manufacturing",
    status: "on-request",
    universalPain: "Work-in-progress visibility and BOM compliance",
    vocab: "BOM, WIP, scrap, line OEE, finished-goods, dispatch",
  },
  {
    name: "Fleet & logistics",
    status: "on-request",
    universalPain: "Per-trip cost, fuel, driver hours, asset utilisation",
    vocab: "Trips, fuel logs, driver pay, vehicle service, route profitability",
  },
];

interface IndustryGridProps {
  /** Heading shown above the grid. */
  heading?: string;
  /** Lead sentence under the heading. */
  lead?: string;
  /** When true, hides the section heading (the parent supplies it). */
  bare?: boolean;
}

export default function IndustryGrid({ heading, lead, bare }: IndustryGridProps) {
  return (
    <section className={bare ? "" : "py-20 sm:py-28"}>
      <div className={bare ? "" : "max-w-6xl mx-auto px-6"}>
        {!bare && (
          <div className="max-w-2xl">
            {heading && (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {heading}
              </h2>
            )}
            {lead && <p className="mt-4 text-lg text-gray-500">{lead}</p>}
          </div>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${bare ? "" : "mt-12"}`}>
          {industries.map((ind) => (
            <article
              key={ind.name}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-gray-900 leading-tight">
                  {ind.name}
                </h3>
                <span
                  className={`text-[10px] tracking-wide uppercase font-medium px-2 py-0.5 rounded border whitespace-nowrap ${
                    ind.status === "active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}
                >
                  {ind.status === "active" ? "Active" : "On request"}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{ind.universalPain}</p>
              <p className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 italic leading-relaxed">
                We speak: {ind.vocab}.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

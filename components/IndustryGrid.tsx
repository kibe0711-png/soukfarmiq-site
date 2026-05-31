interface Industry {
  name: string;
  universalPain: string;
  vocab: string;
}

const industries: Industry[] = [
  {
    name: "Agriculture & packhouse",
    universalPain: "Floor-to-board reporting that takes a weekend",
    vocab: "Phases, packout, intake, sorting, sales chain, P&L per kg",
  },
  {
    name: "Fisheries",
    universalPain: "Catch reconciliation, grading, cold-chain shrinkage",
    vocab: "Landings, lot tagging, cold-chain logs, grading benches, export packs",
  },
  {
    name: "Fuel & petroleum distribution",
    universalPain: "Tank stock vs sales, driver dispatches, credit ageing",
    vocab: "Wet stock, dips, dispatches, driver runs, dealer AR, dry-loss",
  },
  {
    name: "Agro-processing",
    universalPain: "Raw-input to finished-goods mass balance",
    vocab: "Batches, yields, line scrap, packaging usage, finished-goods inventory",
  },
  {
    name: "Light manufacturing",
    universalPain: "Work-in-progress visibility and BOM compliance",
    vocab: "BOM, WIP, scrap, line OEE, finished-goods, dispatch",
  },
  {
    name: "Fleet & logistics",
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

        <div className={`max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ${bare ? "" : "mt-10"}`}>
          {industries.map((ind) => (
            <article
              key={ind.name}
              className="bg-white border border-gray-200/80 rounded-2xl p-5 flex flex-col hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="text-sm font-semibold text-gray-900 leading-tight font-[family-name:var(--font-display)]">
                {ind.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{ind.universalPain}</p>
              <p className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400 leading-relaxed">
                <span className="font-medium text-gray-500">We speak:</span> {ind.vocab}.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

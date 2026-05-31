const buyerProfiles = [
  {
    headline: "You run 20+ field or floor staff",
    body:
      "They can't all be in one office. Logging happens on phones, paper, or not at all. We replace it with one mobile-first system everyone can use.",
    accent: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600",
    icon: <UserIcon />,
  },
  {
    headline: "Your COO spends Sundays rebuilding numbers",
    body:
      "Operational data lives in 5 places. By the time it reaches the board, it's already wrong. We make the report write itself, every Friday at 5pm.",
    accent: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
    icon: <ChartIcon />,
  },
  {
    headline: "You've outgrown QuickBooks. SAP is too much.",
    body:
      "You need a real operations system, not an accounting tool. You don't need ERP enterprise sales. We sit in between — built for your operation.",
    accent: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
    icon: <BoxIcon />,
  },
  {
    headline: "Off-the-shelf ERPs don't speak your language",
    body:
      "You've built something real in a sector nobody else codes for. Generic ERP onboarding asks you to bend your operation to fit the software. We do the opposite.",
    accent: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600",
    icon: <LayersIcon />,
  },
];

export default function UseCases() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold text-blue-700 tracking-widest uppercase mb-3">
            For whom
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight font-[family-name:var(--font-display)]">
            Built for operators who&apos;ve outgrown their tools.
          </h2>
          <p className="mt-3 text-base text-gray-500">
            We don&apos;t target a role. We target a situation. If you recognise yourself in any
            of these, we&apos;d like to talk.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {buyerProfiles.map((p) => (
            <div
              key={p.headline}
              className={`p-5 sm:p-6 rounded-2xl border ${p.accent}`}
            >
              <div className={`${p.iconColor} mb-3`}>{p.icon}</div>
              <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug font-[family-name:var(--font-display)]">
                {p.headline}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UserIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
    </svg>
  );
}

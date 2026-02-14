const useCases = [
  {
    title: "Farm Managers",
    description:
      "Plan, track, and optimize operations across multiple sites. Weekly Gantt views and compliance dashboards give you full visibility.",
    accent: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    title: "Agricultural Enterprises",
    description:
      "Centralize data, ensure compliance, and forecast harvests. Enterprise-grade role-based access keeps teams aligned.",
    accent: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    title: "New Farm Ventures",
    description:
      "Turn land into a professionally managed operation. Our consultancy creates custom SOPs and deploys the software for you.",
    accent: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
];

export default function UseCases() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">
            Who it&apos;s for
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Built for every role in agriculture
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className={`p-8 rounded-2xl border ${uc.accent}`}
            >
              <div className={`${uc.iconColor} mb-4`}>{uc.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {uc.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {uc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

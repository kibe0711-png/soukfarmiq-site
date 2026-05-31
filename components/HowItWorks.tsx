const steps = [
  {
    number: "01",
    title: "Discovery — we listen to your operation",
    description:
      "We sit with you, your COO, and the people on the floor. We map how data moves through your business today — the spreadsheets, the WhatsApp groups, the paper, the gaps. One week. You get a written diagnosis of where time and money leak.",
    icon: <SearchIcon />,
  },
  {
    number: "02",
    title: "Process scoping — we name the modules",
    description:
      "We translate your operation into a system: what data is captured where, by whom, on what device, and how it flows into the weekly report. Two to four weeks. You get an SOP catalogue, a data model, and a build plan with milestones.",
    icon: <DocumentIcon />,
  },
  {
    number: "03",
    title: "System build — we ship modules every week",
    description:
      "We build in your colours, on your vocabulary, in your time zone. Working software every Friday. You see and use the system from week one. Four to twelve weeks depending on scope. Your team is part of the build, not handed it at the end.",
    icon: <CodeIcon />,
  },
  {
    number: "04",
    title: "Deploy and operate — we stay alongside",
    description:
      "We don't disappear at go-live. The system runs, your team uses it, we tune and extend. Weekly digests start landing in inboxes automatically. You get a software-engineering team that knows your business as well as you do.",
    icon: <SignalIcon />,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50/70">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold text-blue-700 tracking-widest uppercase mb-3">
            The Altiora method
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight leading-tight font-[family-name:var(--font-display)]">
            We digitise an ops business in{" "}
            <span className="text-blue-700">six to twelve weeks.</span>
          </h2>
          <p className="mt-4 text-base text-gray-500 leading-relaxed">
            Four steps, named milestones, working software every Friday. You stay in the loop —
            this is your operation, built on your vocabulary, in your timezone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-semibold text-gray-200 tabular-nums font-[family-name:var(--font-display)]">{step.number}</span>
                <div className="w-8 h-8 rounded-[10px] bg-blue-50 text-blue-700 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug font-[family-name:var(--font-display)]">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}
function DocumentIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
      />
    </svg>
  );
}
function SignalIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.348 14.651a3.75 3.75 0 0 1 0-5.303m5.304 0a3.75 3.75 0 0 1 0 5.303m-7.425 2.122a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}

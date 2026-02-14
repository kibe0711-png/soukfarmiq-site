const WA_LINK = "https://wa.me/447522196521?text=Hi%20Altiora%2C%20I%27d%20like%20to%20book%20a%20consultation%20for%20my%20farm.";

const steps = [
  {
    number: "01",
    title: "Assess",
    description:
      "We visit your farm, analyze your crops, soil conditions, and current operations to understand your needs.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Our team creates custom Standard Operating Procedures for labor, nutrition, and harvest — tailored to your crops.",
  },
  {
    number: "03",
    title: "Deploy",
    description:
      "Software configured to your farm, team trained on the ground, and ongoing support to ensure success.",
  },
];

export default function Consultancy() {
  return (
    <section id="consultancy" className="py-20 sm:py-28 bg-emerald-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-emerald-600 tracking-wide uppercase mb-3">
            Consultancy
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Don&apos;t know where to start?
            <br />
            We&apos;ll build it for you.
          </h2>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            Our agronomists and engineers create custom SOPs tailored to your
            crops, deploy the software, and train your team on the ground.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-5xl font-bold text-emerald-100">
                {step.number}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-all hover:shadow-lg"
        >
          Book a Consultation
          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

const steps = [
  {
    title: "Tell us what you need",
    text: "Search for properties, ask about a viewing, or share the unit you want to list.",
  },
  {
    title: "We organize the details",
    text: "The important information is clarified so renters and property owners can make better decisions.",
  },
  {
    title: "Move forward confidently",
    text: "Compare options, schedule next steps, and keep the rental journey practical.",
  },
];

export default function ServicesProcess() {
  return (
    <section className="bg-rental-bg-light px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-rental-primary">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-dark sm:text-4xl">
            A simpler path through property search
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-md border border-rental-border bg-white p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-rental-primary font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold text-brand-dark">
                {step.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

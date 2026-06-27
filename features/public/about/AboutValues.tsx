import { Handshake, SearchCheck, ShieldCheck } from "lucide-react";

const values = [
  {
    title: "Clarity",
    text: "We present property information in a way renters and owners can quickly understand.",
    icon: SearchCheck,
  },
  {
    title: "Trust",
    text: "We focus on reliable details, responsive communication, and practical verification.",
    icon: ShieldCheck,
  },
  {
    title: "Support",
    text: "We keep people guided from discovery to viewing, listing, and next steps.",
    icon: Handshake,
  },
];

export default function AboutValues() {
  return (
    <section className="bg-rental-bg-light px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-rental-primary">
            What guides us
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-dark sm:text-4xl">
            Values behind the platform
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-md border border-rental-border bg-white p-6"
            >
              <value.icon className="mb-5 h-8 w-8 text-rental-primary" />
              <h3 className="text-xl font-bold text-brand-dark">
                {value.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{value.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

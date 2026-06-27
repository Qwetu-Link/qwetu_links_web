import {
  CalendarCheck,
  ClipboardCheck,
  Home,
  KeyRound,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    title: "Rental Discovery",
    text: "Find apartments, homes, villas, offices, and shops with clear details for easier comparison.",
    icon: Home,
  },
  {
    title: "Property Listing",
    text: "Support for landlords and agents who want to present available units clearly and professionally.",
    icon: KeyRound,
  },
  {
    title: "Listing Verification",
    text: "Property information is organized around trust, location clarity, and practical rental details.",
    icon: ShieldCheck,
  },
  {
    title: "Viewing Coordination",
    text: "Help renters move from interest to viewing with fewer back-and-forth delays.",
    icon: CalendarCheck,
  },
  {
    title: "Tenant Enquiries",
    text: "Route questions about properties, pricing, and next steps to the right support channel.",
    icon: MessageCircle,
  },
  {
    title: "Rental Readiness",
    text: "Guide renters and property owners through the information needed before final decisions.",
    icon: ClipboardCheck,
  },
];

export default function ServicesGrid() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-rental-primary">
            What we do
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-dark sm:text-4xl">
            Services built around property decisions
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Whether you are searching for a place, listing a unit, or managing
            enquiries, our services keep the process organized and easy to act
            on.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-md border border-rental-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <service.icon className="mb-5 h-8 w-8 text-rental-primary" />
              <h3 className="text-xl font-bold text-brand-dark">
                {service.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

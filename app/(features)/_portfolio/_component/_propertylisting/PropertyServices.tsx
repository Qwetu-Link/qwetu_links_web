import { Home, KeyRound, ShieldCheck, Users } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Find Rentals",
    text: "Browse verified rental homes and apartments.",
  },
  {
    icon: KeyRound,
    title: "List Property",
    text: "Allow landlords to list units easily.",
  },
  {
    icon: Users,
    title: "Maintenance Management",
    text: "Manage tenants maintenance requests.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    text: "Build trust with approved listings.",
  },
];

export default function PropertyServices() {
  return (
    <section id="services" className="bg-rental-bg-light py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="mb-6 text-3xl font-bold text-brand-dark sm:text-4xl">
            Our Services
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-md bg-white p-6 ring-1 ring-rental-border"
              >
                <service.icon className="mb-4 h-6 w-6 text-rental-primary" />
                <h3 className="font-bold text-brand-dark">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{service.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-md bg-brand-dark p-8 text-white">
          <Home
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-5 -right-5 h-40 w-40 text-rental-primary/20"
          />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
            <h2 className="text-3xl font-bold">
              Want to rent, or list a property?
            </h2>
            <p className="mt-4 text-white/75">
              Connect with trusted landlords, agents, and property managers.
            </p>
            </div>

            <button className="mt-8 w-fit rounded-md bg-rental-primary px-6 py-3 font-semibold transition hover:bg-orange-600">
            Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

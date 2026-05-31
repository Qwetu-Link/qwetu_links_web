const stats = [
  { value: "6+", label: "Property categories" },
  { value: "47", label: "Kenyan counties supported" },
  { value: "24h", label: "Typical enquiry follow-up" },
  { value: "100%", label: "Focused on property support" },
];

export default function AboutStats() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-md border border-rental-border bg-white p-6 text-center"
          >
            <p className="text-3xl font-extrabold text-rental-primary">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-600">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { propertyTypes } from "@/utils/propertyData";
import Image from "next/image";

export default function PropertyTypes() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">
            Property Types
          </h2>
          <p className="mt-4 text-slate-600">
            Explore rentals and investment spaces by category, from apartments
            and family homes to offices, shops and villas
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {propertyTypes.map((type) => (
            <a
              key={type.title}
              href="#property-listing"
              className="group rounded-md bg-rental-bg-light p-3 transition hover:bg-rental-primary"
            >
              <div className="rounded-md bg-white p-6 text-center ring-1 ring-rental-border transition group-hover:ring-white/40">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-rental-primary bg-white">
                  <Image
                    src={type.icon}
                    alt={`${type.title} icon`}
                    width={44}
                    height={44}
                    className="h-11 w-11 object-contain"
                    unoptimized
                  />
                </div>
                <h3 className="font-semibold text-brand-dark">{type.title}</h3>
                {/* <p className="mt-2 text-sm font-medium text-rental-primary">
                  {type.count}
                </p> */}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

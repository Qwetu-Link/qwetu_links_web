import { ArrowLeft, CalendarCheck, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { propertyStats } from "../propertyData";

type Property = {
  id: number;
  slug: string;
  status: string;
  type: string;
  price: string;
  title: string;
  location: string;
  image: string;
  size: string;
  beds: string;
  baths: string;
  category: string;
};

export default function PropertyDetails({ property }: { property: Property }) {
  return (
    <main className="min-h-screen bg-gray-bg">
      <section className="bg-brand-dark px-4 py-10 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/property"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to properties
          </Link>
          <div className="mt-8 max-w-3xl">
            <p className="mb-3 inline-flex rounded-md bg-rental-primary px-3 py-1 text-sm font-semibold text-white">
              {property.status}
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              {property.title}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-white/75">
              <MapPin className="h-5 w-5 text-rental-primary" />
              {property.location}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-rental-border">
          <div className="relative h-[420px]">
            <Image
              src={property.image}
              alt={property.title}
              fill
              sizes="(min-width: 1024px) 760px, 100vw"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-brand-dark">
              Property Overview
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              This {property.type.toLowerCase()} is located in{" "}
              {property.location} and is available for viewing. The listing has
              clear rental details, practical amenities, and a convenient
              location for tenants comparing properties in Kenya.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {propertyStats.map((stat) => (
                <div
                  key={stat.key}
                  className="rounded-md border border-rental-border bg-rental-bg-light p-4"
                >
                  <stat.icon className="mb-3 h-5 w-5 text-rental-primary" />
                  <p className="font-semibold text-brand-dark">
                    {property[stat.key as "size" | "beds" | "baths"]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-md bg-white p-6 shadow-sm ring-1 ring-rental-border">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Monthly Rent
          </p>
          <p className="mt-2 text-3xl font-bold text-rental-primary">
            {property.price}
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-brand-dark">Type:</span>{" "}
              {property.type}
            </p>
            <p>
              <span className="font-semibold text-brand-dark">Location:</span>{" "}
              {property.location}
            </p>
            <p>
              <span className="font-semibold text-brand-dark">Status:</span>{" "}
              {property.status}
            </p>
          </div>
          <button
            type="button"
            className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-rental-primary font-semibold text-white transition hover:bg-orange-600"
          >
            <CalendarCheck className="h-4 w-4" />
            Book Viewing
          </button>
        </aside>
      </section>
    </main>
  );
}

import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  DoorOpen,
  Droplets,
  Dumbbell,
  Leaf,
  ParkingCircle,
  MapPin,
  ShieldCheck,
  Wifi,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { heroImages, propertyStats } from "../propertyData";
import type { Property } from "@/app/(features)/(dashboard)/admin/property/definations";

const fallbackAmenities = [
  { title: "Secure access", icon: "security" },
  { title: "Viewing support", icon: "support" },
  { title: "Clear rental details", icon: "details" },
  { title: "Reliable location information", icon: "location" },
  { title: "Property support", icon: "support" },
  { title: "Flexible rental options", icon: "details" },
];

const amenityIcons = {
  balcony: DoorOpen,
  details: CheckCircle2,
  garden: Leaf,
  location: MapPin,
  parking: ParkingCircle,
  security: ShieldCheck,
  support: CalendarCheck,
  water: Droplets,
  wifi: Wifi,
  power: Zap,
  gym: Dumbbell,
};

type PropertyStatKey = "square_meters" | "bedrooms" | "bathrooms";

export default function PropertyDetails({
  property,
}: {
  property: Property;
}) {
  const gallery = [property.image, ...heroImages.slice(0, 3)];
  const highlights = [
    `${property.apartment_type} in ${property.location}`,
    `${property.status} with viewing support`,
    property.description,
  ].map((highlight, index) => ({
      title: highlight,
      image: gallery[index % gallery.length],
    }));
  const amenities = fallbackAmenities;

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
              {property.name}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-white/75">
              <MapPin className="h-5 w-5 text-rental-primary" />
              {property.location}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-8">
          <section className="overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-rental-border">
            <div className="relative h-[420px]">
              <Image
                src={property.image}
                alt={property.name}
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
                {property.description}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {propertyStats.map((stat) => (
                  <div
                    key={stat.key}
                    className="rounded-md border border-rental-border bg-rental-bg-light p-4"
                  >
                    <stat.icon className="mb-3 h-5 w-5 text-rental-primary" />
                    <p className="font-semibold text-brand-dark">
                      {property[stat.key as PropertyStatKey]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-md bg-white p-6 shadow-sm ring-1 ring-rental-border sm:p-8">
            <h2 className="text-2xl font-bold text-brand-dark">Highlights</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="overflow-hidden rounded-md border border-rental-border bg-white"
                >
                  <div className="relative h-40 bg-rental-bg-light">
                    <Image
                      src={highlight.image}
                      alt={highlight.title}
                      fill
                      sizes="(min-width: 1024px) 250px, 100vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold leading-6 text-brand-dark">
                      {highlight.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-md bg-white p-6 shadow-sm ring-1 ring-rental-border sm:p-8">
            <h2 className="text-2xl font-bold text-brand-dark">Amenities</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {amenities.map((amenity) => {
                const Icon =
                  amenityIcons[amenity.icon as keyof typeof amenityIcons] ??
                  CheckCircle2;

                return (
                  <p
                    key={amenity.title}
                    className="flex items-center gap-3 rounded-md border border-rental-border px-4 py-3 text-sm font-semibold text-brand-dark"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-rental-bg-light text-rental-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    {amenity.title}
                  </p>
                );
              })}
            </div>
          </section>

          <section className="rounded-md bg-white p-6 shadow-sm ring-1 ring-rental-border sm:p-8">
            <h2 className="text-2xl font-bold text-brand-dark">Gallery</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {gallery.map((image, index) => (
                <div
                  key={image}
                  className={`relative overflow-hidden rounded-md bg-rental-bg-light ${
                    index === 0 ? "h-72 sm:col-span-2" : "h-52"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${property.name} gallery ${index + 1}`}
                    fill
                    sizes={
                      index === 0
                        ? "(min-width: 1024px) 760px, 100vw"
                        : "(min-width: 1024px) 380px, 100vw"
                    }
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </section>

        </div>

        <aside className="h-fit rounded-md bg-white p-6 shadow-sm ring-1 ring-rental-border">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Occupancy Rate
          </p>
          <p className="mt-2 text-3xl font-bold text-rental-primary">
            {property.occupany_rate}%
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-brand-dark">Type:</span>{" "}
              {property.apartment_type}
            </p>
            <p>
              <span className="font-semibold text-brand-dark">Address:</span>{" "}
              {property.address}
            </p>
            <p>
              <span className="font-semibold text-brand-dark">Location:</span>{" "}
              {property.location}
            </p>
            <p>
              <span className="font-semibold text-brand-dark">Status:</span>{" "}
              {property.status}
            </p>
            <p>
              <span className="font-semibold text-brand-dark">Units:</span>{" "}
              {property.unit}
            </p>
          </div>
          <button
            type="button"
            className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-rental-primary font-semibold text-white transition hover:bg-orange-600"
          >
            <CalendarCheck className="h-4 w-4" />
            Book Viewing
          </button>
          <Link
            href="#"
            className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-rental-primary font-semibold text-rental-primary transition hover:bg-rental-bg-light"
          >
            <DoorOpen className="h-4 w-4" />
            Ask About Units
          </Link>
        </aside>
      </section>
    </main>
  );
}

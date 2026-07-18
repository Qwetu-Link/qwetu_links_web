"use client";

import { heroImages, propertyTypes } from "@/utils/propertyData";
import { usePublicProperties } from "@/hooks/useProperty";
import type { Property } from "@/types/property.definations";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Eye,
  Home,
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type PropertyFilters = {
  keyword: string;
  apartmentType: string;
  county: string;
};

const fallbackListings = [
  heroImages[0],
  heroImages[1],
  heroImages[2],
];

const serviceHighlights = [
  {
    icon: Search,
    title: "Smart Search",
    text: "Filter homes by area, type, budget, and essentials.",
  },
  {
    icon: Building2,
    title: "Verified Listings",
    text: "Clear property details from trusted managers.",
  },
  {
    icon: ShieldCheck,
    title: "Guided Viewing",
    text: "Book a viewing from each property page.",
  },
  {
    icon: Home,
    title: "Move-in Ready",
    text: "Compare units, rent, and amenities faster.",
  },
];

function getPropertyImage(property?: Property, index = 0) {
  return (
    property?.images?.find((image) => image.url?.trim())?.url ??
    fallbackListings[index % fallbackListings.length]
  );
}

function formatRent(value?: string) {
  const amount = Number(value);

  if (!value || Number.isNaN(amount) || amount <= 0) {
    return "Contact for rent";
  }

  return `KES ${amount.toLocaleString("en-KE")}`;
}

export default function PropertyPage({
  listingLimit,
}: {
  listingLimit?: number;
}) {
  const { data: propertyData } = usePublicProperties();
  const propertyList = propertyData?.data ?? [];
  const featuredProperties = propertyList.slice(0, listingLimit ?? 6);
  const heroProperty = propertyList[0];
  const heroImage = getPropertyImage(heroProperty, 0);
  const previewImages = [0, 1, 2].map((index) =>
    getPropertyImage(propertyList[index], index),
  );
  const visibleListings =
    featuredProperties.length > 0 ? featuredProperties : [];

  return (
    <main className="min-h-screen bg-[#f6f3ff] text-slate-950">
      <section className="px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="max-w-2xl">
            <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Easily Find the Perfect Home for You Today
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Discover refined properties with detailed insights, real images,
              useful amenities, and simple viewing requests.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#property-listing"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-[#5b3df5] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#492bd8]"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex h-11 items-center rounded-md border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-[#5b3df5] hover:text-[#5b3df5]"
              >
                Learn More
              </Link>
            </div>

            {/* <div className="mt-9 grid max-w-lg grid-cols-3 divide-x divide-violet-100 rounded-md bg-white p-5 shadow-sm ring-1 ring-violet-100">
              {[
                ["12K+", "Property Listings"],
                ["8K+", "Happy Clients"],
                ["25+", "Award Winning"],
              ].map(([value, label]) => (
                <div key={label} className="px-3 first:pl-0 last:pr-0">
                  <p className="text-2xl font-extrabold text-slate-950">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div> */}
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-md bg-white shadow-xl ring-1 ring-violet-100 sm:min-h-[520px]">
            <Image
              src={heroImage}
              alt={heroProperty?.name ?? "Featured property"}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
              unoptimized
            />
            {heroProperty && (
              <div className="absolute inset-x-5 bottom-5 rounded-md bg-white/90 p-4 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase text-[#5b3df5]">
                  Featured today
                </p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-950">
                      {heroProperty.name}
                    </h2>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="h-4 w-4 text-[#5b3df5]" />
                      {heroProperty.location}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-slate-950">
                    {formatRent(heroProperty.rentAmount)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="property-listing" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">
                Featured Listings Chosen Just for You
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Compare homes with clear prices, locations, room details, and
                direct access to the full property page.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Featured", "New Listed", "Top Rated"].map((tab, index) => (
                <span
                  key={tab}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${index === 0
                      ? "bg-[#5b3df5] text-white"
                      : "bg-[#f6f3ff] text-slate-600"
                    }`}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          {visibleListings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleListings.map((property, index) => (
                <article
                  key={property.slug}
                  className="overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={getPropertyImage(property, index)}
                      alt={property.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 hover:scale-105"
                      unoptimized
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#5b3df5] shadow-sm">
                      {property.apartmentType}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-lg font-extrabold text-slate-950">
                      {formatRent(property.rentAmount)}
                    </p>
                    <h3 className="mt-2 text-base font-bold text-slate-900">
                      {property.name}
                    </h3>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="h-4 w-4 text-[#5b3df5]" />
                      {property.location}
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <BedDouble className="h-4 w-4 text-[#5b3df5]" />
                        {property.bedrooms} beds
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bath className="h-4 w-4 text-[#5b3df5]" />
                        {property.bathrooms} baths
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Home className="h-4 w-4 text-[#5b3df5]" />
                        {property.squareMeters} m2
                      </span>
                    </div>
                    <Link
                      href={`/property/${property.slug}`}
                      className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#5b3df5] text-sm font-bold text-[#5b3df5] transition hover:bg-[#5b3df5] hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-violet-200 bg-[#f6f3ff] px-6 py-12 text-center">
              <h3 className="text-xl font-bold text-slate-950">
                No matching properties found
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-slate-600">
                Check back soon for available rentals and featured homes.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 rounded-md bg-[#180b3f] p-6 text-white sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold">
              Find Your Dream Home with Ease Today
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
              Explore refined listings, compare details quickly, and move from
              browsing to booking with confidence.
            </p>
            <Link
              href="/property"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-[#5b3df5] px-5 text-sm font-bold text-white transition hover:bg-[#6e55ff]"
            >
              See All Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {previewImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative aspect-[4/3] overflow-hidden rounded-md bg-white/10"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18vw, 30vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaff] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceHighlights.map((service) => (
            <div
              key={service.title}
              className="rounded-md bg-white p-5 text-center shadow-sm ring-1 ring-violet-100"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f0ecff] text-[#5b3df5]">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-extrabold text-slate-950">
                {service.title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-950">
                Browse by Property Type
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Jump into the spaces that match how you want to live.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {propertyTypes.map((type) => (
              <a
                key={type.title}
                href="#property-listing"
                className="flex items-center gap-4 rounded-md border border-slate-200 bg-white p-4 transition hover:border-[#5b3df5] hover:shadow-md"
              >
                <Image
                  src={type.icon}
                  alt=""
                  width={42}
                  height={42}
                  className="h-10 w-10 object-contain"
                  unoptimized
                />
                <div>
                  <h3 className="font-bold text-slate-950">{type.title}</h3>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Explore available spaces
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

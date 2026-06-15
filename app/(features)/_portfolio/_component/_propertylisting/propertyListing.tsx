"use client";

import { CalendarCheck, Eye, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { propertyStats } from "../propertyData";
import type { PropertyFilters } from "./propertyPage";
import { Property } from "@/app/(features)/(dashboard)/admin/property/definations";

const tabs = [
  { label: "Featured", value: "featured" },
  { label: "For Rent", value: "rent" },
];

type PropertyListingProps = {
  filters: PropertyFilters;
  limit?: number;
  showBrowseMore?: boolean;
  properties: Property[];
};

export default function PropertyListing({
  filters,
  limit,
  showBrowseMore = true,
  properties,
}: PropertyListingProps) {
  const [activeTab, setActiveTab] = useState("featured");

  const visibleListings = useMemo(() => {
    const keyword = filters.keyword.trim().toLowerCase();

    const filteredListings = (properties ?? []).filter((property) => {
      const matchesTab =
        activeTab === "featured" || property.apartmentType === activeTab;

      const matchesType =
        !filters.apartmentType ||
        property.apartmentType === filters.apartmentType;

      const matchesCounty =
        !filters.county ||
        property.location.toLowerCase().includes(filters.county.toLowerCase());

      const matchesKeyword =
        !keyword ||
        [property.name, property.apartmentType, property.location]
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      return matchesTab && matchesType && matchesCounty && matchesKeyword;
    });

    return typeof limit === "number"
      ? filteredListings.slice(0, limit)
      : filteredListings;
  }, [activeTab, filters, limit, properties]);

  return (
    <section id="property-listing" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">
              Property Listing
            </h2>
            <p className="mt-4 text-slate-600">
              Discover featured properties available for rent, with clear
              pricing, location details, and the essential amenities you need to
              compare options quickly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-md border px-5 py-2.5 text-sm font-semibold transition ${
                  activeTab === tab.value
                    ? "border-rental-primary bg-rental-primary text-white"
                    : "border-rental-primary text-rental-primary hover:bg-rental-bg-light"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {visibleListings.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {visibleListings.map((property) => (
              <article
                key={property.slug}
                className="overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-rental-border transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={
                      property.images?.[0]?.url &&
                      property.images[0].url.trim() !== ""
                        ? property.images[0].url
                        : "/images/placeholder.svg"
                    }
                    alt={property.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 hover:scale-105"
                    unoptimized
                  />
                  <span className="absolute left-4 top-4 rounded-md bg-rental-primary px-3 py-1 text-sm font-medium text-white">
                    {property.status}
                  </span>
                  <span className="absolute bottom-0 left-4 rounded-t-md bg-white px-3 py-1 text-sm font-medium text-rental-primary">
                    {property.apartmentType}
                  </span>
                </div>
                <div className="p-6 pb-4">
                  {/* <p className="mb-3 text-xl font-bold text-rental-primary">
                  {property.price}/month
                </p> */}
                  <h3 className="mb-3 text-lg font-bold text-brand-dark">
                    {property.name}
                  </h3>
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-rental-primary" />
                    {property.location}
                  </p>
                </div>
                <div className="grid grid-cols-3 border-t border-rental-border text-sm text-slate-600">
                  {propertyStats.map((stat) => (
                    <div
                      key={stat.key}
                      className="flex items-center justify-center gap-2 border-r border-rental-border px-2 py-3 last:border-r-0"
                    >
                      <stat.icon className="h-4 w-4 shrink-0 text-rental-primary" />
                      <span>
                        {
                          property[
                            stat.key as
                              | "squareMeters"
                              | "bedrooms"
                              | "bathrooms"
                          ]
                        }
                      </span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-rental-border p-4">
                  <Link
                    href={`/property/${property.slug}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-rental-primary px-3 text-sm font-semibold text-rental-primary transition hover:bg-rental-bg-light"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Link>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-rental-primary px-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    Book
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-rental-border bg-rental-bg-light px-6 py-12 text-center">
            <h3 className="text-xl font-bold text-brand-dark">
              No matching properties found
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              Try a different keyword, property type, or county to see more
              available rentals.
            </p>
          </div>
        )}

        {showBrowseMore && (
          <div className="mt-12 text-center">
            <Link
              href="/property"
              className="rounded-md bg-rental-primary px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Browse More Property
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

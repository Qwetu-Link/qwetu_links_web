"use client";

import { Bath, BedDouble, Eye, Home, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PropertyFilters } from "./propertyPage";
import { Property } from "@/types/property.definations";

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

function getPropertyImage(property: Property) {
  return (
    property.images?.find((image) => image.url?.trim())?.url ??
    "/images/placeholder.svg"
  );
}

function formatRent(value?: string) {
  const amount = Number(value);

  if (!value || Number.isNaN(amount) || amount <= 0) {
    return "Contact for rent";
  }

  return `KES ${amount.toLocaleString("en-KE")}`;
}

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
    <section id="property-listing" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">
              Featured Listings Chosen Just for You
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Discover featured properties available for rent, with clear
              pricing, location details, and the essential amenities you need to
              compare options quickly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeTab === tab.value
                    ? "bg-[#5b3df5] text-white"
                    : "bg-[#f6f3ff] text-slate-600 hover:text-[#5b3df5]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {visibleListings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleListings.map((property) => (
              <article
                key={property.slug}
                className="overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={getPropertyImage(property)}
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
              Try a different keyword, property type, or county to see more
              available rentals.
            </p>
          </div>
        )}

        {showBrowseMore && (
          <div className="mt-12 text-center">
            <Link
              href="/property"
              className="rounded-md bg-[#5b3df5] px-8 py-3 font-semibold text-white transition hover:bg-[#492bd8]"
            >
              Browse More Property
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

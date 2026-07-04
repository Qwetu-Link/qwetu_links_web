"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { Building2, Plus } from "lucide-react";
import { useDebounce } from "use-debounce";

import PropertyListings from "./PropertyListing";
import UnitListing from "./UnitListing";

import { useGetProperties } from "@/hooks/useProperty";
import { Property } from "@/types/property.definations";

export default function UnitsPage() {
  const [page] = useState(1);

  // Search only
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const { data: properties } = useGetProperties(page, debouncedSearch);

  const listing = useMemo<Property[]>(
    () => properties?.data ?? [],
    [properties]
  );

  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);

  const [showDetail, setShowDetail] = useState(false);

  // Active property
  const activeProperty =
    selectedProperty &&
      listing.some((p) => p.id === selectedProperty.id)
      ? selectedProperty
      : listing[0] ?? null;

  if (!properties) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      {listing.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="max-w-sm text-center">
            <Building2
              className="mx-auto mb-4 text-gray-300"
              size={50}
            />

            <h3 className="text-lg font-semibold">
              {search
                ? "No matching properties"
                : "No properties available"}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {search
                ? "Try a different search term."
                : "Create a property first before managing units."}
            </p>

            {!search && (
              <Link
                href="/admin/property"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                <Plus size={16} />
                Go to Properties
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          {/* Left */}
          <div className={`${showDetail ? "hidden" : "flex"} md:flex`}>
            <Suspense fallback={null}>
              <PropertyListings
                listings={listing}
                selectedId={activeProperty?.id ?? null}
                search={search}
                onSearchChange={setSearch}
                onSelect={(property) => {
                  setSelectedProperty(property);
                  setShowDetail(true);
                }}
              />
            </Suspense>
          </div>

          {/* Right */}
          <div
            className={`${showDetail ? "flex" : "hidden"} min-h-0 flex-1 overflow-hidden md:flex`}
          >
            <Suspense fallback={null}>
              {activeProperty ? (
                <UnitListing
                  key={activeProperty.id}
                  property={activeProperty}
                  onBack={() => {
                    setShowDetail(false);
                  }}
                />
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <div className="text-center">
                    <Building2
                      className="mx-auto mb-4 text-gray-300"
                      size={48}
                    />

                    <p className="text-gray-500">
                      Select a property to manage its units.
                    </p>
                  </div>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { Suspense, useState } from "react";
import PropertyListings from "./PropertyListing";
import UnitListing from "./UnitListing";
import { useGetProperties } from "@/hooks/useProperty";
import { Property } from "@/types/property.definations";
import { Building2, Plus } from "lucide-react";
import Link from "next/link";

export default function UnitsPage() {
  const { data: properties, isLoading } = useGetProperties();
  const listing: Property[] = properties?.data ?? [];

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [showDetail, setShowDetail] = useState(false);

  const activeProperty = selectedProperty ?? listing[0] ?? null;
  

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <div className="text-center">
          <Building2 className="mx-auto mb-3 text-gray-300" size={40} />
          <p className="text-sm font-medium text-gray-500">
            Loading properties...
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Please wait while we fetch your data.
          </p>
        </div>
      </div>
    );
  }

  if (listing.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <div className="text-center max-w-sm px-6">
          <Building2 className="mx-auto mb-4 text-gray-200" size={48} />
          <h3 className="text-base font-semibold text-gray-700">
            No properties yet
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            You havent added any properties. Head over to the Properties section
            to create one, then come back here to manage its units.
          </p>
          <Link
            href="/admin/property"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={15} />
            Go to Properties
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full min-h-0 flex-col bg-white md:flex-row">
      <div className={`${showDetail ? "hidden" : "flex"} md:flex`}>
        <Suspense>
          <PropertyListings
            listings={listing}
            selectedId={activeProperty?.id ?? null}
            onSelect={(p) => {
              setSelectedProperty(p);
              setShowDetail(true);
            }}
          />
        </Suspense>
      </div>
      <div
        className={`${showDetail ? "flex" : "hidden"} min-h-0 flex-1 overflow-hidden md:flex`}
      >
        <Suspense>
          {selectedProperty ? (
            <UnitListing
              key={selectedProperty.id}
              property={selectedProperty}
              onBack={() => {
                setShowDetail(false);
                setSelectedProperty(null);
              }}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-gray-50 p-8 text-center">
              <Building2 className="text-gray-200" size={52} />
              <div>
                <h3 className="text-sm font-semibold text-gray-600">
                  No property selected
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  Pick a property from the list on the left to view and manage
                  its units.
                </p>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}

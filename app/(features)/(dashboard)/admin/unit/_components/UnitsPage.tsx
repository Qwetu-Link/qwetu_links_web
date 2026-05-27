"use client";

import { Suspense, useState } from "react";
import PropertyListings from "./PropertyListing";
import UnitListing from "./UnitListing";
import type { UnitProperty } from "../definations";

const popularListings: UnitProperty[] = [
  {
    id: "1",
    name: "Ultra Modern Apartment with City View",
    location: "Riverside, Nairobi",
    units: 12,
    occupancyRate: 92,
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    id: "2",
    name: "Garden Court Studio Residences",
    location: "Kilimani, Nairobi",
    units: 24,
    occupancyRate: 58,
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    id: "3",
    name: "Westlands Executive Suites",
    location: "Westlands, Nairobi",
    units: 18,
    occupancyRate: 74,
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    id: "4",
    name: "Westlands Executive Suites",
    location: "Westlands, Nairobi",
    units: 4,
    occupancyRate: 74,
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
];

export default function UnitsPage() {
  const [selectedProperty, setSelectedProperty] = useState<UnitProperty>(
    popularListings[0],
  );

  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white md:flex-row">
      <div className={`${showDetail ? "hidden" : "flex"} md:flex`}>
        <Suspense>
          <PropertyListings
            listings={popularListings}
            selectedId={selectedProperty.id}
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
          <UnitListing
            property={selectedProperty!}
            onBack={() => setShowDetail(false)}
          />
        </Suspense>
      </div>
    </div>
  );
}

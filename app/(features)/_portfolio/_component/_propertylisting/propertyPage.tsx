"use client";

import { useState } from "react";
import PropertyAbout from "./PropertyAbout";
import PropertyCallToAction from "./PropertyCallToAction";
import PropertyFooter from "./PropertyFooter";
import PropertyHero from "./PropertyHero";
import PropertyListing from "./propertyListing";
import PropertySearch from "./PropertySearch";
import PropertyTypes from "./PropertyTypes";

export type PropertyFilters = {
  keyword: string;
  type: string;
  county: string;
};

export default function PropertyPage({ listingLimit }: { listingLimit?: number }) {
  const [filters, setFilters] = useState<PropertyFilters>({
    keyword: "",
    type: "",
    county: "",
  });

  return (
    <main className="min-h-screen bg-white">
      <PropertyHero />
      <PropertyTypes />
      <PropertyAbout />
      <PropertySearch filters={filters} onFiltersChange={setFilters} />
      <PropertyListing filters={filters} limit={listingLimit} />
      <PropertyCallToAction />
      <PropertyFooter />
    </main>
  );
}

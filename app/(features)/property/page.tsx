"use client";

import { useState } from "react";
import PropertySearch from "../_portfolio/_component/_propertylisting/PropertySearch";
import PropertyListing from "../_portfolio/_component/_propertylisting/propertyListing";
import type { PropertyFilters } from "../_portfolio/_component/_propertylisting/propertyPage";
import PropertyPageHeroSection from "../_portfolio/_component/_propertylisting/PropertyPageHeroSection";

export default function PropertyPage() {
  const [filters, setFilters] = useState<PropertyFilters>({
    keyword: "",
    apartment_type: "",
    county: "",
  });
  return (
    <div>
      <PropertyPageHeroSection />
      <PropertySearch filters={filters} onFiltersChange={setFilters} />
      <PropertyListing filters={filters} showBrowseMore={false} />
    </div>
  );
}

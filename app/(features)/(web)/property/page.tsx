"use client";

import { useState } from "react";
import PropertyListing from "../../../../features/public/property/propertyListing";
import type { PropertyFilters } from "../../../../features/public/property/propertyPage";
import PropertyPageHeroSection from "../../../../features/public/property/PropertyHeroSection";
import { usePublicProperties } from "@/hooks/useProperty";
import PropertySearch from "../../../../features/public/property/PropertySearch";

export default function PropertyPage() {
  const [filters, setFilters] = useState<PropertyFilters>({
    keyword: "",
    apartmentType: "",
    county: "",
  });

  const { data: properties } = usePublicProperties();
    const propertyList = properties?.data ?? [];

  
  return (
    <div>
      <PropertyPageHeroSection />
      <PropertySearch filters={filters} onFiltersChange={setFilters} properties={propertyList} />
      <PropertyListing filters={filters} showBrowseMore={false}  properties={propertyList}/>
    </div>
  );
}

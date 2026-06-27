"use client";

import { useState } from "react";
import PropertyListing from "../_portfolio/_component/_propertylisting/propertyListing";
import type { PropertyFilters } from "../_portfolio/_component/_propertylisting/propertyPage";
import PropertyPageHeroSection from "../_portfolio/_component/_propertylisting/PropertyHeroSection";
import { usePublicProperties } from "@/hooks/useProperty";
import PropertySearch from "../_portfolio/_component/_propertylisting/PropertySearch";

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

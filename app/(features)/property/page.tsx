"use client";

import { useState } from "react";
import PropertyListing from "../_portfolio/_component/_propertylisting/propertyListing";
import type { PropertyFilters } from "../_portfolio/_component/_propertylisting/propertyPage";
import PropertyPageHeroSection from "../_portfolio/_component/_propertylisting/PropertyPageHeroSection";
import { usePublicProperties } from "../(dashboard)/admin/property/property.services";
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

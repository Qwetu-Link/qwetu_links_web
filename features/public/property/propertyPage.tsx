"use client";

import PropertyAbout from "./PropertyAbout";
import PropertyHero from "./PropertyHero";
import PropertyTypes from "./PropertyTypes";
import PropertyServices from "./PropertyServices";
import { usePublicProperties } from "@/hooks/useProperty";
import PropertyListing from "./propertyListing";

export type PropertyFilters = {
  keyword: string;
  apartmentType: string;
  county: string;
};

export default function PropertyPage({
  listingLimit,
}: {
  listingLimit?: number;
}) {
  const filters: PropertyFilters = {
    keyword: "",
    apartmentType: "",
    county: "",
  };

  const { data: propertyData } = usePublicProperties();
  const propertyList = propertyData?.data ?? [];
 
  return (
    <main className="min-h-screen bg-white">
      <PropertyHero />
      <PropertyTypes />
      <PropertyAbout />
      <PropertyListing filters={filters} limit={listingLimit} properties={propertyList} />
      <PropertyServices />
      {/* <PropertyCallToAction /> */}
    </main>
  );
}

"use client";

import PropertyAbout from "./PropertyAbout";
// import PropertyCallToAction from "./PropertyCallToAction";
import PropertyHero from "./PropertyHero";
import PropertyListing from "./propertyListing";
import PropertyTypes from "./PropertyTypes";
import PropertyServices from "./PropertyServices";
import { usePublicProperties } from "@/app/(features)/(dashboard)/admin/property/property.services";

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

  const { data: properties } = usePublicProperties();
  const propertyList = properties?.data ?? [];

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

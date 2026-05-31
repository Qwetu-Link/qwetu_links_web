import PropertyAbout from "./PropertyAbout";
// import PropertyCallToAction from "./PropertyCallToAction";
import PropertyHero from "./PropertyHero";
import PropertyListing from "./propertyListing";
import PropertyTypes from "./PropertyTypes";
import PropertyServices from "./PropertyServices";

export type PropertyFilters = {
  keyword: string;
  type: string;
  county: string;
};

export default function PropertyPage({ listingLimit }: { listingLimit?: number }) {
  const filters: PropertyFilters = {
    keyword: "",
    type: "",
    county: "",
  };

  return (
    <main className="min-h-screen bg-white">
      <PropertyHero />
      <PropertyTypes />
      <PropertyAbout />
      <PropertyListing filters={filters} limit={listingLimit} />
      <PropertyServices/>
      {/* <PropertyCallToAction /> */}
    </main>
  );
}

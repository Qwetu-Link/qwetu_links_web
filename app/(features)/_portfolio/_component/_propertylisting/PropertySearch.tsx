import { Search } from "lucide-react";
import { kenyaCounties, propertyListings } from "../propertyData";
import type { PropertyFilters } from "./propertyPage";

type PropertySearchProps = {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
};

const propertyTypes = Array.from(
  new Set(propertyListings.map((property) => property.type)),
);

export default function PropertySearch({
  filters,
  onFiltersChange,
}: PropertySearchProps) {
  const updateFilter = (key: keyof PropertyFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSearch = () => {
    document
      .getElementById("property-listing")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-rental-primary px-4 py-9 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-[1fr_auto]">
        <div className="grid gap-3 md:grid-cols-3">
          <input
            value={filters.keyword}
            onChange={(event) => updateFilter("keyword", event.target.value)}
            className="h-14 rounded-md border-0 bg-white px-4 text-sm text-brand-dark outline-none ring-1 ring-transparent placeholder:text-slate-500 focus:ring-slate-900/15"
            placeholder="Search by property or area"
            type="text"
          />
          <select
            value={filters.type}
            onChange={(event) => updateFilter("type", event.target.value)}
            className="h-14 rounded-md border-0 bg-white px-4 text-sm text-brand-dark outline-none ring-1 ring-transparent focus:ring-slate-900/15"
          >
            <option value="">All Property Types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={filters.county}
            onChange={(event) => updateFilter("county", event.target.value)}
            className="h-14 rounded-md border-0 bg-white px-4 text-sm text-brand-dark outline-none ring-1 ring-transparent focus:ring-slate-900/15"
          >
            <option value="">All Counties</option>
            {kenyaCounties.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-brand-dark px-8 font-semibold text-white transition hover:bg-slate-800"
          type="button"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </div>
    </section>
  );
}

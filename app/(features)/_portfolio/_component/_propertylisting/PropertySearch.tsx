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
    <section className="relative z-20 -mt-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-md border border-rental-border bg-white p-4 shadow-lg shadow-slate-900/10 sm:p-5">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-rental-primary">
              Search Properties
            </p>
            <h2 className="text-xl font-bold text-brand-dark">
              Refine your next rental
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Filter by keyword, type, or county.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Keyword
            </span>
            <input
              value={filters.keyword}
              onChange={(event) => updateFilter("keyword", event.target.value)}
              className="h-12 w-full rounded-md border border-rental-border bg-rental-bg-light px-4 text-sm text-brand-dark outline-none placeholder:text-slate-500 focus:border-rental-primary focus:bg-white"
              placeholder="Property or area"
              type="text"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Property Type
            </span>
            <select
              value={filters.type}
              onChange={(event) => updateFilter("type", event.target.value)}
              className="h-12 w-full rounded-md border border-rental-border bg-rental-bg-light px-4 text-sm text-brand-dark outline-none focus:border-rental-primary focus:bg-white"
            >
              <option value="">All Types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              County
            </span>
            <select
              value={filters.county}
              onChange={(event) => updateFilter("county", event.target.value)}
              className="h-12 w-full rounded-md border border-rental-border bg-rental-bg-light px-4 text-sm text-brand-dark outline-none focus:border-rental-primary focus:bg-white"
            >
              <option value="">All Counties</option>
              {kenyaCounties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </label>

        <button
          onClick={handleSearch}
          className="inline-flex h-12 items-center justify-center gap-2 self-end rounded-md bg-rental-primary px-6 text-sm font-semibold text-white transition hover:bg-orange-600"
          type="button"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
        </div>
      </div>
    </section>
  );
}

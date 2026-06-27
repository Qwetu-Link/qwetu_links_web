import { Search} from "lucide-react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/types/property.definations";
import { useState } from "react";

interface PropertyListingsProps {
  listings: Property[];
  selectedId: string | null;
  onSelect: (property: Property) => void;
}

export default function PropertyListings({
  listings,
  selectedId,
  onSelect,
}: PropertyListingsProps) {
  const [query, setQuery] = useState("");
  const searchFilter = listings.filter((p) =>
    [p.name, p.address, p.location]
      .join("")
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <div className="z-20 flex h-full w-full flex-col border-r border-blue-200 bg-gray-50 md:w-[420px]">
      <div className="px-5 pt-7 pb-4 shrink-0">
        <p className="text-muted-foreground mt-1">
          Explore Units about your property
        </p>
      </div>

      {/* Search and Filter */}
      <div className="px-4 mb-4 shrink-0 flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Here..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-blue-200 rounded-xl text-sm text-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        {/* <button className="w-11 h-11 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-zinc-500 hover:text-zinc-700 hover:border-blue-300 transition-all shrink-0">
          <SlidersHorizontal size={18} />
        </button> */}
      </div>

      {/* Property list */}
      <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto p-3">
        {searchFilter.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 py-16 text-center">
            <Search size={32} className="text-gray-200" />
            <p className="text-sm font-medium text-gray-500">
              No properties found
            </p>
            <p className="text-xs text-gray-400">
              Try searching by a different name or location.
            </p>
          </div>
        ) : (
          searchFilter.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSelected={selectedId === property.id}
              onClick={() => onSelect(property)}
            />
          ))
        )}
      </div>
    </div>
  );
}

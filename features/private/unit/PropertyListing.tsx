import { Search } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/types/property.definations";

interface PropertyListingsProps {
  listings: Property[];
  selectedId: string | null;
  onSelect: (property: Property) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function PropertyListings({
  listings,
  selectedId,
  search,
  onSearchChange,

  onSelect,
}: PropertyListingsProps) {
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
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Property..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-blue-200 rounded-xl text-sm text-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Property list */}
      <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto p-3">
        {listings.length === 0 ? (
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
          listings.map((property) => (
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

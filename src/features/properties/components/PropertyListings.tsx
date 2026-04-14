import { Search, SlidersHorizontal } from "lucide-react";
import PropertyCard from "./PropertyCard";
import type { Property } from "../properties.types";

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
  return (
    <div className="w-[420px] h-screen bg-primary/20 flex flex-col border-r border-blue-200 z-20">
      <div className="px-5 pt-7 pb-4 shrink-0">
        <h1 className="text-3xl font-bold">Property Listings</h1>
        <p className="text-muted-foreground mt-1">
          Explore EstateView's activity about your property
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
            placeholder="Search Here..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-blue-200 rounded-xl text-sm text-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <button className="w-11 h-11 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-zinc-500 hover:text-zinc-700 hover:border-blue-300 transition-all shrink-0">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* property lists */}
      <div className="overflow-y-auto flex flex-col flex-1 custom-scrollbar p-3 gap-4">
        {/* flex flex-col */}
        {listings.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isSelected={selectedId === property.id}
            onClick={() => onSelect(property)}
          />
        ))}
      </div>
    </div>
  );
}

import { AreaChart, Bath, Bed, MapPin } from "lucide-react";
import type { Property } from "../properties.types";

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function PropertyCard({
  property,
  onClick,
  isSelected,
}: PropertyCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex-shrink-0 flex gap-3 bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "ring-2 ring-blue-500 shadow-md" : "shadow-sm"
      }`}
    >
      <div className="flex gap-3 p-2">
        {/* Property Image */}
        <img
          src={property.images[0]?.image_url || "/placeholder.jpg"}
          alt={property.name}
          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-md mb-1 truncate">{property.name}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center gap-1">
              <AreaChart className="w-4 h-4" />
              <span>{property.square_meters} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

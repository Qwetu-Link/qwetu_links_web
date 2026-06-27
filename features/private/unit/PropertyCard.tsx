import { Box, Gauge, MapPin } from "lucide-react";
import Image from "next/image";
import { Property } from "@/types/property.definations";

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
  const imageUrl =
    property.images?.[0]?.url && property.images[0].url.trim() !== ""
      ? property.images[0].url
      : "/images/placeholder.svg";
  return (
    <div
      onClick={onClick}
      className={`flex-shrink-0 flex gap-3 bg-white h-30 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "ring-2 ring-blue-500 shadow-md" : "shadow-sm"
      }`}
    >
      <div className="flex gap-3 p-2">
        {/* Property Image */}
        <Image
          src={imageUrl}
          alt={property.name}
          width={100}
          height={100}
          className="object-cover rounded-lg flex-shrink-0"
          loading="eager"
          unoptimized
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-base leading-tight line-clamp-2 flex-1 mr-2 mb-2 line-clamp-2">
            {property.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Stats */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <Box size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-800">
                {property.unit} units
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge size={14} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-800">
                {property.occupanyRate}% occupied
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

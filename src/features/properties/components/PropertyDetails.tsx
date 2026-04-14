import {
  MapPin,
  Bath,
  ChevronLeft,
  ChevronRight,
  Bed,
  Wifi,
  Car,
  Wind,
  Dumbbell,
  ArrowUpDown,
  Zap,
  Camera,
  Shield,
  type LucideIcon,
  AreaChart,
} from "lucide-react";
import type { Property } from "../properties.types";
import { useState } from "react";

interface PropertyDetailProps {
  property: Property;
  onBack?: () => void;
}

const getAmenityIcon = (iconName: string): LucideIcon => {
  const icons: Record<string, LucideIcon> = {
    wifi: Wifi,
    car: Car,
    pool: Wind,
    dumbbell: Dumbbell,
    lift: ArrowUpDown,
    bolt: Zap,
    camera: Camera,
    shield: Shield,
  };

  return icons[iconName] || Wifi;
};

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    available: "bg-green-100 text-green-700 border-green-300",
    occupied: "bg-red-100 text-red-700 border-red-300",
    maintenance: "bg-orange-100 text-orange-700 border-orange-300",
    booked: "bg-blue-100 text-blue-700 border-blue-300",
  };
  return colors[status] || "bg-gray-100 text-gray-700 border-gray-300";
};

export default function PropertyDetail({
  property,
  onBack,
}: PropertyDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1,
    );
  };

  return (
    <div className=" flex-1 h-screen overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      <div className="p-4 md:p-6 lg:p-8">
        {/* Back Button for Mobile */}
        {onBack && (
        <button
          onClick={onBack}
          className="md:hidden mb-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Listings
        </button>
      )}
        {/* Image Gallery */}
        <div className="mb-6">
          {/* Main Image */}
          <div className="relative mb-3 rounded-2xl overflow-hidden group">
            <img
              src={property.images[selectedImageIndex]?.image_url}
              alt={property.name}
              className="w-full h-[380px] object-cover"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`rounded-lg overflow-hidden ${
                  selectedImageIndex === idx ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={img.image_url}
                  alt={`View ${idx + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div>
          {/* Title and Price */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{property.location}</span>
              </div>
              <h2 className="text-2xl mb-2">{property.name}</h2>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-md font-semibold tracking-wider mb-2">
              DESCRIPTION
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {property.description || ""}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mb-4">
            <div className="flex items-center gap-2">
              <Bed className="w-8 h-8 text-gray-600" />
              <div>
                <div className="text-sm text-gray-500">Bedrooms</div>
                <div className="text-lg">{property.bedrooms}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-8 h-8 text-gray-600" />
              <div>
                <div className="text-sm text-gray-500">Bathrooms</div>
                <div className="text-lg">{property.bathrooms}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AreaChart className="w-8 h-8 text-gray-600" />
              <div>
                <div className="text-sm text-gray-500">Square Meters</div>
                <div className="text-lg">{property.square_meters}</div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <h3 className="text-md font-semibold tracking-wider mb-3">
              HIGHLIGHTS
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {property.highlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="relative rounded-lg overflow-hidden group h-50"
                >
                  <img
                    src={highlight.image_url}
                    alt={highlight.title}
                    className="w-full h-50 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="text-white text-md">
                      {highlight.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-4 mt-8">
            <h3 className="text-md font-semibold tracking-wider mb-4">
              AMENITIES
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {property.amenities.map((amenity) => {
                const Icon = getAmenityIcon(amenity.icon);
                return (
                  <div
                    key={amenity.id}
                    className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-gray-50 to-white border border-primary/40 rounded-xl hover:shadow-md hover:border-gray-300 transition-all group"
                  >
                    <div className="w-8 h-8 bg-white flex items-center justify-center transition-all">
                      <Icon className="w-8 h-8 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <span className="text-md text-center text-gray-700">
                      {amenity.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Available Units */}
          <div className="mb-6 mt-8">
            <h3 className="text-md font-semibold tracking-wider mb-4">
              AVAILABLE UNITS
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {property.units.map((unit) => (
                <div
                  key={unit.id}
                  className="relative p-4 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all group overflow-hidden"
                >
                  {/* Background Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 opacity-30 rounded-bl-full"></div>

                  <div className="relative">
                    {/* Unit Number */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xs">
                          {unit.unit_number}
                        </div>
                        <span className="text-sm">Unit</span>
                      </div>
                      <div
                        className={`px-2.5 py-1 text-xs rounded-full border ${getStatusColor(unit.status)}`}
                      >
                        {unit.status.charAt(0).toUpperCase() +
                          unit.status.slice(1)}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500">Monthly Rent</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl">
                          KES {unit.rent_amount.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">/month</span>
                      </div>
                    </div>

                    {/* View Details Button - Only for available units */}
                    {unit.status === "available" && (
                      <button className="mt-3 w-full py-2 bg-primary text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/90">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex gap-3">
            <button className="flex-1 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Schedule Tour
            </button>
            <button className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Contact Agent
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

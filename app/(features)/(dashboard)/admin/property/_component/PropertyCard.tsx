"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Edit, Gauge, MapPin, Trash2 } from "lucide-react";
import { Property } from "../definations";

interface Props {
  property: Property;
  onDelete: (id: string, name: string) => void;
}

const statusStyles: Record<Property["status"], string> = {
  Occupied: "bg-blue-600 text-white",
  Unoccupied: "bg-purple-600 text-white",
  Maintenance: "bg-amber-500 text-white",
};

export default function PropertyCard({ property, onDelete }: Props) {
  return (
    <div className="group bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        <div
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[property.status]}`}
        >
          {property.status}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-800 text-base leading-tight line-clamp-2 flex-1 mr-2">
            {property.name}
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-3">{property.apartment_type}</p>
        <p className="mb-3 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin size={14} className="shrink-0 text-blue-500" />
          {property.location}
        </p>

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
              {property.occupany_rate}% occupied
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/admin/property/${property.slug}/edit`}
            className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition font-medium flex items-center justify-center gap-1"
          >
            <Edit size={14} /> Edit
          </Link>
          <button
            onClick={() => onDelete(property.slug, property.name)}
            className="flex-1 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition font-medium flex items-center justify-center gap-1"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

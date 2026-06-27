"use client";

import { Pencil, Trash2, Tag } from "lucide-react";
import { DynamicIcon, iconNames } from "lucide-react/dynamic";
import { Amenity } from "@/types/amenity.definations";

const DEFAULT_ICON = "tag";

interface Props {
  amenity: Amenity;
  onEdit: (amenity: Amenity) => void;
  onDelete: (id: string, name: string) => void;
}

function normalizeIconName(icon: string) {
  const legacyIconMap: Record<string, string> = {
    "fas fa-tshirt": "shirt",
    "fas fa-female": "user-round",
    "fas fa-shoe-prints": "footprints",
    "fas fa-gem": "gem",
    "fas fa-vest": "shirt",
    "fas fa-child": "baby",
    "fas fa-running": "activity",
    "fas fa-bed": "bed-double",
    "fas fa-tag": "tag",
    "fas fa-shirt": "shirt",
    "fas fa-hat-cowboy": "sparkles",
  };

  return legacyIconMap[icon] ?? icon;
}

function getSafeIconName(icon: string) {
  const normalized = normalizeIconName(icon.trim() || DEFAULT_ICON);

  return iconNames.includes(normalized as never) ? normalized : DEFAULT_ICON;
}

function AmenityFallbackIcon() {
  return <Tag size={22} className="text-blue-600" />;
}

export default function AmenityCard({ amenity, onEdit, onDelete }: Props) {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5">
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Icon bubble */}
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
            <DynamicIcon
              name={getSafeIconName(amenity.icon) as never}
              fallback={AmenityFallbackIcon}
              size={22}
              className="text-blue-600"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 leading-tight">
              {amenity.name}
            </h3>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          <button
            onClick={() => onEdit(amenity)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
            title="Edit amenity"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => onDelete(amenity.id, amenity.name)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
            title="Delete amenity"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5rem]">
        {amenity.description || "No description"}
      </p>

      {/* Footer row */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400 flex items-center gap-1">
          {amenity.category}
        </span>
      </div>
    </div>
  );
}

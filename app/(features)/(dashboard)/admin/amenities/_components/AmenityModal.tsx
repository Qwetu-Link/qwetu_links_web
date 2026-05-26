"use client";

import { useState, useEffect, useRef } from "react";
import { Edit, Plus, Save } from "lucide-react";
import { DynamicIcon, iconNames } from "lucide-react/dynamic";
import { Amenities, AmenitiesFormValues } from "../definations";

interface Props {
  amenity: Amenities | null;
  onSave: (values: AmenitiesFormValues, existingId?: string) => void;
  onClose: () => void;
}

const DEFAULT_ICON = "tag";

const quickPickIcons = [
  { value: "tag", label: "General" },
  { value: "car", label: "Parking" },
  { value: "wifi", label: "Wi-Fi" },
  { value: "sofa", label: "Furnished" },
  { value: "shield-check", label: "Security" },
  { value: "droplets", label: "Water" },
  { value: "zap", label: "Power" },
  { value: "washing-machine", label: "Laundry" },
  { value: "dumbbell", label: "Gym" },
  { value: "trees", label: "Outdoor" },
] as const;

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

export default function AmenityModal({ amenity, onSave, onClose }: Props) {
  const [name, setName] = useState(amenity?.name ?? "");
  const [description, setDescription] = useState(amenity?.description ?? "");
  const [amenityGroup, setAmenityGroup] = useState(
    amenity?.category ?? "General",
  );
  const [icon, setIcon] = useState(
    amenity ? normalizeIconName(amenity.icon) : DEFAULT_ICON,
  );
  const nameRef = useRef<HTMLInputElement>(null);

  // Lock background scroll & autofocus
  useEffect(() => {
    document.body.style.overflow = "hidden";
    nameRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return alert("Amenity name is required");
    onSave(
      {
        name: name.trim(),
        description: description.trim(),
        category: amenityGroup.trim() || "General",
        icon: getSafeIconName(icon),
      },
      amenity?.id,
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 rounded-t-2xl flex justify-between items-center z-10">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {amenity ? <Edit /> : <Plus />}{" "}
            {amenity ? "Edit Amenity" : "Add New Amenity"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Amenity Name <span className="text-red-500">*</span>
            </label>
            <input
              ref={nameRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Parking"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Description{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="e.g. Dedicated parking space for residents"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-black placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Amenity Group{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={amenityGroup}
              onChange={(e) => setAmenityGroup(e.target.value)}
              placeholder="e.g. General, Connectivity, Interior"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500"
            />
          </div>

          {/* Icon with live preview */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Icon{" "}
              <span className="text-gray-400 font-normal">
                (Lucide icon name)
              </span>
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="e.g. car, wifi, sofa"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500"
              />
              {/* Live icon preview bubble */}
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <DynamicIcon
                  name={getSafeIconName(icon) as never}
                  size={22}
                  className="text-blue-600"
                />
              </div>
            </div>

            {/* Quick-pick icon suggestions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {quickPickIcons.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setIcon(value)}
                  title={label}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition border ${
                    icon === value
                      ? "bg-blue-100 border-blue-400 text-blue-600"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                >
                  <DynamicIcon name={getSafeIconName(value) as never} size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-xl hover:shadow-lg transition font-medium flex items-center justify-center gap-1"
            >
              <Save size={14} /> Save Amenity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

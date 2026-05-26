"use client";

import { useMemo, useState } from "react";
import { Building2, Plus, Search } from "lucide-react";
import AmenityCard from "./AmenityCard";
import AmenityModal from "./AmenityModal";
import DeleteAmenityModal from "./DeleteAmenityModal";
import { Amenities, AmenitiesFormValues } from "../definations";

const dummyAmenities: Amenities[] = [
  {
    id: "1",
    name: "Parking",
    category: "General",
    description: "Dedicated or shared parking space for residents.",
    icon: "car",
  },
  {
    id: "2",
    name: "Wi-Fi",
    category: "Connectivity",
    description: "Internet connectivity available on the property.",
    icon: "wifi",
  },
  {
    id: "3",
    name: "Furnished",
    category: "Interior",
    description: "Unit includes essential furniture and fixtures.",
    icon: "sofa",
  },
];

function addAmenity(
  amenities: Amenities[],
  values: AmenitiesFormValues,
): Amenities[] {
  return [...amenities, { id: crypto.randomUUID(), ...values }];
}

function updateAmenity(
  amenities: Amenities[],
  existingId: string,
  values: AmenitiesFormValues,
): Amenities[] {
  return amenities.map((amenity) =>
    amenity.id === existingId ? { ...amenity, ...values } : amenity,
  );
}

function deleteAmenity(amenities: Amenities[], id: string): Amenities[] {
  return amenities.filter((amenity) => amenity.id !== id);
}

export default function PropertyAmenities() {
  const [amenities, setAmenities] = useState<Amenities[]>(dummyAmenities);
  const [search, setSearch] = useState("");
  const [editTarget, setEditTarget] = useState<Amenities | null | "new">(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return amenities;

    return amenities.filter((amenity) =>
      [amenity.name, amenity.description]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [amenities, search]);

  function handleSave(values: AmenitiesFormValues, existingId?: string) {
    if (existingId !== undefined) {
      setAmenities((prev) => updateAmenity(prev, existingId, values));
    } else {
      setAmenities((prev) => addAmenity(prev, values));
    }
    setEditTarget(null);
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setAmenities((prev) => deleteAmenity(prev, deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-6 rounded-xl bg-gray-50 p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
            <Building2 size={32} className="text-blue-600" /> Amenities
          </h1>
          <p className="mt-1 text-gray-500">
            Manage property amenities, icons, and short descriptions.
          </p>
        </div>
        <button
          onClick={() => setEditTarget("new")}
          className="flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 px-5 py-2.5 font-medium text-white transition hover:shadow-lg sm:self-auto"
        >
          <Plus /> Add Amenity
        </button>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search amenities by name or description..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-black outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center text-gray-400">
          <p className="mb-3 flex justify-center">
            <Building2 size={64} className="text-gray-300" />
          </p>
          <p className="text-lg font-medium text-gray-500">
            No amenities found
          </p>
          <p className="mt-1 text-sm">
            {search
              ? "Try adjusting your search"
              : 'Click "Add Amenity" to create one'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((amenity) => (
            <AmenityCard
              key={amenity.id}
              amenity={amenity}
              onEdit={(item) => setEditTarget(item)}
              onDelete={(id, name) => setDeleteTarget({ id, name })}
            />
          ))}
        </div>
      )}

      {editTarget !== null && (
        <AmenityModal
          amenity={editTarget === "new" ? null : editTarget}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
        />
      )}

      {deleteTarget && (
        <DeleteAmenityModal
          amenityName={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

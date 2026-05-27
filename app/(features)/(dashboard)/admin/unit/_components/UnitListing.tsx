import { ArrowLeft, BedDouble, Building2, Gauge, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import DeleteModal from "@/components/deletemodal/DeleteModal";
import type { UnitProperty } from "../definations";
import UnitCard from "./UnitsCard";

interface Props {
  property: UnitProperty;
  onBack: () => void;
}

export type Unit = {
  id: string;
  title: string;
  description: string;
  size: string;
  price: number;
  status: "Available" | "Occupied" | "Maintenance";
  bedrooms: number;
  bathrooms: number;
  parking: number;
  tenant?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
};

const unitsData: Unit[] = [
  {
    id: "4B",
    title: "Unit 4B",
    description: "2 Bedroom, 2 Bath",
    size: "85 sqm",
    price: 45000,
    status: "Available",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
  },
  {
    id: "5A",
    title: "Unit 5A",
    description: "3 Bedroom, 2 Bath",
    size: "110 sqm",
    price: 60000,
    status: "Occupied",
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    tenant: {
      name: "Grace Wanjiku",
      email: "grace.wanjiku@example.com",
    },
  },
  {
    id: "3C",
    title: "Unit 3C",
    description: "1 Bedroom, 1 Bath",
    size: "55 sqm",
    price: 30000,
    status: "Maintenance",
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
  },
  {
    id: "2D",
    title: "Unit 2D",
    description: "Studio Loft",
    size: "45 sqm",
    price: 25000,
    status: "Available",
    bedrooms: 0,
    bathrooms: 1,
    parking: 1,
  },
];

export default function UnitListing({ property, onBack }: Props) {
  const [units, setUnits] = useState<Unit[]>(unitsData);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const availableUnits = units.filter(
    (unit) => unit.status === "Available",
  );

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteTarget) return;
    setUnits((prev) => prev.filter((unit) => unit.id !== deleteTarget.id));
    setDeleteTarget(null);
  }, [deleteTarget]);

  return (
    <div className="custom-scrollbar flex h-full min-h-0 flex-1 flex-col overflow-y-auto bg-white">
      <div className="shrink-0 bg-white">
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 md:hidden"
            aria-label="Back to properties"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{property.name}</h2>
            <p className="text-sm text-gray-500">{property.location}</p>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <Building2 className="mb-3 text-blue-600" size={22} />
            <p className="text-2xl font-bold text-gray-900">{property.units}</p>
            <p className="text-sm text-gray-500">Total units</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <Gauge className="mb-3 text-blue-600" size={22} />
            <p className="text-2xl font-bold text-gray-900">
              {property.occupancyRate}%
            </p>
            <p className="text-sm text-gray-500">Occupancy rate</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <BedDouble className="mb-3 text-blue-600" size={22} />
            <p className="text-2xl font-bold text-gray-900">
              {availableUnits.length}
            </p>
            <p className="text-sm text-gray-500">Available units</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 font-sans">
        <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Property Units</h1>
            <p className="text-sm text-gray-500">
              Manage units assigned to {property.name}
            </p> 
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Unit
          </button>
        </div>

        <div className="gap-3 border-b border-gray-100 px-5 py-4 mb-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {units.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                onDelete={(id, name) => setDeleteTarget({ id, name })}
              />
            ))}
          </div>
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal
          title="Delete Unit"
          name={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

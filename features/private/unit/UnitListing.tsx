import { ArrowLeft, BedDouble, Building2, Gauge, Plus, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import DeleteModal from "@/components/common/DeleteModal";
import UnitCard from "./UnitsCard";
import { Property } from "@/types/property.definations";
import { useUnitDel } from "@/hooks/useUnits";
import Link from "next/link";

interface Props {
  property: Property;
  onBack: () => void;
}

export default function UnitListing({ property, onBack }: Props) {
  const [units, setUnits] = useState(property?.units ?? []);
  const { mutate: deleteUnit } = useUnitDel();

  const buzId = property.business.id;
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const availableUnits = units.filter((unit) => unit.status === "available");

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteTarget) return;
    deleteUnit(
      { id: deleteTarget.id },
      {
        onSuccess: () => {
          setUnits((prev) =>
            prev.filter((unit) => unit.id !== deleteTarget.id),
          );
          setDeleteTarget(null);
        },
      },
    );
  }, [deleteTarget, deleteUnit]);

  const [search, setSearch] = useState("");
  const filteredUnits = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return units;

    return units.filter((item) =>
      [
        item.unitNumber,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [units, search]);
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
            <p className="text-2xl font-bold text-gray-900">{units.length}</p>
            <p className="text-sm text-gray-500">Total units</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <Gauge className="mb-3 text-blue-600" size={22} />
            <p className="text-2xl font-bold text-gray-900">
              {property.occupanyRate}%
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


      <div className="px-4 mb-4 shrink-0 flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Utility Here..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-blue-200 rounded-xl text-sm text-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
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
          <Link
            // href="/admin/unit/create"
            href={`/admin/unit/create/${property.id}?businessId=${buzId}`}
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Unit
          </Link>
        </div>

        <div className="gap-3 border-b border-gray-100 px-5 py-4 mb-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {filteredUnits.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
                <Building2
                  className="mb-3 text-gray-300"
                  size={40}
                />

                <p className="text-sm font-medium text-gray-500">
                  {units.length === 0
                    ? "No units found"
                    : "No matching unit"}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {units.length === 0
                    ? "Add a unit to get started with this property."
                    : "Try a different search term."}
                </p>

                {units.length === 0 && (
                  <Link
                    href={`/admin/unit/create/${property.id}?businessId=${buzId}`}
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Plus size={15} />
                    Add Unit
                  </Link>
                )}

              </div>
            ) : (
              filteredUnits.map((unit) => (
                <UnitCard
                  key={unit.id}
                  unit={unit}
                  onDelete={(id, name) => setDeleteTarget({ id, name })}
                />
              ))
            )}
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

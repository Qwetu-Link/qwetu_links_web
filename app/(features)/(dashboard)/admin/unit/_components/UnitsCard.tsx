import { Bath, Bed, Car, Edit, Maximize, Trash2 } from "lucide-react";
import { UnitProperty } from "@/types/unit.definations";
import Link from "next/link";

interface Props {
  unit: UnitProperty;
  onDelete: (id: string, name: string) => void;
}

const statusStyles: Record<UnitProperty["status"], string> = {
  available: "bg-blue-50 text-blue-700 border-blue-200",
  occupied: "bg-slate-100 text-slate-700 border-slate-200",
  reserved: "bg-purple-50 text-purple-700 border-purple-200",
  maintenance: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function UnitCard({ unit, onDelete }: Props) {
  return (
    <div className="flex min-h-[280px] flex-col rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-shadow duration-200 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{unit.unitNumber}</h3>
        </div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase ${statusStyles[unit.status]}`}
        >
          {unit.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 sm:block">
          <Bed className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
          <span>
            {unit.bedrooms} Bedroom{unit.bedrooms !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 sm:block">
          <Bath className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
          <span>
            {unit.bathrooms} Bathroom{unit.bathrooms !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 sm:block">
          <Car className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
          <span>
            {unit.parking} Parking Spot{unit.parking !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 sm:block">
          <Maximize className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
          <span>{unit.size}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 font-bold rounded-xl border border-gray-100 bg-slate-50 p-3">
        KES  {unit.rentAmount}
      </div>

      {/* {tenant && (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-slate-50 p-3">
          {tenant.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={tenant.avatarUrl}
              alt={tenant.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              {getInitials(tenant.name)}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {tenant.name}
            </p>
            <p className="truncate text-xs text-gray-500">{tenant.email}</p>
          </div>
        </div>
      )} */}

      <div className="mt-auto flex gap-2 border-t border-gray-100 pt-4">
        <Link
          href={`/admin/unit/${unit.id}/edit`}
          type="button"
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          <Edit size={14} />
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDelete(unit.id, unit.unitNumber)}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}

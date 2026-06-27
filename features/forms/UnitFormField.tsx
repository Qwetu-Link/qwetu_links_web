"use client";

import { useForm } from "react-hook-form";
import { Bath, Bed, Car, Hash, Layers, Ruler } from "lucide-react";
import { UnitFormValues } from "@/schemas/units.zod";

const statusOptions: { label: string; value: string }[] = [
  { label: "Available", value: "available" },
  { label: "Maintenance", value: "maintenance" },
];

interface UnitFormFieldsProps {
  form: ReturnType<typeof useForm<UnitFormValues>>;
}

// ─── Shared fields (reused in both create and edit) ──────────────────────────
export function UnitFormFields({ form }: UnitFormFieldsProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-5">
      {/* Unit Number & Floor */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <Hash size={14} className="text-gray-400" />
            Unit Number
          </label>
          <input
            {...register("unitNumber")}
            placeholder="e.g. A-101"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.unitNumber && (
            <p className="mt-1 text-xs text-red-500">
              {errors.unitNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <Layers size={14} className="text-gray-400" />
            Unit Floor
          </label>
          <input
            {...register("unitFloor")}
            placeholder="e.g. Ground Floor"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.unitFloor && (
            <p className="mt-1 text-xs text-red-500">
              {errors.unitFloor.message}
            </p>
          )}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          {...register("status")}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select status...</option>
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>
        )}
      </div>

      {/* Size / Bedrooms / Bathrooms / Parking */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {(
          [
            { name: "size", label: "Size (m²)", icon: Ruler },
            { name: "bedrooms", label: "Bedrooms", icon: Bed },
            { name: "bathrooms", label: "Bathrooms", icon: Bath },
            { name: "parking", label: "Parking", icon: Car },
          ] as const
        ).map(({ name, label, icon: Icon }) => (
          <div key={name}>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <Icon size={14} className="text-gray-400" />
              {label}
            </label>
            <input
              {...register(name, { valueAsNumber: true })}
              type="number"
              min={0}
              placeholder="0"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors[name] && (
              <p className="mt-1 text-xs text-red-500">
                {errors[name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

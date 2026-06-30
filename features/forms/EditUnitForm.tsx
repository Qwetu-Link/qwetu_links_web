// UnitEditForm.tsx
"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Save } from "lucide-react";
import { UnitProperty } from "@/types/unit.definations";
import { UnitFormFields } from "./UnitFormField";
import { unitFormSchema, UnitFormValues } from "@/schemas/units.zod";
import { toast } from "sonner";
import { useUpdateUnit } from "@/hooks/useUnits";
import Link from "next/link";
import { handleFormErrors } from "@/utils/errors";
import { PropertyStatus } from "@/utils/selectConstants";

interface UnitEditFormProps {
  unit: UnitProperty;
  businessId: string;
}

export default function UnitEditForm({ unit }: UnitEditFormProps) {
  const form = useForm<UnitFormValues>({
    resolver: zodResolver(unitFormSchema),
    defaultValues: {
      propertyID: unit.propertyID,
      unitNumber: unit.unitNumber,
      unitFloor: unit.unitFloor,
      status: unit.status as PropertyStatus,
      size: unit.size,
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms,
      // rentAmount: unit.rentAmount,
      parking: unit.parking,
      version: unit.version,
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const { mutate: updateUnit } = useUpdateUnit();

  const onSubmit: SubmitHandler<UnitFormValues> = async (values) => {
    try {
      updateUnit(
        { id: unit.id, data: values },
        {
          onSuccess: () => {
            toast.success(`"${values.unitNumber}" updated successfully`);
          },
          onError: (error) => {
            handleFormErrors<UnitFormValues>(error, setError);
          }
        },
      );
    } catch (error) {
      handleFormErrors(error, setError);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Edit Unit — {unit.unitNumber}
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Update the details for this unit. Only changed fields will be saved.
        </p>
        <div className="mt-3 h-0.5 w-10 rounded-full bg-blue-600" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <UnitFormFields
          form={form}
        />
        {/* Errors */}
        {errors.root?.message && (
          <div
            className={`mt-4 flex items-start gap-2 rounded-md border px-4 py-3 ${errors.root.type === "network"
              ? "border-amber-200 bg-amber-50"
              : "border-red-200 bg-red-50"
              }`}
            aria-live="polite"
            aria-atomic="true"
          >
            <AlertCircle
              className={`mt-0.5 h-4 w-4 shrink-0 ${errors.root.type === "network" ? "text-amber-500" : "text-red-500"
                }`}
            />
            <p
              className={`text-sm ${errors.root.type === "network" ? "text-amber-700" : "text-red-600"
                }`}
            >
              {errors.root.message}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
          <Link
            href={`/admin/unit`}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            <Save size={15} />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
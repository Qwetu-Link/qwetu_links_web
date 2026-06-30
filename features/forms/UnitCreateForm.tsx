// UnitCreateForm.tsx
"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Plus } from "lucide-react";
import { unitFormSchema, UnitFormValues } from "@/schemas/units.zod";
import { UnitFormFields } from "./UnitFormField";
import { useCreateUnit } from "@/hooks/useUnits";
import { toast } from "sonner";
import Link from "next/link";
import { handleFormErrors } from "@/utils/errors";

interface UnitCreateFormProps {
  propertyId: string;
  businessId: string;
}

export default function UnitCreateForm({ propertyId }: UnitCreateFormProps) {
  console.log("property id", propertyId);
  const propertyID = propertyId;
  const form = useForm<UnitFormValues>({
    defaultValues: {
      propertyID,
      unitNumber: "",
      unitFloor: "",
      status: "available",
      size: "0.00",
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      image: [],
    },
    resolver: zodResolver(unitFormSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const createUnit = useCreateUnit();

  const onSubmit: SubmitHandler<UnitFormValues> = async (values) => {
    try {
      await createUnit.mutateAsync(values, {
        onSuccess: () => {
          toast.success(`"${values.unitNumber}" add to units`);
        },
        onError: (error) => {
          handleFormErrors<UnitFormValues>(error, setError);
        }
      });
    } catch (error) {
      handleFormErrors(error, setError);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Create Unit</h2>
        <p className="mt-1 text-sm text-gray-400">
          Fill in the details below to add a new unit to this property.
        </p>
        <div className="mt-3 h-0.5 w-10 rounded-full bg-blue-600" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <UnitFormFields form={form} />
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
            type="button"
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={() => console.log("clicked")}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            <Plus size={15} />
            {isSubmitting ? "Creating..." : "Create Unit"}
          </button>
        </div>
      </form>
    </div>
  );
}

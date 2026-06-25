// UnitCreateForm.tsx
"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { unitFormSchema, UnitFormValues } from "../units.zod";
import { UnitFormFields } from "./UnitFormField";
import { useCreateUnit } from "../units.services";
import { toast } from "sonner";
import Link from "next/link";
import { handleFormErrors } from "@/app/lib/errors";

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
        {errors.root && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">{errors.root.message}</p>
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

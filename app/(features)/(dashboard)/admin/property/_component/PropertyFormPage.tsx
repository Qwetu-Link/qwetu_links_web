"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, Save } from "lucide-react";
import ImageFileField from "@/app/(features)/(dashboard)/admin/tenant/_components/ImageFileField";
import { useForm, useWatch } from "react-hook-form";
import {
  propertyFormSchema,
  propertyTypeGroups,
  PropertyFormValues,
} from "@/app/lib/property.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { emptyProperty, propertyStatusValues, seededProperties } from "../definations";

const fieldClass =
  "h-10 w-full rounded-lg border border-orange-100 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const textAreaClass =
  "min-h-28 w-full resize-y rounded-lg border border-orange-100 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";


const propertyFields = [
  ["name", "Property name"],
  ["slug", "Slug"],
  ["location", "Location"],
  ["unit", "No. of Unit"],
  // ["business_id", "Business ID"],
] as const;

const numericFields = [
  ["parking", "Parking"],
  ["bedrooms", "Bedrooms"],
  ["bathrooms", "Bathrooms"],
  ["square_meters", "Square meters"],
  ["occupany_rate", "Occupancy rate"],
] as const;

type PropertyFormPageProps = {
  mode?: "add" | "edit";
  propertySlug?: string;
};

const businessId = "business-001";

export default function PropertyFormPage({
  mode = "add",
  propertySlug,
}: PropertyFormPageProps) {
  const router = useRouter();
  const initialProperty = useMemo(() => {
    if (mode === "edit") {
      return (
        seededProperties.find((property) => property.slug === propertySlug) ??
        {
          ...seededProperties[0],
          slug: propertySlug ?? "",
          business_id: businessId,
        }
      );
    }

    return {
      ...emptyProperty,
      business_id: businessId,
    };
  }, [mode, propertySlug]);

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<PropertyFormValues>({
    defaultValues: initialProperty,
    resolver: zodResolver(propertyFormSchema),
  });

  const onSubmit = (data: PropertyFormValues) => {
    console.log(mode === "edit" ? "updated property" : "property Data", data);
    router.push("/admin/property");
  };

  const image = useWatch({ control, name: "image" });

  return (
    <div className="min-h-full bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-5xl space-y-5">
        <div>
          <Link
            href="/admin/property"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to properties
          </Link>
          <h1 className="mt-3 flex items-center gap-2 text-2xl font-bold text-blue-600 sm:text-3xl">
            <Building2 size={26} />
            {mode === "edit" ? "Edit Property" : "Add Property"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {mode === "edit"
              ? `Update ${initialProperty.name || "property"} details.`
              : "Create a property record with address, unit, occupancy, and media details."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden rounded-lg border border-orange-100 bg-white shadow-sm"
        >
          <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-2">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-950">
                Property Details
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {propertyFields.map(([key, label]) => (
                  <label key={key} className="space-y-1.5">
                    <span className="text-sm font-medium text-slate-700">
                      {label}
                    </span>
                    <input
                      {...register(key)}
                      className={fieldClass}
                      type="text"
                    />
                    {errors[key]?.message && (
                      <p className="text-xs font-medium text-red-500">
                        {errors[key]?.message}
                      </p>
                    )}
                  </label>
                ))}

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Apartment type
                  </span>
                  <select {...register("apartment_type")} className={fieldClass}>
                    {propertyTypeGroups.map((group) => (
                      <optgroup key={group.label} label={group.label}>
                        {group.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.apartment_type?.message && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.apartment_type.message}
                    </p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Status
                  </span>
                  <select {...register("status")} className={fieldClass}>
                    {propertyStatusValues.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {errors.status?.message && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.status.message}
                    </p>
                  )}
                </label>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-950">
                Capacity & Metrics
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {numericFields.map(([key, label]) => (
                  <label key={key} className="space-y-1.5">
                    <span className="text-sm font-medium text-slate-700">
                      {label}
                    </span>
                    <input
                      {...register(key, { valueAsNumber: true })}
                      className={fieldClass}
                      min="0"
                      type="number"
                    />
                    {errors[key]?.message && (
                      <p className="text-xs font-medium text-red-500">
                        {errors[key]?.message}
                      </p>
                    )}
                  </label>
                ))}
              </div>
            </section>

            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">Media</h2>
              <ImageFileField
                id="property-image"
                label="Property image"
                value={image}
                onChange={(value) =>
                  setValue("image", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }
              />
              {errors.image && (
                <p className="text-xs text-red-600">{errors.image.message}</p>
              )}
            </section>

            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">
                Address & Description
              </h2>
              <div className="grid gap-3 lg:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Address
                  </span>
                  <textarea
                    {...register("address")}
                    className={textAreaClass}
                  />
                  {errors.address?.message && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Description
                  </span>
                  <textarea
                    {...register("description")}
                    className={textAreaClass}
                  />
                  {errors.description?.message && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </label>
              </div>
            </section>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-orange-100 bg-slate-50 p-4 sm:flex-row sm:justify-end">
            <Link
              href="/admin/property"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Save size={16} />
              {isSubmitting
                ? mode === "edit"
                  ? "Saving Property..."
                  : "Creating Property..."
                : mode === "edit"
                  ? "Save Property"
                  : "Create Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

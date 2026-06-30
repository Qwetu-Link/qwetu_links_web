"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Building2,
  MapPin,
  Sliders,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Amenity } from "@/types/amenity.definations";
import { useCreateProperty, useUpdateProperty } from "../../hooks/useProperty";
import { useGetPropertyAmenities } from "@/hooks/useAmenities";
import { PropertyFormInput, propertyFormSchema } from "@/schemas/property.zod";
import { GalleryImage, PropertiesFormValues, Property } from "@/types/property.definations";
import { inputClass, labelClass } from "@/components/custom/FormFields";
import { propertyTypeGroups } from "@/utils/selectConstants";
import PropertyImageGallery from "@/components/custom/PropertyImageGallery";
import { handleFormErrors } from "@/utils/errors";

interface PropertyFormPageProps {
  businessId: string;
  mode?: "add" | "edit";
  property?: Property & { amenityID?: string[] };
}

export default function PropertyFormPage({
  businessId,
  mode = "add",
  property,
}: PropertyFormPageProps) {
  const router = useRouter();
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const { data: amenities } = useGetPropertyAmenities();

  const [search, setSearch] = useState("");


  const isEdit = mode === "edit";

  const buildGalleryFromProperty = (): GalleryImage[] =>
    isEdit && property?.images
      ? property.images.map((img) => ({
        ...img,
        status: "done" as const,
        progress: 100,
      }))
      : [];

  const [images, setImages] = useState<GalleryImage[]>(buildGalleryFromProperty);


  const [lastPropertyId, setLastPropertyId] = useState(property?.id);
  if (property?.id !== lastPropertyId) {
    setLastPropertyId(property?.id);
    setImages(buildGalleryFromProperty());
  }

  // Ensure default values cleanly populate standard type expectations
  const defaultValues = useMemo<PropertyFormInput>(() => {
    const currentProperty = property;

    if (isEdit && currentProperty) {
      let mappedAmenities: string[] = [];

      if (Array.isArray(currentProperty.amenityID)) {
        mappedAmenities = currentProperty.amenityID.map(
          (id: string | { id: string }) =>
            typeof id === "object" ? id.id : String(id),
        );
      } else if (currentProperty.amenities) {
        mappedAmenities = currentProperty.amenities.map(
          (a: string | { id: string }) =>
            typeof a === "object" ? a.id : String(a),
        );
      }

      return {
        name: currentProperty.name ?? "",
        address: currentProperty.address ?? "",
        location: currentProperty.location ?? "",
        apartmentType: currentProperty.apartmentType ?? "",
        description: currentProperty.description ?? "",
        parking: currentProperty.parking ?? 0,
        bedrooms: currentProperty.bedrooms ?? 0,
        bathrooms: currentProperty.bathrooms ?? 0,
        squareMeters: currentProperty.squareMeters ?? 1,
        status: currentProperty.status ?? "available",
        amenityID: mappedAmenities,
        image: currentProperty.images ?? [],
        version: currentProperty.version,
      };
    }

    return {
      name: "",
      address: "",
      location: "",
      apartmentType: "",
      description: "",
      parking: 0,
      bedrooms: 0,
      bathrooms: 0,
      squareMeters: 1,
      status: "available",
      amenityID: [],
      image: [],
      version: 0,
    };
  }, [isEdit, property]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormInput>({
    resolver: zodResolver(propertyFormSchema),
    values: defaultValues,
  });

  const selectedAmenities = useWatch({ control, name: "amenityID" }) ?? [];

  // const existingImages = useMemo<ExistingImage[]>(() => {
  //   if (!isEdit || !property?.images) return [];
  //   return property.images.filter((img) => !removedImagePaths.has(img.path));
  // }, [isEdit, property, removedImagePaths]);

  // Keep RHF's `image` field (used by zod validation) in sync with the gallery
  useEffect(() => {
    const doneImages = images
      .filter((img) => img.status === "done")
      .map((img) => ({
        id: img.id,
        url: img.url,
        path: img.path,
        original_url: img.original_url,
        watermarked_url: img.watermarked_url,
        thumbnail_url: img.thumbnail_url,
        webp_url: img.webp_url,
      }));
    setValue("image", doneImages, { shouldValidate: true });
  }, [images, setValue]);

  const filteredAmenities = useMemo(() => {
    if (!search.trim()) return amenities?.data ?? [];
    return (amenities?.data ?? []).filter((amenity) =>
      amenity.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [amenities, search]);

  // const removeExistingImage = (path: string) => {
  //   setRemovedImagePaths((prev) => {
  //     const next = new Set(prev);
  //     next.add(path);
  //     return next;
  //   });
  // };

  // const removeSelectedFile = (fileName: string) => {
  //   setSelectedFiles((prev) => prev.filter((f) => f.name !== fileName));
  // };

  // Safe programmatic state controller for robust Multi-Checkbox operations
  const handleAmenityToggle = (amenityId: string, isChecked: boolean) => {
    const currentSelections = selectedAmenities;
    if (isChecked) {
      setValue("amenityID", [...currentSelections, amenityId]);
    } else {
      setValue(
        "amenityID",
        currentSelections.filter((id) => id !== amenityId),
      );
    }
  };

  const isImagesUploading = images.some((img) => img.status === "uploading");


  const onSubmit = async (values: PropertyFormInput) => {
    if (isImagesUploading) {
      toast.error("Please wait for image uploads to finish.");
      return;
    }
    try {

      const payload: PropertiesFormValues = {
        ...values,
        amenityID: (values.amenityID ?? []) as unknown as Amenity[],
        image: images
          .filter((img) => img.status === "done")
          .map((img) => ({
            id: img.id,
            url: img.url,
            path: img.path,
            original_url: img.original_url,
            watermarked_url: img.watermarked_url,
            thumbnail_url: img.thumbnail_url,
            webp_url: img.webp_url,
          })),
      };

      if (isEdit && property) {
        await updateProperty.mutateAsync({ id: property.id, data: payload }
          , {
            onError: (error) => {
              // Pushes field-level errors onto the matching inputs,
              // and a general message onto `errors.root`
              handleFormErrors<PropertyFormInput>(error, setError);
            },
          });

        // setRemovedImagePaths(new Set());
        toast.success("Property updated successfully");
      } else {
        await createProperty.mutateAsync(payload, {
          onError: (error) => {
            // Pushes field-level errors onto the matching inputs,
            // and a general message onto `errors.root`
            handleFormErrors<PropertyFormInput>(error, setError);
          },
        });
        toast.success("Property created successfully");
      }

      // setSelectedFiles([]);
      router.push("/admin/property");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : isEdit
            ? "Failed to update property"
            : "Failed to create property",
      );
    }
  };

  // const isBusy = isSubmitting || uploading;
  const isBusy = isSubmitting || isImagesUploading;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-5xl space-y-8 p-4 md:p-8"
    >
      {/* Header Context */}
      <div className="flex flex-col gap-1 border-b pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {isEdit ? "Edit Property" : "Add New Property"}
        </h1>
        <p className="text-sm text-slate-500">
          Provide accurate specifications and details regarding your listing
          asset.
        </p>
      </div>

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

      {/* Property Information */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="mb-6 flex items-center gap-2 border-b pb-4">
          <Building2 className="h-5 w-5 text-blue-500" />
          <h2 className="text-base font-bold text-slate-800">
            Property Information
          </h2>
        </div>

        {/* <input
            type="hidden"
            {...register("version", {
              setValueAs: (v) =>
                v === "" || v === undefined ? undefined : Number(v),
            })}
          /> */}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Property Name</label>
            <input
              {...register("name")}
              className={inputClass}
              placeholder="e.g. Sapphire Heights"
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Apartment / Listing Type</label>
            <select
              {...register("apartmentType")}
              className={inputClass}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select property type...
              </option>
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
            {errors.apartmentType && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.apartmentType.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Status</label>
            <select {...register("status")} className={inputClass}>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              rows={4}
              {...register("description")}
              className={`${inputClass} resize-none`}
              placeholder="Provide an engaging description layout..."
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="mb-6 flex items-center gap-2 border-b pb-4">
          <MapPin className="h-5 w-5 text-blue-500" />
          <h2 className="text-base font-bold text-slate-800">
            Location Details
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Street Address</label>
            <input
              {...register("address")}
              className={inputClass}
              placeholder="e.g. 452 Alpine Drive"
            />
            {errors.address && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>City / Region</label>
            <input
              {...register("location")}
              className={inputClass}
              placeholder="e.g. Nairobi"
            />
            {errors.location && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="mb-6 flex items-center gap-2 border-b pb-4">
          <Sliders className="h-5 w-5 text-blue-500" />
          <h2 className="text-base font-bold text-slate-800">Specifications</h2>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <div>
            <label className={labelClass}>Bedrooms</label>
            <input
              type="number"
              {...register("bedrooms", { valueAsNumber: true })}
              className={inputClass}
              min={0}
            />
          </div>

          <div>
            <label className={labelClass}>Bathrooms</label>
            <input
              type="number"
              {...register("bathrooms", { valueAsNumber: true })}
              className={inputClass}
              min={0}
            />
          </div>

          <div>
            <label className={labelClass}>Parking Bays</label>
            <input
              type="number"
              {...register("parking", { valueAsNumber: true })}
              className={inputClass}
              min={0}
            />
          </div>

          <div>
            <label className={labelClass}>Area (m²)</label>
            <input
              type="number"
              {...register("squareMeters", { valueAsNumber: true })}
              className={inputClass}
              min={1}
            />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="max-h-64 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/30 p-4">
        <div className="sticky top-0 z-10 mb-3 bg-slate-50/90 pb-2 backdrop-blur-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search amenities..."
            className={inputClass}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {filteredAmenities.map((amenity: Amenity) => {
            const isChecked = selectedAmenities.includes(amenity.id);

            return (
              <label
                key={amenity.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 shadow-2xs transition-colors ${isChecked
                  ? "border-blue-500 bg-blue-50/30 hover:bg-blue-50/50"
                  : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
              >
                <input
                  type="checkbox"
                  value={amenity.id}
                  checked={isChecked}
                  className="h-4 w-4 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) =>
                    handleAmenityToggle(amenity.id, e.target.checked)
                  }
                />
                <span className="text-sm font-medium text-slate-700">
                  {amenity.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Images — now handled entirely by PropertyImageGallery */}
      <PropertyImageGallery
        businessId={businessId}
        images={images}
        onChange={setImages}
      />
      {errors.image && (
        <p className="-mt-4 text-xs text-red-500">
          {errors.image.message as string}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t pt-6">
        <button
          type="button"
          onClick={() => router.push("/admin/property")}
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isBusy}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-98 disabled:opacity-60"
        >
          {isBusy && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? "Save Changes" : "Create Property"}
        </button>
      </div>
    </form>
  );
}

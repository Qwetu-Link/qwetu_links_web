"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  UploadCloud,
  X,
  Building2,
  MapPin,
  Sliders,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Amenity } from "../../amenities/definations";
import { useCreateProperty, useUpdateProperty } from "../property.services";
import { useGetPropertyAmenities } from "../../amenities/amenities.services";
import { propertyFormSchema, propertyTypeGroups } from "@/app/lib/property.zod";
import { PropertiesFormValues, Property } from "../definations";
import {
  deleteFile,
  uploadFiles,
  UploadResult,
} from "@/components/firebaseStorage";

const labelClass =
  "text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block";
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

type PropertyFormInput = z.input<typeof propertyFormSchema>;

type ExistingImage = { url: string; path: string };

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

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [removedImagePaths, setRemovedImagePaths] = useState<Set<string>>(
    new Set(),
  );

  const [lastPropertyId, setLastPropertyId] = useState(property?.id);
  if (property?.id !== lastPropertyId) {
    setLastPropertyId(property?.id);
    setRemovedImagePaths(new Set());
  }

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const isEdit = mode === "edit";

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
        image: [],
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
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormInput>({
    resolver: zodResolver(propertyFormSchema),
    values: defaultValues,
  });

  const selectedAmenities = useWatch({ control, name: "amenityID" }) ?? [];

  const existingImages = useMemo<ExistingImage[]>(() => {
    if (!isEdit || !property?.images) return [];
    return property.images.filter((img) => !removedImagePaths.has(img.path));
  }, [isEdit, property, removedImagePaths]);

  const filteredAmenities = useMemo(() => {
    if (!search.trim()) return amenities?.data ?? [];
    return (amenities?.data ?? []).filter((amenity) =>
      amenity.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [amenities, search]);

  const removeExistingImage = (path: string) => {
    setRemovedImagePaths((prev) => {
      const next = new Set(prev);
      next.add(path);
      return next;
    });
  };

  const removeSelectedFile = (fileName: string) => {
    setSelectedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

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

  const onSubmit = async (values: PropertyFormInput) => {
    try {
      setUploading(true);
      const uploadModule = "property";
      let uploadedImages: UploadResult[] = [];

      if (selectedFiles.length > 0) {
        uploadedImages = await uploadFiles({
          files: selectedFiles,
          businessId,
          module: uploadModule,
          onProgress: (progress) => setUploadProgress(progress),
        });
      }

      setUploadProgress(100);

      const finalImages: ExistingImage[] = [
        ...existingImages,
        ...uploadedImages.map((image: UploadResult) => ({
          url: image.url,
          path: image.path,
        })),
      ];

      const payload: PropertiesFormValues = {
        ...values,
        amenityID: (values.amenityID ?? []) as unknown as Amenity[],
        image: finalImages,
      };

      if (isEdit && property) {
        await updateProperty.mutateAsync({ id: property.id, data: payload });

        const removedImages =
          property.images?.filter((img) => removedImagePaths.has(img.path)) ??
          [];

        await Promise.all(
          removedImages.map((img) =>
            deleteFile(img.path).catch((err) =>
              console.warn("Failed to delete removed image:", err),
            ),
          ),
        );

        setRemovedImagePaths(new Set());
        toast.success("Property updated successfully");
      } else {
        await createProperty.mutateAsync(payload);
        toast.success("Property created successfully");
      }

      setSelectedFiles([]);
      router.push("/admin/property");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : isEdit
            ? "Failed to update property"
            : "Failed to create property",
      );
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const isBusy = isSubmitting || uploading;

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

      {/* Property Information */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="mb-6 flex items-center gap-2 border-b pb-4">
          <Building2 className="h-5 w-5 text-blue-500" />
          <h2 className="text-base font-bold text-slate-800">
            Property Information
          </h2>
        </div>

        <input
            type="hidden"
            {...register("version", {
              setValueAs: (v) =>
                v === "" || v === undefined ? undefined : Number(v),
            })}
          />

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
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 shadow-2xs transition-colors ${
                  isChecked
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

      {/* Images */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="mb-6 flex items-center gap-2 border-b pb-4">
          <UploadCloud className="h-5 w-5 text-blue-500" />
          <h2 className="text-base font-bold text-slate-800">
            Property Gallery
          </h2>
        </div>

        <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 transition-colors hover:border-blue-400 hover:bg-blue-50/20">
          <UploadCloud className="mb-3 h-8 w-8 text-slate-400 transition-colors group-hover:text-blue-500" />
          <span className="text-sm font-semibold text-slate-600 group-hover:text-blue-600">
            Upload Property Images
          </span>
          <span className="mt-1 text-xs text-slate-400">
            Drag and drop or tap to browse media files
          </span>

          <input
            hidden
            multiple
            type="file"
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              setSelectedFiles((prev) => [...prev, ...files]);
            }}
          />
        </label>

        {(existingImages.length > 0 || selectedFiles.length > 0) && (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {existingImages.map((image) => (
              <div
                key={image.path}
                className="group relative aspect-square overflow-hidden rounded-xl border border-slate-100 shadow-2xs"
              >
                <Image
                  src={image.url}
                  alt={image.path}
                  unoptimized
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(image.path)}
                  className="absolute right-2 top-2 rounded-xl bg-slate-900/80 p-1.5 text-white opacity-0 blur-xs transition group-hover:opacity-100 group-hover:blur-none"
                  aria-label="Remove image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}

            {selectedFiles.map((file) => (
              <div
                key={file.name}
                className="group relative aspect-square overflow-hidden rounded-xl border border-slate-100 shadow-2xs"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => removeSelectedFile(file.name)}
                  className="absolute right-2 top-2 rounded-xl bg-slate-900/80 p-1.5 text-white opacity-0 blur-xs transition group-hover:opacity-100 group-hover:blur-none"
                  aria-label="Remove image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-xs">
          <div className="h-2 w-full rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-medium text-slate-600">
            Uploading gallery components... {uploadProgress}%
          </p>
        </div>
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

"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Amenity } from "../../amenities/definations";
import { useCreateProperty, useUpdateProperty } from "../property.services";
import { useGetAmenities } from "../../amenities/amenities.services";
import { propertyFormSchema } from "@/app/lib/property.zod";
import { PropertiesFormValues, Property } from "../definations";
import {
  deleteFile,
  uploadFiles,
  UploadResult,
} from "@/components/firebaseStorage";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500";

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
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const { data: amenities } = useGetAmenities();

  const [search, setSearch] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [removedImagePaths, setRemovedImagePaths] = useState<Set<string>>(
    new Set(),
  );

  // Track which property we last reset state for. When `property?.id`
  // changes (e.g. navigating between edit pages), adjust state during
  // render rather than in an effect — this is React's recommended
  // pattern for "reset state when a prop changes" and avoids the
  // extra render pass / set-state-in-effect lint error.
  const [lastPropertyId, setLastPropertyId] = useState(property?.id);
  if (property?.id !== lastPropertyId) {
    setLastPropertyId(property?.id);
    setRemovedImagePaths(new Set());
  }

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const isEdit = mode === "edit";

  const defaultValues = useMemo<PropertyFormInput>(() => {
    if (isEdit && property) {
      return {
        name: property.name ?? "",
        address: property.address ?? "",
        location: property.location ?? "",
        apartmentType: property.apartmentType ?? "",
        description: property.description ?? "",

        parking: property.parking ?? 0,
        bedrooms: property.bedrooms ?? 0,
        bathrooms: property.bathrooms ?? 0,
        squareMeters: property.squareMeters ?? 1,

        status: property.status ?? "available",

        amenityID: property.amenityID ?? [],

        image: [],
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
    };
  }, [isEdit, property]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormInput>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues,
  });

  // Repopulate the form whenever the source property changes (e.g. data
  // arrives after an async fetch in the parent). `reset` is react-hook-form's
  // own API, not a useState setter, so this is safe inside an effect.
  useEffect(() => {
    if (isEdit && property) {
      reset(defaultValues);
    }
  }, [isEdit, property, defaultValues, reset]);

  // Derived, not stored: the existing images are whatever the property has,
  // minus whatever the user has marked for removal in this session.
  const existingImages = useMemo<ExistingImage[]>(() => {
    if (!isEdit || !property?.image) return [];
    return property.image.filter((img) => !removedImagePaths.has(img.path));
  }, [isEdit, property, removedImagePaths]);

  const filteredAmenities = useMemo(() => {
    return (
      amenities?.data.filter((amenity) =>
        amenity.name.toLowerCase().includes(search.toLowerCase()),
      ) || []
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

        // Clean up any images the user removed during this edit.
        const removedImages =
          property.image?.filter((img) => removedImagePaths.has(img.path)) ??
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Property Information */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">Property Information</h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label>Name</label>
            <input {...register("name")} className={inputClass} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label>Apartment Type</label>
            <input {...register("apartmentType")} className={inputClass} />
            {errors.apartmentType && (
              <p className="text-sm text-red-500">
                {errors.apartmentType.message}
              </p>
            )}
          </div>

          <div>
            <label>Status</label>
            <select {...register("status")} className={inputClass}>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label>Description</label>
            <textarea
              rows={5}
              {...register("description")}
              className={inputClass}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">Location</h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label>Address</label>
            <input {...register("address")} className={inputClass} />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label>Location</label>
            <input {...register("location")} className={inputClass} />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">Specifications</h2>

        <div className="grid gap-5 md:grid-cols-4">
          <div>
            <label>Bedrooms</label>
            <input
              type="number"
              {...register("bedrooms", { valueAsNumber: true })}
              className={inputClass}
            />
          </div>

          <div>
            <label>Bathrooms</label>
            <input
              type="number"
              {...register("bathrooms", { valueAsNumber: true })}
              className={inputClass}
            />
          </div>

          <div>
            <label>Parking</label>
            <input
              type="number"
              {...register("parking", { valueAsNumber: true })}
              className={inputClass}
            />
          </div>

          <div>
            <label>Square Meters</label>
            <input
              type="number"
              {...register("squareMeters", { valueAsNumber: true })}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">Amenities</h2>

        <input
          placeholder="Search amenities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} mb-4`}
        />

        <div className="max-h-80 overflow-y-auto rounded-xl border p-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filteredAmenities.map((amenity: Amenity) => (
              <label
                key={amenity.id}
                className="flex items-center gap-3 rounded-xl border p-3 hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  value={amenity.id}
                  {...register("amenityID")}
                />
                <span>{amenity.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">Property Images</h2>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8">
          <UploadCloud className="mb-3 h-10 w-10 text-slate-400" />
          <span>Upload Property Images</span>

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
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {existingImages.map((image) => (
              <div
                key={image.path}
                className="group relative aspect-square overflow-hidden rounded-xl border"
              >
                <Image
                  src={image.url}
                  alt={image.path}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(image.path)}
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            {selectedFiles.map((file) => (
              <div
                key={file.name}
                className="group relative aspect-square overflow-hidden rounded-xl border"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeSelectedFile(file.name)}
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="rounded-xl border bg-white p-4">
          <div className="h-3 rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>

          <p className="mt-2 text-sm">Uploading... {uploadProgress}%</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button type="button" className="rounded-xl border px-6 py-3">
          Save Draft
        </button>

        <button
          type="submit"
          disabled={isBusy}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white disabled:opacity-60"
        >
          {isBusy && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? "Save Changes" : "Create Property"}
        </button>
      </div>
    </form>
  );
}

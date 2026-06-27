"use client";

import { useEffect } from "react";
import { Edit, Loader2, Plus, Save } from "lucide-react";
import { DynamicIcon, iconNames } from "lucide-react/dynamic";
import { Amenity } from "@/types/amenity.definations";
import { AmenityFormValues, amenitySchema } from "@/schemas/amenity.zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  amenity: Amenity | null;
  onSave: (values: AmenityFormValues, existingId?: string) => Promise<void>;
  onClose: () => void;
}

const DEFAULT_ICON = "tag";

const quickPickIcons = [
  { value: "tag", label: "General" },
  { value: "car", label: "Parking" },
  { value: "wifi", label: "Wi-Fi" },
  { value: "sofa", label: "Furnished" },
  { value: "shield-check", label: "Security" },
  { value: "droplets", label: "Water" },
  { value: "zap", label: "Power" },
  { value: "washing-machine", label: "Laundry" },
  { value: "dumbbell", label: "Gym" },
  { value: "trees", label: "Outdoor" },
] as const;

function normalizeIconName(icon: string) {
  const legacyIconMap: Record<string, string> = {
    "fas fa-tshirt": "shirt",
    "fas fa-female": "user-round",
    "fas fa-shoe-prints": "footprints",
    "fas fa-gem": "gem",
    "fas fa-vest": "shirt",
    "fas fa-child": "baby",
    "fas fa-running": "activity",
    "fas fa-bed": "bed-double",
    "fas fa-tag": "tag",
    "fas fa-shirt": "shirt",
    "fas fa-hat-cowboy": "sparkles",
  };

  return legacyIconMap[icon] ?? icon;
}

function getSafeIconName(icon: string) {
  const normalized = normalizeIconName(icon.trim() || DEFAULT_ICON);

  return iconNames.includes(normalized as never) ? normalized : DEFAULT_ICON;
}

export default function AmenityModal({ amenity, onSave, onClose }: Props) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    control,
    setFocus,
  } = useForm<AmenityFormValues>({
    resolver: zodResolver(amenitySchema),
    defaultValues: {
      name: amenity?.name ?? "",
      description: amenity?.description ?? "",
      icon: amenity?.icon ?? DEFAULT_ICON,
      category: amenity?.category ?? "General",
      version: amenity?.version,
    },
  });

  const icon = useWatch({ control, name: "icon" });

  // Lock background scroll & autofocus
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setFocus("name");
    return () => {
      document.body.style.overflow = "";
    };
  }, [setFocus]);

  async function submitAmenity(values: AmenityFormValues) {
    console.log("valu", values);
    await onSave(values, amenity?.id);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 rounded-t-2xl flex justify-between items-center z-10">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {amenity ? <Edit /> : <Plus />}{" "}
            {amenity ? "Edit Amenity" : "Add New Amenity"}
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submitAmenity)} className="p-6 space-y-5">
          {/* hidden version input */}
          <input
            type="hidden"
            {...register("version", {
              setValueAs: (v) =>
                v === "" || v === undefined ? undefined : Number(v),
            })}
          />
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Amenity Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name")}
              required
              placeholder="e.g. Parking"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500"
            />
            {errors.name ? (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            ) : null}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description")}
              rows={3}
              required
              placeholder="e.g. Dedicated parking space for residents"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-black placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Amenity Group{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              {...register("category")}
              placeholder="e.g. General, Connectivity, Interior"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500"
            />
          </div>

          {/* Icon with live preview */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Icon{" "}
              <span className="text-gray-400 font-normal">
                (Lucide icon name)
              </span>
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                {...register("icon")}
                placeholder="e.g. car, wifi, sofa"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500"
              />
              {/* Live icon preview bubble */}
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <DynamicIcon
                  name={getSafeIconName(icon) as never}
                  size={22}
                  className="text-blue-600"
                />
              </div>
            </div>

            {/* Quick-pick icon suggestions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {quickPickIcons.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setValue("icon", value, { shouldValidate: true })
                  }
                  title={label}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition border ${icon === value
                      ? "bg-blue-100 border-blue-400 text-blue-600"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-300"
                    }`}
                >
                  <DynamicIcon
                    name={getSafeIconName(value) as never}
                    size={16}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-xl hover:shadow-lg transition font-medium flex items-center justify-center gap-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Saving Amenity...
                </>
              ) : (
                <>
                  <Save size={14} />
                  Save Amenity
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

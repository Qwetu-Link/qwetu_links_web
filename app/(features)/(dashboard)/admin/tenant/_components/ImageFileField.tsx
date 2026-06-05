"use client";

import { ChangeEvent } from "react";
import { ImagePlus } from "lucide-react";

type ImageFileFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function canPreview(value: string) {
  return (
    value.startsWith("blob:") ||
    value.startsWith("data:image/") ||
    value.startsWith("http://") ||
    value.startsWith("https://")
  );
}

export default function ImageFileField({
  id,
  label,
  value,
  onChange,
}: ImageFileFieldProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    onChange(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="grid gap-3 sm:grid-cols-[132px_minmax(0,1fr)]">
        <div
          className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-orange-100 bg-slate-50 bg-cover bg-center text-slate-400 sm:w-32"
          style={canPreview(value) ? { backgroundImage: `url("${value}")` } : undefined}
        >
          {!canPreview(value) && <ImagePlus size={24} />}
        </div>

        <label
          htmlFor={id}
          className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-orange-200 bg-white px-4 py-5 text-center transition hover:bg-orange-50/50"
        >
          <ImagePlus className="mb-2 text-orange-500" size={20} />
          <span className="text-sm font-semibold text-slate-800">
            Choose file from device
          </span>
          <span className="mt-1 max-w-full truncate text-xs text-slate-500">
            {value || "PNG, JPG, WEBP, GIF, or SVG"}
          </span>
          <input
            id={id}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
}

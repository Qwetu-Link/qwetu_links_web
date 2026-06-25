"use client";

import { ChangeEvent, useState } from "react";
import { CheckCircle2, ImagePlus, Loader2, Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import { deleteFile, uploadFile, UploadResult } from "@/components/firebaseStorage";

type ImageFileFieldProps = {
  id: string;
  label: string;
  businessId: string;
  value: string;
  avatarPath?: string;
  onChange: (value: string, path: string) => void;
};

type UploadStatus = "idle" | "uploading" | "done" | "error";

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
  businessId,
  value,
  avatarPath,
  onChange,
}: ImageFileFieldProps) {
  const [status, setStatus] = useState<UploadStatus>(value ? "done" : "idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // If there's an existing uploaded image, delete it first
    if (avatarPath) {
      try {
        await deleteFile(avatarPath);
      } catch {
        // non-fatal — continue with new upload
      }
    }

    setStatus("uploading");
    setProgress(0);
    setError(null);

    try {
      const result: UploadResult = await uploadFile({
        file,
        businessId,
        module: "avatars",
        onProgress: (p) => setProgress(p),
      });

      setStatus("done");
      onChange(result.url, result.path);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Upload failed.");
    }

    // Reset input so the same file can be re-selected after an error
    event.target.value = "";
  };

  const handleRemove = async () => {
    if (avatarPath) {
      try {
        await deleteFile(avatarPath);
      } catch {
        // non-fatal
      }
    }
    setStatus("idle");
    setProgress(0);
    setError(null);
    onChange("", "");
  };

  return (
    <div className="space-y-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="grid gap-3 sm:grid-cols-[132px_minmax(0,1fr)]">

        {/* Preview */}
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-orange-100 bg-slate-50 sm:w-32">
          {canPreview(value) ? (
            <>
              <Image
                src={value}
                alt="Avatar preview"
                fill
                className="object-cover"
                unoptimized={value.startsWith("blob:")}
              />

              {/* Uploading overlay */}
              {status === "uploading" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50">
                  <Loader2 size={20} className="animate-spin text-white" />
                  <div className="w-3/4 overflow-hidden rounded-full bg-white/30">
                    <div
                      className="h-1.5 rounded-full bg-white transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-white">{progress}%</span>
                </div>
              )}

              {/* Done badge */}
              {status === "done" && (
                <div className="absolute top-1.5 left-1.5">
                  <CheckCircle2 size={18} className="text-emerald-400 drop-shadow" />
                </div>
              )}

              {/* Remove button */}
              {status !== "uploading" && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-red-500"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </>
          ) : (
            <ImagePlus size={24} className="text-slate-400" />
          )}
        </div>

        {/* Drop zone / error */}
        {status === "error" ? (
          <div className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-red-200 bg-red-50 px-4 py-5 text-center">
            <XCircle size={20} className="text-red-400" />
            <p className="text-sm font-semibold text-red-700">Upload failed</p>
            <p className="text-xs text-red-500">{error}</p>
            <label
              htmlFor={id}
              className="mt-1 cursor-pointer text-xs font-semibold text-blue-600 underline"
            >
              Try again
              <input
                id={id}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
          </div>
        ) : (
          <label
            htmlFor={id}
            className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-orange-200 bg-white px-4 py-5 text-center transition hover:bg-orange-50/50"
          >
            <ImagePlus className="mb-2 text-orange-500" size={20} />
            <span className="text-sm font-semibold text-slate-800">
              {status === "uploading" ? "Uploading..." : "Choose file from device"}
            </span>
            <span className="mt-1 max-w-full truncate text-xs text-slate-500">
              {value || "PNG, JPG, WEBP, GIF, or SVG"}
            </span>
            <input
              id={id}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={status === "uploading"}
              className="sr-only"
            />
          </label>
        )}
      </div>
    </div>
  );
}

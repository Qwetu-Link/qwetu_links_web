"use client";

import { ChangeEvent, useState } from "react";
import { CheckCircle2, ImagePlus, Loader2, Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import { deleteFile, uploadFile, UploadResult } from "@/utils/firebaseStorage";

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

    if (avatarPath) {
      try { await deleteFile(avatarPath); } catch { /* non-fatal */ }
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

    event.target.value = "";
  };

  const handleRemove = async () => {
    if (avatarPath) {
      try { await deleteFile(avatarPath); } catch { /* non-fatal */ }
    }
    setStatus("idle");
    setProgress(0);
    setError(null);
    onChange("", "");
  };

  const hasPreview = canPreview(value);

  return (
    <div className="space-y-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">

        {/* Avatar preview */}
        <div className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-orange-100 bg-slate-50 sm:mx-0 sm:h-20 sm:w-20">
          {hasPreview ? (
            <>
              <Image
                src={value}
                alt="Avatar"
                fill
                className="object-cover"
                unoptimized={value.startsWith("blob:")}
              />
              {status !== "uploading" && (
                <button
                  type="button"
                  onClick={handleRemove}
                  title="Remove image"
                  className="absolute inset-0 flex items-center justify-center bg-black/0 text-transparent transition hover:bg-black/40 hover:text-white"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-300">
              <ImagePlus size={28} />
            </div>
          )}
        </div>

        {/* Status panel */}
        <div className="flex-1 space-y-2">
          {status === "uploading" && (
            <div className="flex flex-col justify-center gap-2 rounded-xl border border-orange-100 bg-slate-50 px-4 py-4">
              <div className="flex items-center gap-2">
                <Loader2 size={15} className="animate-spin text-orange-500" />
                <span className="text-sm font-medium text-slate-700">Uploading…</span>
                <span className="ml-auto text-xs font-semibold tabular-nums text-slate-500">
                  {progress}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {status === "done" && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-700">Image uploaded</span>
              <label
                htmlFor={id}
                className="ml-auto cursor-pointer text-xs font-semibold text-slate-500 underline underline-offset-2 hover:text-slate-800"
              >
                Replace
                <input
                  id={id}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-1.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <XCircle size={16} className="shrink-0 text-red-500" />
                <span className="text-sm font-medium text-red-700">Upload failed</span>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <label
                htmlFor={id}
                className="inline-block cursor-pointer text-xs font-semibold text-blue-600 underline underline-offset-2"
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
          )}

          {status === "idle" && (
            <label
              htmlFor={id}
              className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-orange-200 bg-white px-4 py-5 text-center transition hover:bg-orange-50/50"
            >
              <ImagePlus size={18} className="text-orange-400" />
              <span className="text-sm font-semibold text-slate-700">Choose a photo</span>
              <span className="text-xs text-slate-400">PNG, JPG, WEBP or SVG</span>
              <input
                id={id}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

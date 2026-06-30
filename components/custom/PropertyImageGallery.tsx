"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
    CheckCircle2,
    Loader2,
    ShieldCheck,
    Trash2,
    UploadCloud,
    XCircle,
} from "lucide-react";
import Image from "next/image";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { deleteFile, uploadFile, UploadResult } from "@/utils/firebaseStorage";
import { GalleryImage } from "@/types/property.definations";


type PropertyImageGalleryProps = {
    businessId: string;
    images: GalleryImage[];
    onChange: (images: GalleryImage[]) => void;
};

// Firebase Storage URLs aren't in next.config's image domains by default,
// and blob: previews can never be optimized — so any non-local-file preview
// just renders as-is rather than risking a broken Next/Image optimization pass.
const isUnoptimizable = (url: string) =>
    url.startsWith("blob:") ||
    url.startsWith("data:") ||
    url.includes("firebasestorage.googleapis.com");

export default function PropertyImageGallery({
    businessId,
    images,
    onChange,
}: PropertyImageGalleryProps) {
    const [authReady, setAuthReady] = useState(() => !!auth.currentUser);
    const pendingUploadsRef = useRef<Map<string, File>>(new Map());
    const blobUrlsRef = useRef<Set<string>>(new Set());

    // Always-fresh mirror of the `images` prop. Upload callbacks (onProgress,
    // .then/.catch) are async and can fire well after the render that kicked
    // them off — reading `images` directly inside those callbacks closes over
    // a stale array and silently reverts/erases concurrent updates. Every
    // internal read/write goes through this ref instead; only JSX rendering
    // uses the `images` prop directly.
    const imagesRef = useRef<GalleryImage[]>(images);
    useEffect(() => {
        imagesRef.current = images;
    }, [images]);

    const updateImage = (id: string, patch: Partial<GalleryImage>) => {
        const updated = imagesRef.current.map((img) =>
            img.id === id ? { ...img, ...patch } : img,
        );
        imagesRef.current = updated;
        onChange(updated);
    };

    const addImages = (newItems: GalleryImage[]) => {
        const updated = [...imagesRef.current, ...newItems];
        imagesRef.current = updated;
        onChange(updated);
    };

    const removeImage = (id: string) => {
        const updated = imagesRef.current.filter((img) => img.id !== id);
        imagesRef.current = updated;
        onChange(updated);
    };

    const startUpload = (item: GalleryImage, file: File) => {
        if (!auth.currentUser) {
            pendingUploadsRef.current.set(item.id, file);
            return;
        }

        uploadFile({
            file,
            businessId,
            module: "property",
            onProgress: (progress) => {
                // Fires repeatedly from 0 up to 100 as bytes transfer
                updateImage(item.id, { progress });
            },
        })
            .then((result: UploadResult) => {
                // Swap the local blob preview for the real, persistent
                // Firebase download URL so the preview survives a refresh.
                const blobUrl = item.url;
                updateImage(item.id, {
                    status: "done",
                    progress: 100,
                    url: result.url,
                    path: result.path,
                });

                if (blobUrl.startsWith("blob:")) {
                    URL.revokeObjectURL(blobUrl);
                    blobUrlsRef.current.delete(blobUrl);
                }
            })
            .catch((err) => {
                updateImage(item.id, {
                    status: "error",
                    progress: 0,
                    error: err instanceof Error ? err.message : "Upload failed.",
                });
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            const ready = !!user;
            setAuthReady(ready);

            if (ready && pendingUploadsRef.current.size > 0) {
                const queued = Array.from(pendingUploadsRef.current.entries());
                pendingUploadsRef.current.clear();
                queued.forEach(([id, file]) => {
                    // Read from the ref, not the `images` prop — this effect
                    // only runs once on mount, so the prop closure would be
                    // permanently stuck at whatever `images` was at mount time.
                    const item = imagesRef.current.find((img) => img.id === id);
                    if (item) startUpload(item, file);
                });
            }
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Revoke every blob URL we created when the component unmounts —
    // covers navigating away mid-upload.
    useEffect(() => {
        const blobUrlsAtMount = blobUrlsRef.current;
        return () => {
            blobUrlsAtMount.forEach((url) => URL.revokeObjectURL(url));
            blobUrlsAtMount.clear();
        };
    }, []);

    const handleFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        event.target.value = "";
        if (files.length === 0) return;

        const newItems: GalleryImage[] = files.map((file) => {
            const blobUrl = URL.createObjectURL(file);
            blobUrlsRef.current.add(blobUrl);

            return {
                id: crypto.randomUUID(),
                url: blobUrl,
                path: "",
                status: "uploading",
                progress: 0,
                file,
            };
        });

        addImages(newItems);
        newItems.forEach((item, idx) => startUpload(item, files[idx]));
    };

    const handleRetry = (id: string) => {
        const target = imagesRef.current.find((img) => img.id === id);
        if (!target?.file) return;
        updateImage(id, { status: "uploading", progress: 0, error: undefined });
        startUpload(target, target.file);
    };

    const handleRemove = async (id: string) => {
        const target = imagesRef.current.find((img) => img.id === id);
        if (!target) return;

        removeImage(id);
        pendingUploadsRef.current.delete(id);

        // Clean up the blob URL if removal happens before upload finished
        if (target.url.startsWith("blob:")) {
            URL.revokeObjectURL(target.url);
            blobUrlsRef.current.delete(target.url);
        }

        // Only hits storage if the file actually finished uploading
        if (target.path && auth.currentUser) {
            try {
                await deleteFile(target.path);
            } catch (err) {
                console.warn("Failed to delete image:", err);
            }
        }
    };

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="mb-6 flex items-center gap-2 border-b pb-4">
                <UploadCloud className="h-5 w-5 text-blue-500" />
                <h2 className="text-base font-bold text-slate-800">Property Gallery</h2>
            </div>

            <label
                className={`group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors ${
                    authReady
                        ? "cursor-pointer border-slate-200 bg-slate-50/50 hover:border-blue-400 hover:bg-blue-50/20"
                        : "cursor-not-allowed border-slate-100 bg-slate-50/30 opacity-70"
                }`}
            >
                {authReady ? (
                    <>
                        <UploadCloud className="mb-3 h-8 w-8 text-slate-400 transition-colors group-hover:text-blue-500" />
                        <span className="text-sm font-semibold text-slate-600 group-hover:text-blue-600">
                            Upload Property Images
                        </span>
                        <span className="mt-1 text-xs text-slate-400">
                            Drag and drop or tap to browse media files
                        </span>
                    </>
                ) : (
                    <>
                        <Loader2 className="mb-3 h-8 w-8 animate-spin text-slate-400" />
                        <span className="text-sm font-semibold text-slate-500">
                            Preparing secure upload…
                        </span>
                        <span className="mt-1 text-xs text-slate-400">
                            You can pick files now — upload starts automatically once ready
                        </span>
                    </>
                )}

                <input
                    hidden
                    multiple
                    type="file"
                    accept="image/*"
                    onChange={handleFilesSelected}
                />
            </label>

            {!authReady && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Authenticating with secure storage…
                </p>
            )}

            {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="group relative aspect-square overflow-hidden rounded-xl border border-slate-100 shadow-2xs"
                        >
                            <Image
                                src={image.url}
                                alt={image.path || "Property image"}
                                unoptimized={isUnoptimizable(image.url)}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover transition duration-300 group-hover:scale-105"
                            />

                            {image.status === "uploading" && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 px-3 text-white">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span className="text-xs font-semibold tabular-nums">
                                        {authReady ? `${image.progress}%` : "Waiting…"}
                                    </span>
                                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/30">
                                        <div
                                            className="h-full rounded-full bg-white transition-all duration-200"
                                            style={{ width: `${authReady ? image.progress : 0}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {image.status === "error" && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-red-900/75 px-3 text-center text-white">
                                    <XCircle className="h-5 w-5" />
                                    <span className="text-[11px] leading-tight">
                                        {image.error ?? "Upload failed"}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleRetry(image.id)}
                                        className="mt-1 rounded-md bg-white/15 px-2 py-1 text-[11px] font-semibold underline-offset-2 hover:bg-white/25 hover:underline"
                                    >
                                        Try again
                                    </button>
                                </div>
                            )}

                            {image.status === "done" && (
                                <div className="absolute left-2 top-2 rounded-full bg-emerald-500 p-1 text-white shadow">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                </div>
                            )}

                            {image.status !== "uploading" && (
                                <button
                                    type="button"
                                    onClick={() => handleRemove(image.id)}
                                    className="absolute right-2 top-2 rounded-xl bg-slate-900/80 p-1.5 text-white opacity-0 blur-xs transition group-hover:opacity-100 group-hover:blur-none"
                                    aria-label="Remove image"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
// // UnitImageUpload.tsx
// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   ImagePlus,
//   Trash2,
//   Loader2,
//   CheckCircle2,
//   XCircle,
// } from "lucide-react";
// import Image from "next/image";
// import {
//   deleteFile,
//   uploadFile,
//   UploadResult,
// } from "@/components/firebaseStorage";

// interface ImageEntry {
//   id: string;
//   previewUrl: string;
//   storageUrl?: string;
//   storagePath?: string;
//   progress: number;
//   status: "pending" | "uploading" | "done" | "error";
//   error?: string;
// }

// interface UnitImageUploadProps {
//   businessId: string;
//   initialImages?: { id: string; url: string; path: string }[];
//   onChange: (urls: string[]) => void;
// }

// export default function UnitImageUpload({
//   businessId,
//   initialImages = [],
//   onChange,
// }: UnitImageUploadProps) {
//   const [images, setImages] = useState<ImageEntry[]>(() => {
//     return initialImages.map((img) => ({
//       id: img.id,
//       previewUrl: img.url,
//       storageUrl: img.url,
//       storagePath: img.path,
//       progress: 100,
//       status: "done" as const,
//     }));
//   });

//   // Wrapped in useCallback to prevent infinite effect loops
//   const notify = useCallback((updated: ImageEntry[]) => {
//     const uploadedUrls = updated
//       .filter((img) => img.status === "done" && img.storageUrl)
//       .map((img) => img.storageUrl!);
//     onChange(uploadedUrls);
//   }, [onChange]);

//   useEffect(() => {
//     notify(images);
//   }, [images, notify]);

//   const handleFiles = useCallback(
//     async (files: FileList | null) => {
//       if (!files || files.length === 0) return;

//       const entries: ImageEntry[] = Array.from(files).map((file) => ({
//         id: crypto.randomUUID(),
//         previewUrl: URL.createObjectURL(file),
//         progress: 0,
//         status: "pending",
//       }));

//       setImages((prev) => {
//         const updated = [...prev, ...entries];
//         notify(updated);
//         return updated;
//       });

//       // Upload each file
//       for (const entry of entries) {
//         const file =
//           Array.from(files).find((_, i) => entries[i].id === entry.id) ??
//           Array.from(files)[entries.indexOf(entry)];

//         setImages((prev) =>
//           prev.map((img) =>
//             img.id === entry.id ? { ...img, status: "uploading" } : img,
//           ),
//         );

//         try {
//           const result: UploadResult = await uploadFile({
//             file,
//             businessId,
//             module: "units",
//             onProgress: (progress) => {
//               setImages((prev) =>
//                 prev.map((img) =>
//                   img.id === entry.id ? { ...img, progress } : img,
//                 ),
//               );
//             },
//           });

//           setImages((prev) => {
//             const updated = prev.map((img) =>
//               img.id === entry.id
//                 ? {
//                     ...img,
//                     storageUrl: result.url,
//                     storagePath: result.path,
//                     progress: 100,
//                     status: "done" as const,
//                   }
//                 : img,
//             );
//             notify(updated);
//             return updated;
//           });
//         } catch (err) {
//           setImages((prev) =>
//             prev.map((img) =>
//               img.id === entry.id
//                 ? {
//                     ...img,
//                     status: "error" as const,
//                     error:
//                       err instanceof Error ? err.message : "Upload failed.",
//                   }
//                 : img,
//             ),
//           );
//         }
//       }
//     },
//     [businessId, notify],
//   );

//   const handleRemove = async (entry: ImageEntry) => {
//     if (entry.previewUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(entry.previewUrl);
//     }
//     if (entry.storagePath) {
//       try {
//         await deleteFile(entry.storagePath);
//       } catch {
//         // non-fatal — continue removing from UI
//       }
//     }
//     setImages((prev) => {
//       const updated = prev.filter((img) => img.id !== entry.id);
//       notify(updated);
//       return updated;
//     });
//   };

//   return (
//     <div className="space-y-3">
//       <label className="block text-sm font-medium text-gray-700">Images</label>

//       {/* Drop zone */}
//       <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8 transition hover:border-blue-400 hover:bg-blue-50">
//         <ImagePlus size={28} className="text-gray-300" />
//         <p className="text-sm font-medium text-gray-500">
//           Click to upload images
//         </p>
//         <p className="text-xs text-gray-400">
//           JPEG, PNG, WEBP, GIF, SVG — max 10 MB each
//         </p>
//         <input
//           type="file"
//           accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
//           multiple
//           className="hidden"
//           onChange={(e) => handleFiles(e.target.files)}
//         />
//       </label>

//       {/* Preview grid */}
//       {images.length > 0 && (
//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
//           {images.map((img) => (
//             <div
//               key={img.id}
//               className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
//             >
//               <div className="aspect-square w-full overflow-hidden">
//                 <Image
//                   src={img.previewUrl}
//                   alt="Preview"
//                   className="h-full w-full object-cover"
//                   width={400}
//                   height={300}
//                   unoptimized={img.previewUrl.startsWith("blob:")}
//                 />
//               </div>

//               {img.status === "uploading" && (
//                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50">
//                   <Loader2 size={20} className="animate-spin text-white" />
//                   <div className="w-3/4 overflow-hidden rounded-full bg-white/30">
//                     <div
//                       className="h-1.5 rounded-full bg-white transition-all duration-200"
//                       style={{ width: `${img.progress}%` }}
//                     />
//                   </div>
//                   <span className="text-xs font-semibold text-white">
//                     {img.progress}%
//                   </span>
//                 </div>
//               )}

//               {img.status === "done" && (
//                 <div className="absolute top-2 left-2">
//                   <CheckCircle2
//                     size={18}
//                     className="text-emerald-400 drop-shadow"
//                   />
//                 </div>
//               )}

//               {img.status === "error" && (
//                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-red-900/60 p-2 text-center">
//                   <XCircle size={20} className="text-red-300" />
//                   <p className="text-[10px] leading-tight text-red-200">
//                     {img.error}
//                   </p>
//                 </div>
//               )}

//               {img.status !== "uploading" && (
//                 <button
//                   type="button"
//                   onClick={() => handleRemove(img)}
//                   className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500"
//                 >
//                   <Trash2 size={12} />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // // UnitImageUpload.tsx
// // "use client";

// // import { useCallback, useEffect, useState } from "react";
// // import {
// //   ImagePlus,
// //   Trash2,
// //   Loader2,
// //   CheckCircle2,
// //   XCircle,
// // } from "lucide-react";
// // import Image from "next/image";
// // import {
// //   deleteFile,
// //   uploadFile,
// //   UploadResult,
// // } from "@/components/firebaseStorage";

// // interface ImageEntry {
// //   id: string;
// //   previewUrl: string;
// //   storageUrl?: string;
// //   storagePath?: string;
// //   progress: number;
// //   status: "pending" | "uploading" | "done" | "error";
// //   error?: string;
// // }

// // interface UnitImageUploadProps {
// //   businessId: string;
// //   initialImages?: { id: string; url: string; path: string }[];
// //   onChange: (urls: string[]) => void;
// // }

// // export default function UnitImageUpload({
// //   businessId,
// //   initialImages = [],
// //   onChange,
// // }: UnitImageUploadProps) {
// //   const [images, setImages] = useState<ImageEntry[]>(() => {
// //     const initial = initialImages.map((img) => ({
// //       // id: crypto.randomUUID(),
// //       id: img.id,
// //       previewUrl: img.url,
// //       storageUrl: img.url,
// //       storagePath: img.path,
// //       progress: 100,
// //       status: "done" as const,
// //     }));
// //     return initial;
// //   });

// //   useEffect(() => {
// //     notify(images);
// //   }, [images]);

// //   const notify = (updated: ImageEntry[]) => {
// //     onChange(
// //       updated
// //         .filter((img) => img.status === "done" && img.storageUrl)
// //         .map((img) => img.storageUrl!),
// //     );
// //   };

// //   const handleFiles = useCallback(
// //     async (files: FileList | null) => {
// //       if (!files || files.length === 0) return;

// //       const entries: ImageEntry[] = Array.from(files).map((file) => ({
// //         id: crypto.randomUUID(),
// //         previewUrl: URL.createObjectURL(file),
// //         progress: 0,
// //         status: "pending",
// //       }));

// //       setImages((prev) => {
// //         const updated = [...prev, ...entries];
// //         notify(updated);
// //         return updated;
// //       });

// //       // Upload each file
// //       for (const entry of entries) {
// //         const file =
// //           Array.from(files).find((_, i) => entries[i].id === entry.id) ??
// //           Array.from(files)[entries.indexOf(entry)];

// //         setImages((prev) =>
// //           prev.map((img) =>
// //             img.id === entry.id ? { ...img, status: "uploading" } : img,
// //           ),
// //         );

// //         try {
// //           const result: UploadResult = await uploadFile({
// //             file,
// //             businessId,
// //             module: "units",
// //             onProgress: (progress) => {
// //               setImages((prev) =>
// //                 prev.map((img) =>
// //                   img.id === entry.id ? { ...img, progress } : img,
// //                 ),
// //               );
// //             },
// //           });

// //           setImages((prev) => {
// //             const updated = prev.map((img) =>
// //               img.id === entry.id
// //                 ? {
// //                     ...img,
// //                     storageUrl: result.url,
// //                     storagePath: result.path,
// //                     progress: 100,
// //                     status: "done" as const,
// //                   }
// //                 : img,
// //             );
// //             notify(updated);
// //             return updated;
// //           });
// //         } catch (err) {
// //           setImages((prev) =>
// //             prev.map((img) =>
// //               img.id === entry.id
// //                 ? {
// //                     ...img,
// //                     status: "error" as const,
// //                     error:
// //                       err instanceof Error ? err.message : "Upload failed.",
// //                   }
// //                 : img,
// //             ),
// //           );
// //         }
// //       }
// //     },
// //     [businessId],
// //   );

// //   const handleRemove = async (entry: ImageEntry) => {
// //     // Revoke blob URL to free memory
// //     if (entry.previewUrl.startsWith("blob:")) {
// //       URL.revokeObjectURL(entry.previewUrl);
// //     }
// //     // Delete from Firebase if already uploaded
// //     if (entry.storagePath) {
// //       try {
// //         await deleteFile(entry.storagePath);
// //       } catch {
// //         // non-fatal — continue removing from UI
// //       }
// //     }
// //     setImages((prev) => {
// //       const updated = prev.filter((img) => img.id !== entry.id);
// //       notify(updated);
// //       return updated;
// //     });
// //   };

// //   return (
// //     <div className="space-y-3">
// //       <label className="block text-sm font-medium text-gray-700">Images</label>

// //       {/* Drop zone */}
// //       <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8 transition hover:border-blue-400 hover:bg-blue-50">
// //         <ImagePlus size={28} className="text-gray-300" />
// //         <p className="text-sm font-medium text-gray-500">
// //           Click to upload images
// //         </p>
// //         <p className="text-xs text-gray-400">
// //           JPEG, PNG, WEBP, GIF, SVG — max 10 MB each
// //         </p>
// //         <input
// //           type="file"
// //           accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
// //           multiple
// //           className="hidden"
// //           onChange={(e) => handleFiles(e.target.files)}
// //         />
// //       </label>

// //       {/* Preview grid */}
// //       {images.length > 0 && (
// //         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
// //           {images.map((img) => (
// //             <div
// //               key={img.id}
// //               className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
// //             >
// //               {/* Image preview */}
// //               <div className="aspect-square w-full overflow-hidden">
// //                 <Image
// //                   src={img.previewUrl}
// //                   alt="Preview"
// //                   className="h-full w-full object-cover"
// //                   width={400}
// //                   height={300}
// //                 />
// //               </div>

// //               {/* Overlay — uploading */}
// //               {img.status === "uploading" && (
// //                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50">
// //                   <Loader2 size={20} className="animate-spin text-white" />
// //                   <div className="w-3/4 overflow-hidden rounded-full bg-white/30">
// //                     <div
// //                       className="h-1.5 rounded-full bg-white transition-all duration-200"
// //                       style={{ width: `${img.progress}%` }}
// //                     />
// //                   </div>
// //                   <span className="text-xs font-semibold text-white">
// //                     {img.progress}%
// //                   </span>
// //                 </div>
// //               )}

// //               {/* Overlay — done */}
// //               {img.status === "done" && (
// //                 <div className="absolute top-2 left-2">
// //                   <CheckCircle2
// //                     size={18}
// //                     className="text-emerald-400 drop-shadow"
// //                   />
// //                 </div>
// //               )}

// //               {/* Overlay — error */}
// //               {img.status === "error" && (
// //                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-red-900/60 p-2 text-center">
// //                   <XCircle size={20} className="text-red-300" />
// //                   <p className="text-[10px] leading-tight text-red-200">
// //                     {img.error}
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Remove button */}
// //               {img.status !== "uploading" && (
// //                 <button
// //                   type="button"
// //                   onClick={() => handleRemove(img)}
// //                   className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500"
// //                 >
// //                   <Trash2 size={12} />
// //                 </button>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

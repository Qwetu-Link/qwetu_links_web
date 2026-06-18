// // EditBusinessForm.tsx  — EDIT mode (all fields)
// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SubmitHandler, useForm, useWatch } from "react-hook-form";
// import { AlertCircle, ArrowLeft, Building2, Save, Upload } from "lucide-react";
// import { useEffect, useState } from "react";
// import { RegisterBusinessFormInputs } from "../definations";
// import { useBizDetails, useUpdateBusiness } from "../business.service";
// import { BusinessFormValues } from "../acc.zod";
// import { fieldClass, getBusinessFormSchema, textAreaClass } from "../utils";
// import { updateFile, uploadFile } from "@/components/firebaseStorage";
// import Image from "next/image";

// const STORAGE_MODULE = "logo";

// const ROLES = [
//   { value: "landlord", label: "Landlord" },
//   { value: "property_manager", label: "Property Manager" },
//   { value: "agent", label: "Agent" },
//   { value: "developer", label: "Developer" },
// ];

// const INDUSTRIES = [
//   "Real Estate",
//   "Property Management",
//   "Construction",
//   "Architecture",
//   "Finance",
// ];

// export default function EditBusinessForm({
//   businessId,
// }: {
//   businessId: string;
// }) {
//   const router = useRouter();
//   const decodedBusinessId = decodeURIComponent(businessId);
//   const { data } = useBizDetails(decodedBusinessId);
//   const initialBusiness = data ?? undefined;

//   console.log("business data upd", data);

//   const {
//     mutate: updateBusiness,
//     isPending: isUpdating,
//     isError,
//     error,
//   } = useUpdateBusiness();

//   const [pendingFile, setPendingFile] = useState<File | null>(null);
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [uploadError, setUploadError] = useState<string | null>(null);

//   const {
//     control,
//     formState: { errors, isSubmitting },
//     handleSubmit,
//     register,
//     setValue,
//     reset,
//   } = useForm<BusinessFormValues>({
//     defaultValues: {
//       name: initialBusiness?.name ?? "",
//       email: initialBusiness?.email ?? "",
//       phone: initialBusiness?.phone ?? "",
//       city: initialBusiness?.city ?? "",
//       address: initialBusiness?.address ?? "",
//       role: initialBusiness?.username ?? "landlord",
//       country: initialBusiness?.country ?? "Kenya",
//       website: initialBusiness?.website ?? "",
//       industry: initialBusiness?.industry ?? "",
//       description: initialBusiness?.description ?? "",
//       bankName: initialBusiness?.bankName ?? "",
//       bankAccountNumber: initialBusiness?.bankAccountNumber ?? "",
//       mpesaPaybill: initialBusiness?.mpesaPaybill ?? "",
//       mpesaAccountNumber: initialBusiness?.mpesaAccountNumber ?? "",
//       mpesaTillNo: initialBusiness?.mpesaTillNo ?? "",
//       avatar: initialBusiness?.avatar ?? "",
//       avatarPath: initialBusiness?.avatarPath ?? "",
//       password: "",
//       confirmPassword: "",
//     },
//     resolver: zodResolver(getBusinessFormSchema("edit")),
//   });

//   useEffect(() => {
//     if (initialBusiness) {
//       reset({
//         name: initialBusiness.name ?? "",
//         email: initialBusiness.email ?? "",
//         phone: initialBusiness.phone ?? "",
//         city: initialBusiness.city ?? "",
//         address: initialBusiness.address ?? "",
//         role: initialBusiness.username ?? "landlord",
//         country: initialBusiness.country ?? "Kenya",
//         website: initialBusiness.website ?? "",
//         industry: initialBusiness.industry ?? "",
//         description: initialBusiness.description ?? "",
//         bankName: initialBusiness.bankName ?? "",
//         bankAccountNumber: initialBusiness.bankAccountNumber ?? "",
//         mpesaPaybill: initialBusiness.mpesaPaybill ?? "",
//         mpesaAccountNumber: initialBusiness.mpesaAccountNumber ?? "",
//         mpesaTillNo: initialBusiness.mpesaTillNo ?? "",
//         avatar: initialBusiness.avatar ?? "",
//         avatarPath: initialBusiness.avatarPath ?? "",
//         password: "",
//         confirmPassword: "",
//       });
//     }
//   }, [initialBusiness, reset]);

//   const avatar = useWatch({ control, name: "avatar" });

//   const onSubmit: SubmitHandler<BusinessFormValues> = async ({
//     confirmPassword,
//     ...values
//   }) => {
//     void confirmPassword;
//     setUploadError(null);

//     let avatarUrl = values.avatar ?? "";
//     let avatarPath = values.avatarPath;

//     if (pendingFile) {
//       try {
//         const oldPath = initialBusiness?.avatarPath;
//         const result = oldPath
//           ? await updateFile({
//               oldPath,
//               newFile: pendingFile,
//               businessId: decodedBusinessId,
//               module: STORAGE_MODULE,
//               onProgress: setUploadProgress,
//             })
//           : await uploadFile({
//               file: pendingFile,
//               businessId: decodedBusinessId,
//               module: STORAGE_MODULE,
//               onProgress: setUploadProgress,
//             });

//         avatarUrl = result.url;
//         avatarPath = result.path;
//       } catch (err) {
//         setUploadError(
//           err instanceof Error
//             ? err.message
//             : "Image upload failed. Please try again.",
//         );
//         return;
//       }
//     } else if (avatarUrl.startsWith("blob:")) {
//       avatarUrl = initialBusiness?.avatar ?? "";
//     }

//     const updatePayload: Partial<RegisterBusinessFormInputs> = {
//       ...values,
//       avatar: avatarUrl || undefined,
//       avatarPath: avatarPath || undefined,
//     };

//     if (!values.password) {
//       delete updatePayload.password;
//     }

//     updateBusiness(
//       { id: decodedBusinessId, data: updatePayload },
//       {
//         onSuccess: () => {
//           router.push(
//             `/qwetulinks/accounts/${encodeURIComponent(decodedBusinessId)}`,
//           );
//         },
//       },
//     );
//   };

//   const apiError = error as { response?: { data?: { message?: string } } };
//   const isPending = isSubmitting || isUpdating;

//   return (
//     <div className="bg-slate-50 p-3 sm:p-5 lg:p-6">
//       <div className="mx-auto w-full max-w-5xl space-y-5">
//         {/* Header */}
//         <div>
//           <Link
//             href="/qwetulinks/accounts"
//             className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
//           >
//             <ArrowLeft size={16} />
//             Back to accounts
//           </Link>
//           <h1 className="mt-3 flex items-center gap-2 text-2xl font-bold text-blue-600 sm:text-3xl">
//             <Building2 size={26} />
//             Edit Business
//           </h1>
//           <p className="mt-1 text-sm text-slate-500">
//             {initialBusiness?.name || decodedBusinessId}
//           </p>
//         </div>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="overflow-hidden rounded-lg border border-orange-100 bg-white shadow-sm"
//         >
//           <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-2">
//             {/* ── Basic Info ── */}
//             <section className="space-y-3">
//               <h2 className="text-base font-bold text-slate-950">Basic Info</h2>
//               <div className="grid gap-3">
//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     Business Name <span className="text-red-500">*</span>
//                   </span>
//                   <input
//                     {...register("name")}
//                     type="text"
//                     className={fieldClass}
//                   />
//                   {errors.name && (
//                     <p className="text-xs text-red-500">
//                       {errors.name.message}
//                     </p>
//                   )}
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     Role <span className="text-red-500">*</span>
//                   </span>
//                   <select {...register("role")} className={fieldClass}>
//                     {ROLES.map((r) => (
//                       <option key={r.value} value={r.value}>
//                         {r.label}
//                       </option>
//                     ))}
//                   </select>
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     Email <span className="text-red-500">*</span>
//                   </span>
//                   <input
//                     {...register("email")}
//                     type="email"
//                     className={fieldClass}
//                   />
//                   {errors.email && (
//                     <p className="text-xs text-red-500">
//                       {errors.email.message}
//                     </p>
//                   )}
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     Phone <span className="text-red-500">*</span>
//                   </span>
//                   <input
//                     {...register("phone")}
//                     type="tel"
//                     className={fieldClass}
//                   />
//                   {errors.phone && (
//                     <p className="text-xs text-red-500">
//                       {errors.phone.message}
//                     </p>
//                   )}
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     City <span className="text-red-500">*</span>
//                   </span>
//                   <input
//                     {...register("city")}
//                     type="text"
//                     className={fieldClass}
//                   />
//                   {errors.city && (
//                     <p className="text-xs text-red-500">
//                       {errors.city.message}
//                     </p>
//                   )}
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     Country
//                   </span>
//                   <input
//                     {...register("country")}
//                     type="text"
//                     className={fieldClass}
//                   />
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     Website
//                   </span>
//                   <input
//                     {...register("website")}
//                     type="url"
//                     placeholder="https://"
//                     className={fieldClass}
//                   />
//                   {errors.website && (
//                     <p className="text-xs text-red-500">
//                       {errors.website.message}
//                     </p>
//                   )}
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     Industry
//                   </span>
//                   <select {...register("industry")} className={fieldClass}>
//                     <option value="">Select industry</option>
//                     {INDUSTRIES.map((i) => (
//                       <option key={i} value={i}>
//                         {i}
//                       </option>
//                     ))}
//                   </select>
//                 </label>
//               </div>
//             </section>

//             {/* ── Payment Details ── */}
//             <section className="space-y-3">
//               <h2 className="text-base font-bold text-slate-950">
//                 Payment Details
//               </h2>
//               <div className="grid gap-3">
//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     Bank Name
//                   </span>
//                   <input
//                     {...register("bankName")}
//                     type="text"
//                     className={fieldClass}
//                   />
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     Bank Account Number
//                   </span>
//                   <input
//                     {...register("bankAccountNumber")}
//                     type="text"
//                     className={fieldClass}
//                   />
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     M-Pesa Paybill
//                   </span>
//                   <input
//                     {...register("mpesaPaybill")}
//                     type="text"
//                     className={fieldClass}
//                   />
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     M-Pesa Account Number
//                   </span>
//                   <input
//                     {...register("mpesaAccountNumber")}
//                     type="text"
//                     className={fieldClass}
//                   />
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     M-Pesa Till No
//                   </span>
//                   <input
//                     {...register("mpesaTillNo")}
//                     type="text"
//                     className={fieldClass}
//                   />
//                 </label>
//               </div>
//             </section>

//             {/* ── Address & Description ── */}
//             <section className="space-y-3 lg:col-span-2">
//               <h2 className="text-base font-bold text-slate-950">
//                 Address & Profile
//               </h2>
//               <div className="grid gap-3 lg:grid-cols-2">
//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     Address <span className="text-red-500">*</span>
//                   </span>
//                   <textarea
//                     {...register("address")}
//                     rows={4}
//                     className={textAreaClass}
//                   />
//                   {errors.address && (
//                     <p className="text-xs text-red-500">
//                       {errors.address.message}
//                     </p>
//                   )}
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     Description
//                   </span>
//                   <textarea
//                     {...register("description")}
//                     rows={4}
//                     className={textAreaClass}
//                   />
//                   {errors.description && (
//                     <p className="text-xs text-red-500">
//                       {errors.description.message}
//                     </p>
//                   )}
//                 </label>
//               </div>
//             </section>

//             {/* ── Password ── */}
//             <section className="space-y-3 lg:col-span-2">
//               <h2 className="text-base font-bold text-slate-950">
//                 Change Password{" "}
//                 <span className="text-sm font-normal text-slate-400">
//                   (leave blank to keep current)
//                 </span>
//               </h2>
//               <div className="grid gap-3 sm:grid-cols-2">
//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     New Password
//                   </span>
//                   <input
//                     {...register("password")}
//                     type="password"
//                     placeholder="Leave blank to keep current"
//                     className={fieldClass}
//                   />
//                   {errors.password && (
//                     <p className="text-xs text-red-500">
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </label>

//                 <label className="space-y-1.5">
//                   <span className="text-sm font-medium text-slate-700">
//                     Confirm New Password
//                   </span>
//                   <input
//                     {...register("confirmPassword")}
//                     type="password"
//                     className={fieldClass}
//                   />
//                   {errors.confirmPassword && (
//                     <p className="text-xs text-red-500">
//                       {errors.confirmPassword.message}
//                     </p>
//                   )}
//                 </label>
//               </div>
//             </section>

//             {/* ── Logo ── */}
//             <section className="space-y-3 lg:col-span-2">
//               <h2 className="text-base font-bold text-slate-950">Logo</h2>
//               <div className="space-y-3">
//                 {avatar && (
//                   <div className="flex items-center gap-4">
//                     <Image
//                       src={avatar}
//                       width={80}
//                       height={80}
//                       alt="Business logo preview"
//                       className="h-20 w-20 rounded-lg border border-slate-200 object-cover shadow-sm"
//                     />
//                     <div className="space-y-1">
//                       <p className="text-sm font-medium text-slate-700">
//                         {pendingFile?.name ?? "Current logo"}
//                       </p>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setPendingFile(null);
//                           setUploadError(null);
//                           setValue("avatar", "", { shouldDirty: true });
//                         }}
//                         className="text-xs text-red-500 hover:underline"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-sm text-slate-500 transition hover:border-blue-400 hover:bg-blue-50">
//                   <Upload size={22} className="text-slate-400" />
//                   <span>
//                     {avatar ? "Click to replace logo" : "Click to upload logo"}
//                   </span>
//                   <span className="text-xs text-slate-400">
//                     JPEG, PNG, WebP, GIF, SVG — max 10 MB
//                   </span>
//                   <input
//                     type="file"
//                     accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
//                     className="hidden"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (!file) return;
//                       setPendingFile(file);
//                       setUploadError(null);
//                       setValue("avatar", URL.createObjectURL(file), {
//                         shouldDirty: true,
//                         shouldTouch: true,
//                       });
//                       e.target.value = "";
//                     }}
//                   />
//                 </label>
//               </div>

//               {isPending && uploadProgress > 0 && uploadProgress < 100 && (
//                 <div className="space-y-1">
//                   <div className="flex justify-between text-xs text-slate-500">
//                     <span>Uploading logo…</span>
//                     <span>{uploadProgress}%</span>
//                   </div>
//                   <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
//                     <div
//                       className="h-full rounded-full bg-blue-500 transition-all duration-300"
//                       style={{ width: `${uploadProgress}%` }}
//                     />
//                   </div>
//                 </div>
//               )}

//               {uploadError && (
//                 <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3">
//                   <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
//                   <p className="text-sm leading-5 text-red-600">
//                     {uploadError}
//                   </p>
//                 </div>
//               )}
//             </section>

//             {/* API error */}
//             {isError && (
//               <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 lg:col-span-2">
//                 <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
//                 <p className="text-sm leading-5 text-red-600">
//                   {apiError?.response?.data?.message ??
//                     "Business could not be saved. Please try again."}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col-reverse gap-3 border-t border-orange-100 bg-slate-50 p-4 sm:flex-row sm:justify-end">
//             <Link
//               href="/qwetulinks/accounts"
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
//             >
//               Cancel
//             </Link>
//             <button
//               disabled={isPending}
//               type="submit"
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
//             >
//               <Save size={16} />
//               {isPending
//                 ? uploadProgress > 0 && uploadProgress < 100
//                   ? `Uploading… ${uploadProgress}%`
//                   : "Saving..."
//                 : "Save Business"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

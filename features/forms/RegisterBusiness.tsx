"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { AlertCircle, ArrowLeft, Building2, Save, Upload } from "lucide-react";
import { useState } from "react";
import { RegisterBusinessFormInputs } from "@/types/business.definations";
import { useRegister } from "@/hooks/useBusiness";
import { BusinessFormValues } from "@/schemas/acc.zod";
import { uploadFile } from "@/utils/firebaseStorage";
import Image from "next/image";
import { getBusinessFormSchema } from "../../app/(features)/(dashboard)/qwetulinks/accounts/utils";
import { fieldClass, textAreaClass } from "@/components/custom/FormFields";
import { businessRoleOptions } from "@/utils/selectConstants";

const STORAGE_MODULE = "logo";



export default function RegisterBusinessForm() {
  const router = useRouter();

  const {
    mutate: registerBusiness,
    isPending: isCreating,
    isError,
    error,
  } = useRegister();

  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<BusinessFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      address: "",
      role: "",
      password: "",
      confirmPassword: "",
      avatar: "",
      avatarPath: "",
    },
    resolver: zodResolver(getBusinessFormSchema("add")),
  });

  const avatar = useWatch({ control, name: "avatar" });

  const onSubmit: SubmitHandler<BusinessFormValues> = async ({
    confirmPassword,
    ...values
  }) => {
    void confirmPassword;
    setUploadError(null);

    let avatarUrl = "";
    let avatarPath: string | undefined;

    if (pendingFile) {
      try {
        const bizId = `logo-${crypto.randomUUID().replace(/-/g, "").slice(0, 6).toLowerCase()}`;
        const result = await uploadFile({
          file: pendingFile,
          businessId: bizId,
          module: STORAGE_MODULE,
          onProgress: setUploadProgress,
        });
        avatarUrl = result.url;
        avatarPath = result.path;
      } catch (err) {
        setUploadError(
          err instanceof Error
            ? err.message
            : "Image upload failed. Please try again.",
        );
        return;
      }
    }

    const payload: RegisterBusinessFormInputs = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      city: values.city,
      address: values.address,
      role: values.role,
      password: values.password || "Temporary@2026",
      avatar: avatarUrl || undefined,
      avatarPath: avatarPath || undefined,
    };

    registerBusiness(payload, {
      onSuccess: () => {
        router.push(
          `/qwetulinks/accounts/verify?email=${encodeURIComponent(values.email)}`,
        );
      },
    });
  };

  const apiError = error as { response?: { data?: { message?: string } } };
  const isPending = isSubmitting || isCreating;

  return (
    <div className="bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-2xl space-y-5">
        {/* Header */}
        <div>
          <Link
            href="/qwetulinks/accounts"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to accounts
          </Link>
          <h1 className="mt-3 flex items-center gap-2 text-2xl font-bold text-blue-600 sm:text-3xl">
            <Building2 size={26} />
            Add Business
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create a business account and send it for verification.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden rounded-lg border border-orange-100 bg-white shadow-sm"
        >
          <div className="space-y-5 p-4 sm:p-5">
            {/* Business Info */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-950">
                Business Info
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Business Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="e.g. Nyali Properties Ltd"
                    className={fieldClass}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Role <span className="text-red-500">*</span>
                  </span>
                  <select {...register("role")} className={fieldClass}>
                    {businessRoleOptions.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="text-xs text-red-500">
                      {errors.role.message}
                    </p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Email <span className="text-red-500">*</span>
                  </span>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="business@example.com"
                    className={fieldClass}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Phone <span className="text-red-500">*</span>
                  </span>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="+254712345678"
                    className={fieldClass}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    City <span className="text-red-500">*</span>
                  </span>
                  <input
                    {...register("city")}
                    type="text"
                    placeholder="e.g. Mombasa"
                    className={fieldClass}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </label>

                <label className="space-y-1.5 sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">
                    Address <span className="text-red-500">*</span>
                  </span>
                  <textarea
                    {...register("address")}
                    rows={3}
                    placeholder="e.g. Nyali Estate, Mombasa"
                    className={textAreaClass}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </label>
              </div>
            </section>

            {/* Password */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-950">
                Account Password
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Password <span className="text-red-500">*</span>
                  </span>
                  <input
                    {...register("password")}
                    type="password"
                    className={fieldClass}
                  />
                  {errors.password && (
                    <p className="text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Confirm Password <span className="text-red-500">*</span>
                  </span>
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    className={fieldClass}
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </label>
              </div>
            </section>

            {/* Logo */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-950">Logo</h2>
              <div className="space-y-3">
                {avatar && (
                  <div className="flex items-center gap-4">
                    <Image
                      src={avatar}
                      width={80}
                      height={80}
                      alt="Preview"
                      className="h-20 w-20 rounded-lg border border-slate-200 object-cover shadow-sm"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-700">
                        {pendingFile?.name ?? "Logo preview"}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setPendingFile(null);
                          setUploadError(null);
                          setValue("avatar", "", { shouldDirty: true });
                        }}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-sm text-slate-500 transition hover:border-blue-400 hover:bg-blue-50">
                  <Upload size={22} className="text-slate-400" />
                  <span>
                    {avatar ? "Click to replace logo" : "Click to upload logo"}
                  </span>
                  <span className="text-xs text-slate-400">
                    JPEG, PNG, WebP, GIF, SVG — max 10 MB
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setPendingFile(file);
                      setUploadError(null);
                      setValue("avatar", URL.createObjectURL(file), {
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>

              {isPending && uploadProgress > 0 && uploadProgress < 100 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Uploading logo…</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
              {uploadError && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <p className="text-sm leading-5 text-red-600">
                    {uploadError}
                  </p>
                </div>
              )}
            </section>

            {isError && (
              <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <p className="text-sm leading-5 text-red-600">
                  {apiError?.response?.data?.message ??
                    "Business could not be saved. Please try again."}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-orange-100 bg-slate-50 p-4 sm:flex-row sm:justify-end">
            <Link
              href="/qwetulinks/accounts"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>
            <button
              disabled={isPending}
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Save size={16} />
              {isPending
                ? uploadProgress > 0 && uploadProgress < 100
                  ? `Uploading… ${uploadProgress}%`
                  : "Saving..."
                : "Create Business"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

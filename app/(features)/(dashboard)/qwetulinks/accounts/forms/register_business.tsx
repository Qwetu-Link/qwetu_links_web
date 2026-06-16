"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { AlertCircle, ArrowLeft, Building2, Save, Upload } from "lucide-react";
import { useState } from "react";
import {
  RegisterBusinessFormInputs,
} from "../definations";
import {
  useBizDetails,
  useRegister,
  useUpdateBusiness,
} from "../business.service";
import { BusinessFormValues } from "../acc.zod";
import { fieldClass, getBusinessFormSchema, getDefaults, sectionFields, textAreaClass } from "../utils";
import { updateFile, uploadFile } from "@/components/firebaseStorage";
import Image from "next/image";

const STORAGE_MODULE = "logo";

export default function RegisterBusinessForm({
  mode = "add",
  businessId,
}: {
  mode?: "add" | "edit";
  businessId?: string;
}) {
  const router = useRouter();
  const decodedBusinessId = businessId ? decodeURIComponent(businessId) : "";
  const { data } = useBizDetails(decodedBusinessId);
  const initialBusiness = data ?? undefined;

  const { mutate: registerBusiness, isPending: isCreating, isError, error } = useRegister();
  const { mutate: updateBusiness, isPending: isUpdating } = useUpdateBusiness();

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
    defaultValues: getDefaults(initialBusiness),
    resolver: zodResolver(getBusinessFormSchema(mode)),
  });

  const avatar = useWatch({ control, name: "avatar" });

  const onSubmit: SubmitHandler<BusinessFormValues> = async ({
    confirmPassword,
    ...values
  }) => {
    void confirmPassword;
    setUploadError(null);

    let avatarUrl = values.avatar ?? "";
    let avatarPath: string | undefined;

    if (pendingFile) {
      try {
        const bizId = decodedBusinessId || crypto.randomUUID();
        const oldPath = initialBusiness?.avatarPath;

        const result =
          mode === "edit" && oldPath
            ? await updateFile({
                oldPath,
                newFile: pendingFile,
                businessId: bizId,
                module: STORAGE_MODULE,
                onProgress: setUploadProgress,
              })
            : await uploadFile({
                file: pendingFile,
                businessId: bizId,
                module: STORAGE_MODULE,
                onProgress: setUploadProgress,
              });

        avatarUrl = result.url;
        avatarPath = result.path;
      } catch (err) {
        setUploadError(
          err instanceof Error ? err.message : "Image upload failed. Please try again."
        );
        return;
      }
    } else if (avatarUrl.startsWith("blob:")) {
      // Safety net: never send a blob URL to the API
      avatarUrl = initialBusiness?.avatar ?? "";
    }

    const payload: RegisterBusinessFormInputs = {
      ...values,
      avatar: avatarUrl,
      avatarPath,
      password: values.password || "Temporary@2026",
    };

    if (mode === "edit" && decodedBusinessId) {
      const updatePayload: Partial<RegisterBusinessFormInputs> = { ...payload };
      if (!values.password) delete updatePayload.password;

      updateBusiness(
        { id: decodedBusinessId, data: updatePayload },
        {
          onSuccess: () => {
            router.push(`/qwetulinks/accounts/${encodeURIComponent(decodedBusinessId)}`);
          },
        },
      );
      return;
    }

    registerBusiness(payload, {
      onSuccess: () => {
        router.push(`/qwetulinks/accounts/verify?email=${encodeURIComponent(values.email)}`);
      },
    });
  };

  const apiError = error as { response?: { data?: { message?: string } } };
  const isPending = isSubmitting || isCreating || isUpdating;

  return (
    <div className="bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-5xl space-y-5">
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
            {mode === "edit" ? "Edit Business" : "Add Business"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {mode === "edit"
              ? initialBusiness?.name || decodedBusinessId
              : "Create a business account and send it for verification."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden rounded-lg border border-orange-100 bg-white shadow-sm"
        >
          <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-2">

            {/* DYNAMIC FIELDS */}
            {sectionFields.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="font-bold">{section.title}</h2>
                <div className="grid gap-3">
                  {section.fields.map((field) => {
                    if (field.type === "select") {
                      return (
                        <label key={field.name}>
                          <span>{field.label}</span>
                          <select {...register(field.name)} className={fieldClass}>
                            {field.options?.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </label>
                      );
                    }
                    return (
                      <label key={field.name}>
                        <span>
                          {field.label}
                          {"required" in field && field.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </span>
                        <input
                          {...register(field.name)}
                          type={field.type}
                          className={fieldClass}
                        />
                        {errors?.[field.name]?.message && (
                          <p className="text-xs text-red-500">
                            {String(errors[field.name]?.message)}
                          </p>
                        )}
                      </label>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* ADDRESS & PROFILE */}
            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">Address & Profile</h2>
              <div className="grid gap-3 lg:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Address <span className="ml-1 text-red-500">*</span>
                  </span>
                  <textarea {...register("address")} className={textAreaClass} required />
                  {errors.address?.message && (
                    <p className="text-xs font-medium text-red-500">{errors.address.message}</p>
                  )}
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">Description</span>
                  <textarea {...register("description")} className={textAreaClass} />
                  {errors.description?.message && (
                    <p className="text-xs font-medium text-red-500">{errors.description.message}</p>
                  )}
                </label>
              </div>
            </section>

            {/* PASSWORD */}
            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">Account Password</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Password{" "}
                    {mode === "edit" ? null : <span className="ml-1 text-red-500">*</span>}
                  </span>
                  <input
                    {...register("password")}
                    className={fieldClass}
                    type="password"
                    placeholder={mode === "edit" ? "Leave blank to keep current password" : ""}
                    required={mode !== "edit"}
                  />
                  {errors.password?.message && (
                    <p className="text-xs font-medium text-red-500">{errors.password.message}</p>
                  )}
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Confirm password{" "}
                    {mode === "edit" ? null : <span className="ml-1 text-red-500">*</span>}
                  </span>
                  <input
                    {...register("confirmPassword")}
                    className={fieldClass}
                    type="password"
                    required={mode !== "edit"}
                  />
                  {errors.confirmPassword?.message && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </label>
              </div>
            </section>

            {/* LOGO */}
            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">Logo</h2>

              <div className="space-y-3">
                {/* Current preview */}
                {avatar && (
                  <div className="flex items-center gap-4">
                    <Image
                      src={avatar}
                      width={400}
                      height={400}
                      alt="Business logo preview"
                      className="h-20 w-20 rounded-lg border border-slate-200 object-cover shadow-sm"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-700">
                        {pendingFile ? pendingFile.name : "Current logo"}
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

                {/* Drop zone / file picker */}
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
                      // Reset so picking the same file again still triggers onChange
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>

              {/* Upload progress bar */}
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

              {/* Upload error */}
              {uploadError && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <p className="text-sm leading-5 text-red-600">{uploadError}</p>
                </div>
              )}
            </section>

            {/* API error */}
            {isError && (
              <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 lg:col-span-2">
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
                : mode === "edit"
                  ? "Save Business"
                  : "Create Business"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
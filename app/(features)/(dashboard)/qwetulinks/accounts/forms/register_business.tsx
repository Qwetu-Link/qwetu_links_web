"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { AlertCircle, ArrowLeft, Building2, Save } from "lucide-react";
import ImageFileField from "@/app/(features)/(dashboard)/admin/tenant/_components/ImageFileField";
import {
  RegisterBusinessFormInputs,
} from "../definations";
import {
  useBizDetails,
  useRegister,
  useUpdateBusiness,
} from "../business.service";
import { BusinessFormValues } from "@/app/lib/acc.zod";
import { fieldClass, getBusinessFormSchema, getDefaults, sectionFields, textAreaClass } from "../utils";

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
  // const fallbackBusiness = useMemo(
  //   () => getSeededBusiness(businessId),
  //   [businessId],
  // );
  const initialBusiness = data ?? undefined;
  const { mutate: registerBusiness, isPending: isCreating, isError, error } =
    useRegister();
  const { mutate: updateBusiness, isPending: isUpdating } = useUpdateBusiness();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<BusinessFormValues>({
    defaultValues: getDefaults(initialBusiness),
    resolver: zodResolver(getBusinessFormSchema(mode)),
    values: getDefaults(initialBusiness),
  });

  const avatar = useWatch({ control, name: "avatar" });

  const onSubmit: SubmitHandler<BusinessFormValues> = ({
    confirmPassword,
    ...values
  }) => {
    void confirmPassword;

    const payload: RegisterBusinessFormInputs = {
      ...values,
      password: values.password || "Temporary@2026",
    };

    if (mode === "edit" && decodedBusinessId) {
      const updatePayload: Partial<RegisterBusinessFormInputs> = { ...payload };
      if (!values.password) {
        delete updatePayload.password;
      }

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
            {sectionFields.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-base font-bold text-slate-950">
                  {section.title}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {section.fields.map(([key, label, type, required]) => (
                    <label key={key} className="space-y-1.5">
                      <span className="text-sm font-medium text-slate-700">
                        {label}
                        {required ? <span className="ml-1 text-red-500">*</span> : null}
                      </span>
                      <input
                        {...register(key)}
                        className={fieldClass}
                        type={type}
                        required={required}
                      />
                      {errors[key]?.message && (
                        <p className="text-xs font-medium text-red-500">
                          {errors[key]?.message}
                        </p>
                      )}
                    </label>
                  ))}
                </div>
              </section>
            ))}

            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">
                Address & Profile
              </h2>
              <div className="grid gap-3 lg:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Address <span className="ml-1 text-red-500">*</span>
                  </span>
                  <textarea
                    {...register("address")}
                    className={textAreaClass}
                    required
                  />
                  {errors.address?.message && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Description
                  </span>
                  <textarea
                    {...register("description")}
                    className={textAreaClass}
                  />
                  {errors.description?.message && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </label>
              </div>
            </section>

            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">
                Account Password
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Password {mode === "edit" ? null : <span className="ml-1 text-red-500">*</span>}
                  </span>
                  <input
                    {...register("password")}
                    className={fieldClass}
                    type="password"
                    placeholder={
                      mode === "edit" ? "Leave blank to keep current password" : ""
                    }
                    required={mode !== "edit"}
                  />
                  {errors.password?.message && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Confirm password {mode === "edit" ? null : <span className="ml-1 text-red-500">*</span>}
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

            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">Logo</h2>
              <ImageFileField
                id="business-avatar"
                label="Business logo"
                value={avatar ?? ""}
                onChange={(value) =>
                  setValue("avatar", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }
              />
            </section>

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
                ? "Saving..."
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

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import ImageFileField from "./ImageFileField";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateTenants, useUpdateTenants } from "../tenant.services";
import { TenantUserFormValues, tenantUserSchema } from "../tenant.zod";
import { emptyTenant, fieldClass, formSections, Tenant, textAreaClass } from "../definations"; // Double-check spelling of definitions

type TenantFormPageProps = {
  mode: "add" | "edit";
  tenant?: Tenant;
  businessId: string;
  listHref: string;
  initialValues?: TenantUserFormValues;
};

export default function TenantFormPage({
  businessId,
  mode,
  tenant,
  listHref,
}: TenantFormPageProps) {
  const router = useRouter();
  const createTenant = useCreateTenants();
  const updateTenant = useUpdateTenants();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    reset,
  } = useForm<TenantUserFormValues>({
    defaultValues: emptyTenant,
    resolver: zodResolver(tenantUserSchema),
  });

  // Populate form once existing data loads in edit mode, clear it otherwise
  useEffect(() => {
    if (mode === "edit" && tenant) {
      reset({
        name: tenant.user.name,
        email: tenant.user.email,
        phone: tenant.user.phone,
        idNumber: tenant.user.idNumber,
        address: tenant.user.address ?? "",
        isActive: tenant.isActive,
        avatar: tenant.user.avatar ?? "",
        avatarPath: tenant.user.avatarPath ?? "",
        nextOfKinName: tenant.nextOfKinName,
        nextOfKinPhone: tenant.nextOfKinPhone,
        emergencyContactName: tenant.user.emergencyContactName,
        emergencyContactPhone: tenant.user.emergencyContactPhone,
        emergencyContactRelationship: tenant.user.emergencyContactRelationship,
        version: tenant.version,
      });
    } else if (mode === "add") {
      reset(emptyTenant);
    }
  }, [mode, tenant, reset]);

  const onSubmit = (data: TenantUserFormValues) => {
    if (mode === "edit" && tenant?.id) {
      updateTenant.mutate(
        { id: tenant.id, data },
        {
          onSuccess: () => {
            toast.success("Tenant updated successfully");
            router.push(listHref);
          },
          onError: () => {
            toast.error("Failed to update tenant. Please try again.");
          },
        },
      );
    } else {
      createTenant.mutate(data, {
        onSuccess: () => {
          toast.success("Tenant created successfully");
          router.push(listHref);
        },
        onError: () => {
          toast.error("Failed to create tenant. Please try again.");
        },
      });
    }
  };

  const avatar = useWatch({ control, name: "avatar" });
  const avatarPath = useWatch({ control, name: "avatarPath" });
  const isPending = createTenant.isPending || updateTenant.isPending;

  return (
    <div className="min-h-full bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-5xl space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href={listHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Back to tenants
            </Link>
            <h1 className="mt-3 text-2xl font-bold text-blue-600 sm:text-3xl">
              {mode === "edit" ? "Edit Tenant" : "Add Tenant"}
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden rounded-lg border border-orange-100 bg-white shadow-sm"
        >
          <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-2">
            {formSections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-base font-bold text-slate-950">
                  {section.title}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {section.fields.map(([key, label]) => {
                    const fieldKey = key as keyof TenantUserFormValues;
                    return (
                      <label key={key} className="space-y-1.5">
                        <span className="text-sm font-medium text-slate-700">
                          {label}
                        </span>
                        <input
                          {...register(fieldKey)}
                          className={fieldClass}
                          type={key === "email" ? "email" : "text"}
                        />
                        {errors[fieldKey] && (
                          <p className="text-xs text-red-600">
                            {errors[fieldKey]?.message}
                          </p>
                        )}
                      </label>
                    );
                  })}
                </div>
              </section>
            ))}

            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">
                Location & Status
              </h2>
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Location
                  </span>
                  <textarea
                    {...register("address")}
                    className={textAreaClass}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-600">
                      {errors.address.message}
                    </p>
                  )}
                </label>

                <label className="flex h-fit items-center justify-between gap-3 rounded-lg border border-orange-100 bg-slate-50 px-3 py-3 lg:mt-7">
                  <span className="text-sm font-medium text-slate-700">
                    Active tenant
                  </span>
                  <input
                    {...register("isActive")}
                    className="size-4 accent-orange-500"
                    type="checkbox"
                  />
                </label>
              </div>
            </section>

            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">Media</h2>
              <ImageFileField
                id="tenant-avatar"
                label="Avatar"
                businessId={businessId}
                value={avatar ?? ""}
                avatarPath={avatarPath ?? ""}
                onChange={(url, path) => {
                  setValue("avatar", url, { shouldDirty: true, shouldValidate: true });
                  setValue("avatarPath", path, { shouldDirty: true });
                }}
              />
              {errors.avatar && (
                <p className="text-xs text-red-600">{errors.avatar.message}</p>
              )}
            </section>


          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-orange-100 bg-slate-50 p-4 sm:flex-row sm:justify-end">
            <Link
              href={listHref}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              <Save size={16} />
              {isPending
                ? "Saving..."
                : mode === "edit"
                  ? "Save Tenant"
                  : "Create Tenant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
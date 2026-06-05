"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import ImageFileField from "./ImageFileField";
import { emptyTenant, seededTenants } from "../definations";
import { useForm, useWatch } from "react-hook-form";
import { tenantFormSchema, TenantFormValues } from "@/app/lib/tenant.zod";
import { zodResolver } from "@hookform/resolvers/zod";

const fieldClass =
  "h-10 w-full rounded-lg border border-orange-100 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const textAreaClass =
  "min-h-24 w-full resize-y rounded-lg border border-orange-100 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const formSections = [
  {
    title: "Tenant Details",
    fields: [
      ["name", "Full name"],
      ["username", "Username"],
      ["email", "Email"],
      ["phone", "Phone"],
      ["id_number", "ID/PASSPORT number"],
      // ["role", "Role"],
    ],
  },
  {
    title: "Contacts",
    fields: [
      ["next_of_kin_name", "Next of kin name"],
      ["next_of_kin_phone", "Next of kin phone"],
      ["emergency_contact_name", "Emergency contact name"],
      ["emergency_contact_phone", "Emergency contact phone"],
      ["emergency_contact_relationship", "Relationship"],
    ],
  },
] as const;

type TenantFormPageProps = {
  mode: "add" | "edit";
  tenantId?: string;
  listHref: string;
};

export default function TenantFormPage({
  mode,
  tenantId,
  listHref,
}: TenantFormPageProps) {
  const router = useRouter();
  const initialTenant = useMemo(() => {
    if (mode === "edit") {
      return (
        seededTenants.find((tenant) => tenant.id === tenantId) ?? {
          ...seededTenants[0],
          id: tenantId ?? "",
          role: "tenant",
        }
      );
    }

    return {
      ...emptyTenant,
      id: "",
      role: "tenant",
    };
  }, [mode, tenantId]);

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<TenantFormValues>({
    defaultValues: {
      ...initialTenant,
      role: "tenant",
    },
    resolver: zodResolver(tenantFormSchema),
  });

  const onSubmit = (data: TenantFormValues) => {
    const payload = {
      ...data,
      role: "tenant",
    };
    console.log("Tenant Data", payload);
    router.push(listHref);
  };

  const avatar = useWatch({ control, name: "avatar" });

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
            <p className="mt-1 text-sm text-slate-500">
              {mode === "edit" ? initialTenant.id : "Create a tenant profile"}
            </p>
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
                  {section.fields.map(([key, label]) => (
                    <label key={key} className="space-y-1.5">
                      <span className="text-sm font-medium text-slate-700">
                        {label}
                      </span>
                      <input
                        {...register(key)}
                        className={fieldClass}
                        type={key === "email" ? "email" : "text"}
                      />
                      {errors[key] && (
                        <p className="text-xs text-red-600">
                          {errors[key]?.message}
                        </p>
                      )}
                    </label>
                  ))}
                </div>
              </section>
            ))}

            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">Password</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Password
                  </span>
                  <input
                    {...register("password")}
                    className={fieldClass}
                    type="password"
                  />
                  {errors.password?.message && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Confirm password
                  </span>
                  <input
                    {...register("confirm_password")}
                    className={fieldClass}
                    type="password"
                  />
                  {errors.confirm_password?.message && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </label>
              </div>
            </section>

            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">Media</h2>
              <ImageFileField
                id="tenant-avatar"
                label="Avatar"
                value={avatar}
                onChange={(value) =>
                  setValue("avatar", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }
              />
              {errors.avatar && (
                <p className="text-xs text-red-600">{errors.avatar.message}</p>
              )}
            </section>

            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">
                Address & Status
              </h2>
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Address
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
                    {...register("is_active")}
                    className="size-4 accent-orange-500"
                    type="checkbox"
                  />
                </label>
              </div>
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
              disabled={isSubmitting}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              <Save size={16} />
              {isSubmitting
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

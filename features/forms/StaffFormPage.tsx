"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { AlertCircle, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import ImageFileField from "@/components/custom/ImageFileField";
import {
  DEPARTMENTS,
  POSITIONS,
  employmentTypeValues,
  employmentTypeLabels,
  EmploymentType,
} from "@/utils/selectConstants";
import { StaffUserFormValues, staffUserSchema } from "@/schemas/staff.zod";
import { emptyStaff } from "@/types/staff.definations";
import { useCreateStaff, useUpdateStaff } from "@/hooks/useStaff";
import { StaffFormPageProps } from "../private/staff/props";
import { staffFormSections } from "@/components/custom/FormSection";
import { fieldClass, textAreaClass } from "@/components/custom/FormFields";
import { handleFormErrors } from "@/utils/errors";

export default function StaffFormPage({ mode, businessId, existingStaff, listHref }: StaffFormPageProps) {
  const router = useRouter();
  const createStaff = useCreateStaff();
  const updateStaff = useUpdateStaff();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    reset,
    setError,
  } = useForm<StaffUserFormValues>({
    defaultValues: emptyStaff,
    resolver: zodResolver(staffUserSchema),
  });

  // Populate form once existing data loads in edit mode
  useEffect(() => {
    if (mode === "edit" && existingStaff) {
      reset({
        name: existingStaff.user.name,
        email: existingStaff.user.email,
        phone: existingStaff.user.phone,
        idNumber: existingStaff.user.idNumber ?? undefined,
        address: existingStaff.user.address ?? undefined,
        isActive: existingStaff.user.isActive,
        avatar: existingStaff.user.avatar ?? undefined,
        avatarPath: existingStaff.user.avatarPath ?? undefined,
        emergencyContactName: existingStaff.user.emergencyContactName ?? undefined,
        emergencyContactPhone: existingStaff.user.emergencyContactPhone ?? undefined,
        emergencyContactRelationship: existingStaff.user.emergencyContactRelationship ?? undefined,
        position: existingStaff.position as StaffUserFormValues["position"],
        department: existingStaff.department as StaffUserFormValues["department"],
        salary: parseFloat(existingStaff.salary),
        hireDate: existingStaff.hireDate.slice(0, 10),
        employmentType: existingStaff.employmentType,
        version: existingStaff.version
      });
    }
  }, [mode, existingStaff, reset]);

  const onSubmit = (data: StaffUserFormValues) => {
    if (mode === "edit" && existingStaff?.id) {
      updateStaff.mutate(
        { id: existingStaff.id, data },
        {
          onSuccess: () => {
            toast.success("Staff updated successfully");
            router.push(listHref);
          },
          onError: (error) => {
            handleFormErrors<StaffUserFormValues>(error, setError);
          }
        },
      );
    } else {
      createStaff.mutate(data, {
        onSuccess: () => {
          toast.success("Staff created successfully");
          router.push(listHref);
        },
        onError: (error) => {
          handleFormErrors<StaffUserFormValues>(error, setError);
        }
      });
    }
  };

  const avatar = useWatch({ control, name: "avatar" });
  const avatarPath = useWatch({ control, name: "avatarPath" });
  const isPending = createStaff.isPending || updateStaff.isPending;

  return (
    <div className="min-h-0 overflow-y-auto bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-5xl space-y-5">
        <div>
          <Link
            href={listHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to team
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-blue-600 sm:text-3xl">
            {mode === "edit" ? "Edit Staff" : "Add Staff"}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden rounded-lg border border-orange-100 bg-white shadow-sm"
        >
          <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-2">

            {/* Errors */}
            {errors.root?.message && (
              <div
                className={`mt-4 flex items-start gap-2 rounded-md border px-4 py-3 ${errors.root.type === "network"
                  ? "border-amber-200 bg-amber-50"
                  : "border-red-200 bg-red-50"
                  }`}
                aria-live="polite"
                aria-atomic="true"
              >
                <AlertCircle
                  className={`mt-0.5 h-4 w-4 shrink-0 ${errors.root.type === "network" ? "text-amber-500" : "text-red-500"
                    }`}
                />
                <p
                  className={`text-sm ${errors.root.type === "network" ? "text-amber-700" : "text-red-600"
                    }`}
                >
                  {errors.root.message}
                </p>
              </div>
            )}

            {/* Text field sections */}
            {staffFormSections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-base font-bold text-slate-950">{section.title}</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {section.fields.map(([key, label]) => (
                    <label key={key} className="space-y-1.5">
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                      <input
                        {...register(key)}
                        className={fieldClass}
                        type={key === "email" ? "email" : "text"}
                      />
                      {errors[key] && (
                        <p className="text-xs font-medium text-red-500">
                          {errors[key]?.message}
                        </p>
                      )}
                    </label>
                  ))}
                </div>
              </section>
            ))}

            {/* Employment section — all selects + special inputs */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-950">Employment</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">Position</span>
                  <select {...register("position")} className={fieldClass}>
                    {POSITIONS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {errors.position && (
                    <p className="text-xs font-medium text-red-500">{errors.position.message}</p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">Department</span>
                  <select {...register("department")} className={fieldClass}>
                    {DEPARTMENTS.map((d) => (
                      <option key={d.code} value={d.code}>{d.name}</option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-xs font-medium text-red-500">{errors.department.message}</p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">Salary</span>
                  <input
                    {...register("salary", { valueAsNumber: true })}
                    className={fieldClass}
                    type="number"
                    min={0}
                    step={0.01}
                  />
                  {errors.salary && (
                    <p className="text-xs font-medium text-red-500">{errors.salary.message}</p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">Hire date</span>
                  <input
                    {...register("hireDate")}
                    className={fieldClass}
                    type="date"
                    max={new Date().toISOString().slice(0, 10)}
                  />
                  {errors.hireDate && (
                    <p className="text-xs font-medium text-red-500">{errors.hireDate.message}</p>
                  )}
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">Employment type</span>
                  <select {...register("employmentType")} className={fieldClass}>
                    {employmentTypeValues.map((type) => (
                      <option key={type} value={type}>
                        {employmentTypeLabels[type as EmploymentType]}
                      </option>
                    ))}
                  </select>
                  {errors.employmentType && (
                    <p className="text-xs font-medium text-red-500">{errors.employmentType.message}</p>
                  )}
                </label>
              </div>
            </section>

            {/* Media */}
            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">Media</h2>
              <ImageFileField
                id="staff-avatar"
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

            {/* Address & Status */}
            <section className="space-y-3 lg:col-span-2">
              <h2 className="text-base font-bold text-slate-950">Address & Status</h2>
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">Address</span>
                  <textarea {...register("address")} className={textAreaClass} />
                  {errors.address && (
                    <p className="text-xs text-red-600">{errors.address.message}</p>
                  )}
                </label>

                <label className="flex h-fit items-center justify-between gap-3 rounded-lg border border-orange-100 bg-slate-50 px-3 py-3 lg:mt-7">
                  <span className="text-sm font-medium text-slate-700">Active staff</span>
                  <input
                    {...register("isActive")}
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
              disabled={isSubmitting || isPending}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              <Save size={16} />
              {isPending
                ? "Saving..."
                : mode === "edit"
                  ? "Save Staff"
                  : "Create Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

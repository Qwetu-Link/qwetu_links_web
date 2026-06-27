"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Edit3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useGetStaffDetails } from "@/hooks/useStaff";
import { employmentTypeLabels, DEPARTMENTS, EmploymentType } from "@/utils/selectConstants";
import { StaffDetailsPageProps } from "./props";



function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | undefined | null;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-orange-100 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-slate-900">
        {typeof value === "boolean"
          ? value ? "Active" : "Inactive"
          : (value ?? "—")}
      </p>
    </div>
  );
}

function DetailSection({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: typeof UserRound;
  items: Array<{ label: string; value: string | number | boolean | undefined | null }>;
}) {
  return (
    <section className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
          <Icon size={18} />
        </div>
        <h2 className="text-base font-bold text-slate-950">{title}</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <DetailItem key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </section>
  );
}

function SkeletonSection() {
  return (
    <div className="animate-pulse rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
      <div className="mb-4 h-5 w-40 rounded bg-slate-100" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-orange-100 bg-slate-50 p-3">
            <div className="h-3 w-16 rounded bg-slate-200" />
            <div className="h-4 w-28 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StaffDetailsPage({ staffId, listHref, editHref }: StaffDetailsPageProps) {
  const { data: staff, isPending, isError } = useGetStaffDetails(staffId);

  const departmentName =
    DEPARTMENTS.find((d) => d.code === staff?.department)?.name ?? staff?.department ?? "—";

  if (isPending) {
    return (
      <div className="min-h-0 overflow-y-auto bg-slate-50 p-3 sm:p-5 lg:p-6">
        <div className="mx-auto w-full max-w-6xl space-y-5 animate-pulse">
          <div className="h-5 w-28 rounded bg-slate-200" />
          <div className="h-10 w-56 rounded bg-slate-200" />
          <SkeletonSection />
          <SkeletonSection />
          <SkeletonSection />
        </div>
      </div>
    );
  }

  if (isError || !staff) {
    return (
      <div className="min-h-0 overflow-y-auto bg-slate-50 p-3 sm:p-5 lg:p-6">
        <div className="mx-auto w-full max-w-6xl space-y-4">
          <Link
            href={listHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to team
          </Link>
          <div className="rounded-lg border border-red-100 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-800">Staff member not found</p>
            <p className="mt-1 text-sm text-slate-500">
              This record may have been deleted or the ID is invalid.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const userName = staff?.user?.name ?? "Unknown Staff";
  const avatarUrl = staff?.user?.avatar;

  return (
    <div className="min-h-0 overflow-y-auto bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-6xl space-y-5">

        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <Link
              href={listHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Back to team
            </Link>
            <div className="mt-4 flex min-w-0 items-start gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 overflow-hidden border border-blue-100">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt="" className="size-full object-cover" />
                ) : (
                  <span className="text-base font-bold text-blue-600">
                    {userName.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h1 className="break-words text-2xl font-bold text-blue-600 sm:text-3xl">
                  {staff.user.name}
                </h1>
                <p className="mt-1 break-all text-sm text-slate-500">
                  @{staff.user.username}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={editHref}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
          >
            <Edit3 size={16} />
            Edit Staff
          </Link>
        </div>

        {/* Summary cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Status</p>
            <p className="mt-1 text-xl font-bold text-slate-950">
              {staff.user.isActive ? "Active" : "Inactive"}
            </p>
          </div>
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Department</p>
            <p className="mt-1 break-words text-xl font-bold text-slate-950">
              {departmentName}
            </p>
          </div>
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Employment</p>
            <p className="mt-1 text-xl font-bold capitalize text-slate-950">
              {employmentTypeLabels[staff.employmentType as EmploymentType]}
            </p>
          </div>
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Salary</p>
            <p className="mt-1 text-xl font-bold text-slate-950">
              KES {parseFloat(staff.salary).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Sections */}
        <DetailSection
          title="Staff Information"
          icon={UserRound}
          items={[
            { label: "Full name", value: staff.user.name },
            { label: "Username", value: staff.user.username },
            { label: "Email", value: staff.user.email },
            { label: "Phone", value: staff.user.phone },
            { label: "ID number", value: staff.user.idNumber },
            { label: "Active", value: staff.user.isActive },
          ]}
        />

        <DetailSection
          title="Employment Details"
          icon={BriefcaseBusiness}
          items={[
            { label: "Position", value: staff.position },
            { label: "Department", value: departmentName },
            { label: "Employment type", value: employmentTypeLabels[staff.employmentType as EmploymentType] },
            { label: "Hire date", value: staff.hireDate.slice(0, 10) },
            { label: "Salary", value: `KES ${parseFloat(staff.salary).toLocaleString()}` },
          ]}
        />

        <DetailSection
          title="Emergency & Address"
          icon={ShieldCheck}
          items={[
            { label: "Emergency contact", value: staff.user.emergencyContactName },
            { label: "Emergency phone", value: staff.user.emergencyContactPhone },
            { label: "Relationship", value: staff.user.emergencyContactRelationship },
            { label: "Address", value: staff.user.address },
          ]}
        />

        {/* Action buttons */}
        <div className="grid gap-3 sm:grid-cols-3">
          <a
            href={`mailto:${staff.user.email}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <Mail size={16} />
            Email
          </a>
          <a
            href={`tel:${staff.user.phone}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <Phone size={16} />
            Call
          </a>
          <div className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700">
            <MapPin size={16} />
            Address Saved
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useGetTenantDetails } from "@/hooks/useTenant";
import { TenantDetailsPageProps } from "./props";

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | boolean | React.ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-orange-100 bg-slate-50 p-3 flex flex-col justify-between">
      <div>
        <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
        <div className="mt-1 break-words text-sm font-medium text-slate-900">
          {typeof value === "boolean" ? (
            value ? "Active" : "Inactive"
          ) : React.isValidElement(value) ? (
            value
          ) : (
            (value ?? "—")
          )}
        </div>
      </div>
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
  items: Array<{ label: string; value: string | boolean | React.ReactNode }>;
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
    <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm animate-pulse">
      <div className="mb-4 h-5 w-40 rounded bg-slate-100" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-orange-100 bg-slate-50 p-3 space-y-2">
            <div className="h-3 w-20 rounded bg-slate-200" />
            <div className="h-4 w-32 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";

export default function TenantDetailsPage({
  tenantId,
  listHref,
  editHref,
}: TenantDetailsPageProps) {
  // Unwrap wrapped payload architecture manually
  const { data: rawResponse, isLoading, isError } = useGetTenantDetails(tenantId);
  const tenant = rawResponse?.data ?? rawResponse;

  if (isLoading) {
    return (
      <div className="min-h-full bg-slate-50 p-3 sm:p-5 lg:p-6">
        <div className="mx-auto w-full max-w-6xl space-y-5">
          <div className="h-8 w-32 rounded bg-slate-200 animate-pulse" />
          <div className="h-12 w-64 rounded bg-slate-200 animate-pulse" />
          <SkeletonSection />
          <SkeletonSection />
          <SkeletonSection />
        </div>
      </div>
    );
  }

  if (isError || !tenant) {
    return (
      <div className="min-h-full bg-slate-50 p-3 sm:p-5 lg:p-6">
        <div className="mx-auto w-full max-w-6xl space-y-4">
          <Link
            href={listHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to tenants
          </Link>
          <div className="rounded-lg border border-red-100 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-800">Tenant not found</p>
            <p className="mt-1 text-sm text-slate-500">
              This tenant may have been deleted or the ID is invalid.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const userName = tenant?.user?.name ?? "Unknown Tenant";
  const userEmail = tenant?.user?.email;
  const userPhone = tenant?.user?.phone;
  const avatarUrl = tenant?.user?.avatar;


  return (
    <div className="min-h-full bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-6xl space-y-5">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <Link
              href={listHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Back to tenants
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
                  {userName}
                </h1>
                <p className="mt-1 break-all text-sm text-slate-500">
                  @{tenant?.user?.username ?? "no-username"}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={editHref}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
          >
            <Edit3 size={16} />
            Edit Tenant
          </Link>
        </div>

        {/* Summary cards */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Status</p>
            <p className="mt-1 text-xl font-bold text-slate-950">
              {tenant.isActive ? "Active" : "Inactive"}
            </p>
          </div>
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-1 text-xl font-bold capitalize text-slate-950">
              {tenant?.user?.role ?? "—"}
            </p>
          </div>
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">ID Number</p>
            <p className="mt-1 break-all text-xl font-bold text-slate-950">
              {tenant?.user?.idNumber ?? "—"}
            </p>
          </div>
        </div>

        {/* Sections */}
        <DetailSection
          title="Tenant Information"
          icon={UserRound}
          items={[
            { label: "Full name", value: userName },
            { label: "Username", value: tenant?.user?.username },
            { label: "Email", value: userEmail },
            { label: "Phone", value: userPhone },
          ]}
        />

        <DetailSection
          title="Contact Details"
          icon={Phone}
          items={[
            { label: "Next of kin", value: tenant.nextOfKinName },
            { label: "Next of kin phone", value: tenant.nextOfKinPhone },
            { label: "Emergency contact", value: tenant?.user?.emergencyContactName },
            { label: "Emergency phone", value: tenant?.user?.emergencyContactPhone },
            { label: "Relationship", value: tenant?.user?.emergencyContactRelationship },
          ]}
        />

        <DetailSection
          title="Account & Address"
          icon={ShieldCheck}
          items={[
            { label: "ID number", value: tenant?.user?.idNumber },
            { label: "Address", value: tenant?.user?.address },
          ]}
        />

        {/* Action buttons */}
        <div className="grid gap-3 sm:grid-cols-3">
          <a
            href={userEmail ? `mailto:${userEmail}` : "#"}
            onClick={(e) => !userEmail && e.preventDefault()}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition ${userEmail ? 'hover:bg-slate-100' : 'opacity-50 cursor-not-allowed'}`}
          >
            <Mail size={16} />
            Email
          </a>
          <a
            href={userPhone ? `tel:${userPhone}` : "#"}
            onClick={(e) => !userPhone && e.preventDefault()}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition ${userPhone ? 'hover:bg-slate-100' : 'opacity-50 cursor-not-allowed'}`}
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
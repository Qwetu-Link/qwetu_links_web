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
import { seededTenants, Tenant } from "../definations";

type TenantDetailsPageProps = {
  tenantId: string;
  listHref: string;
  editHref: string;
};

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | boolean;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-orange-100 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-slate-900">
        {typeof value === "boolean" ? (value ? "Active" : "Inactive") : value}
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
  items: Array<{ label: string; value: string | boolean }>;
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

function getTenant(tenantId: string): Tenant {
  return (
    seededTenants.find((tenant) => tenant.id === tenantId) ?? {
      ...seededTenants[0],
      id: tenantId,
    }
  );
}

export default function TenantDetailsPage({
  tenantId,
  listHref,
  editHref,
}: TenantDetailsPageProps) {
  const tenant = getTenant(tenantId);

  return (
    <div className="min-h-full bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-6xl space-y-5">
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
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-base font-bold text-blue-600">
                {tenant.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h1 className="break-words text-2xl font-bold text-blue-600 sm:text-3xl">
                  {tenant.name}
                </h1>
                <p className="mt-1 break-all text-sm text-slate-500">
                  @{tenant.username} · {tenant.id}
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

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Status</p>
            <p className="mt-1 text-xl font-bold text-slate-950">
              {tenant.is_active ? "Active" : "Inactive"}
            </p>
          </div>
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-1 text-xl font-bold capitalize text-slate-950">
              {tenant.role}
            </p>
          </div>
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">ID Number</p>
            <p className="mt-1 break-all text-xl font-bold text-slate-950">
              {tenant.id_number}
            </p>
          </div>
        </div>

        <DetailSection
          title="Tenant Information"
          icon={UserRound}
          items={[
            { label: "Full name", value: tenant.name },
            { label: "Username", value: tenant.username },
            { label: "Email", value: tenant.email },
            { label: "Phone", value: tenant.phone },
            { label: "Avatar", value: tenant.avatar },
            { label: "Active", value: tenant.is_active },
          ]}
        />

        <DetailSection
          title="Contact Details"
          icon={Phone}
          items={[
            { label: "Next of kin", value: tenant.next_of_kin_name },
            { label: "Next of kin phone", value: tenant.next_of_kin_phone },
            {
              label: "Emergency contact",
              value: tenant.emergency_contact_name,
            },
            {
              label: "Emergency phone",
              value: tenant.emergency_contact_phone,
            },
            {
              label: "Relationship",
              value: tenant.emergency_contact_relationship,
            },
          ]}
        />

        <DetailSection
          title="Account & Address"
          icon={ShieldCheck}
          items={[
            { label: "Role", value: tenant.role },
            { label: "ID number", value: tenant.id_number },
            { label: "Address", value: tenant.address },
            { label: "Password", value: tenant.password },
          ]}
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <a
            href={`mailto:${tenant.email}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <Mail size={16} />
            Email
          </a>
          <a
            href={`tel:${tenant.phone}`}
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

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
import { employmentTypeLabels, seededStaff, StaffMember } from "../definations";

function getStaff(staffId: string): StaffMember {
  return (
    seededStaff.find((staff) => staff.id === staffId) ?? {
      ...seededStaff[0],
      id: staffId,
    }
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean;
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
  items: Array<{ label: string; value: string | number | boolean }>;
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

export default function StaffDetailsPage({ staffId }: { staffId: string }) {
  const staff = getStaff(staffId);

  return (
    <div className="min-h-full bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-6xl space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <Link
              href="/admin/user"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Back to team
            </Link>
            <div className="mt-4 flex min-w-0 items-start gap-3">
              <div
                className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-50 bg-cover bg-center text-base font-bold text-blue-600 ring-1 ring-orange-100"
                style={
                  staff.avatar
                    ? { backgroundImage: `url("${staff.avatar}")` }
                    : undefined
                }
              >
                {!staff.avatar && staff.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h1 className="break-words text-2xl font-bold text-blue-600 sm:text-3xl">
                  {staff.name}
                </h1>
                <p className="mt-1 break-all text-sm text-slate-500">
                  @{staff.username} · {staff.id}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={`/admin/user/${staff.id}/edit`}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
          >
            <Edit3 size={16} />
            Edit Staff
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Status</p>
            <p className="mt-1 text-xl font-bold text-slate-950">
              {staff.is_active ? "Active" : "Inactive"}
            </p>
          </div>
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Department</p>
            <p className="mt-1 break-words text-xl font-bold text-slate-950">
              {staff.department}
            </p>
          </div>
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Employment</p>
            <p className="mt-1 text-xl font-bold capitalize text-slate-950">
              {employmentTypeLabels[staff.employment_type]}
            </p>
          </div>
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Salary</p>
            <p className="mt-1 text-xl font-bold text-slate-950">
              KES {staff.salary.toLocaleString()}
            </p>
          </div>
        </div>

        <DetailSection
          title="Staff Information"
          icon={UserRound}
          items={[
            { label: "Full name", value: staff.name },
            { label: "Username", value: staff.username },
            { label: "Email", value: staff.email },
            { label: "Phone", value: staff.phone },
            { label: "Role", value: staff.role },
            { label: "Active", value: staff.is_active },
          ]}
        />

        <DetailSection
          title="Employment Details"
          icon={BriefcaseBusiness}
          items={[
            { label: "Position", value: staff.position },
            { label: "Department", value: staff.department },
            {
              label: "Employment type",
              value: employmentTypeLabels[staff.employment_type],
            },
            { label: "Hire date", value: staff.hire_date },
            { label: "Salary", value: `KES ${staff.salary.toLocaleString()}` },
            { label: "ID number", value: staff.id_number },
          ]}
        />

        <DetailSection
          title="Emergency & Account"
          icon={ShieldCheck}
          items={[
            { label: "Emergency contact", value: staff.emergency_contact_name },
            { label: "Emergency phone", value: staff.emergency_contact_phone },
            {
              label: "Relationship",
              value: staff.emergency_contact_relationship,
            },
            { label: "Address", value: staff.address },
            { label: "Avatar", value: staff.avatar },
            { label: "Password", value: staff.password },
          ]}
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <a
            href={`mailto:${staff.email}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <Mail size={16} />
            Email
          </a>
          <a
            href={`tel:${staff.phone}`}
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

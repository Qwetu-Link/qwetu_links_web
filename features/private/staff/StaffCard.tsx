import { Eye, Mail, Pencil, Phone, Trash2 } from "lucide-react";
import { formatDate, formatLabel } from "@/utils/utils";
import { Staff } from "@/types/staff.definations";
import Link from "next/link";

type StaffCardProps = {
  staff: Staff;
  viewHref: string;
  editHref: string;
  onDelete: (staff: Staff) => void;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function StaffCard({ staff, viewHref, editHref, onDelete }: StaffCardProps) {
  const isActive = staff.user.isActive;

  return (
    <article className="group flex flex-col rounded-lg border border-orange-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
            {initials(staff.user.name)}
          </div>
          <div className="min-w-0">
            <p className="break-words font-semibold text-slate-950">{staff.user.name}</p>
            <p className="mt-0.5 break-all text-xs text-slate-500">@{staff.user.username}</p>
          </div>
        </div>

        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
            isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Employment tag */}
      <p className="mt-2 text-xs text-slate-500">{formatLabel(staff.employmentType)}</p>

      {/* Contact */}
      <div className="mt-4 space-y-1 border-t border-orange-100 pt-3 text-sm text-slate-600">
        <p className="flex items-center gap-2 break-all">
          <Mail size={14} />
          {staff.user.email}
        </p>
        <p className="flex items-center gap-2">
          <Phone size={14} />
          {staff.user.phone}
        </p>
      </div>

      {/* Department / Salary */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Department
          </p>
          <p className="mt-1 truncate font-medium text-slate-800">{staff.department}</p>
          <p className="mt-0.5 truncate text-xs text-slate-500">{staff.position}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Salary
          </p>
          <p className="mt-1 font-medium text-slate-800">
            KES {staff.salary.toLocaleString()}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">Hired {formatDate(staff.hireDate)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-end gap-2 border-t border-orange-100 pt-3">
        <Link
          href={viewHref}
          title="View"
          className="inline-flex size-8 items-center justify-center rounded-lg border border-orange-100 text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
        >
          <Eye size={15} />
        </Link>
        <Link
          href={editHref}
          title="Edit"
          className="inline-flex size-8 items-center justify-center rounded-lg border border-orange-100 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <Pencil size={15} />
        </Link>
        <button
          type="button"
          onClick={() => onDelete(staff)}
          title="Delete"
          className="inline-flex size-8 items-center justify-center rounded-lg border border-orange-100 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
}
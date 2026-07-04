"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

type TenantActionsProps = {
  viewHref: string;
  editHref: string;
  onDelete: () => void;
};

export default function TenantActions({ viewHref, editHref, onDelete }: TenantActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={viewHref}
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition"
      >
        <Eye size={15} />
        View
      </Link>
      <Link
        href={editHref}
        className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2.5 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <Pencil size={15} />
      </Link>
      <button
        type="button"
        onClick={onDelete}
        title="Delete Tenant"
        className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2.5 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

import Link from "next/link";
import { Edit3, Eye, Trash2 } from "lucide-react";
import { TenantActionsProps } from "./types";

export default function TenantActions({
  viewHref,
  editHref,
  onDelete,
}: TenantActionsProps) {
  return (
    <div className="flex gap-2 sm:justify-end">
      <Link
        href={viewHref}
        title="View tenant"
        className="inline-flex size-8 items-center justify-center rounded-lg border border-orange-100 text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
      >
        <Eye size={15} />
      </Link>
      <Link
        href={editHref}
        title="Edit tenant"
        className="inline-flex size-8 items-center justify-center rounded-lg border border-orange-100 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
      >
        <Edit3 size={15} />
      </Link>
      <button
        type="button"
        onClick={onDelete}
        title="Delete tenant"
        className="inline-flex size-8 items-center justify-center rounded-lg border border-orange-100 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

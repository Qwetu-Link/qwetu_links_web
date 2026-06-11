import { Business } from "../definations";

export function StatusPills({ business }: { business: Business }) {
  return (
    <div className="flex flex-wrap gap-2">
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
          business.is_active
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {business.is_active ? "Active" : "Inactive"}
      </span>
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
          business.is_verified
            ? "bg-blue-50 text-blue-700"
            : "bg-amber-50 text-amber-700"
        }`}
      >
        {business.is_verified ? "Verified" : "Pending"}
      </span>
    </div>
  );
}

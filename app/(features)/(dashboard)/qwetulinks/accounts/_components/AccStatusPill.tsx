import { Business } from "../definations";

export function StatusPills({ business }: { business: Business }) {
  return (
    <div className="flex flex-wrap gap-2">
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
          business.isActive
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {business.isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

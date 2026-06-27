import { TenantStatusProps } from "./props";

export default function TenantStatus({ tenant }: TenantStatusProps) {
  return (
    <div>
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
          tenant.isActive
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {tenant.isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

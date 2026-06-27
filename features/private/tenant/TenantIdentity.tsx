import { TenantIdentityProps } from "./props";

export default function TenantIdentity({ tenant }: TenantIdentityProps) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
        {tenant.user.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className="break-words font-semibold text-slate-950">
          {tenant.user.name}
        </p>
        <p className="mt-0.5 break-all text-xs text-slate-500">
          @{tenant.user.username}
        </p>
      </div>
    </div>
  );
}

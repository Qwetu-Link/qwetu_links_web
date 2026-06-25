import { Mail, Phone } from "lucide-react";
import TenantIdentity from "./TenantIdentity";
import TenantStatus from "./TenantStatus";
import TenantActions from "./TenantActions";
import { TenantCardProps } from "./types";

export default function TenantCard({ tenant, pathname, onDelete }: TenantCardProps) {
  return (
    <article className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <TenantIdentity tenant={tenant} />
        <TenantStatus tenant={tenant} />
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-600">
        <div className="space-y-1">
          <p className="flex items-center gap-2 break-all">
            <Mail size={14} />
            {tenant.user.email}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={14} />
            {tenant.user.phone}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase text-slate-400">
              Next of kin
            </p>
            <p className="mt-1 break-words font-medium text-slate-800">
              {tenant.nextOfKinName}
            </p>
            <p className="mt-1 text-xs">{tenant.nextOfKinPhone}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase text-slate-400">
              Emergency
            </p>
            <p className="mt-1 break-words font-medium text-slate-800">
              {tenant.user.emergencyContactName}
            </p>
            <p className="mt-1 text-xs">{tenant.user.emergencyContactPhone}</p>
            <p className="mt-1 break-words text-xs">
              {tenant.user.emergencyContactRelationship}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-orange-100 pt-3">
        <TenantActions
          viewHref={`${pathname}/${tenant.id}`}
          editHref={`${pathname}/${tenant.id}/edit`}
          onDelete={() => onDelete(tenant)}
        />
      </div>
    </article>
  );
}

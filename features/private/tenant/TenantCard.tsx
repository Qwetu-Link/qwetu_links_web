"use client";

import { Mail, Phone, Users, AlertCircle } from "lucide-react";
import TenantIdentity from "./TenantIdentity";
import TenantStatus from "./TenantStatus";
import TenantActions from "./TenantActions";
import type { TenantCardProps } from "./props";

export default function TenantCard({ tenant, pathname, onDelete }: TenantCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80 transition-all duration-300 hover:shadow-lg hover:ring-slate-300">
      {/* Decorative gradient accent */}
      <div className="absolute -right-8 -top-8 size-24 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 opacity-50 blur-xl transition-all duration-300 group-hover:scale-150 group-hover:opacity-70" />
      <div className="absolute -left-4 -bottom-4 size-16 rounded-full bg-gradient-to-br from-orange-50 to-amber-50 opacity-60" />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <TenantIdentity tenant={tenant} />
          <TenantStatus tenant={tenant} />
        </div>

        {/* Contact Info */}
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="flex size-7 items-center justify-center rounded-md bg-slate-100">
              <Mail size={14} className="text-slate-500" />
            </div>
            <span className="break-all">{tenant.user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="flex size-7 items-center justify-center rounded-md bg-slate-100">
              <Phone size={14} className="text-slate-500" />
            </div>
            <span>{tenant.user.phone}</span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {/* Next of Kin */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 p-4">
            <div className="absolute -right-2 -top-2 size-8 rounded-full bg-slate-200/50" />
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center">
                <Users size={15} className="text-slate-600" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Next of Kin
              </p>
            </div>
            <p className="mt-2 font-semibold text-slate-800">{tenant.nextOfKinName}</p>
            <p className="mt-0.5 text-sm text-slate-500">{tenant.nextOfKinPhone}</p>
          </div>

          {/* Emergency Contact */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-orange-50/30 p-4">
            <div className="absolute -right-2 -top-2 size-8 rounded-full bg-red-100/50" />
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center">
                <AlertCircle size={15} className="text-red-500" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-400">
                Emergency
              </p>
            </div>
            <p className="mt-2 font-semibold text-slate-800">
              {tenant.user.emergencyContactName}
            </p>
            <p className="mt-0.5 text-sm text-slate-500">{tenant.user.emergencyContactPhone}</p>
            <p className="mt-1 text-xs text-slate-400">
              {tenant.user.emergencyContactRelationship}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 border-t border-slate-100 pt-4">
          <TenantActions
            viewHref={`${pathname}/${tenant.id}`}
            editHref={`${pathname}/${tenant.id}/edit`}
            onDelete={() => onDelete(tenant)}
          />
        </div>
      </div>
    </article>
  );
}

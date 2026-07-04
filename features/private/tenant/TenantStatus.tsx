"use client";

import { Tenant } from "@/types/tenant.definations";

type TenantStatusProps = {
  tenant: Tenant;
};

const statusConfig = {
  active: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
    dot: "bg-emerald-500",
    label: "Active",
  },
  inactive: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    ring: "ring-slate-200",
    dot: "bg-slate-400",
    label: "Inactive",
  },
} as const;

export default function TenantStatus({ tenant }: TenantStatusProps) {
  const config = tenant.isActive
    ? statusConfig.active
    : statusConfig.inactive;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${config.bg} ${config.text} ${config.ring}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
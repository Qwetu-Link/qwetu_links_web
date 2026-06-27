import { Property } from "@/types/property.definations";
import { MaintenancePriority, MaintenanceStatus } from "@/types/maintenance.definitions";

// Maintenance Badges

export const priorityStyles: Record<MaintenancePriority, string> = {
    low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    medium: "bg-sky-50 text-sky-700 ring-sky-200",
    high: "bg-amber-50 text-amber-700 ring-amber-200",
};

export const statusStyles: Record<MaintenanceStatus, string> = {
    in_progress: "bg-orange-50 text-orange-700 ring-orange-200",
    resolved: "bg-blue-50 text-blue-700 ring-blue-200",
    pending: "bg-zinc-50 text-zinc-700 ring-zinc-200",
};

// Property badges
export const propertyStatusStyles: Record<Property["status"], string> = {
    occupied: "bg-blue-600 text-white",
    available: "bg-purple-600 text-white",
    maintenance: "bg-amber-500 text-white",
    reserved: "bg-orange-600 text-white",
};

export const propertyStatusStylesB: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  occupied: "bg-red-100 text-red-700 ring-red-200",
  reserved: "bg-amber-100 text-amber-700 ring-amber-200",
  maintenance: "bg-slate-100 text-slate-600 ring-slate-200",
};

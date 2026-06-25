import type { MaintenancePriority, MaintenanceStatus } from "./definitions";

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

export const fieldClass =
  "w-full rounded-lg border border-orange-100 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15";

export function formatLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function formatDate(value: string) {
  if (!value) return "Not set";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "medium",
    timeStyle: value.includes("T") ? "short" : undefined,
  }).format(date);
}

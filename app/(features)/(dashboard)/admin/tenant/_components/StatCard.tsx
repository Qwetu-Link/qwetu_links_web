import { StatCardProps } from "./props";

export default function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

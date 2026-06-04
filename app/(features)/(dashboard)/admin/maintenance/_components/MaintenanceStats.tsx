import type { ReactNode } from "react";
import { CheckCircle2, ClipboardList, Coins, Wrench } from "lucide-react";

type MaintenanceStatsProps = {
  totalRequests: number;
  inProgressCount: number;
  resolvedCount: number;
  totalCost: number;
};

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
        {icon}
      </div>
      <p className="text-2xl font-bold text-slate-950">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

export default function MaintenanceStats({
  totalRequests,
  inProgressCount,
  resolvedCount,
  totalCost,
}: MaintenanceStatsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={<ClipboardList size={18} />}
        label="Total requests"
        value={totalRequests}
      />
      <StatCard
        icon={<Wrench size={18} />}
        label="In progress"
        value={inProgressCount}
      />
      <StatCard
        icon={<CheckCircle2 size={18} />}
        label="Resolved"
        value={resolvedCount}
      />
      <StatCard
        icon={<Coins size={18} />}
        label="Total cost"
        value={`KES ${totalCost.toLocaleString("en-KE")}`}
      />
    </section>
  );
}

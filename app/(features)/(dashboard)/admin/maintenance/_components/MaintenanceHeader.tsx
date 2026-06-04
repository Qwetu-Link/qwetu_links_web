import Link from "next/link";
import { Plus, Wrench } from "lucide-react";

type MaintenanceHeaderProps = {
  basePath: string;
};

export default function MaintenanceHeader({
  basePath,
}: MaintenanceHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-orange-700 ring-1 ring-orange-100">
          <Wrench size={16} />
          Maintenance
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Maintenance Requests
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          Track repair reports, tenant details, dates, costs, and resolution
          status.
        </p>
      </div>
      <Link
        href={`${basePath}/new`}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition hover:bg-orange-700"
      >
        <Plus size={16} />
        New Request
      </Link>
    </header>
  );
}

import { Filter, Search } from "lucide-react";
import type { MaintenanceStatusFilter } from "../definitions";
import { fieldClass } from "../utils";

type MaintenanceFiltersProps = {
  search: string;
  status: MaintenanceStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: MaintenanceStatusFilter) => void;
};

export default function MaintenanceFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: MaintenanceFiltersProps) {
  return (
    <div className="border-b border-orange-100 p-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className={`${fieldClass} pl-10`}
            placeholder="Search title, issue, unit, or tenant"
            type="search"
          />
        </div>
        <div className="relative lg:w-56">
          <Filter
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <select
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as MaintenanceStatusFilter)
            }
            className={`${fieldClass} pl-10`}
          >
            <option value="all">All statuses</option>
            <option value="reported">Reported</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
}

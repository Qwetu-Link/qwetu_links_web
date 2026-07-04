import { MaintenanceStatusFilter } from "@/types/maintenance.definitions";
import { Filter, Search } from "lucide-react";

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
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-black outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            placeholder="Search title, issue, unit, or tenant"
            type="search"
          />
        </div>
        <div className="relative w-full lg:w-56">
          <Filter
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as MaintenanceStatusFilter)
            }
            className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>

          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

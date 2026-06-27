import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import type { MaintenanceRequest } from "@/types/maintenance.definitions";
import {
  formatDate,
  formatLabel,
} from "@/utils/utils";
import { priorityStyles, statusStyles } from "@/components/custom/CustomBadges";

type MaintenanceTableProps = {
  requests: MaintenanceRequest[];
  basePath: string;
  onDelete: (request: MaintenanceRequest) => void; // Fixed: Changed type definition to accept the target request
};

export default function MaintenanceTable({
  requests,
  basePath,
  onDelete
}: MaintenanceTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3 font-semibold">Request</th>
            <th className="px-4 py-3 font-semibold">Unit / Tenant</th>
            <th className="px-4 py-3 font-semibold">Priority</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Reported</th>
            <th className="px-4 py-3 font-semibold">Cost</th>
            <th className="px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-50">
          {requests.map((request) => (
            <tr key={request.id} className="align-top hover:bg-orange-50/40">
              <td className="px-4 py-4">
                <p className="font-semibold text-slate-950">{request.title}</p>
                <p className="mt-1 max-w-56 truncate text-slate-500">
                  {request.maintainanceNo}
                </p>
              </td>
              <td className="px-4 py-4">
                <p className="font-medium text-slate-800">{request.unit.unitNumber}</p>
              </td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${priorityStyles[request.priority]}`}
                >
                  {formatLabel(request.priority)}
                </span>
              </td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[request.status]}`}
                >
                  {formatLabel(request.status)}
                </span>
              </td>
              <td className="px-4 py-4 text-slate-600">
                {formatDate(request.reportedDate)}
              </td>
              <td className="px-4 py-4 font-medium text-slate-800">
                KES {Number(request.cost || 0).toLocaleString("en-KE")}
              </td>
              <td className="px-4 py-4 gap-3">
                <Link
                  href={`${basePath}/${request.id}/edit`}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-orange-100 px-2.5 text-sm font-medium text-slate-700 transition hover:bg-orange-50"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  type="button"
                  onClick={() => onDelete(request)} // Fixed: Pass the current request item into the handler
                  title="Delete Maintenance"
                  className="inline-flex size-8 items-center justify-center rounded-lg border border-orange-100 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
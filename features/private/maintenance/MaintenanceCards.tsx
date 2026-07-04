"use client";

import Link from "next/link";
import {
  Pencil,
  Trash2,
  Calendar,
  MapPin,
  Coins,
} from "lucide-react";
import type { MaintenanceRequest } from "@/types/maintenance.definitions";
import { formatDate, formatLabel } from "@/utils/utils";
import { statusStyles } from "@/components/custom/CustomBadges";

type MaintenanceCardsProps = {
  requests: MaintenanceRequest[];
  basePath: string;
  onDelete: (request: MaintenanceRequest) => void;
};

export default function MaintenanceCards({
  requests,
  basePath,
  onDelete,
}: MaintenanceCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {requests.map((request) => {
        const priorityColor =
          request.priority === "low"
            ? {
                border: "border-red-200",
                dot: "bg-red-500",
                text: "text-red-600",
              }
            : request.priority === "medium"
              ? {
                  border: "border-amber-200",
                  dot: "bg-amber-500",
                  text: "text-amber-600",
                }
              : request.priority === "high"
                ? {
                    border: "border-orange-200",
                    dot: "bg-orange-500",
                    text: "text-orange-600",
                  }
                : {
                    border: "border-emerald-200",
                    dot: "bg-emerald-500",
                    text: "text-emerald-600",
                  };

        return (
          <div
            key={request.id}
            className={`group relative flex flex-col rounded-xl border border-slate-200 border-t-4 ${priorityColor.border} bg-white shadow-sm transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex flex-1 flex-col p-5">
              {/* Header */}
              <div className="mb-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
                      {request.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {request.maintainanceNo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin
                    size={15}
                    className="text-slate-400"
                  />
                  <span className="font-medium">
                    {request.unit.unitNumber}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar
                    size={15}
                    className="text-slate-400"
                  />
                  <span>{formatDate(request.reportedDate)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Coins
                    size={15}
                    className="text-slate-400"
                  />
                  <span className="font-semibold">
                    KES{" "}
                    {Number(request.cost || 0).toLocaleString("en-KE")}
                  </span>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1 py-5" />

              {/* Priority + Status */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${priorityColor.dot}`}
                  />

                  <span className="text-slate-500">
                    Priority:
                  </span>

                  <span className={`font-semibold ${priorityColor.text}`}>
                    {formatLabel(request.priority)}
                  </span>
                </div>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[request.status]}`}
                >
                  {formatLabel(request.status)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
                <Link
                  href={`${basePath}/${request.id}/edit`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-orange-100 hover:text-orange-700"
                >
                  <Pencil size={15} />
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() => onDelete(request)}
                  title="Delete Maintenance"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
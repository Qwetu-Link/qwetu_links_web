"use client";

import { useMemo, useState } from "react";
import { initialMaintenanceRequest } from "./data";
import type { MaintenanceStatusFilter } from "./definitions";
import MaintenanceFilters from "./_components/MaintenanceFilters";
import MaintenanceHeader from "./_components/MaintenanceHeader";
import MaintenanceStats from "./_components/MaintenanceStats";
import MaintenanceTable from "./_components/MaintenanceTable";

type MaintenanceRequestsPageProps = {
  basePath?: string;
};

const maintenanceRequests = [initialMaintenanceRequest];

export default function MaintenanceRequestsPage({
  basePath = "/maintenance",
}: MaintenanceRequestsPageProps) {
  const requests = maintenanceRequests;
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<MaintenanceStatusFilter>("all");

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesSearch =
        !query ||
        request.title.toLowerCase().includes(query) ||
        request.issue.toLowerCase().includes(query) ||
        request.unit_id.toLowerCase().includes(query) ||
        request.tenant_id.toLowerCase().includes(query);
      const matchesStatus = status === "all" || request.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, status]);

  const totalCost = requests.reduce(
    (sum, request) => sum + Number(request.cost || 0),
    0,
  );
  const inProgressCount = requests.filter(
    (request) => request.status === "in_progress",
  ).length;
  const resolvedCount = requests.filter(
    (request) => request.status === "resolved",
  ).length;

  return (
    <div className="custom-scrollbar h-full overflow-y-auto bg-slate-50 p-4 text-slate-950 sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <MaintenanceHeader basePath={basePath} />
        <MaintenanceStats
          totalRequests={requests.length}
          inProgressCount={inProgressCount}
          resolvedCount={resolvedCount}
          totalCost={totalCost}
        />

        <section className="min-w-0 rounded-lg border border-orange-100 bg-white shadow-sm">
          <MaintenanceFilters
            search={search}
            status={status}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
          />
          <MaintenanceTable requests={filteredRequests} basePath={basePath} />
        </section>
      </div>
    </div>
  );
}

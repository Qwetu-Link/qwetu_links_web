"use client";

import { useMemo, useState } from "react";
import type { MaintenanceRequest, MaintenanceStatusFilter } from "@/types/maintenance.definitions";
import MaintenanceFilters from "./MaintenanceFilters";
import MaintenanceHeader from "./MaintenanceHeader";
import MaintenanceStats from "./MaintenanceStats";
import MaintenanceTable from "./MaintenanceTable";
import { useDelMaintenances, useGetMaintenances } from "@/hooks/useMaintenance";
import DeleteModal from "@/components/common/DeleteModal";
import { toast } from "sonner";
import Pagination from "@/components/common/Pagination";

type MaintenanceRequestsPageProps = {
  basePath?: string;
};


export default function MaintenanceRequestsPage({
  basePath = "/maintenance",
}: MaintenanceRequestsPageProps) {

  const [page, setPage] = useState(1);
  const { data: maintenanceData } = useGetMaintenances(page);
  const requests = maintenanceData.data;
  const deleteMaintenance = useDelMaintenances();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<MaintenanceStatusFilter>("all");
  const [deleteTarget, setDeleteTarget] = useState<MaintenanceRequest | null>(null);


  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesSearch =
        !query ||
        request.title.toLowerCase().includes(query) ||
        request.issue.toLowerCase().includes(query) ||
        request.unitID.toLowerCase().includes(query)

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

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteMaintenance.mutate(
      { id: deleteTarget.id },
      {
        onSuccess: () => {
          toast.success(`"${deleteTarget.maintainanceNo}" deleted successfully`);
        },
        onError: () => {
          toast.error("Failed to delete Maintenance. Please try again.");
        },
      },
    );
    setDeleteTarget(null);
  };

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
          <MaintenanceTable requests={filteredRequests} basePath={basePath} onDelete={setDeleteTarget} />
        </section>

        {maintenanceData && maintenanceData.data.length > 0 && (
          <Pagination
            currentPage={maintenanceData.meta.current_page}
            totalItems={maintenanceData.meta.total}
            total={maintenanceData.meta.total}
            perPage={maintenanceData.meta.per_page}
            onPage={setPage}
          />
        )}

        {deleteTarget && (
          <DeleteModal
            name={deleteTarget.maintainanceNo}
            title="Delete Tenant"
            onConfirm={confirmDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

import DeleteModal from "@/components/common/DeleteModal";
import Pagination from "@/components/common/Pagination";

import {
  useDelMaintenances,
  useGetMaintenances,
} from "@/hooks/useMaintenance";

import MaintenanceCards from "./MaintenanceCards";
import MaintenanceFilters from "./MaintenanceFilters";
import MaintenanceHeader from "./MaintenanceHeader";
import MaintenanceStats from "./MaintenanceStats";

import type {
  MaintenanceRequest,
  MaintenanceStatusFilter,
} from "@/types/maintenance.definitions";
import { PropertyFilters } from "@/types/property.definations";

type MaintenanceRequestsPageProps = {
  basePath?: string;
};

export default function MaintenanceRequestsPage({
  basePath = "/maintenance",
}: MaintenanceRequestsPageProps) {
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState<PropertyFilters>({
    search: "",
    status: "all",
  });

  const [debouncedSearch] = useDebounce(filters.search, 400);

  const {
    data: maintenanceData,
    isLoading,
  } = useGetMaintenances(page, debouncedSearch);

  const requests: MaintenanceRequest[] = maintenanceData?.data ?? [];

  const deleteMaintenance = useDelMaintenances();

  const [status, setStatus] =
    useState<MaintenanceStatusFilter>("all");

  const [deleteTarget, setDeleteTarget] =
    useState<MaintenanceRequest | null>(null);

  const totalCost = requests.reduce(
    (sum, request) => sum + Number(request.cost || 0),
    0
  );

  const inProgressCount = requests.filter(
    (request) => request.status === "in_progress"
  ).length;

  const resolvedCount = requests.filter(
    (request) => request.status === "resolved"
  ).length;

  const confirmDelete = () => {
    if (!deleteTarget) return;

    deleteMaintenance.mutate(
      {
        id: deleteTarget.id,
      },
      {
        onSuccess: () => {
          toast.success(
            `"${deleteTarget.maintainanceNo}" deleted successfully`
          );
        },
        onError: () => {
          toast.error(
            "Failed to delete maintenance request."
          );
        },
      }
    );

    setDeleteTarget(null);
  };

  if (isLoading) {
    // return <MaintenancePageSkeleton />;
    return <div>Loading...</div>
  }

  return (
    <div className="custom-scrollbar h-full overflow-y-auto bg-slate-50 p-4 text-slate-950 sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <MaintenanceHeader basePath={basePath} />

        <MaintenanceStats
          totalRequests={maintenanceData?.meta.total ?? 0}
          inProgressCount={inProgressCount}
          resolvedCount={resolvedCount}
          totalCost={totalCost}
        />

        <MaintenanceFilters
          search={filters.search}
          status={status}
          onSearchChange={(value) => {
            setFilters((prev) => ({
              ...prev,
              search: value,
            }));
            setPage(1);
          }}
          onStatusChange={setStatus}
        />

        {requests.length > 0 ? (
          <MaintenanceCards
            requests={requests}
            basePath={basePath}
            onDelete={setDeleteTarget}
          />
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
              <Search
                size={30}
                className="text-orange-500"
              />
            </div>

            {filters.search.trim() ? (
              <>
                <h2 className="mt-5 text-xl font-semibold text-slate-800">
                  No maintenance requests found
                </h2>

                <p className="mt-2 max-w-md text-sm text-slate-500">
                  We couldnt find any maintenance requests matching{" "}
                  <span className="font-semibold text-slate-700">
                    `{filters.search}``
                  </span>
                  .
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFilters((prev) => ({
                        ...prev,
                        search: "",
                      }));
                      setPage(1);
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Clear Search
                  </button>

                  <Link
                    href={`${basePath}/new`}
                    className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    <Plus size={16} />
                    Create Request
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="mt-5 text-xl font-semibold text-slate-800">
                  No maintenance requests yet
                </h2>

                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Create your first maintenance request to begin tracking repairs,
                  issues, and maintenance work across your properties.
                </p>

                <Link
                  href={`${basePath}/new`}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  <Plus size={16} />
                  Create Request
                </Link>
              </>
            )}
          </div>
        )}

        {maintenanceData && requests.length > 0 && (
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
            title="Delete Maintenance Request"
            name={deleteTarget.maintainanceNo}
            onConfirm={confirmDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </div>
    </div>
  );
}
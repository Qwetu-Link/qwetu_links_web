"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  Plus,
  Search,
  ShieldCheck,
  UserRound,
  Users2,
} from "lucide-react";
import { useDebounce } from "use-debounce";
import DeleteModal from "@/components/common/DeleteModal";
import Pagination from "@/components/common/Pagination";
import { useDelStaff, useGetStaffs } from "@/hooks/useStaff";
import { Staff } from "@/types/staff.definations";
import Link from "next/link";
import StaffCard from "./StaffCard";


function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: typeof Users2;
}) {
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

function StaffCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-orange-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 shrink-0 rounded-lg bg-slate-100" />
            <div className="h-3 w-1/2 rounded bg-slate-100" />
          </div>
          <div className="mt-4 h-24 rounded-lg bg-slate-50" />
          <div className="mt-3 h-16 rounded-lg bg-slate-50" />
        </div>
      ))}
    </div>
  );
}

function StaffPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [debounceSearch] = useDebounce(search, 300);

  const {
    data: staffResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetStaffs(page, debounceSearch);

  const deleteStaff = useDelStaff();
  const [deleteTarget, setDeleteTarget] = useState<Staff | null>(null);

  // Safe fallback: never let downstream code touch `.data`/`.meta` on undefined
  const staffList = staffResponse?.data ?? [];
  const isSearching = debounceSearch.trim().length > 0;

  const activeCount = staffList.filter((staff) => staff.user.isActive).length;

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteStaff.mutate({
      id: deleteTarget.id,
      avatarPath: deleteTarget.user.avatarPath,
    });
    setDeleteTarget(null);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="min-h-full overflow-x-hidden bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-7xl space-y-5 lg:space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-blue-600 sm:text-3xl">
              <Users2 size={26} />
              Team
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-500">
              Manage staff profiles, departments, compensation, employment
              details, and emergency contacts.
            </p>
          </div>
          <Link
            href="/admin/user/new"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
          >
            <Plus size={16} />
            Add Staff
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total staff"
            value={staffResponse?.meta.total ?? staffList.length}
            icon={Users2}
          />
          <StatCard label="Active" value={activeCount} icon={ShieldCheck} />
          <StatCard
            label="Inactive"
            value={staffList.length - activeCount}
            icon={UserRound}
          />
          <StatCard
            label="Departments"
            value={new Set(staffList.map((staff) => staff.department)).size}
            icon={BriefcaseBusiness}
          />
        </div>

        <div className="rounded-lg border border-orange-100 bg-white p-3 shadow-sm sm:p-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search staff..."
              disabled
              className="h-10 w-full rounded-lg border border-orange-100 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {isLoading ? (
          <StaffCardsSkeleton />
        ) : isError ? (
          <div className="rounded-lg border border-red-100 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-800">
              Couldn&apos;t load staff
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Something went wrong while fetching the staff list.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-3 rounded-lg border border-orange-100 px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50"
            >
              Try again
            </button>
          </div>
        ) : staffList.length === 0 ? (
          <div className="rounded-lg border border-orange-100 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-800">
              {isSearching ? `No staff match "${debounceSearch}"` : "No staff found"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {isSearching
                ? "Try a different search term, or clear the search."
                : "Try another search or add a new staff member."}
            </p>
            {isSearching && (
              <button
                onClick={() => handleSearchChange("")}
                className="mt-3 rounded-lg border border-orange-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ${
              isFetching ? "opacity-60" : ""
            }`}
          >
            {staffList.map((staff) => (
              <StaffCard
                key={staff.id}
                staff={staff}
                viewHref={`/admin/user/${staff.id}`}
                editHref={`/admin/user/${staff.id}/edit`}
                onDelete={(target) => setDeleteTarget(target)}
              />
            ))}
          </div>
        )}
      </div>

      {!isLoading && staffResponse && staffList.length > 0 && (
        <Pagination
          currentPage={staffResponse.meta.current_page}
          totalItems={staffResponse.meta.total}
          total={staffResponse.meta.total}
          perPage={staffResponse.meta.per_page}
          onPage={setPage}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.user.name}
          title="Delete Staff"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

export default StaffPage;
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CalendarDays,
  Edit3,
  Eye,
  Mail,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  Users2,
} from "lucide-react";
import DeleteModal from "@/components/common/DeleteModal";
import { useDelStaff, useGetStaffs } from "@/hooks/useStaff";
import { Staff } from "@/types/staff.definations";
import { formatDate, snakeFormater } from "@/utils/utils";
import Pagination from "@/components/common/Pagination";
import { useDebounce } from "use-debounce";

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

function StaffIdentity({ staff }: { staff: Staff }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
        {staff.user.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className="break-words font-semibold text-slate-950">{staff.user.name}</p>
        <p className="mt-0.5 break-all text-xs text-slate-500">
          @{staff.user.username}
        </p>
      </div>
    </div>
  );
}

function StaffStatus({ staff }: { staff: Staff }) {
  return (
    <div>
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${staff.user.isActive
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600"
          }`}
      >
        {staff.user.isActive ? "Active" : "Inactive"}
      </span>
      <p className="mt-2 text-xs text-slate-500">
        {snakeFormater(staff.employmentType)}
      </p>
    </div>
  );
}

function StaffActions({
  viewHref,
  editHref,
  onDelete,
}: {
  viewHref: string;
  editHref: string;
  onDelete: () => void;
}) {
  return (
    <div className="flex gap-2 sm:justify-end">
      <Link
        href={viewHref}
        title="View staff"
        className="inline-flex size-8 items-center justify-center rounded-lg border border-orange-100 text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
      >
        <Eye size={15} />
      </Link>
      <Link
        href={editHref}
        title="Edit staff"
        className="inline-flex size-8 items-center justify-center rounded-lg border border-orange-100 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
      >
        <Edit3 size={15} />
      </Link>
      <button
        type="button"
        onClick={onDelete}
        title="Delete staff"
        className="inline-flex size-8 items-center justify-center rounded-lg border border-orange-100 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function StaffTableSkeleton() {
  return (
    <div className="hidden overflow-hidden rounded-lg border border-orange-100 bg-white shadow-sm xl:block">
      <div className="animate-pulse divide-y divide-orange-100">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-4">
            <div className="size-10 shrink-0 rounded-lg bg-slate-100" />
            <div className="h-3 w-1/4 rounded bg-slate-100" />
            <div className="h-3 w-1/5 rounded bg-slate-100" />
            <div className="h-3 w-1/6 rounded bg-slate-100" />
            <div className="h-3 w-1/6 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StaffCardsSkeleton() {
  return (
    <div className="grid gap-3 xl:hidden">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-orange-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 shrink-0 rounded-lg bg-slate-100" />
            <div className="h-3 w-1/2 rounded bg-slate-100" />
          </div>
          <div className="mt-4 h-16 rounded-lg bg-slate-50" />
        </div>
      ))}
    </div>
  );
}

export default function StaffManagement() {
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
              disabled
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search staff..."
              className="h-10 w-full rounded-lg border border-orange-100 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {isLoading ? (
          <>
            <StaffCardsSkeleton />
            <StaffTableSkeleton />
          </>
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
          <>
            <div className={`grid gap-3 xl:hidden ${isFetching ? "opacity-60" : ""}`}>
              {staffList.map((staff) => (
                <article
                  key={staff.id}
                  className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <StaffIdentity staff={staff} />
                    <StaffStatus staff={staff} />
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-slate-600">
                    <div className="space-y-1">
                      <p className="flex items-center gap-2 break-all">
                        <Mail size={14} />
                        {staff.user.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={14} />
                        {staff.user.phone}
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase text-slate-400">
                          Department
                        </p>
                        <p className="mt-1 break-words font-medium text-slate-800">
                          {staff.department}
                        </p>
                        <p className="mt-1 break-words text-xs">{staff.position}</p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase text-slate-400">
                          Salary
                        </p>
                        <p className="mt-1 font-medium text-slate-800">
                          KES {staff.salary.toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs">{formatDate(staff.hireDate)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-orange-100 pt-3">
                    <StaffActions
                      viewHref={`/admin/user/${staff.id}`}
                      editHref={`/admin/user/${staff.id}/edit`}
                      onDelete={() => setDeleteTarget(staff)}
                    />
                  </div>
                </article>
              ))}
            </div>

            <div
              className={`hidden overflow-hidden rounded-lg border border-orange-100 bg-white shadow-sm xl:block ${isFetching ? "opacity-60" : ""
                }`}
            >
              <div>
                <table className="w-full table-fixed text-left text-sm">
                  <thead className="border-b border-orange-100 bg-orange-50/70 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="w-[24%] px-4 py-3 font-semibold">Staff</th>
                      <th className="w-[22%] px-4 py-3 font-semibold">Contact</th>
                      <th className="w-[22%] px-4 py-3 font-semibold">Work</th>
                      <th className="w-[14%] px-4 py-3 font-semibold">Salary</th>
                      <th className="w-[9%] px-4 py-3 font-semibold">Status</th>
                      <th className="w-[9%] px-4 py-3 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {staffList.map((staff) => (
                      <tr
                        key={staff.id}
                        className="align-top transition hover:bg-slate-50"
                      >
                        <td className="px-4 py-4">
                          <StaffIdentity staff={staff} />
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1 text-slate-600">
                            <p className="flex items-center gap-2 break-all">
                              <Mail size={14} />
                              {staff.user.email}
                            </p>
                            <p className="flex items-center gap-2">
                              <Phone size={14} />
                              {staff.user.phone}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          <p className="break-words font-medium text-slate-800">
                            {staff.position}
                          </p>
                          <p className="mt-1 break-words text-xs">
                            {staff.department}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-xs">
                            <CalendarDays size={13} />
                            {formatDate(staff.hireDate)}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          <p className="flex items-center gap-1 font-medium text-slate-800">
                            <BadgeDollarSign size={15} />
                            KES {staff.salary.toLocaleString()}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <StaffStatus staff={staff} />
                        </td>
                        <td className="px-4 py-4">
                          <StaffActions
                            viewHref={`/admin/user/${staff.id}`}
                            editHref={`/admin/user/${staff.id}/edit`}
                            onDelete={() => setDeleteTarget(staff)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
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
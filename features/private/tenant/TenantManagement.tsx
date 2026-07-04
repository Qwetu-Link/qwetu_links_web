"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Plus,
  Search,
  ShieldCheck,
  UserRound,
  Users2,
} from "lucide-react";
import { useDebounce } from "use-debounce";
import DeleteModal from "@/components/common/DeleteModal";
import Pagination from "@/components/common/Pagination";
import { useDelTenants, useGetTenants } from "@/hooks/useTenant";
import StatCard from "./StatCard";
import TenantCard from "./TenantCard";
import { Tenant } from "@/types/tenant.definations";

export default function TenantManagement() {
  const pathname = usePathname();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Debounce search
  const [debouncedSearch] = useDebounce(search, 300);
  const { data: tenantsData } = useGetTenants(page, debouncedSearch);
  const deleteTenant = useDelTenants();
  const tenants: Tenant[] = tenantsData?.data ?? [];
  const [deleteTarget, setDeleteTarget] = useState<Tenant | null>(null);
  const activeCount = tenants.filter((tenant) => tenant.isActive).length;
  const isSearching = search.trim().length > 0;

  function confirmDelete() {
    if (!deleteTarget) return;

    deleteTenant.mutate({
      id: deleteTarget.id,
      avatarPath: deleteTarget.user.avatarPath,
    });

    setDeleteTarget(null);
  }

  return (
    <div className="min-h-full overflow-x-hidden bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold text-blue-600">
              <Users2 size={28} />
              Tenants
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage tenant profiles, emergency contacts, next of kin, and
              account status.
            </p>
          </div>

          <Link
            href={`${pathname}/new`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            <Plus size={16} />
            Add Tenant
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard
            label="Total tenants"
            value={tenantsData?.meta.total ?? 0}
            icon={Users2}
          />

          <StatCard
            label="Active"
            value={activeCount}
            icon={ShieldCheck}
          />

          <StatCard
            label="Inactive"
            value={Math.max(0, tenants.length - activeCount)}
            icon={UserRound}
          />
        </div>

        {/* Search */}
        <div className="rounded-xl border border-orange-100 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              disabled
              placeholder="Search tenants..."
              className="h-11 w-full rounded-lg border border-orange-100 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Results */}
        {tenants.length > 0 ? (
            <div className="grid gap-3">
              {tenants.map((tenant) => (
                <TenantCard
                  key={tenant.id}
                  tenant={tenant}
                  pathname={pathname}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
        ) : (
          <div className="rounded-xl border border-dashed border-orange-100 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
              <Search
                size={30}
                className="text-orange-500"
              />
            </div>

            {isSearching ? (
              <>
                <h2 className="mt-5 text-xl font-semibold text-slate-800">
                  No tenants found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  We couldnt find any tenants matching{" "}
                  <span className="font-semibold text-slate-700">
                    `{search}``
                  </span>
                  .
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setPage(1);
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Clear Search
                  </button>

                  <Link
                    href={`${pathname}/new`}
                    className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    <Plus size={16} />
                    Add Tenant
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="mt-5 text-xl font-semibold text-slate-800">
                  No tenants yet
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  You havent added any tenants yet. Create your first tenant to
                  start managing rentals.
                </p>

                <Link
                  href={`${pathname}/new`}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  <Plus size={16} />
                  Add Tenant
                </Link>
              </>
            )}
          </div>
        )}

        {/* Pagination */}
        {tenantsData && tenants.length > 0 && (
          <Pagination
            currentPage={tenantsData.meta.current_page}
            totalItems={tenantsData.meta.total}
            total={tenantsData.meta.total}
            perPage={tenantsData.meta.per_page}
            onPage={setPage}
          />
        )}
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          title="Delete Tenant"
          name={deleteTarget.user.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
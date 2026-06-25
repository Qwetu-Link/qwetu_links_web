"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Search, ShieldCheck, UserRound, Users2 } from "lucide-react";
import DeleteModal from "@/components/deletemodal/DeleteModal";
import { useDelTenants, useGetTenants } from "../tenant.services";
import { Tenant } from "./types";
import StatCard from "./StatCard";
import TenantCard from "./TenantCard";
import TenantTable from "./TenantTable";

export default function TenantManagement() {
  const pathname = usePathname();

  const { data: tenantsData } = useGetTenants();
  const deleteTenant = useDelTenants();

  const tenants: Tenant[] = tenantsData.data;
  const [query, setQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Tenant | null>(null);

  const filteredTenants = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return tenants;

    return tenants.filter((tenant) =>
      [
        tenant.user.name,
        tenant.user.username,
        tenant.user.email,
        tenant.user.phone,
        tenant.user.idNumber,
      ].some((value) => value?.toLowerCase().includes(search)),
    );
  }, [query, tenants]);

  const activeCount = tenants.filter((t) => t.isActive).length;

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteTenant.mutate(
      { id: deleteTarget.id, avatarPath: deleteTarget.user.avatarPath }
    );
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-full overflow-x-hidden bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-7xl space-y-5 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-blue-600 sm:text-3xl">
              <Users2 size={26} />
              Tenants
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-500">
              Manage tenant profiles, kin details, emergency contacts, and account status.
            </p>
          </div>
          <Link
            href={`${pathname}/new`}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
          >
            <Plus size={16} />
            Add Tenant
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-3 sm:grid-cols-3 lg:gap-4">
          <StatCard label="Total tenants" value={tenants.length} icon={Users2} />
          <StatCard label="Active" value={activeCount} icon={ShieldCheck} />
          <StatCard label="Inactive" value={tenants.length - activeCount} icon={UserRound} />
        </div>

        {/* Search */}
        <div className="rounded-lg border border-orange-100 bg-white p-3 shadow-sm sm:p-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tenants..."
              className="h-10 w-full rounded-lg border border-orange-100 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:placeholder:text-sm"
            />
          </div>
        </div>

        {/* Mobile cards */}
        <div className="grid gap-3 xl:hidden">
          {filteredTenants.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              pathname={pathname}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>

        {/* Desktop table */}
        <TenantTable
          tenants={filteredTenants}
          pathname={pathname}
          onDelete={setDeleteTarget}
        />

        {/* Empty state */}
        {filteredTenants.length === 0 && (
          <div className="rounded-lg border border-orange-100 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-800">No tenants found</p>
            <p className="mt-1 text-sm text-slate-500">
              Try another search or add a new tenant.
            </p>
          </div>
        )}
      </div>

      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.user.name}
          title="Delete Tenant"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

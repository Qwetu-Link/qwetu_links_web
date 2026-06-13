"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import CatalogStatsCards from "./CatalogStatsCards";
import PropertyCard from "./PropertyCard";
import { Building2, Package, Plus, Search } from "lucide-react";
import { Property, PropertyFilters, PropertyStatus } from "../definations";
import DeleteModal from "@/components/deletemodal/DeleteModal";
import { useDelProperty, useGetProperties } from "../property.services";
import Pagination from "@/app/lib/Pagination";
import { toast } from "sonner";

const STATUSES: PropertyStatus[] = [
  "available",
  "occupied",
  "reserved",
  "maintenance",
];

export default function PropertyCatalog() {
  // const [properties, setProperties] = useState<Property[]>(seededProperties);
  //get property
  const { data: properties } = useGetProperties();
  console.log("properties", properties);

  const delProperty = useDelProperty();

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [filters, setFilters] = useState<PropertyFilters>({
    search: "",
    status: "all",
  });

  const filtered: Property[] = useMemo(() => {
    let list: Property[] = properties?.data ?? [];
    const s = filters.search.trim().toLowerCase();

    if (s) {
      list = list.filter(
        (property) =>
          property.name.toLowerCase().includes(s) ||
          property.status.toLowerCase().includes(s) ||
          property.apartmentType.toLowerCase().includes(s) ||
          property.address.toLowerCase().includes(s) ||
          property.location.toLowerCase().includes(s),
      );
    }
    if (filters.status !== "all") {
      list = list.filter((property) => property.status === filters.status);
    }
    return list;
  }, [properties, filters]);

  const handleFilterChange = useCallback(
    (partial: Partial<PropertyFilters>) => {
      setFilters((f) => ({ ...f, ...partial }));
      // setCurrentPage(1);
    },
    [],
  );

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    delProperty.mutate(
      { id: deleteTarget.id },
      {
        onSuccess: () => {
          toast.success(`"${deleteTarget.name}" deleted successfully`);
        },
        onError: () => {
          toast.error("Failed to delete Property. Please try again.");
        },
      },
    );
    // setProperties((prev) => prev.filter((p) => p.slug !== deleteTarget.slug));
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
      {/* ---- Header ---- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2">
            <Building2 size={24} className="text-blue-600" /> Properties
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your property portfolio, occupancy, and units
          </p>
        </div>
        <Link
          href="/admin/property/new"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
        >
          <Plus size={16} />
          Add Property
        </Link>
      </div>

      <CatalogStatsCards />

      {/* ---- Search & Filter ---- */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
              placeholder="Search by property name, status, type, or location..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-black"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) =>
              handleFilterChange({
                status: e.target.value as PropertyFilters["status"],
              })
            }
            className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white outline-none text-black"
          >
            <option value="all">All Statuses</option>
            {STATUSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---- Properties Grid ---- */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 bg-white rounded-xl border">
          <p className="text-5xl mb-3">
            <Package size={48} className="mx-auto text-gray-300" />
          </p>
          <p className="text-lg font-medium text-gray-500">
            No properties found
          </p>
          <p className="text-sm mt-1">
            {filters.search || filters.status !== "all"
              ? "Try adjusting your filters"
              : "No properties have been added yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((property) => (
            <PropertyCard
              key={property.slug}
              property={property}
              onDelete={(id, name) => setDeleteTarget({ id, name })}
            />
          ))}
        </div>
      )}

      {/* ---- Pagination ---- */}
      {properties && properties.data.length > 0 && (
        <Pagination
          currentPage={properties.meta.current_page}
          totalItems={properties.meta.total}
          perPage={properties.meta.per_page}
        />
      )}

      {/* ---- Delete Modal ---- */}
      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          title="Delete Property"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

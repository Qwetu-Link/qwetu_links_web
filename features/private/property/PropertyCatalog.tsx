"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDebounce } from "use-debounce";
import {
  Building2,
  Package,
  Plus,
  Search,
} from "lucide-react";

import PropertyCard from "./PropertyCard";
import DeleteModal from "@/components/common/DeleteModal";
import Pagination from "@/components/common/Pagination";

import {
  useDelProperty,
  useGetProperties,
} from "@/hooks/useProperty";

import {
  Property,
  PropertyFilters,
} from "@/types/property.definations";

import { toast } from "sonner";
import { PropertyStatus } from "@/utils/selectConstants";

const STATUSES: PropertyStatus[] = [
  "available",
  "occupied",
  "reserved",
  "maintenance",
];

export default function PropertyCatalog() {
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState<PropertyFilters>({
    search: "",
    status: "all",
  });

  // Wait 500ms before searching
  const [debouncedSearch] = useDebounce(filters.search, 500);

  // Fetch from Laravel
  const { data: properties, isLoading } = useGetProperties(
    page,
    debouncedSearch
  );

  const delProperty = useDelProperty();

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Status filtering (client-side)
  const propertyList =
    filters.status === "all"
      ? properties?.data ?? []
      : (properties?.data ?? []).filter(
        (property) => property.status === filters.status
      );

  const handleFilterChange = useCallback(
    (partial: Partial<PropertyFilters>) => {
      setFilters((prev) => ({
        ...prev,
        ...partial,
      }));

      setPage(1);
    },
    []
  );

  function handleDeleteConfirm() {
    if (!deleteTarget) return;

    delProperty.mutate(
      {
        id: deleteTarget.id,
      },
      {
        onSuccess: () => {
          toast.success(
            `"${deleteTarget.name}" deleted successfully`
          );
        },
        onError: () => {
          toast.error(
            "Failed to delete property. Please try again."
          );
        },
      }
    );

    setDeleteTarget(null);
  }

  return (
    <div className="space-y-6 rounded-xl bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-blue-600">
            <Building2 size={24} />
            Properties
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your property portfolio,
            occupancy, and units.
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

      {/* Search + Filter */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </span>

            <input
              type="text"
              value={filters.search}
              placeholder="Search property..."
              onChange={(e) =>
                handleFilterChange({
                  search: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-black outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) =>
              handleFilterChange({
                status:
                  e.target.value as PropertyFilters["status"],
              })
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-black outline-none"
          >
            <option value="all">
              All Statuses
            </option>

            {STATUSES.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="py-10 text-center">
          Loading properties...
        </div>
      )}

      {/* Empty */}
      {!isLoading && propertyList.length === 0 && (
        <div className="rounded-xl border bg-white py-16 text-center text-gray-400">
          <Package
            size={48}
            className="mx-auto mb-3 text-gray-300"
          />

          <p className="text-lg font-medium text-gray-500">
            No properties found
          </p>

          <p className="mt-1 text-sm">
            Try changing your search.
          </p>
        </div>
      )}

      {/* Grid */}
      {!isLoading && propertyList.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {propertyList.map((property: Property) => (
            <PropertyCard
              key={property.slug}
              property={property}
              onDelete={(id, name) =>
                setDeleteTarget({
                  id,
                  name,
                })
              }
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {properties && (
        <Pagination
          currentPage={properties.meta.current_page}
          totalItems={properties.meta.total}
          total={properties.meta.total}
          perPage={properties.meta.per_page}
          onPage={setPage}
        />
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          title="Delete Property"
          name={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() =>
            setDeleteTarget(null)
          }
        />
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { Building2, PackageSearch, Plus, Search } from "lucide-react";
import AmenityCard from "./AmenityCard";
import AmenityModal from "./AmenityModal";
import { AmenityFormValues, Amenity } from "@/types/amenity.definations";
import DeleteModal from "@/components/common/DeleteModal";
import {
  useAmenityDel,
  useCreateAmenity,
  useGetAmenities,
  useUpdateAmenity,
} from "@/hooks/useAmenities";
import { toast } from "sonner";
import Pagination from "@/components/common/Pagination";
import { AmenityPageSkeleton } from "@/components/skeletons/amenities";
import { useDebounce } from "use-debounce";

export default function PropertyAmenities() {
  // get amenities
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("")

  // Wait 500ms before searching
  const [debouncedSearch] = useDebounce(search, 500);

  const { data: amenities, isLoading } = useGetAmenities(page, debouncedSearch);


  //create and update amenity
  const createAmenity = useCreateAmenity();
  const updateAmenity = useUpdateAmenity();

  //delete amenity
  const deleteAmenity = useAmenityDel();
  const [editTarget, setEditTarget] = useState<Amenity | null | "new">(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const isSearching = search.trim().length > 0;

  async function handleSave(data: AmenityFormValues, existingId?: string) {
    try {
      if (existingId) {
        await updateAmenity.mutateAsync(
          {
            id: existingId,
            data,
          },
          {
            onSuccess: () => {
              toast.success(`"${data.name}" updated successfully`);
              setEditTarget(null);
            },
          },
        );
      } else {
        await createAmenity.mutateAsync(data, {
          onSuccess: () => {
            toast.success(`"${data.name}" added to amenities`);
            setEditTarget(null);
          },
        });
      }
    } catch (error) {
      toast.error(
        existingId
          ? "Failed to update amenity. Please try again."
          : "Failed to add amenity. Please try again.",
      );
      throw error;
    }
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    deleteAmenity.mutate(
      { id: deleteTarget.id },
      {
        onSuccess: () => {
          toast.success(`"${deleteTarget.name}" deleted successfully`);
        },
        onError: () => {
          toast.error("Failed to delete amenity. Please try again.");
        },
      },
    );
    // setAmenities((prev) => deleteAmenity(prev, deleteTarget.id));
    setDeleteTarget(null);
  }

  const handlePerPage = () => {
    setPage(1); // reset to page 1 whenever page size changes
  };


  return (
    <div className="space-y-6 rounded-xl bg-gray-50 p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
            <Building2 size={32} className="text-blue-600" /> Amenities
          </h1>
          <p className="mt-1 text-gray-500">
            Manage property amenities, icons, and short descriptions.
          </p>
        </div>
        <button
          onClick={() => setEditTarget("new")}
          className="flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 px-5 py-2.5 font-medium text-white transition hover:shadow-lg sm:self-auto"
        >
          <Plus /> Add Amenity
        </button>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search amenities by name or description..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-black outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {isLoading ? (
        <AmenityPageSkeleton />
      ) : amenities?.data.length ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {amenities.data.map((amenity: Amenity) => (
            <AmenityCard
              key={amenity.id}
              amenity={amenity}
              onEdit={(item) => setEditTarget(item)}
              onDelete={(id, name) => setDeleteTarget({ id, name })}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-500">
            <PackageSearch size={28} />
          </div>

          {isSearching ? (
            <>
              <h3 className="text-lg font-semibold text-gray-700">
                No amenities match `{search}`
              </h3>

              <p className="max-w-sm text-sm text-gray-500">
                Try a different search term.
              </p>

              <button
                onClick={() => setSearch("")}
                className="mt-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Clear Search
              </button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-700">
                No amenities yet
              </h3>

              <p className="max-w-sm text-sm text-gray-500">
                Add your first amenity.
              </p>

              <button
                onClick={() => setEditTarget("new")}
                className="mt-1 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 px-5 py-2.5 text-sm font-medium text-white"
              >
                <Plus size={16} />
                Add Amenity
              </button>
            </>
          )}
        </div>
      )}

      {amenities && amenities.data.length > 0 && (
        <Pagination
          currentPage={amenities.meta.current_page}
          totalPages={amenities.meta.last_page}
          total={amenities.meta.total}
          perPage={amenities.meta.per_page}
          onPage={setPage}
          onPerPage={handlePerPage}
        />
      )}

      {editTarget !== null && (
        <AmenityModal
          amenity={editTarget === "new" ? null : editTarget}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          title="Delete Amenity"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

"use client";

import { ArrowLeft, Building2, Coins, HomeIcon, Plus, Search, Wallet } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import DeleteModal from "@/components/common/DeleteModal";
import { Property } from "@/types/property.definations";
import Link from "next/link";
import UtilityCard from "./UtilityCard";
import { useDeleteUtility } from "@/hooks/useUtility";
import { PER_PAGE } from "../unit/UnitListing";
import Pagination from "@/components/common/Pagination";

interface Props {
    property: Property;
    onBack: () => void;
}

export default function UtilityListing({ property, onBack }: Props) {
    const [utility, setUtility] = useState(property?.utility ?? []);
    const { mutate: deleteUnit } = useDeleteUtility();

    const [deleteTarget, setDeleteTarget] = useState<{
        id: string;
        name: string;
    } | null>(null);

    const handleDeleteConfirm = useCallback(() => {
        if (!deleteTarget) return;
        deleteUnit(
            { id: deleteTarget.id },
            {
                onSuccess: () => {
                    setUtility((prev) =>
                        prev.filter((unit) => unit.id !== deleteTarget.id),
                    );
                    setDeleteTarget(null);
                },
            },
        );
    }, [deleteTarget, deleteUnit]);

    // Search and Pagination
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const filteredUtilities = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return utility;

        return utility.filter((item) =>
            [
                item.utilityName,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase()
                .includes(query)
        );
    }, [utility, search]);

    const totalItems = filteredUtilities.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / PER_PAGE));
    const currentPage = Math.min(page, totalPages);

    const paginatedUtitlities = useMemo(() => {
        const start = (currentPage - 1) * PER_PAGE;
        return filteredUtilities.slice(start, start + PER_PAGE);
    }, [filteredUtilities, currentPage]);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1); // reset to page 1 whenever the search changes
    };
    return (
        <div className="custom-scrollbar flex h-full min-h-0 flex-1 flex-col overflow-y-auto bg-white">
            <div className="shrink-0 bg-white">
                <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 md:hidden"
                        aria-label="Back to properties"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{property.name}</h2>
                        <p className="text-sm text-gray-500">{property.location}</p>
                    </div>
                </div>

                <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                        <HomeIcon className="mb-3 text-blue-600" size={22} />
                        <p className="text-2xl font-bold text-gray-900">{utility.length}</p>
                        <p className="text-sm text-gray-500">Total utilities</p>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                        <Wallet className="mb-3 text-blue-600" size={22} />
                        <p className="text-2xl font-bold text-gray-900">{property.depositAmount}</p>
                        <p className="text-sm text-gray-500">Rent Deposit</p>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                        <Coins className="mb-3 text-blue-600" size={22} />
                        <p className="text-2xl font-bold text-gray-900">{property.rentAmount}</p>
                        <p className="text-sm text-gray-500">Total RentAmount</p>
                    </div>
                </div>
            </div>

            <div className="px-4 mb-4 shrink-0 flex items-center gap-3">
                <div className="relative flex-1">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search Utility Here..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-blue-200 rounded-xl text-sm text-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
            </div>

            <div className="bg-gray-50 font-sans">
                <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Property Utilities</h1>
                        <p className="text-sm text-gray-500">
                            Manage utility assigned to {property.name}
                        </p>
                    </div>
                    <Link
                        // href="/admin/unit/create"
                        href={`/admin/utilities/new/${property.id}`}
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        <Plus size={16} />
                        Add Utility
                    </Link>
                </div>

                <div className="mb-5 border-b border-gray-100 px-5 py-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {paginatedUtitlities.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
                                <Building2
                                    className="mb-3 text-gray-300"
                                    size={40}
                                />

                                <p className="text-sm font-medium text-gray-500">
                                    {utility.length === 0
                                        ? "No utilities found"
                                        : "No matching utilities"}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    {utility.length === 0
                                        ? "Add a utility to get started with this property."
                                        : "Try a different search term."}
                                </p>

                                {utility.length === 0 && (
                                    <Link
                                        href={`/admin/utilities/new/${property.id}`}
                                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        <Plus size={15} />
                                        Add Utility
                                    </Link>
                                )}
                            </div>
                        ) : (
                            paginatedUtitlities.map((item) => (
                                <UtilityCard
                                    key={item.id}
                                    utility={item}
                                    onDelete={(id, name) =>
                                        setDeleteTarget({
                                            id,
                                            name,
                                        })
                                    }
                                />
                            ))
                        )}
                    </div>
                </div>

                {totalItems > 0 && (
                    <div className="px-5 pb-5">
                        <Pagination
                            currentPage={currentPage}
                            totalItems={totalItems}
                            total={totalItems}
                            perPage={PER_PAGE}
                            onPage={setPage}
                        />
                    </div>
                )}
            </div>

            {deleteTarget && (
                <DeleteModal
                    title="Delete Unit"
                    name={deleteTarget.name}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
}

"use client";

import { ArrowLeft, Building2, Coins, HomeIcon, Plus, Wallet } from "lucide-react";
import { useCallback, useState } from "react";
import DeleteModal from "@/components/custom/DeleteModal";
import { Property } from "@/types/property.definations";
import Link from "next/link";
import UtilityCard from "./UtilityCard";
import { useDeleteUtility } from "@/hooks/useUtility";

interface Props {
    property: Property;
    onBack: () => void;
}

export default function UtilityListing({ property, onBack }: Props) {
    const [utility, setUtility] = useState(property?.utility ?? []);
    const { mutate: deleteUnit } = useDeleteUtility();

    console.log("Available utility", utility);
    console.log("Propert Business Id", property.business.id);
    console.log("Propert Business Id", property);

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

                <div className="gap-3 border-b border-gray-100 px-5 py-4 mb-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
                        {utility.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
                                <Building2 className="mb-3 text-gray-300" size={40} />
                                <p className="text-sm font-medium text-gray-500">
                                    No utility found
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    Add a utility to get started with this property.
                                </p>
                                <Link
                                    href={`/admin/utilities/new/${property.id}`}
                                    type="button"
                                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    <Plus size={15} />
                                    Add Utility
                                </Link>
                            </div>
                        ) : (
                            utility.map((data) => (
                                <UtilityCard
                                    key={data.id}
                                    utility={data}
                                    onDelete={(id, name) => setDeleteTarget({ id, name })}
                                />
                            ))
                        )}
                    </div>
                </div>
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

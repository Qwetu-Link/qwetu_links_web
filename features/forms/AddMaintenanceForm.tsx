"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useCreateMaintenances, useGetPropertyMaintenance } from "@/hooks/useMaintenance";
import { addMaintenanceFormSchema, AddMaintenanceFormValues } from "@/schemas/maintenance.zod";
import { MAINTENANCE_CATEGORIES, maintenancePriorityValues, maintenanceStatusValues } from "../../types/maintenance.definitions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fieldClass } from "@/components/custom/FormFields";
import { handleFormErrors } from "@/utils/errors";

interface MaintenanceFormProps {
    basePath: string;
}

export default function MaintenanceForm({ basePath }: MaintenanceFormProps) {
    const router = useRouter();
    const { data: unitsResponse, isLoading: isLoadingUnits } = useGetPropertyMaintenance();
    const createMaintenance = useCreateMaintenances();

    // Fix: Moved rawUnitsArray calculation inside useMemo to keep dependency references stable
    const uniqueUnitsArray = useMemo(() => {
        const rawUnitsArray = Array.isArray(unitsResponse)
            ? unitsResponse
            : unitsResponse?.data || [];

        return Array.from(
            new Map(
                rawUnitsArray
                    .filter((item) => item?.unit?.id)
                    .map((item) => [item.unit.id, item])
            ).values()
        );
    }, [unitsResponse]); // Now depends safely on unitsResponse from React Query

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<AddMaintenanceFormValues>({
        resolver: zodResolver(addMaintenanceFormSchema),
        defaultValues: {
            unitID: "",
            title: "",
            issue: "",
            notes: "",
        },
    });

    const onSubmit = (data: AddMaintenanceFormValues) => {
        createMaintenance.mutate(data, {
            onSuccess: () => {
                toast.success("Maintenance created successfully");
                router.push(basePath);
            }, onError: (error) => {
                // Pushes field-level errors onto the matching inputs,
                // and a general message onto `errors.root`
                handleFormErrors<AddMaintenanceFormValues>(error, setError);
            }
        });

        // setRemovedImagePaths(new Set());
        toast.success("Property updated successfully");
    };

    return (
        <div className="custom-scrollbar h-full overflow-y-auto bg-slate-50 p-4 text-slate-950 sm:p-6">
            <div className="mx-auto flex max-w-3xl flex-col gap-5">
                <header className="flex flex-col gap-3">
                    <Link
                        href={basePath}
                        className="inline-flex h-9 w-fit items-center gap-2 rounded-lg border border-orange-100 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-orange-50"
                    >
                        <ArrowLeft size={16} />
                        Back to requests
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                            New Maintenance Request
                        </h1>
                    </div>
                </header>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-5 mx-auto"
                >

                    {/* Errors */}
                    {errors.root?.message && (
                        <div
                            className={`mt-4 flex items-start gap-2 rounded-md border px-4 py-3 ${errors.root.type === "network"
                                ? "border-amber-200 bg-amber-50"
                                : "border-red-200 bg-red-50"
                                }`}
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <AlertCircle
                                className={`mt-0.5 h-4 w-4 shrink-0 ${errors.root.type === "network" ? "text-amber-500" : "text-red-500"
                                    }`}
                            />
                            <p
                                className={`text-sm ${errors.root.type === "network" ? "text-amber-700" : "text-red-600"
                                    }`}
                            >
                                {errors.root.message}
                            </p>
                        </div>
                    )}
                    {/* Title */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Title</label>
                        <input
                            {...register("title")}
                            type="text"
                            className="w-full rounded-md border border-slate-200 p-2 text-sm focus:outline-orange-500"
                            placeholder="e.g., Leaking kitchen sink pipe"
                        />
                        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
                    </div>

                    {/* Category & Priority Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Category</label>
                            <select {...register("category")} className={fieldClass}>
                                <option value="">Select Category</option>
                                {Object.entries(MAINTENANCE_CATEGORIES).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Priority</label>
                            <select
                                {...register("priority")}
                                className="w-full rounded-md border border-slate-200 p-2 text-sm bg-white focus:outline-orange-500"
                            >
                                <option value="">Select Priority</option>
                                {maintenancePriorityValues.map((prio) => (
                                    <option key={prio} value={prio} className="capitalize">{prio}</option>
                                ))}
                            </select>
                            {errors.priority && <p className="mt-1 text-xs text-red-500">{errors.priority.message}</p>}
                        </div>
                    </div>

                    {/* Issue Details */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Issue Details</label>
                        <textarea
                            {...register("issue")}
                            rows={4}
                            className="w-full rounded-md border border-slate-200 p-2 text-sm focus:outline-orange-500 resize-y min-h-[90px]"
                            placeholder="Describe the problem..."
                        />
                        {errors.issue && <p className="mt-1 text-xs text-red-500">{errors.issue.message}</p>}
                    </div>

                    {/* Status & Unit Selection */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Status</label>
                            <select
                                {...register("status")}
                                className="w-full rounded-md border border-slate-200 p-2 text-sm bg-white focus:outline-orange-500"
                            >
                                {maintenanceStatusValues.map((stat) => (
                                    <option key={stat} value={stat}>{stat.replace("_", " ")}</option>
                                ))}
                            </select>
                            {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>}
                        </div>

                        {/* Unit Affected */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Unit Affected</label>
                            <select
                                {...register("unitID")}
                                disabled={isLoadingUnits}
                                className="w-full rounded-md border border-slate-200 p-2 text-sm bg-white focus:outline-orange-500 disabled:opacity-60"
                            >
                                <option value="">
                                    {isLoadingUnits ? "Loading available units..." : "Select Unit"}
                                </option>
                                {uniqueUnitsArray.map((unit) => (
                                    <option key={unit.unit.id} value={unit.unit.id}>
                                        {unit.unit.unitNumber}
                                    </option>
                                ))}
                            </select>
                            {errors.unitID && <p className="mt-1 text-xs text-red-500">{errors.unitID.message}</p>}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Notes (Optional)</label>
                        <textarea
                            {...register("notes")}
                            rows={3}
                            className="w-full rounded-md border border-slate-200 p-2 text-sm focus:outline-orange-500 resize-y min-h-[70px]"
                            placeholder="Additional technician notes..."
                        />
                        {errors.notes && <p className="mt-1 text-xs text-red-500">{errors.notes.message}</p>}
                    </div>

                    {/* Submit Action Block */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-10 rounded-md bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Saving..." : "Submit Maintenance"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
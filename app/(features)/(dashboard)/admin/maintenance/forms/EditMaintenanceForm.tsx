"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft} from "lucide-react";
import { fieldClass } from "../utils";
import { editMaintenanceFormSchema, EditMaintenanceFormValues } from "../maintenance.zod";
import { MAINTENANCE_CATEGORIES, maintenancePriorityValues, MaintenanceRequest, maintenanceStatusValues } from "../definitions";
import Link from "next/link";
import { useUpdateMaintenance } from "../maintenance.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type MaintenanceFormProps = {
    basePath: string;
    maintenance: MaintenanceRequest;
};

export default function EditMaintenanceForm({
    basePath,
    maintenance
}: MaintenanceFormProps) {
    const router = useRouter();
    const updateMaintenance = useUpdateMaintenance();

    // 1. Map initial props directly into defaultValues to remove the need for useEffect tracking
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EditMaintenanceFormValues>({
        resolver: zodResolver(editMaintenanceFormSchema),
        defaultValues: {
            id: maintenance.id,
            unitID: maintenance.unitID || "",
            tenantID: maintenance.tenantID || "",
            assignedTo: maintenance.assignedTo || "",
            category: maintenance.category || "plumbing",
            title: maintenance.title || "",
            issue: maintenance.issue || "",
            priority: maintenance.priority || "medium",
            status: maintenance.status || "pending",
            cost: maintenance.cost || 0.00,
            notes: maintenance.notes || "",
            version: maintenance.version,
        } as EditMaintenanceFormValues,
    });

    // 2. Handle Form Submission
    const onSubmit = async (data: EditMaintenanceFormValues) => {
        updateMaintenance.mutate(
            { id: maintenance.id, data },
            {
                onSuccess: () => {
                    toast.success("Maintenance updated successfully");
                    router.push(basePath);
                },
                onError: () => {
                    toast.error("Failed to update Maintenance. Please try again.");
                },
            },
        );
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
                            Edit Maintenance Request
                        </h1>
                    </div>
                </header>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">

                    {/* Category Selection */}
                    <div className="flex flex-col space-y-1.5">
                        <span className="text-sm font-semibold text-slate-700">Category</span>
                        <select {...register("category")} className={fieldClass}>
                            <option value="">Select Category</option>
                            {Object.entries(MAINTENANCE_CATEGORIES).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                    </div>

                    {/* Title */}
                    <div className="flex flex-col space-y-1.5">
                        <span className="text-sm font-semibold text-slate-700">Title</span>
                        <input {...register("title")} className={fieldClass} />
                        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                    </div>

                    {/* Issue Text Box */}
                    <div className="flex flex-col space-y-1.5">
                        <span className="text-sm font-semibold text-slate-700">Issue</span>
                        <textarea
                            {...register("issue")}
                            className={`${fieldClass} min-h-24 resize-y`}
                        />
                        {errors.issue && <p className="text-xs text-red-500">{errors.issue.message}</p>}
                    </div>

                    {/* Priority & Status Controls */}
                    <div className="grid gap-4 sm:grid-cols-2">
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

                        <div className="flex flex-col space-y-1.5">
                            <span className="text-sm font-semibold text-slate-700">Status</span>
                            <select
                                {...register("status")}
                                className="w-full rounded-md border border-slate-200 p-2 text-sm bg-white focus:outline-orange-500"
                            >
                                {maintenanceStatusValues.map((stat) => (
                                    <option key={stat} value={stat}>{stat.replace("_", " ")}</option>
                                ))}
                            </select>
                            {errors.status && <p className="text-xs text-red-500">{errors.status.message}</p>}
                        </div>
                    </div>

                    {/* Cost Estimation */}
                    <div className="flex flex-col space-y-1.5">
                        <span className="text-sm font-semibold text-slate-700">Cost</span>
                        <input
                            {...register("cost", { valueAsNumber: true })}
                            className={fieldClass}
                            min="0"
                            step="0.01"
                            type="number"
                        />
                        {errors.cost && <p className="text-xs text-red-500">{errors.cost.message}</p>}
                    </div>

                    {/* Notes (Optional) */}
                    <div className="flex flex-col space-y-1.5">
                        <span className="text-sm font-semibold text-slate-700">Notes</span>
                        <textarea
                            {...register("notes")}
                            className={`${fieldClass} min-h-24 resize-y`}
                        />
                        {errors.notes && <p className="text-xs text-red-500">{errors.notes.message}</p>}
                    </div>

                    {/* Action Controls */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-10 rounded-md bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Saving changes..." : "Save Maintenance Request"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
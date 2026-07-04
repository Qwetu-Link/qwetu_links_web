"use client";

import { useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Check, Search, X } from "lucide-react";
import { useCreateMaintenances } from "@/hooks/useMaintenance";
import { addMaintenanceFormSchema, AddMaintenanceFormValues } from "@/schemas/maintenance.zod";
import { MAINTENANCE_CATEGORIES, maintenancePriorityValues, maintenanceStatusValues } from "../../types/maintenance.definitions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fieldClass } from "@/components/custom/FormFields";
import { handleFormErrors } from "@/utils/errors";
import { useGetProperties } from "@/hooks/useProperty";
import { useDebounce } from "use-debounce";

interface MaintenanceFormProps {
    basePath: string;
}

export default function MaintenanceForm({ basePath }: MaintenanceFormProps) {
    const router = useRouter();

    // Property search (server-side)
    const [propertyPage] = useState(1);
    const [propertySearch, setPropertySearch] = useState("");
    const [debouncedPropertySearch] = useDebounce(propertySearch, 400);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { data: propertyResponse, isFetching: isSearchingProperties } =
        useGetProperties(propertyPage, debouncedPropertySearch);

    const properties = useMemo(() => propertyResponse?.data ?? [], [propertyResponse]);

    const [selectedPropertyId, setSelectedPropertyId] = useState("");
    const [selectedPropertyLabel, setSelectedPropertyLabel] = useState("");

    const selectedProperty = useMemo(
        () => properties.find((p) => p.id === selectedPropertyId),
        [properties, selectedPropertyId],
    );

    const unitsForSelectedProperty = selectedProperty?.units ?? [];

    const createMaintenance = useCreateMaintenances();

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        control,
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

    const selectedUnitID = useWatch({ control, name: "unitID" });

    const handlePickProperty = (propertyId: string, label: string) => {
        setSelectedPropertyId(propertyId);
        setSelectedPropertyLabel(label);
        setPropertySearch("");
        setIsDropdownOpen(false);
        setValue("unitID", ""); // old unit no longer valid for new property
    };

    const handleClearProperty = () => {
        setSelectedPropertyId("");
        setSelectedPropertyLabel("");
        setPropertySearch("");
        setValue("unitID", "");
    };

    const onSubmit = (data: AddMaintenanceFormValues) => {
        createMaintenance.mutate(data, {
            onSuccess: () => {
                toast.success("Maintenance created successfully");
                router.push(basePath);
            },
            onError: (error) => {
                handleFormErrors<AddMaintenanceFormValues>(error, setError);
            },
        });
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
                            className={`mt-4 flex items-start gap-2 rounded-md border px-4 py-3 ${
                                errors.root.type === "network"
                                    ? "border-amber-200 bg-amber-50"
                                    : "border-red-200 bg-red-50"
                            }`}
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <AlertCircle
                                className={`mt-0.5 h-4 w-4 shrink-0 ${
                                    errors.root.type === "network" ? "text-amber-500" : "text-red-500"
                                }`}
                            />
                            <p
                                className={`text-sm ${
                                    errors.root.type === "network" ? "text-amber-700" : "text-red-600"
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

                    {/* Status */}
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

                    {/* Property search-select combobox (not submitted directly) */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Property</label>

                        {selectedPropertyId ? (
                            <div className="flex items-center justify-between rounded-md border border-orange-200 bg-orange-50 px-3 py-2">
                                <div className="flex items-center gap-2 text-sm text-slate-800">
                                    <Check size={15} className="text-orange-600 shrink-0" />
                                    <span className="font-medium">{selectedPropertyLabel}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleClearProperty}
                                    className="rounded-md p-1 text-slate-500 hover:bg-orange-100 hover:text-slate-700"
                                    title="Change property"
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        ) : (
                            <div ref={containerRef} className="relative">
                                <Search
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    value={propertySearch}
                                    onChange={(e) => {
                                        setPropertySearch(e.target.value);
                                        setIsDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsDropdownOpen(true)}
                                    onBlur={() => {
                                        // small delay so a click on a result registers before the list unmounts
                                        setTimeout(() => setIsDropdownOpen(false), 150);
                                    }}
                                    placeholder="Search properties by name or address..."
                                    className="h-10 w-full rounded-md border border-slate-200 pl-9 pr-3 text-sm focus:outline-orange-500"
                                />

                                {isDropdownOpen && propertySearch.trim().length > 0 && (
                                    <div className="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-slate-200 bg-white shadow-lg">
                                        {isSearchingProperties ? (
                                            <div className="px-3 py-2 text-sm text-slate-500">Searching...</div>
                                        ) : properties.length === 0 ? (
                                            <div className="px-3 py-2 text-sm text-slate-500">
                                                No properties match &quot;{propertySearch}&quot;
                                            </div>
                                        ) : (
                                            properties.map((property) => (
                                                <button
                                                    key={property.id}
                                                    type="button"
                                                    onMouseDown={(e) => e.preventDefault()} // keep input focus until click resolves
                                                    onClick={() =>
                                                        handlePickProperty(
                                                            property.id,
                                                            `${property.name} — ${property.address}`,
                                                        )
                                                    }
                                                    className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm hover:bg-orange-50"
                                                >
                                                    <span className="font-medium text-slate-800">{property.name}</span>
                                                    <span className="text-xs text-slate-500">{property.address}</span>
                                                </button>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Unit Affected — depends on selected property, this IS submitted */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Unit Affected</label>
                        <select
                            {...register("unitID")}
                            disabled={!selectedPropertyId}
                            className="w-full rounded-md border border-slate-200 p-2 text-sm bg-white focus:outline-orange-500 disabled:opacity-60"
                        >
                            <option value="">
                                {!selectedPropertyId
                                    ? "Select a property first"
                                    : unitsForSelectedProperty.length === 0
                                    ? "This property has no units"
                                    : "Select Unit"}
                            </option>
                            {unitsForSelectedProperty.map((unit) => (
                                <option key={unit.id} value={unit.id}>
                                    {unit.unitNumber}
                                    {unit.unitFloor ? ` (Floor ${unit.unitFloor})` : ""}
                                </option>
                            ))}
                        </select>
                        {errors.unitID && <p className="mt-1 text-xs text-red-500">{errors.unitID.message}</p>}
                        {selectedPropertyId && unitsForSelectedProperty.length === 0 && (
                            <p className="mt-1 text-xs text-amber-600">
                                No units are registered under this property yet.
                            </p>
                        )}
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
                            disabled={isSubmitting || !selectedUnitID}
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
"use client";

import { useContactBooking } from "@/hooks/useContact";
import { BookUnitFormValues, bookUnitSchema } from "@/schemas/contact.zod";
import { bookUnitFormDefaultValues } from "@/types/booking.definations";
import { handleFormErrors } from "@/utils/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BookUnitFormProps {
    propertyID: string;
    propertyName?: string;
}

export default function BookUnitForm({ propertyID, propertyName }: BookUnitFormProps) {

    const { mutate: contactBooking, isPending } = useContactBooking()
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<BookUnitFormValues>({
        defaultValues: {
            ...bookUnitFormDefaultValues,
            propertyID,
        },
        resolver: zodResolver(bookUnitSchema),
    });


    const onSubmit = async (data: BookUnitFormValues) => {
        try {
            await contactBooking(data, {

                onSuccess: () => {
                    toast.success("Viewing request submitted — we'll confirm shortly");
                    reset();
                    router.push("/property")
                },
                onError: (error) => {
                    handleFormErrors<BookUnitFormValues>(error, setError);
                }
            });
        } catch (error) {
            handleFormErrors(error, setError);
        }
    };

    // Minimum date: today
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="mb-8 flex gap-4">
                <div className="mt-1 w-1 flex-shrink-0 rounded-full bg-rental-primary" />
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-rental-primary">
                        Book a viewing
                    </p>
                    <h2 className="mt-1.5 text-3xl font-bold text-brand-dark sm:text-4xl">
                        {propertyName ? `Visit ${propertyName}` : "Schedule your visit"}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">
                        Pick a date that works for you and well confirm within 24 hours.
                    </p>
                </div>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 rounded-xl border border-rental-border bg-rental-bg-light p-6 sm:p-8"
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
                {/* Hidden property ID */}
                <input type="hidden" {...register("propertyID")} />

                {/* Row 1: Full name + Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                    {/* Full name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                            Full name
                        </label>
                        <input
                            type="text"
                            {...register("fullname")}
                            placeholder="Your name"
                            className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-brand-dark outline-none transition focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/10 ${errors.fullname ? "border-red-400" : "border-rental-border"
                                }`}
                        />
                        {errors.fullname && (
                            <p className="flex items-center gap-1 text-xs text-red-500">
                                <span className="inline-block h-1 w-1 rounded-full bg-red-500" />
                                {errors.fullname.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                            Email address
                        </label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="you@example.com"
                            className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-brand-dark outline-none transition focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/10 ${errors.email ? "border-red-400" : "border-rental-border"
                                }`}
                        />
                        {errors.email && (
                            <p className="flex items-center gap-1 text-xs text-red-500">
                                <span className="inline-block h-1 w-1 rounded-full bg-red-500" />
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Row 2: Phone + Preferred viewing date */}
                <div className="grid gap-4 sm:grid-cols-2">
                    {/* Phone */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                            Phone number
                        </label>
                        <input
                            type="tel"
                            {...register("phoneNumber")}
                            placeholder="+254 700 000 000"
                            className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-brand-dark outline-none transition focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/10 ${errors.phoneNumber ? "border-red-400" : "border-rental-border"
                                }`}
                        />
                        {errors.phoneNumber && (
                            <p className="flex items-center gap-1 text-xs text-red-500">
                                <span className="inline-block h-1 w-1 rounded-full bg-red-500" />
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </div>

                    {/* Preferred viewing date */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                            Preferred viewing date
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                min={today}
                                {...register("viewingDate")}
                                className={`h-11 w-full rounded-lg border bg-white px-4 pr-10 text-sm text-brand-dark outline-none transition focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/10 ${errors.viewingDate
                                    ? "border-red-400"
                                    : "border-rental-border"
                                    }`}
                            />
                            <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>
                        {errors.viewingDate && (
                            <p className="flex items-center gap-1 text-xs text-red-500">
                                <span className="inline-block h-1 w-1 rounded-full bg-red-500" />
                                {errors.viewingDate.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                        Additional notes{" "}
                        <span className="font-normal normal-case tracking-normal text-slate-400">
                            (optional)
                        </span>
                    </label>
                    <textarea
                        rows={4}
                        {...register("message")}
                        placeholder="Any specific requirements, preferred time of day, accessibility needs…"
                        className={`w-full resize-none rounded-lg border bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/10 ${errors.message ? "border-red-400" : "border-rental-border"
                            }`}
                    />
                    {errors.message && (
                        <p className="flex items-center gap-1 text-xs text-red-500">
                            <span className="inline-block h-1 w-1 rounded-full bg-red-500" />
                            {errors.message.message}
                        </p>
                    )}
                </div>

                {/* Root error */}
                {errors.root && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                        <p className="text-sm text-red-600">{errors.root.message}</p>
                    </div>
                )}

                {/* Submit */}
                <div className="pt-1">
                    <button
                        type="submit"
                        disabled={isSubmitting || isPending}
                        className="inline-flex items-center gap-2 rounded-lg bg-rental-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                        aria-disabled={isSubmitting}
                    >
                        <CalendarDays className="h-4 w-4" />
                        {isPending ? "Requesting…" : "Request viewing"}
                    </button>
                </div>
            </form>
        </div>
    );
}
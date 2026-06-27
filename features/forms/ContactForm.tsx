"use client";

import { useContactQwetu } from "@/hooks/useContact";
import { ContactFormValues, contactSchema } from "@/schemas/contact.zod";
import { contactFormDefaultValues, enquiryTypeOptions } from "@/types/contact.definations";
import { handleFormErrors } from "@/utils/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: contactFormDefaultValues,
    resolver: zodResolver(contactSchema),
  });

  const { mutate: contactQwetu, isPending } = useContactQwetu();

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await contactQwetu(data, {
        onSuccess: () => {
          toast.success(`${data.enquiryType} enquiry submitted successfully`);
          reset();
        },
        onError: () => {
          toast.error("Failed to submit the enquiry");
        },
      });
    } catch (error) {
      handleFormErrors(error, setError);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Header */}
      <div className="mb-8 flex gap-4">
        <div className="mt-1 w-1 flex-shrink-0 rounded-full bg-rental-primary" />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-rental-primary">
            Send a message
          </p>
          <h2 className="mt-1.5 text-3xl font-bold text-brand-dark sm:text-4xl">
            How can we help?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Share a few details and the right member of our team will follow up
            with practical next steps.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 rounded-xl border border-rental-border bg-rental-bg-light p-6 sm:p-8"
      >
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

        {/* Row 2: Phone + Enquiry type */}
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

          {/* Enquiry type */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
              Enquiry type
            </label>
            <select
              {...register("enquiryType")}
              className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-brand-dark outline-none transition focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/10 ${errors.enquiryType ? "border-red-400" : "border-rental-border"
                }`}
            >
              <option value="">Select enquiry type</option>
              {enquiryTypeOptions.map((et) => (
                <option key={et.value} value={et.value}>
                  {et.label}
                </option>
              ))}
            </select>
            {errors.enquiryType && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <span className="inline-block h-1 w-1 rounded-full bg-red-500" />
                {errors.enquiryType.message}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
            Message
          </label>
          <textarea
            rows={5}
            {...register("message")}
            placeholder="Tell us what you need help with..."
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
            <Send className="h-4 w-4" />
            {isPending ? "Sending…" : "Send message"}
          </button>
        </div>
      </form>
    </div>
  );
}
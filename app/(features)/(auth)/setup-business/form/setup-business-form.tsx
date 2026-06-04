"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/app/lib/zod";
import { AlertCircle, Building2, Phone, User } from "lucide-react";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { AxiosError } from "axios";
import { useRegister } from "../../auth.services";

type ApiErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

export default function SetupBusinessForm() {
  const router = useRouter();
  const { isAuthenticated, getRedirectPath } = useAuthStore();

  const {
    register: field,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      address: "",
    },
  });

  const { mutate: registerUser, isPending, isError, error } = useRegister();
  const apiError = error as AxiosError<ApiErrorResponse> | undefined;
  const errorMessage =
    apiError?.response?.data?.message ??
    "Something went wrong. Please try again.";
  const fieldErrors = apiError?.response?.data?.errors;

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace(getRedirectPath());
    }
  }, [isAuthenticated, router, getRedirectPath]);

  const onSubmit: SubmitHandler<RegisterFormData> = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    confirmPassword,
    ...payload
  }) => {
    registerUser(payload, {
      onSuccess: () => {
        router.push(`/verify-email?email=${encodeURIComponent(payload.email)}`);
      },
    });
  };

  const inputClass =
    "min-h-12 w-full rounded-md border border-rental-border bg-white px-11 py-2 text-base text-brand-dark outline-none transition placeholder:text-slate-400 focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/15 sm:text-sm";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-md border border-rental-border bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-rental-primary">
          Register business
        </p>
        <h1 className="mt-2 text-2xl font-bold text-brand-dark">
          Complete account setup
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your business contact details exactly as they should appear on
          Qwetu Links.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-brand-dark" htmlFor="name">
          BusinessName
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="name"
            type="text"
            {...field("name")}
            className={inputClass}
            placeholder="Qwetu Links Ltd"
          />
        </div>
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            className="text-sm font-semibold text-brand-dark"
            htmlFor="phone"
          >
            Business Phone
          </label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="phone"
              type="tel"
              {...field("phone")}
              className={inputClass}
              placeholder="+254712345678"
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            className="text-sm font-semibold text-brand-dark"
            htmlFor="city"
          >
            City
          </label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="city"
              type="text"
              {...field("city")}
              className={inputClass}
              placeholder="Mombasa"
            />
          </div>
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>
      </div>

      {isError && (
        <div className="mt-4 min-h-11" aria-live="polite" aria-atomic="true">
          <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

            <div className="space-y-1">
              <p className="text-sm font-medium text-red-600">{errorMessage}</p>

              {fieldErrors && (
                <ul className="list-disc pl-5 text-sm text-red-600">
                  {Object.entries(fieldErrors).map(([field, messages]) =>
                    messages.map((message, index) => (
                      <li key={`${field}-${index}`}>{message}</li>
                    )),
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="min-h-12 w-full mt-4 rounded-md bg-rental-primary px-4 py-2 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Creating account..." : "Register"}
      </button>
    </form>
  );
}

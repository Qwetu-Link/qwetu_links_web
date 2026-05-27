"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/app/lib/zod";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { AxiosError } from "axios";
import { useRegister } from "../../auth.services";

type ApiErrorResponse = {
  message?: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const { isAuthenticated, getRedirectPath } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: field,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      address: "",
      is_active: true,
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: registerUser, isPending, isError, error } = useRegister();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace(getRedirectPath());
    }
  }, [isAuthenticated, router, getRedirectPath]);

  const onSubmit: SubmitHandler<RegisterFormData> = ({
    // eslint-disable-next-line
    confirmPassword: _confirmPassword,
    ...payload
  }) => {
    registerUser(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <h1 className="mb-4 text-center text-lg font-medium sm:text-xl">
        Create your account
      </h1>

      {/* Row 1: Full Name + Email */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...field("name")}
            className="min-h-11 w-full rounded-md border px-3 py-2 text-base outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 sm:text-sm"
            placeholder="e.g. Joseph Mwamuye"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...field("email")}
            className="min-h-11 w-full rounded-md border px-3 py-2 text-base outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 sm:text-sm"
            placeholder="e.g. joseph@email.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Phone + City */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            {...field("phone")}
            className="min-h-11 w-full rounded-md border px-3 py-2 text-base outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 sm:text-sm"
            placeholder="e.g. +254712345678"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="city">
            City
          </label>
          <input
            id="city"
            type="text"
            {...field("city")}
            className="min-h-11 w-full rounded-md border px-3 py-2 text-base outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 sm:text-sm"
            placeholder="e.g. Mombasa"
          />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>
      </div>

      {/* Row 3: Address (full width) */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          type="text"
          {...field("address")}
          className="min-h-11 w-full rounded-md border px-3 py-2 text-base outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 sm:text-sm"
          placeholder="e.g. Nyali Centre Apartments, Links Road"
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* Row 4: Password + Confirm Password */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...field("password")}
              className="min-h-11 w-full rounded-md border px-3 py-2 text-base outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 sm:text-sm"
              placeholder="Min. 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...field("confirmPassword")}
              className="min-h-11 w-full rounded-md border px-3 py-2 text-base outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 sm:text-sm"
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* API Error */}
      <div
        className="flex min-h-8 items-end"
        aria-live="polite"
        aria-atomic="true"
      >
        {isError && (
          <div className="flex items-start gap-1 text-sm text-red-500">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              {(error as AxiosError<ApiErrorResponse>)?.response?.data
                ?.message ?? "Something went wrong. Please try again."}
            </p>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="min-h-11 w-full rounded-md bg-black px-4 py-2 font-medium text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Creating account..." : "Register"}
      </button>
    </form>
  );
}

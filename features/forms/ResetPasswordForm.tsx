"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/schemas/auth.zod";
import OtpInput from "../../components/custom/OtpInput";
import { useResetPassword } from "@/hooks/useAuth";
import { handleFormErrors } from "@/utils/errors";


export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: "",
      email,
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutate: passwordReset,
    isPending,
  } = useResetPassword();

  const onSubmit: SubmitHandler<ResetPasswordFormData> = (payload) => {
    passwordReset(
      payload,
      {
        onSuccess: () => {
          router.push("/login");
        },
        onError: (error) => {
          handleFormErrors<ResetPasswordFormData>(error, setError);
        }
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-md border border-rental-border bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-rental-primary">
          Reset password
        </p>
        <h1 className="mt-2 text-2xl font-bold text-brand-dark">
          Enter your 6-digit code
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Check your email for the OTP code, then choose a new password for your
          account.
        </p>
        {email && (
          <p className="mt-3 rounded-md border border-rental-border bg-rental-bg-light px-3 py-2 text-sm text-slate-600">
            Code sent to{" "}
            <span className="font-semibold text-brand-dark">{email}</span>
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-brand-dark">OTP code</label>
        <Controller
          control={control}
          name="token"
          render={({ field }) => (
            <OtpInput value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.token && (
          <p className="text-sm text-red-500">{errors.token.message}</p>
        )}
      </div>

      <div className="mt-5 space-y-1.5">
        <label className="text-sm font-semibold text-brand-dark" htmlFor="password">
          New password
        </label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="min-h-12 w-full rounded-md border border-rental-border bg-white px-11 py-2 pr-11 text-base text-brand-dark outline-none transition placeholder:text-slate-400 focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/15 sm:text-sm"
            placeholder="New password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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

      <div className="mt-4 space-y-1.5">
        <label
          className="text-sm font-semibold text-brand-dark"
          htmlFor="confirmPassword"
        >
          Confirm password
        </label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className="min-h-12 w-full rounded-md border border-rental-border bg-white px-11 py-2 pr-11 text-base text-brand-dark outline-none transition placeholder:text-slate-400 focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/15 sm:text-sm"
            placeholder="Confirm password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
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

      <button
        type="submit"
        disabled={isPending || isSubmitting}
        className="mt-6 min-h-12 w-full rounded-md bg-rental-primary px-4 py-2 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Resetting..." : "Reset password"}
      </button>

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

      <p className="mt-4 text-center text-sm text-gray-500 md:hidden">
        Back to sign in?{" "}
        <Link
          href="/login"
          className="font-semibold text-rental-primary underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/app/lib/zod";
import { useForgotPassword } from "../../auth.services";

type ApiErrorResponse = {
  message?: string;
};

export default function ForgotPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const {
    mutate: requestPasswordReset,
    isPending,
    isError,
    error,
  } = useForgotPassword();

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = ({ email }) => {
    requestPasswordReset(
      { email },
      {
        onSuccess: () => {
          router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        },
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
          Forgot password
        </p>
        <h1 className="mt-2 text-2xl font-bold text-brand-dark">
          Request a reset code
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          We will send a 6-digit code to the email connected to your account.
        </p>
      </div>

      <label className="space-y-1.5">
        <span className="text-sm font-semibold text-brand-dark">
          Email address
        </span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            {...register("email")}
            className="min-h-12 w-full rounded-md border border-rental-border bg-white px-11 py-2 text-base text-brand-dark outline-none transition placeholder:text-slate-400 focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/15 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </label>

      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="mt-6 min-h-12 w-full rounded-md bg-rental-primary px-4 py-2 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Sending..." : "Send reset code"}
      </button>

      <div
        className="mt-4 min-h-11"
        aria-live="polite"
        aria-atomic="true"
      >
        {isError && (
          <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <p className="text-sm leading-5 text-red-600">
              {(error as AxiosError<ApiErrorResponse>)?.response?.data
                ?.message ??
                "We could not send a reset code. Please try again."}
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-gray-500 md:hidden">
        Remember your password?{" "}
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

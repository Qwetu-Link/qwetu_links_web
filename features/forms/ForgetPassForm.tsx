"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/schemas/auth.zod";
import { useForgotPassword } from "@/hooks/useAuth";
import { handleFormErrors } from "@/utils/errors";


export default function ForgotPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
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
  } = useForgotPassword();

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = ({ email }) => {
    requestPasswordReset(
      { email },
      {
        onSuccess: () => {
          router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        },
        onError: (error) => {
          handleFormErrors<ForgotPasswordFormData>(error, setError);
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

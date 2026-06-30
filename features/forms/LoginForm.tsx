"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/schemas/auth.zod";
import { AlertCircle, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useLogin } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/useAuthStore";
import { handleFormErrors } from "@/utils/errors";

export default function LoginForm() {
  const router = useRouter();
  const { isAuthenticated, getRedirectPath } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // useLogin returns: { mutate: login, isPending, isError, error, data }
  const { mutate: login, isPending } = useLogin();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace(getRedirectPath());
    }
  }, [isAuthenticated, router, getRedirectPath]);

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onError: (error) => {
        // Pushes field-level errors onto the matching inputs,
        // and a general message onto `errors.root`
        handleFormErrors<LoginFormData>(error, setError);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-md border border-rental-border bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-rental-primary">
          Login
        </p>
        <h1 className="mt-2 text-2xl font-bold text-brand-dark">
          Access your account
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Sign in with your email and password to continue to your dashboard.
        </p>
      </div>

      <div className="space-y-1.5">
        <label
          className="text-sm font-semibold text-brand-dark"
          htmlFor="email"
        >
          Business Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="email"
            type="email"
            {...register("email")}
            className="min-h-12 w-full rounded-md border border-rental-border bg-white px-11 py-2 text-base text-brand-dark outline-none transition placeholder:text-slate-400 focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/15 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="mt-4 space-y-1.5">
        <label
          className="text-sm font-semibold text-brand-dark"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="min-h-12 w-full rounded-md border border-rental-border bg-white px-11 py-2 pr-11 text-base text-brand-dark outline-none transition placeholder:text-slate-400 focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/15 sm:text-sm"
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
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

      <div className="mt-3 flex justify-end">
        <a
          href="/forget-password"
          className="text-sm font-semibold text-rental-primary underline-offset-4 hover:underline"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="mt-6 min-h-12 w-full rounded-md bg-rental-primary px-4 py-2 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
        aria-disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

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

      {/* <GoogleSignupButton /> */}
    </form>
  );
}

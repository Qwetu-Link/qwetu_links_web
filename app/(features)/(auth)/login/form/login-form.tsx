"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/app/lib/zod";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { useLogin } from "../../auth.services";
import { AxiosError } from "axios";

type ApiErrorResponse = {
  message?: string;
};

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { isAuthenticated, getRedirectPath } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // useLogin returns: { mutate: login, isPending, isError, error, data }
  const { mutate: login, isPending, isError, error } = useLogin();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace(getRedirectPath());
    }
  }, [isAuthenticated, router, getRedirectPath]);

  const onSubmit = (data: LoginFormData) => {
    login(data); // useLogin handles redirect on success
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <h1 className="mb-4 text-center text-lg font-medium sm:text-xl">
        Please log in to continue.
      </h1>
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="min-h-11 w-full rounded-md border px-3 py-2 text-base outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 sm:text-sm"
          placeholder="Enter email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="min-h-11 w-full rounded-md border px-3 py-2 text-base outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 sm:text-sm"
            placeholder="Enter password"
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
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="min-h-11 w-full rounded-md bg-primary px-4 py-2 font-medium text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-70"
        aria-disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      {isError && (
        <div
          className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3"
          aria-live="polite"
          aria-atomic="true"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-sm text-red-600">
            {(error as AxiosError<ApiErrorResponse>)?.response?.data?.message ??
              "Invalid credentials."}
          </p>
        </div>
      )}
    </form>
  );
}

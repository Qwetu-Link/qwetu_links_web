"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/app/lib/zod";
import { AlertCircle } from "lucide-react";
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
        <input
          id="password"
          type="password"
          {...register("password")}
          className="min-h-11 w-full rounded-md border px-3 py-2 text-base outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 sm:text-sm"
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="min-h-11 w-full rounded-md bg-black px-4 py-2 font-medium text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-28"
        aria-disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

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
                ?.message ?? "Invalid credentials."}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}

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
  }, []);

  const onSubmit = (data: LoginFormData) => {
    login(data); // useLogin handles redirect on success
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
      <h1 className="mb-3 text-xl text-center">Please log in to continue.</h1>
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white px-4 py-2 rounded"
        aria-disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {isError && (
          <div className="flex items-center gap-1 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4" />
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

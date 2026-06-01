"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  VerifyEmailFormData,
  verifyEmailSchema,
} from "@/app/lib/zod";
import OtpInput from "../../_components/OtpInput";
import { useVerifyEmail } from "../../auth.services";

type Status = "idle" | "loading" | "success" | "error";

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  const { mutate: verifyEmail } = useVerifyEmail();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      token: "",
      email,
    },
  });

  useEffect(() => {
    if (status !== "success") return;
    if (countdown === 0) {
      router.replace("/login");
      return;
    }
    const timer = setTimeout(() => setCountdown((current) => current - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, countdown, router]);

  const handleVerify: SubmitHandler<VerifyEmailFormData> = ({ token }) => {
    if (!email) {
      setStatus("error");
      setMessage("Missing email address. Please request a new code.");
      return;
    }

    setStatus("loading");
    verifyEmail(
      { token: token, email },
      {
        onSuccess: () => {
          setStatus("success");
          setMessage("Your email has been verified successfully.");
        },
        onError: (err: unknown) => {
          const error = err as { response?: { data?: { message?: string } } };
          setStatus("error");
          setMessage(
            error.response?.data?.message ??
              "Verification failed. The code may be invalid or expired.",
          );
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleVerify)}
      className="w-full rounded-md border border-rental-border bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-rental-primary">
          Verify email
        </p>
        <h1 className="mt-2 text-2xl font-bold text-brand-dark">
          Enter your 6-digit code
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          We sent a verification code to{" "}
          <span className="font-semibold text-brand-dark">
            {email || "your email"}
          </span>
          .
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-brand-dark">
          Verification code
        </label>
        <Controller
          control={control}
          name="token"
          render={({ field }) => (
            <OtpInput
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                if (status === "error") {
                  setStatus("idle");
                  setMessage("");
                }
              }}
              disabled={status === "loading" || status === "success"}
            />
          )}
        />
        {errors.token && (
          <p className="text-sm text-red-500">{errors.token.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="mt-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-sm leading-5 text-red-600">{message}</p>
        </div>
      )}

      {status === "success" && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-4">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Email verified</p>
              <p className="mt-1 text-sm text-green-700">{message}</p>
              <p className="mt-1 text-sm text-green-700">
                Redirecting to login in {countdown}s.
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-rental-primary px-4 py-2 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <MailCheck className="h-4 w-4" />
            Verify Email
          </>
        )}
      </button>

      <div className="mt-4 flex flex-col gap-2 text-center text-sm text-slate-500">
        <p>Didn&apos;t receive the code? Check spam or request a new one.</p>
        <Link
          href="/login"
          className="font-semibold text-rental-primary underline-offset-4 hover:underline"
        >
          Back to login
        </Link>
      </div>
    </form>
  );
}

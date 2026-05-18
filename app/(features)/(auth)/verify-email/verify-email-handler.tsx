"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, MailCheck } from "lucide-react";
import Link from "next/link";
import { useVerifyEmail } from "../auth.services";

type Status = "idle" | "loading" | "success" | "error";

export default function VerifyEmailHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const isInvalidLink = !token || !email;

  const [status, setStatus] = useState<Status>(
    isInvalidLink ? "error" : "idle",
  );
  const [message, setMessage] = useState(
    isInvalidLink ? "Invalid verification link. Please request a new one." : "",
  );
  const [countdown, setCountdown] = useState(5);

  const { mutate: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    if (isInvalidLink) return;

    verifyEmail(
      { token, email },
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
              "Verification failed. The link may have expired.",
          );
        },
      },
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-redirect to login on success
  useEffect(() => {
    if (status !== "success") return;
    if (countdown === 0) {
      router.replace("/login");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, countdown, router]);

  return (
    <div className="w-full rounded-xl border bg-white p-8 shadow-sm">
      {/* Loading */}
      {status === "loading" && (
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-black" />
          <h2 className="text-lg font-semibold">Verifying your email...</h2>
          <p className="text-sm text-gray-500">
            Please wait while we confirm your email address.
          </p>
        </div>
      )}

      {/* Idle */}
      {status === "idle" && (
        <div className="flex flex-col items-center gap-4 text-center">
          <MailCheck className="h-12 w-12 text-gray-400" />
          <h2 className="text-lg font-semibold">Check your email</h2>
          <p className="text-sm text-gray-500">
            Click the verification link we sent to{" "}
            <span className="font-medium text-black">
              {email ?? "your email"}
            </span>{" "}
            to activate your account.
          </p>
        </div>
      )}

      {/* Success */}
      {status === "success" && (
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
          <h2 className="text-lg font-semibold">Email verified!</h2>
          <p className="text-sm text-gray-500">{message}</p>
          {email && (
            <p className="text-xs text-gray-400">
              Verified as{" "}
              <span className="font-medium text-gray-600">{email}</span>
            </p>
          )}
          <p className="text-sm text-gray-500">
            Redirecting to login in{" "}
            <span className="font-medium text-black">{countdown}s</span>...
          </p>
          <Link
            href="/login"
            className="mt-2 min-h-10 w-full rounded-md bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-black/90"
          >
            Go to Login
          </Link>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="flex flex-col items-center gap-4 text-center">
          <XCircle className="h-12 w-12 text-red-500" />
          <h2 className="text-lg font-semibold">Verification failed</h2>
          <p className="text-sm text-gray-500">{message}</p>
          <div className="mt-2 flex w-full flex-col gap-2">
            <Link
              href="/login"
              className="min-h-10 w-full rounded-md bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-black/90"
            >
              Go to Login
            </Link>
            <Link
              href="/register"
              className="min-h-10 w-full rounded-md border px-4 py-2 text-center text-sm font-medium transition hover:bg-gray-50"
            >
              Create a new account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

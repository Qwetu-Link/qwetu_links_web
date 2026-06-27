import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import VerifyEmailForm from "../forms/BusinessVerification";

export default function VerifyBusinessPage() {
  return (
    <div className="min-h-full bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-xl flex-col justify-center">
        <Link
          href="/qwetulinks/accounts"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to accounts
        </Link>
        <div className="mb-4 flex items-center gap-2 text-blue-600">
          <ShieldCheck size={24} />
          <h1 className="text-2xl font-bold">Business Verification</h1>
        </div>
        <Suspense>
          <VerifyEmailForm />
        </Suspense>
      </div>
    </div>
  );
}

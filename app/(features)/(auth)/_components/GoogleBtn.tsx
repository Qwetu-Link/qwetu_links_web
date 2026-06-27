"use client";

import Image from "next/image";
import Link from "next/link";
import { GOOGLE_AUTH_URL } from "../../../../services/auth.endpoints";

export default function GoogleSignupButton() {
  return (
    <div>
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <p className="text-sm font-medium text-slate-500">or</p>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <Link
        href={GOOGLE_AUTH_URL}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-rental-border bg-white px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        <Image
          src="/icons/google-icon.svg"
          alt="Google"
          width={24}
          height={24}
        />
        Sign in with Google
      </Link>
    </div>
  );
}

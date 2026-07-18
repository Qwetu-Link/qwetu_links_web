import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/features/forms/RegisterForm";
import { heroImages } from "@/utils/propertyData";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Register | Qwetu Links",
  description:
    "Create a Qwetu Links account to manage property listings, enquiries, and rental activity.",
  path: "/register",
  index: false,
});

export default function RegisterPage() {
  return (
    <main className="h-dvh overflow-hidden bg-rental-bg-light">
      <div className="grid h-full md:grid-cols-[42%_58%]">
        {/* Left: Image + login link */}
        <div className="relative hidden h-dvh overflow-hidden bg-brand-dark md:block">
          <Image
            src={heroImages[2]}
            alt="Modern Qwetu Links property"
            fill
            sizes="42vw"
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-brand-dark/55" />
          <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back Home
            </Link>
            <div className="flex flex-1 items-center justify-center">
              <div className="w-44">
                <Image
                  src="/images/_qwetu_logo_orange.webp"
                  width={800}
                  height={560}
                  className="h-auto w-full"
                  alt="Qwetu Links"
                  loading="eager"
                  priority
                />
              </div>
            </div>
            <div className="pb-2">
              <h2 className="text-3xl font-bold leading-tight">
                Create your Qwetu Links account
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Manage listings, enquiries, and property activity from one
                place.
              </p>
              <p className="mt-4 text-sm text-white/75">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-rental-primary underline-offset-4 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Register Form */}
        <div className="h-dvh overflow-y-auto px-4 py-6 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto flex min-h-full max-w-3xl items-center">
            <div className="w-full">
              <Link
                href="/"
                className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition hover:text-rental-primary md:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
                Back Home
              </Link>
              <div className="mb-6 flex justify-center md:hidden">
                <Image
                  src="/images/_qwetu_logo_orange.webp"
                  width={180}
                  height={126}
                  className="h-auto w-36"
                  alt="Qwetu Links"
                  priority
                />
              </div>
              <Suspense>
                <RegisterForm />
              </Suspense>
              <p className="mt-4 text-center text-sm text-gray-500 md:hidden">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-rental-primary underline-offset-4 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

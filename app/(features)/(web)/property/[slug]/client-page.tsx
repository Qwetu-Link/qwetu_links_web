"use client";

import { encodePropertyToken } from "@/components/custom/propertyToken";
import PropertyDetails from "@/features/public/property/propertyDetails";
import { useGetPublicSlugProperty } from "@/hooks/useProperty";
import { ArrowLeft, Building2, Home, SearchX } from "lucide-react";
import Link from "next/link";

interface PropertyClientPageProps {
  slug: string;
}

function SkeletonBlock({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200/80 ${className}`}
      aria-hidden="true"
    />
  );
}

function PropertyDetailsSkeleton() {
  return (
    <main
      className="min-h-screen bg-[#f6f3ff] text-slate-950"
      aria-busy="true"
    >
      <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="mx-auto max-w-7xl">
          <SkeletonBlock className="h-9 w-32 bg-white shadow-sm ring-1 ring-violet-100" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <SkeletonBlock className="h-7 w-24 rounded-full bg-white shadow-sm ring-1 ring-violet-100" />
                <SkeletonBlock className="h-7 w-32 rounded-full bg-white shadow-sm ring-1 ring-violet-100" />
              </div>
              <SkeletonBlock className="h-12 w-full max-w-3xl bg-white/80 sm:h-14" />
              <SkeletonBlock className="mt-4 h-5 w-full max-w-2xl bg-white/80" />
              <SkeletonBlock className="mt-2 h-5 w-3/5 bg-white/80" />
            </div>

            <div className="rounded-md bg-white p-5 shadow-sm ring-1 ring-violet-100">
              <SkeletonBlock className="h-3 w-28" />
              <SkeletonBlock className="mt-3 h-9 w-40" />
              <div className="mt-5 grid grid-cols-2 divide-x divide-violet-100 rounded-md bg-[#f6f3ff] p-4">
                <div>
                  <SkeletonBlock className="h-8 w-16 bg-violet-100" />
                  <SkeletonBlock className="mt-2 h-3 w-20 bg-violet-100" />
                </div>
                <div className="pl-4">
                  <SkeletonBlock className="h-8 w-14 bg-violet-100" />
                  <SkeletonBlock className="mt-2 h-3 w-16 bg-violet-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:grid lg:grid-cols-[1fr_360px] lg:gap-10 lg:px-8">
        <div className="space-y-8">
          <section className="overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-slate-200">
            <SkeletonBlock className="h-[360px] w-full rounded-none sm:h-[520px]" />
            <div className="flex gap-2 overflow-hidden p-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-16 w-24 shrink-0" />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-sm"
              >
                <SkeletonBlock className="mx-auto h-11 w-11 rounded-full bg-violet-100" />
                <SkeletonBlock className="mx-auto mt-4 h-6 w-16" />
                <SkeletonBlock className="mx-auto mt-2 h-3 w-20" />
              </div>
            ))}
          </div>

          <section className="rounded-md border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <SkeletonBlock className="h-7 w-48" />
            <SkeletonBlock className="mt-3 h-4 w-72" />
            <SkeletonBlock className="mt-6 h-4 w-full" />
            <SkeletonBlock className="mt-3 h-4 w-11/12" />
            <SkeletonBlock className="mt-3 h-4 w-4/5" />
          </section>

          <section className="rounded-md border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <SkeletonBlock className="h-7 w-32" />
            <SkeletonBlock className="mt-3 h-4 w-56" />
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-16 w-full" />
              ))}
            </div>
          </section>
        </div>

        <aside className="mt-8 space-y-4 lg:mt-0">
          <div className="sticky top-6 rounded-md border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <SkeletonBlock className="h-3 w-28" />
                <SkeletonBlock className="mt-3 h-8 w-36" />
              </div>
              <SkeletonBlock className="h-7 w-24 rounded-full" />
            </div>
            <div className="mt-6 space-y-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="flex justify-between gap-5">
                  <SkeletonBlock className="h-4 w-20" />
                  <SkeletonBlock className="h-4 w-28" />
                </div>
              ))}
            </div>
            <SkeletonBlock className="mt-6 h-11 w-full" />
            <SkeletonBlock className="mt-3 h-11 w-full" />
          </div>

          <div className="rounded-md border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <SkeletonBlock className="h-11 w-11 rounded-full bg-violet-100" />
              <div className="flex-1">
                <SkeletonBlock className="h-3 w-20" />
                <SkeletonBlock className="mt-2 h-5 w-36" />
              </div>
            </div>
            <SkeletonBlock className="mt-5 h-4 w-40" />
            <SkeletonBlock className="mt-3 h-4 w-52" />
            <SkeletonBlock className="mt-3 h-4 w-44" />
          </div>
        </aside>
      </div>
    </main>
  );
}

function PropertyNotFound() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
        <section className="w-full rounded-md border border-slate-100 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f0ecff] text-[#5b3df5]">
            <SearchX className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-slate-950">
            Property not found
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
            The property may have been removed, renamed, or is no longer
            available for public viewing.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/property"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#5b3df5] px-5 text-sm font-semibold text-white transition hover:bg-[#492bd8]"
            >
              <Building2 className="h-4 w-4" />
              Browse Properties
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-[#5b3df5] hover:text-[#5b3df5]"
            >
              <Home className="h-4 w-4" />
              Back Home
            </Link>
          </div>

          <Link
            href="/property"
            className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-slate-500 transition hover:text-[#5b3df5]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to all listings
          </Link>
        </section>
      </div>
    </main>
  );
}

export default function PropertyClientPage({ slug }: PropertyClientPageProps) {
  const { data: property, isLoading, isError } = useGetPublicSlugProperty(slug);

  if (isLoading) {
    return <PropertyDetailsSkeleton />;
  }

  if (isError || !property) {
    return <PropertyNotFound />;
  }

  const bookingToken = encodePropertyToken({
    propertyId: property.data.id,
    propertyName: property.data.name,
    propertySlug: property.data.slug,
  });

  return (
    <PropertyDetails
      propertyData={property.data}
      bookingToken={bookingToken}
    />
  );
}

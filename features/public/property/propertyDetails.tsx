"use client";

import { Amenity } from "@/types/amenity.definations";
import {
  PropertyData,
  PropertyImages,
} from "@/types/property.definations";
import {
  ArrowLeft,
  Bath,
  Bed,
  CalendarCheck,
  Car,
  DoorOpen,
  Mail,
  MapPin,
  Phone,
  Ruler,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createElement, useState } from "react";

import * as LucideIcons from "lucide-react";

function getAmenityIcon(iconName: string): React.ElementType {
  if (!iconName) return LucideIcons.CheckCircle2;

  const pascal = iconName
    .split(/[-_\s]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("");

  return (
    ((LucideIcons as Record<string, unknown>)[pascal] as React.ElementType) ??
    LucideIcons.CheckCircle2
  );
}

const amenityColorPalette = [
  "bg-blue-50 text-blue-600",
  "bg-cyan-50 text-cyan-600",
  "bg-emerald-50 text-emerald-600",
  "bg-orange-50 text-orange-600",
  "bg-amber-50 text-amber-600",
  "bg-sky-50 text-sky-600",
  "bg-yellow-50 text-yellow-600",
  "bg-green-50 text-green-600",
  "bg-violet-50 text-violet-600",
  "bg-rose-50 text-rose-600",
  "bg-teal-50 text-teal-600",
  "bg-indigo-50 text-indigo-600",
];

function hashString(str: string): number {
  return [...str].reduce(
    (acc, ch) => (acc * 31 + ch.charCodeAt(0)) & 0xffff,
    0,
  );
}

function getAmenityColor(icon: string): string {
  const idx = hashString(icon.toLowerCase()) % amenityColorPalette.length;
  return amenityColorPalette[idx];
}

function AmenityIcon({ icon, name }: { icon: string; name: string }) {
  const colors = getAmenityColor(icon);
  const IconComponent = getAmenityIcon(icon);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors}`}
      >
        {createElement(IconComponent, { className: "h-5 w-5" })}
      </span>
      <span className="text-sm font-medium text-slate-700">{name}</span>
    </div>
  );
}

const statusStyles: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  occupied: "bg-red-100 text-red-700 ring-red-200",
  reserved: "bg-amber-100 text-amber-700 ring-amber-200",
  maintenance: "bg-slate-100 text-slate-600 ring-slate-200",
};

export default function PropertyDetails({
  propertyData,
}: {
  propertyData: PropertyData;
}) {
  const property = propertyData;
  const [activeImage, setActiveImage] = useState(0);
  const images = property.images ?? [];
  const amenities = property.amenities ?? [];

  const statusClass =
    statusStyles[property.status?.toLowerCase()] ??
    "bg-slate-100 text-slate-600 ring-slate-200";

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <section className="relative bg-[#0F172A] px-4 pb-12 pt-8 text-white sm:px-6 lg:px-8">
        {/* subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,#fff 39px,#fff 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#fff 39px,#fff 40px)",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/property"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All properties
          </Link>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${statusClass}`}
                >
                  {property.status}
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/70">
                  {property.apartmentType}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {property.name}
              </h1>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-orange-400" />
                {property.address}, {property.location}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">
                  {property.occupanyRate ?? 0}%
                </p>
                <p className="mt-0.5 text-xs text-white/50">Occupancy</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold">{property.unit ?? 0}</p>
                <p className="mt-0.5 text-xs text-white/50">Units</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:grid lg:grid-cols-[1fr_360px] lg:gap-10 lg:px-8">
        {/* LEFT column */}
        <div className="space-y-8">
          {/* Gallery */}
          {images.length > 0 && (
            <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
              {/* Main image */}
              <div className="relative h-[380px] w-full bg-slate-100 sm:h-[460px]">
                <Image
                  key={images[activeImage]?.url}
                  src={images[activeImage]?.url}
                  alt={property.name}
                  fill
                  sizes="(min-width:1024px) 760px, 100vw"
                  className="object-cover transition-opacity duration-300"
                  priority
                  unoptimized
                  loading="eager"
                />
                {/* image counter */}
                <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {activeImage + 1} / {images.length}
                </span>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-3">
                  {images.map((img: PropertyImages, i: number) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        i === activeImage
                          ? "border-orange-500"
                          : "border-transparent opacity-60 hover:opacity-90"
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                        loading="eager"
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Specs strip */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Bed, label: "Bedrooms", value: property.bedrooms },
              { icon: Bath, label: "Bathrooms", value: property.bathrooms },
              { icon: Car, label: "Parking", value: property.parking },
              {
                icon: Ruler,
                label: "Area",
                value: `${property.squareMeters} m²`,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-100 bg-white py-5 shadow-xs"
              >
                <Icon className="h-5 w-5 text-orange-500" />
                <p className="text-xl font-bold text-slate-800">{value}</p>
                <p className="text-xs font-medium text-slate-400">{label}</p>
              </div>
            ))}
          </div>

          {/* Overview */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs sm:p-8">
            <h2 className="text-lg font-bold text-slate-800">
              Property Overview
            </h2>
            <div className="mt-1 h-0.5 w-10 rounded-full bg-orange-500" />
            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-500">
              {property.description}
            </p>
          </section>

          {/* Amenities */}
          {amenities.length > 0 && (
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs sm:p-8">
              <h2 className="text-lg font-bold text-slate-800">Amenities</h2>
              <div className="mt-1 h-0.5 w-10 rounded-full bg-orange-500" />
              <p className="mt-1 text-xs text-slate-400">
                {amenities.length} included with this property
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {amenities.map((amenity: Amenity) => (
                  <AmenityIcon
                    key={amenity.id}
                    icon={amenity.icon}
                    name={amenity.name}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Full gallery grid */}
          {images.length > 1 && (
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs sm:p-8">
              <h2 className="text-lg font-bold text-slate-800">Gallery</h2>
              <div className="mt-1 h-0.5 w-10 rounded-full bg-orange-500" />

              <div className="mt-5 flex flex-wrap gap-3">
                {images.map((img: PropertyImages, i: number) => {
                  return (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className="group relative h-48 w-[calc(50%-6px)] overflow-hidden rounded-xl transition-all duration-200 sm:h-64"
                    >
                      <Image
                        src={img.url}
                        alt={`Gallery ${i + 1}`}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        unoptimized
                        loading="eager"
                      />
                      {i === activeImage && (
                        <div className="absolute inset-0 ring-2 ring-inset ring-orange-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT sidebar */}
        <aside className="mt-8 space-y-4 lg:mt-0">
          {/* CTA card */}
          <div className="sticky top-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Occupancy Rate
                </p>
                <p className="mt-1 text-4xl font-bold text-orange-500">
                  {property.occupanyRate ?? 0}
                  <span className="text-2xl">%</span>
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusClass}`}
              >
                {property.status}
              </span>
            </div>

            <div className="mt-6 space-y-3 divide-y divide-slate-50">
              {[
                { label: "Type", value: property.apartmentType },
                { label: "Address", value: property.address },
                { label: "Location", value: property.location },
                { label: "Units", value: property.unit ?? 0 },
                { label: "Bedrooms", value: property.bedrooms },
                { label: "Bathrooms", value: property.bathrooms },
                { label: "Parking", value: property.parking },
                { label: "Area", value: `${property.squareMeters} m²` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between pt-3 text-sm">
                  <span className="font-medium text-slate-400">{label}</span>
                  <span className="font-semibold text-slate-700">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"
              >
                <CalendarCheck className="h-4 w-4" />
                Book a Viewing
              </button>
              <Link
                href="#"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-orange-200 font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                <DoorOpen className="h-4 w-4" />
                Ask About Units
              </Link>
            </div>
          </div>

          {/* Business card */}
          {property.business && (
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Listed by
              </p>
              <p className="mt-2 text-base font-bold text-slate-800">
                {property.business.name}
              </p>
              <div className="mt-3 space-y-2">
                {property.business.phone && (
                  <a
                    href={`tel:${property.business.phone}`}
                    className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-orange-500"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {property.business.phone}
                  </a>
                )}
                {property.business.email && (
                  <a
                    href={`mailto:${property.business.email}`}
                    className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-orange-500"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {property.business.email}
                  </a>
                )}
                {property.business.city && (
                  <p className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {property.business.city}, {property.business.country}
                  </p>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

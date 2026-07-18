"use client";

import { propertyStatusStylesB } from "@/components/custom/CustomBadges";
import { Amenity } from "@/types/amenity.definations";
import { PropertyData, PropertyImages } from "@/types/property.definations";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  CalendarCheck,
  Car,
  DoorOpen,
  Mail,
  MapPin,
  Phone,
  Ruler,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createElement, useMemo, useState } from "react";

const amenityColorPalette = [
  "bg-blue-50 text-blue-600",
  "bg-cyan-50 text-cyan-600",
  "bg-emerald-50 text-emerald-600",
  "bg-amber-50 text-amber-600",
  "bg-sky-50 text-sky-600",
  "bg-rose-50 text-rose-600",
  "bg-teal-50 text-teal-600",
  "bg-indigo-50 text-indigo-600",
];

function getAmenityIcon(iconName: string): React.ElementType {
  if (!iconName) return LucideIcons.CheckCircle2;

  const pascal = iconName
    .split(/[-_\s]+/)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join("");

  return (
    ((LucideIcons as Record<string, unknown>)[pascal] as React.ElementType) ??
    LucideIcons.CheckCircle2
  );
}

function hashString(value: string): number {
  return [...value].reduce(
    (total, character) => (total * 31 + character.charCodeAt(0)) & 0xffff,
    0,
  );
}

function getAmenityColor(icon: string): string {
  return amenityColorPalette[
    hashString(icon.toLowerCase()) % amenityColorPalette.length
  ];
}

function formatRent(value?: string) {
  const amount = Number(value);

  if (!value || Number.isNaN(amount) || amount <= 0) {
    return "Contact for rent";
  }

  return `KES ${amount.toLocaleString("en-KE")}`;
}

function AmenityItem({ icon, name }: { icon: string; name: string }) {
  const IconComponent = getAmenityIcon(icon);

  return (
    <div className="flex items-center gap-3 rounded-md border border-slate-100 bg-white p-4 shadow-sm">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${getAmenityColor(
          icon,
        )}`}
      >
        {createElement(IconComponent, { className: "h-5 w-5" })}
      </span>
      <span className="text-sm font-semibold text-slate-700">{name}</span>
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-extrabold text-slate-950">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}

export default function PropertyDetails({
  propertyData,
  bookingToken,
}: {
  propertyData: PropertyData;
  bookingToken: string;
}) {
  const property = propertyData;
  const [activeImage, setActiveImage] = useState(0);
  const router = useRouter();

  const images = property.images ?? [];
  const amenities = property.amenities ?? [];
  const activeGalleryImage = images[activeImage]?.url ?? "/images/placeholder.svg";
  const statusClass =
    propertyStatusStylesB[property.status?.toLowerCase()] ??
    "bg-slate-100 text-slate-600 ring-slate-200";

  const stats = useMemo(
    () => [
      { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
      { icon: Bath, label: "Bathrooms", value: property.bathrooms },
      { icon: Car, label: "Parking", value: property.parking },
      { icon: Ruler, label: "Area", value: `${property.squareMeters} m2` },
    ],
    [
      property.bathrooms,
      property.bedrooms,
      property.parking,
      property.squareMeters,
    ],
  );

  const summaryRows = [
    { label: "Type", value: property.apartmentType },
    { label: "Rent", value: formatRent(property.rentAmount) },
    { label: "Address", value: property.address },
    { label: "Location", value: property.location },
    { label: "Units", value: property.unit ?? 0 },
    { label: "Bedrooms", value: property.bedrooms },
    { label: "Bathrooms", value: property.bathrooms },
    { label: "Parking", value: property.parking },
    { label: "Area", value: `${property.squareMeters} m2` },
  ];

  function handleBookViewing() {
    router.push(`/property/${property.slug}/booking/${bookingToken}`);
  }

  return (
    <main className="min-h-screen bg-[#f6f3ff] text-slate-950">
      <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/property"
            className="inline-flex items-center gap-1.5 rounded-md border border-violet-100 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-[#5b3df5] hover:text-[#5b3df5]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All properties
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusClass}`}
                >
                  {property.status}
                </span>
                <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-[#5b3df5] shadow-sm ring-1 ring-violet-100">
                  {property.apartmentType}
                </span>
              </div>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
                {property.name}
              </h1>
              <p className="mt-4 flex max-w-2xl items-start gap-2 text-sm leading-6 text-slate-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#5b3df5]" />
                <span>
                  {property.address}, {property.location}
                </span>
              </p>
            </div>

            <div className="rounded-md bg-white p-5 shadow-sm ring-1 ring-violet-100">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Monthly rent
              </p>
              <p className="mt-2 text-3xl font-extrabold text-slate-950">
                {formatRent(property.rentAmount)}
              </p>
              <div className="mt-5 grid grid-cols-2 divide-x divide-violet-100 rounded-md bg-[#f6f3ff] p-4">
                <div>
                  <p className="text-2xl font-extrabold text-[#5b3df5]">
                    {property.occupanyRate ?? 0}%
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Occupancy
                  </p>
                </div>
                <div className="pl-4">
                  <p className="text-2xl font-extrabold text-[#5b3df5]">
                    {property.unit ?? 0}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Units
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:grid lg:grid-cols-[1fr_360px] lg:gap-10 lg:px-8">
        <div className="space-y-8">
          <section className="overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-slate-200">
            <div className="relative h-[360px] w-full bg-slate-100 sm:h-[520px]">
              <Image
                key={activeGalleryImage}
                src={activeGalleryImage}
                alt={property.name}
                fill
                sizes="(min-width: 1024px) 760px, 100vw"
                className="object-cover"
                priority
                unoptimized
                loading="eager"
              />
              {images.length > 0 && (
                <span className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-800 shadow-sm">
                  {activeImage + 1} / {images.length}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto p-3">
                {images.map((image: PropertyImages, index: number) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition ${
                      index === activeImage
                        ? "border-[#5b3df5]"
                        : "border-transparent opacity-65 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={`${property.name} preview ${index + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                      unoptimized
                      loading="eager"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-sm"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f0ecff] text-[#5b3df5]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xl font-extrabold text-slate-950">
                  {value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <section className="rounded-md border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <SectionTitle
              title="Property Overview"
              subtitle="Review the property details before booking a viewing."
            />
            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
              {property.description || "No description has been provided yet."}
            </p>
          </section>

          {amenities.length > 0 && (
            <section className="rounded-md border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <SectionTitle
                title="Amenities"
                subtitle={`${amenities.length} included with this property`}
              />
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {amenities.map((amenity: Amenity) => (
                  <AmenityItem
                    key={amenity.id}
                    icon={amenity.icon}
                    name={amenity.name}
                  />
                ))}
              </div>
            </section>
          )}

          {images.length > 1 && (
            <section className="rounded-md border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <SectionTitle title="Gallery" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {images.map((image: PropertyImages, index: number) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-md bg-slate-100"
                  >
                    <Image
                      src={image.url}
                      alt={`${property.name} gallery ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 380px, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                      unoptimized
                      loading="lazy"
                    />
                    {index === activeImage && (
                      <div className="absolute inset-0 ring-2 ring-inset ring-[#5b3df5]" />
                    )}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="mt-8 space-y-4 lg:mt-0">
          <div className="sticky top-6 rounded-md border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Viewing request
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                  {formatRent(property.rentAmount)}
                </h2>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusClass}`}
              >
                {property.status}
              </span>
            </div>

            <div className="mt-6 space-y-3 divide-y divide-slate-100">
              {summaryRows.map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-5 pt-3 text-sm">
                  <span className="font-medium text-slate-500">{label}</span>
                  <span className="text-right font-bold text-slate-800">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleBookViewing}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#5b3df5] text-sm font-bold text-white transition hover:bg-[#492bd8] active:scale-[0.98]"
              >
                <CalendarCheck className="h-4 w-4" />
                Book a Viewing
              </button>
              <Link
                href="/contact"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[#5b3df5] text-sm font-bold text-[#5b3df5] transition hover:bg-[#f6f3ff]"
              >
                <DoorOpen className="h-4 w-4" />
                Ask About Units
              </Link>
            </div>
          </div>

          {property.business && (
            <div className="rounded-md border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f0ecff] text-[#5b3df5]">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Listed by
                  </p>
                  <p className="mt-1 text-base font-extrabold text-slate-950">
                    {property.business.name}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {property.business.phone && (
                  <a
                    href={`tel:${property.business.phone}`}
                    className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-[#5b3df5]"
                  >
                    <Phone className="h-4 w-4" />
                    {property.business.phone}
                  </a>
                )}
                {property.business.email && (
                  <a
                    href={`mailto:${property.business.email}`}
                    className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-[#5b3df5]"
                  >
                    <Mail className="h-4 w-4" />
                    {property.business.email}
                  </a>
                )}
                {property.business.city && (
                  <p className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
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

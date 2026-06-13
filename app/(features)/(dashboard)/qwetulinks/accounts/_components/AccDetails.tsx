"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  Building2,
  Edit3,
  Globe,
  Mail,
  Phone,
  Store,
} from "lucide-react";
// import { Business } from "../definations";/
import { useBizDetails } from "../business.service";

// function findSeededBusiness(id: string) {
//   const decodedId = decodeURIComponent(id);

//   return (
//     seededBusinesses.find(
//       (business) =>
//         String(business.id) === decodedId ||
//         business.slug === decodedId ||
//         business.email === decodedId,
//     ) ?? {
//       ...seededBusinesses[0],
//       id: decodedId,
//       slug: decodedId,
//     }
//   );
// }

function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string | number | boolean | null;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-orange-100 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-slate-900">
        {typeof value === "boolean"
          ? value
            ? "Yes"
            : "No"
          : value || "Not set"}
      </p>
    </div>
  );
}

function DetailSection({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: typeof Store;
  items: Array<{ label: string; value?: string | number | boolean | null }>;
}) {
  return (
    <section className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
          <Icon size={18} />
        </div>
        <h2 className="text-base font-bold text-slate-950">{title}</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <DetailItem key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </section>
  );
}
type BusinessProps = {
  id: string;
};
export default function AccDetails({ id }: BusinessProps) {
  const { data: business, isError, isLoading,error } = useBizDetails(id);
  // const business: Business = data ?? findSeededBusiness(businessId);
  // const editId = encodeURIComponent(String(business.id ?? business.slug));
  console.log("Business Data", business);
  console.log({
  id,
  business,
  isLoading,
  isError,
  
});
console.log(error);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  return (
    <div className="min-h-full bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-6xl space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <Link
              href="/qwetulinks/accounts"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Back to accounts
            </Link>
            <div className="mt-4 flex min-w-0 items-start gap-3">
              <div
                className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-50 bg-cover bg-center text-base font-bold text-blue-600 ring-1 ring-orange-100"
                style={
                  business.avatar
                    ? { backgroundImage: `url("${business.avatar}")` }
                    : undefined
                }
              >
                {!business.avatar && business.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h1 className="break-words text-2xl font-bold text-blue-600 sm:text-3xl">
                  {business.name}
                </h1>
                <p className="mt-1 break-all text-sm text-slate-500">
                  {business.slug || business.username || business.email}
                </p>
                {isError && (
                  <p className="mt-2 text-xs font-medium text-amber-700">
                    Showing local account details because the API is not
                    available.
                  </p>
                )}
              </div>
            </div>
          </div>

          <Link
            href={`/qwetulinks/accounts/${business.id}/edit`}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
          >
            <Edit3 size={16} />
            Edit Business
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Status</p>
            <p className="mt-1 text-xl font-bold text-slate-950">
              {business.isActive ? "Active" : "Inactive"}
            </p>
          </div>
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">City</p>
            <p className="mt-1 break-words text-xl font-bold text-slate-950">
              {business.city || "Not set"}
            </p>
          </div>
          <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Industry</p>
            <p className="mt-1 break-words text-xl font-bold text-slate-950">
              {business.industry || "Not set"}
            </p>
          </div>
        </div>

        <DetailSection
          title="Business Information"
          icon={Store}
          items={[
            { label: "Business name", value: business.name },
            { label: "Slug", value: business.slug },
            { label: "Username", value: business.username },
            { label: "Industry", value: business.industry },
            { label: "Description", value: business.description },
            { label: "Active", value: business.isActive },
          ]}
        />

        <DetailSection
          title="Contact & Location"
          icon={Building2}
          items={[
            { label: "Email", value: business.email },
            { label: "Phone", value: business.phone },
            { label: "Website", value: business.website },
            { label: "Country", value: business.country },
            { label: "City", value: business.city },
            { label: "Address", value: business.address },
          ]}
        />

        <DetailSection
          title="Payments"
          icon={Banknote}
          items={[
            { label: "Bank name", value: business.bankName },
            { label: "Bank account", value: business.bankAccountNumber },
            { label: "Mpesa paybill", value: business.mpesaPaybill },
            { label: "Mpesa account", value: business.mpesaAccountNumber },
            { label: "Mpesa till", value: business.mpesaTillNo },
          ]}
        />

        <div className="grid gap-3 sm:grid-cols-4">
          <a
            href={`mailto:${business.email}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <Mail size={16} />
            Email
          </a>
          <a
            href={`tel:${business.phone}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <Phone size={16} />
            Call
          </a>
          <a
            href={business.website || "#"}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <Globe size={16} />
            Website
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Store,
} from "lucide-react";
import { Business } from "../definations";
import { useBusinesses } from "../business.service";
import { StatCard } from "./StatCard";
import { StatusPills } from "./AccStatusPill";
// import { BusinessActions } from "./ActionBtns";

function businessKey(business: Business) {
  return String(business.id ?? business.slug ?? business.email);
}


function BusinessIdentity({ business }: { business: Business }) {
  const initials = business.name.slice(0, 2).toUpperCase();

  return (
    <div className="flex min-w-0 items-start gap-3">
      <div
        className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-50 bg-cover bg-center text-sm font-bold text-blue-600 ring-1 ring-orange-100"
        style={
          business.avatar
            ? { backgroundImage: `url("${business.avatar}")` }
            : undefined
        }
      >
        {!business.avatar && initials}
      </div>
      <div className="min-w-0">
        <p className="break-words font-semibold text-slate-950">
          {business.name}
        </p>
        <p className="mt-0.5 break-all text-xs text-slate-500">
          {business.slug || business.username || businessKey(business)}
        </p>
      </div>
    </div>
  );
}


export default function AccManagement() {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError } = useBusinesses();
  const businesses = useMemo(() => data ?? [], [data]);

  const filteredBusinesses = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return businesses;

    return businesses.filter((business) =>
      [
        business.name,
        business.slug,
        business.username,
        business.email,
        business.phone,
        business.city,
        business.country,
        business.industry,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search)),
    );
  }, [businesses, query]);

  const activeCount = businesses.filter(
    (business) => business.isActive,
  ).length;

  return (
    <div className="min-h-full overflow-x-hidden bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-7xl space-y-5 lg:space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-blue-600 sm:text-3xl">
              <Store size={26} />
              Business Accounts
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-500">
              View, edit, and verify Qwetu Links business accounts.
            </p>
          </div>
          <Link
            href="/qwetulinks/accounts/new"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
          >
            <Plus size={16} />
            Add Business
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Businesses" value={businesses.length} icon={Store} />
          <StatCard label="Active" value={activeCount} icon={ShieldCheck} />
        </div>

        <div className="rounded-lg border border-orange-100 bg-white p-3 shadow-sm sm:p-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search businesses..."
              className="h-10 w-full rounded-lg border border-orange-100 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="grid gap-3 xl:hidden">
          {filteredBusinesses.map((business) => (
            <article
              key={businessKey(business)}
              className="rounded-lg border border-orange-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <BusinessIdentity business={business} />
                {/* <BusinessActions business={business} /> */}
              </div>

              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                <StatusPills business={business} />
                <p className="flex items-center gap-2 break-all">
                  <Mail size={14} />
                  {business.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={14} />
                  {business.phone}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Location
                    </p>
                    <p className="mt-1 break-words font-medium text-slate-800">
                      {business.city}, {business.country || "Kenya"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Industry
                    </p>
                    <p className="mt-1 break-words font-medium text-slate-800">
                      {business.industry || "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden overflow-hidden rounded-lg border border-orange-100 bg-white shadow-sm xl:block">
          <table className="w-full table-fixed text-left text-sm">
            <thead className="border-b border-orange-100 bg-orange-50/70 text-xs uppercase text-slate-500">
              <tr>
                <th className="w-[24%] px-4 py-3 font-semibold">Business</th>
                <th className="w-[22%] px-4 py-3 font-semibold">Contact</th>
                <th className="w-[18%] px-4 py-3 font-semibold">Location</th>
                <th className="w-[16%] px-4 py-3 font-semibold">Industry</th>
                <th className="w-[12%] px-4 py-3 font-semibold">Status</th>
                <th className="w-[8%] px-4 py-3 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100">
              {filteredBusinesses.map((business) => (
                <tr
                  key={businessKey(business)}
                  className="align-top transition hover:bg-slate-50"
                >
                  <td className="px-4 py-4">
                    <BusinessIdentity business={business} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1 text-slate-600">
                      <p className="flex items-center gap-2 break-all">
                        <Mail size={14} />
                        {business.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={14} />
                        {business.phone}
                      </p>
                      {business.website && (
                        <p className="flex items-center gap-2 break-all">
                          <Globe size={14} />
                          {business.website}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    <p className="flex items-center gap-2 break-words">
                      <MapPin size={14} />
                      {business.city}, {business.country || "Kenya"}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    <p className="flex items-center gap-2 break-words">
                      <Building2 size={14} />
                      {business.industry || "Not set"}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <StatusPills business={business} />
                  </td>
                  <td className="px-4 py-4">
                    {/* <BusinessActions business={business} /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isLoading && (
          <div className="rounded-lg border border-orange-100 bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
            Loading business accounts...
          </div>
        )}

        {!isLoading && filteredBusinesses.length === 0 && (
          <div className="rounded-lg border border-orange-100 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-800">
              No businesses found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try another search or add a new business account.
            </p>
          </div>
        )}

        {isError && (
          <p className="mt-2 text-xs font-medium text-amber-700">
            Something went wrong , please try again letter
          </p>
        )}
      </div>
    </div>
  );
}

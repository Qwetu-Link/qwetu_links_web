"use client";

import { useDashboardStats } from "@/hooks/useDashboard";
import {
  BadgeDollarSign,
  BookOpen,
  Building2,
  FileCheck,
  FileClock,
  FileX,
  Home,
  Layers,
  Settings,
  Users,
  Wallet,
  WrenchIcon,
} from "lucide-react";

// ── Skeleton ────────────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-slate-200 ${className ?? ""}`} />
  );
}

// ── Stat card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  accent?: string; // tailwind bg class for the icon pill
  sub?: { label: string; value: number | string }[];
}

function StatCard({ label, value, icon: Icon, accent = "bg-orange-50 text-rental-primary", sub }: StatCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-slate-100 bg-white p-5 shadow-xs">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>
          <p className="mt-1.5 text-3xl font-bold text-brand-dark">{value}</p>
        </div>
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>

      {sub && sub.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-slate-50 pt-3">
          {sub.map((s) => (
            <p key={s.label} className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{s.value}</span>{" "}
              {s.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Finance card (wider treatment) ──────────────────────────────────────────
interface FinanceRowProps {
  label: string;
  value: number;
  icon: React.ElementType;
  valueClass?: string;
}

function FinanceRow({ label, value, icon: Icon, valueClass = "text-slate-800" }: FinanceRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2.5 text-sm text-slate-500">
        <Icon className="h-4 w-4 shrink-0 text-slate-400" />
        {label}
      </div>
      <p className={`text-sm font-bold ${valueClass}`}>
        KES {value.toLocaleString("en-KE")}
      </p>
    </div>
  );
}

// ── Skeleton grid ────────────────────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-8 w-16" />
            <Skeleton className="mt-4 h-3 w-32" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboardStats();

  if (isLoading) return (
    <main className="min-h-screen bg-[#F7F8FA] px-4 py-10 sm:px-6 lg:px-8">
      <DashboardSkeleton />
    </main>
  );

  if (isError || !data) return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F8FA]">
      <div className="text-center">
        <p className="text-sm text-slate-500">Failed to load dashboard data.</p>
        <button
          onClick={() => refetch()}
          className="mt-3 rounded-lg bg-rental-primary px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Retry
        </button>
      </div>
    </main>
  );

  const { properties, units, tenants, staff, finance, customerActivity } = data;

  return (
    <main className="min-h-screen bg-[#F7F8FA] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-1 self-stretch rounded-full bg-rental-primary" />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-rental-primary">
              Overview
            </p>
            <h1 className="mt-0.5 text-2xl font-bold text-brand-dark sm:text-3xl">
              Dashboard
            </h1>
          </div>
        </div>

        {/* Row 1 — top-level counts */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Properties"
            value={properties.total}
            icon={Building2}
            accent="bg-orange-50 text-rental-primary"
            sub={[
              { label: "available", value: properties.available },
              { label: "reserved", value: properties.reserved },
              { label: "maintenance", value: properties.maintenance },
            ]}
          />
          <StatCard
            label="Units"
            value={units.total}
            icon={Home}
            accent="bg-sky-50 text-sky-600"
            sub={[
              { label: "available", value: units.available },
              { label: "occupied", value: units.occupied },
              { label: "vacant", value: units.vacant },
            ]}
          />
          <StatCard
            label="Tenants"
            value={tenants.total}
            icon={Users}
            accent="bg-emerald-50 text-emerald-600"
            sub={[
              { label: "active", value: tenants.active },
            ]}
          />
          <StatCard
            label="Staff"
            value={staff.total}
            icon={Settings}
            accent="bg-violet-50 text-violet-600"
          />
        </div>

        {/* Row 2 — Finance + Activity */}
        <div className="grid gap-4 lg:grid-cols-2">

          {/* Finance card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-rental-primary">
                <Wallet className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Finance
                </p>
                <h2 className="text-base font-bold text-brand-dark">
                  Payments & Invoices
                </h2>
              </div>
            </div>

            <div className="mt-2 divide-y divide-slate-50">
              <FinanceRow
                label="Payments received"
                value={finance.paymentsReceived}
                icon={BadgeDollarSign}
                valueClass="text-emerald-600"
              />
              <FinanceRow
                label="Paid invoices"
                value={finance.paidInvoices}
                icon={FileCheck}
                valueClass="text-emerald-600"
              />
              <FinanceRow
                label="Pending invoices"
                value={finance.pendingInvoices}
                icon={FileClock}
                valueClass="text-amber-600"
              />
              <FinanceRow
                label="Overdue invoices"
                value={finance.overdueInvoices}
                icon={FileX}
                valueClass="text-red-500"
              />
            </div>
          </div>

          {/* Activity card */}
          <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Layers className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Activity
                </p>
                <h2 className="text-base font-bold text-brand-dark">
                  Customer Activity
                </h2>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-lg bg-slate-50 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-rental-primary">
                  <BookOpen className="h-4 w-4" />
                </span>
                <p className="text-sm font-medium text-slate-600">Viewing bookings</p>
              </div>
              <p className="text-2xl font-bold text-brand-dark">
                {customerActivity.bookings}
              </p>
            </div>

            {/* Placeholder for future activity metrics */}
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-slate-200 px-5 py-4">
              <WrenchIcon className="h-4 w-4 text-slate-300" />
              <p className="text-xs text-slate-400">More activity metrics coming soon</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
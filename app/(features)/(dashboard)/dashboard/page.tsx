"use client";

import { JSX, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { Role } from "@/app/(features)/(auth)/definitions";
import AdminDashboard from "./_pages/admindashboard";
import LandlordDashboard from "./_pages/landlorddashboard";
// import CaretakerDashboard from "./_pages/caretakerdashboard";
import TenantDashboard from "./_pages/tenantdashboard";
import QwetuDashboard from "./_pages/qwetudashboard";

// Lazy map of role to dashboard component
const DASHBOARD_MAP: Record<Role, () => JSX.Element> = {
  owner: () => <AdminDashboard />,
  staff: () => <LandlordDashboard />,
  // caretaker: () => <CaretakerDashboard />,
  tenant: () => <TenantDashboard />,
  qwetulinks:()=> <QwetuDashboard/>
};

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  // Defense-in-depth: middleware is the real guard,
  // this catches edge cases like a manual store wipe
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  // Avoid flash of broken UI while redirect fires
  if (!user) return null;

  const DashboardComponent = DASHBOARD_MAP[user.userType];

  // Role from API doesn't match any known role
  if (!DashboardComponent) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600 font-medium">
            Unknown role: <code>{user.userType}</code>
          </p>
          <p className="text-sm text-red-400 mt-1">Please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full w-full flex-col">
      <DashboardComponent />
    </div>
  );
}
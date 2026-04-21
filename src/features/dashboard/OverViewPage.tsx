import { useAuth } from "@/hooks/useAuth";
import TenantDashboard from "./pages/TenantDashboard";
import CaretakerDashboard from "./pages/CaretakerDashboard";
import LandlordDashboard from "./pages/LandlordDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import type { ReactNode } from "react";
import type { Role } from "../auth/auth.types";


const dashboards: Record<Role, ReactNode> = {
  admin: <AdminDashboard />,
  landlord: <LandlordDashboard />,
  caretaker: <CaretakerDashboard />,
  tenant: <TenantDashboard />,
};

function getDashboard(role: Role) {
  return dashboards[role];
}

export default function OverViewPage() {
  const { user } = useAuth();

  const currentUserRole: Role = user?.role ?? "tenant";

  return getDashboard(currentUserRole);
}

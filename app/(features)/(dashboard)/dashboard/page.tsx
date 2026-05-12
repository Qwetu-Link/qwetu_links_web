import AdminDashboard from "./_pages/admindashboard";
import LandlordDashboard from "./_pages/landlorddashboard";
import CaretakerDashboard from "./_pages/caretakerdashboard";
import TenantDashboard from "./_pages/tenantdashboard";
import { ReactNode } from "react";

type Role = "admin" | "landlord" | "caretaker" | "tenant";

const dashboards: Record<Role, ReactNode> = {
  admin: <AdminDashboard />,
  landlord: <LandlordDashboard />,
  caretaker: <CaretakerDashboard />,
  tenant: <TenantDashboard />,
};

function getDashboard(role: Role) {
  return dashboards[role];
}

export default function Page() {
  // const { user } = useAuth();

  // const currentUserRole: Role = user?.role ?? "tenant";
  const currentUserRole: Role = "admin";  // later get from auth user

  return getDashboard(currentUserRole);
}

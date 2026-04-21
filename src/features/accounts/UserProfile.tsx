import type { ReactNode } from "react";
import type { Role } from "../auth/auth.types";
import AdminProfile from "./profiles/AdminProfile";
import LandlordProfile from "./profiles/LandlordProfile";
import CaretakerProfile from "./profiles/CaretakerProfile";
import TenantProfile from "./profiles/TenantProfile";
import { useAuth } from "@/hooks/useAuth";

const profile: Record<Role, ReactNode> = {
  admin: <AdminProfile />,
  landlord: <LandlordProfile />,
  caretaker: <CaretakerProfile />,
  tenant: <TenantProfile />,
};

function getProfile(role: Role) {
  return profile[role];
}

export default function UserProfile() {
  const { user } = useAuth();

  const currentUserRole: Role = user?.role ?? "tenant";

  return getProfile(currentUserRole);
}

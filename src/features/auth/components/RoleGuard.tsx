import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const RoleGuard = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAuth();
  const isAllowed = user && allowedRoles.includes(user.role);
  return isAllowed ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

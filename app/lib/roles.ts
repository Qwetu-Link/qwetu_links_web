import { Role } from "@/app/(features)/(auth)/definitions";

// Where each role lands after login
export const ROLE_DASHBOARDS: Record<Role, string> = {
  owner: "/dashboard",
  staff: "/dashboard",
  caretaker: "/dashboard",
  tenant: "/dashboard",
  
};

export const ROLE_MAINTENANCE_PATHS: Record<Role, string> = {
  owner: "/admin/maintenance",
  staff: "/landlord/maintenance",
  caretaker: "/caretaker/maintenance",
  tenant: "/tenant/maintenance",
};

// Which roles are permitted on each path prefix
// More permissive roles listed first
export const ROLE_PATH_PERMISSIONS: Record<string, Role[]> = {
  "/dashboard": ["owner", "staff", "caretaker", "tenant"],
  "/maintenance": ["owner", "staff", "caretaker", "tenant"],
  "/admin": ["owner"],
  "/landlord": ["staff"],
  "/caretaker": ["caretaker"],
  "/tenant": ["tenant"],
  "/help": ["owner", "staff", "caretaker", "tenant"],
};

export function getDashboardForRole(role: Role): string {
  return ROLE_DASHBOARDS[role] ?? "/login";
}

export function getMaintenanceForRole(role: Role): string {
  return ROLE_MAINTENANCE_PATHS[role] ?? "/dashboard";
}

export function isRoleAllowedOnPath(role: Role, pathname: string): boolean {
  for (const [prefix, allowedRoles] of Object.entries(ROLE_PATH_PERMISSIONS)) {
    if (pathname.startsWith(prefix)) {
      return allowedRoles.includes(role);
    }
  }
  // No rule matched — allow (public/unprotected path)
  return true;
}

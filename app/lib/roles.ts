import { Role } from "@/app/(features)/(auth)/definitions";

// Where each user type lands after login
export const USER_TYPE_DASHBOARDS: Record<Role, string> = {
  owner: "/dashboard",
  staff: "/dashboard",
  // caretaker: "/dashboard",
  tenant: "/dashboard",
  qwetulinks: "/dashboard",
};

export const USER_TYPE_MAINTENANCE_PATHS: Record<Role, string> = {
  owner: "/admin/maintenance",
  staff: "/landlord/maintenance",
  // caretaker: "/caretaker/maintenance",
  tenant: "/tenant/maintenance",
  qwetulinks: "/dashboard",
};


export const USER_TYPE_PATH_PERMISSIONS: Record<string, Role[]> = {
  "/dashboard": ["owner", "staff", "tenant", "qwetulinks"],
  "/maintenance": ["owner", "staff", "tenant"],
  "/admin": ["owner"],
  "/landlord": ["staff"],
  // "/caretaker": ["caretaker"],
  "/tenant": ["tenant"],
  "/qwetulinks": ["qwetulinks"],
  "/help": ["owner", "staff", "tenant", "qwetulinks"],
};

export function getDashboardForRole(usertype: Role): string {
  return USER_TYPE_DASHBOARDS[usertype] ?? "/login";
}

export function getMaintenanceForRole(usertype: Role): string {
  return USER_TYPE_MAINTENANCE_PATHS[usertype] ?? "/dashboard";
}

export function isRoleAllowedOnPath(usertype: Role, pathname: string): boolean {
  for (const [prefix, allowedUser] of Object.entries(USER_TYPE_PATH_PERMISSIONS)) {
    if (pathname.startsWith(prefix)) {
      return allowedUser.includes(usertype);
    }
  }
  // No rule matched — allow (public/unprotected path)
  return true;
}

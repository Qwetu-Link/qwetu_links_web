import { Role } from "@/types/auth.definitions";

// Where each user type lands after login
export const USER_TYPE_DASHBOARDS: Record<Role, string> = {
  owner: "/dashboard",
  qwetulinks: "/dashboard",
};

export const ROLE_LABELS: Record<Role, string> = {
  owner: "Administrator",
  qwetulinks: "Qwetu Links",
};

export const USER_TYPE_MAINTENANCE_PATHS: Record<Role, string> = {
  owner: "/admin/maintenance",
  qwetulinks: "/dashboard",
};


export const USER_TYPE_PATH_PERMISSIONS: Record<string, Role[]> = {
  "/dashboard": ["owner", "qwetulinks"],
  "/maintenance": ["owner"],
  "/admin": ["owner"],
  "/qwetulinks": ["qwetulinks"],
  "/help": ["owner", "qwetulinks"],
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

// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getDashboardForRole, isRoleAllowedOnPath } from "@/utils/roles";
import { Role } from "./types/auth.definitions";

const PUBLIC_PATHS = [
  "/",
  "/about",
  "/contact",
  "/forget-password",
  "/login",
  "/overview",
  "/property",
  "/register",
  "/reset-password",
  "/services",
  "/setup-business",
  "/verify-email",
];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((path) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  });
}

interface PersistedAuthState {
  user: { userType: Role } | null;
  token: string | null;
}

function getAuthFromCookies(request: NextRequest): PersistedAuthState | null {
  const raw = request.cookies.get("auth-store")?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    // Zustand persist wraps state under a "state" key
    return parsed?.state ?? null;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Always allow public paths through
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const auth = getAuthFromCookies(request);

  // 2. Not authenticated → send to login
  if (!auth?.user || !auth?.token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = auth.user.userType;

  // 3. Role not allowed on this path → redirect to their own dashboard
  if (!isRoleAllowedOnPath(userRole, pathname)) {
    const ownDashboard = getDashboardForRole(userRole);
    return NextResponse.redirect(new URL(ownDashboard, request.url));
  }

  // 4. All checks passed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all paths except Next.js internals and static files
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};

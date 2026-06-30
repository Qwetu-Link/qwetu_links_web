import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

/**
 * Create axios instance with default configuration
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const isBrowser = typeof window !== "undefined";

// ── Helper: read and parse the auth cookie ──────────────────────────────────
function getAuthCookie(): { token: string | null } {
  if (!isBrowser) return { token: null };
  try {
    const raw = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth-store="))
      ?.split("=")
      .slice(1)
      .join("=");

    if (!raw) return { token: null };

    const parsed = JSON.parse(decodeURIComponent(raw));
    return { token: parsed?.state?.token ?? null };
  } catch {
    return { token: null };
  }
}

// ── Request interceptor: attach Bearer token from cookie ────────────────────
api.interceptors.request.use((config) => {
  const { token } = getAuthCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: handle expired / invalid token ────────────────────
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    if (status === 401 && url?.includes("/login")) {
      return Promise.reject(error);

    }

    const { logout, token } = useAuthStore.getState();

    // Only logout if user was actually logged in
    if (status === 401 && token) {
      logout();
    }

    return Promise.reject(error);
  }
);

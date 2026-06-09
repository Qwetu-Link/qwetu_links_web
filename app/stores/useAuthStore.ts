import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/app/(features)/(auth)/definitions";
import { getDashboardForRole } from "../lib/roles";
import { createCookieStorage } from "./cookie-storage";

interface AuthState {
  // User data
  user: User | null;
  token: string | null;

  // Auth methods
  setAuthData: (user: User, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;

  // Getters
  isAuthenticated: () => boolean;
  getRedirectPath: () => string;
}

type PersistedAuthState = Pick<AuthState, "user" | "token">;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      /**
       * Set user authentication data after login/register
       * @param user - Authenticated user
       * @param token - Auth token from server
       */
      setAuthData: (user, token) => {
        set({
          user,
          token,
        });
      },

      /**
       * Update user data (after profile update)
       * @param user - Updated user object
       */
      setUser: (user) => {
        set({ user });
      },

      /**
       * Clear all auth data on logout
       */
      logout: () => {
        set({
          user: null,
          token: null,
        });
      },

      /**
       * Check if user is authenticated
       */
      isAuthenticated: () => {
        const { user, token } = get();
        return !!user && !!token;
      },

      getRedirectPath: () => {
        const { user } = get();
        if (!user) return "/login";
        return getDashboardForRole(user.userType);
      },
    }),
    {
      name: "auth-store",
      storage: createCookieStorage<PersistedAuthState>(),
      partialize: (state): PersistedAuthState => ({
        user: state.user,
        token: state.token,
      }),
      version: 1,
    },
  ),
);

// Export selector hooks for better performance
export const useUser = () => useAuthStore((state) => state.user);
export const useAuthToken = () => useAuthStore((state) => state.token);

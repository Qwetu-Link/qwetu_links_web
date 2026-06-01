import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyEmail,
} from "./auth.endpoints";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/useAuthStore";

export const authQueryKeys = {
  all: ["auth"] as const,
  user: () => [...authQueryKeys.all, "user"] as const,
};

/**
 * Mutation: Login with email and password
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAuthData, getRedirectPath } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      // 1. Persist user + token
      setAuthData(data.user, data.token);

      // 2. Cache user in React Query
      queryClient.setQueryData(authQueryKeys.user(), data.user);

      // 3. Redirect to the role-specific dashboard
      //    getRedirectPath() reads the role we just set above
      const path = getRedirectPath();
      router.push(path);
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

/**
 * Mutation: Register a business
 */
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

/**
 * Mutation: Verify Email
 */
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};

/**
 * Mutation: Request password reset email/code
 */
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

/**
 * Mutation: Reset Password
 */

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};

/**
 * Mutation: Logout a user
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      logout();
      queryClient.clear();
      router.replace("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};

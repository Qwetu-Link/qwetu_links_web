import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBusiness,
  getBusinesses,
  registerUser,
  updateBusiness,
  verifyEmail,
} from "./business.endpoints";

export const businessQueryKeys = {
  all: ["businesses"] as const,
  list: () => [...businessQueryKeys.all, "list"] as const,
  detail: (id: string) => [...businessQueryKeys.all, "detail", id] as const,
};

export const useBusinesses = () => {
  return useQuery({
    queryKey: businessQueryKeys.list(),
    queryFn: getBusinesses,
  });
};

export const useBusiness = (id: string) => {
  return useQuery({
    queryKey: businessQueryKeys.detail(id),
    queryFn: () => getBusiness(id),
    enabled: Boolean(id),
  });
};

/**
 * Mutation: Register a business
 */
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: businessQueryKeys.all });
    },
  });
};

export const useUpdateBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBusiness,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: businessQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: businessQueryKeys.detail(variables.id),
      });
    },
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

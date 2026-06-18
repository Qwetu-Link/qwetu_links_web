import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBizDetails,
  getBusinesses,
  registerBiz,
  updateBusiness,
  verifyEmail,
} from "./business.endpoints";

export const businessQueryKeys = {
  all: ["businesses"] as const,
  list: () => [...businessQueryKeys.all, "list"] as const,
  detail: (id: string) => [...businessQueryKeys.all, "detail", id] as const,
};

//get all businesses
export const useBusinesses = () => {
  return useQuery({
    queryKey: businessQueryKeys.list(),
    queryFn: getBusinesses,
    retry: 2,
  });
};

//get business by id
export const useBizDetails = (id: string) => {
  const decodedId = decodeURIComponent(id);
  return useQuery({
    queryKey: businessQueryKeys.detail(decodedId),
    queryFn: () => getBizDetails(decodedId),
    enabled: !!decodedId,
  });
};

/**
 * Mutation: Register a business
 */
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerBiz,
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

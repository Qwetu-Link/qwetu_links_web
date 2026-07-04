import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTenant, deleteTenant, getTenants, tenantDetails, updateTenant } from "../services/tenant.endpoint"
import { toast } from "sonner"

export const tenantKeys = {
    all: ["tenants"] as const,
    list: (page: number, search: string) => [...tenantKeys.all, page, search] as const,
    detail: (id: string) => [...tenantKeys.all, "detail", id] as const,
}

export const useGetTenants = (page: number, search: string) => {
    return useQuery({
        queryKey: tenantKeys.list(page, search),
        queryFn: () => getTenants(page, search),
        staleTime: 1000 * 60 * 5,
        retry: 2,
        placeholderData: (previousData) => previousData,
    })
}

export const useGetTenantDetails = (id: string) => {
    return useQuery({
        queryKey: tenantKeys.detail(id),
        queryFn: () => tenantDetails({ id }),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

export const useCreateTenants = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTenant,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: tenantKeys.all
            })
        }
    })
}

export const useUpdateTenants = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTenant,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: tenantKeys.all
            })
        }
    })
}

// export const useDelTenants = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: deleteTenant,

//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: tenantKeys.all
//             })
//         }
//     })
// }

export const useDelTenants = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTenant,
        onSuccess: (result) => {
            // Invalidate your cache so the lists refresh
            queryClient.invalidateQueries({
                queryKey: tenantKeys.all
            });

            // Handle custom user alerts based on what the service encountered
            if (result?.mediaDeleted === false) {
                toast.warning("Tenant deleted, but failed to remove the associated avatar image.");
            } else {
                toast.success("Tenant deleted successfully.");
            }
        },
        onError: () => {
            toast.error("Failed to delete tenant. Please try again.");
        }
    });
};
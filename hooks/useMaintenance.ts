import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { createMaintenance, deleteMaintenance, getMaintenances, maintenanceDetails, updateMaintenance } from "../services/maintenance.endpoint"


export const maintenancekeys = {
    all: ["maintenance"] as const,
    list: (page: number) => [...maintenancekeys.all, page] as const,
    detail: (id: string) => [...maintenancekeys.all, "detail", id] as const,
}

export const useGetMaintenances = (page = 1) => {
    return useSuspenseQuery({
        queryKey: maintenancekeys.list(page),
        queryFn: () => getMaintenances(page),
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

export const useGetPropertyMaintenance = () => {
    return useQuery({
        queryKey: maintenancekeys.all,
        queryFn: () => getMaintenances(),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
    });
};



export const useGetMaintenanceDetails = (id: string) => {
    return useQuery({
        queryKey: maintenancekeys.detail(id),
        queryFn: () => maintenanceDetails({ id }),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

export const useCreateMaintenances = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createMaintenance,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: maintenancekeys.all
            })
        }
    })
}

export const useUpdateMaintenance = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateMaintenance,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: maintenancekeys.all
            })
        }
    })
}

export const useDelMaintenances = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMaintenance,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: maintenancekeys.all
            })
        }
    })
}
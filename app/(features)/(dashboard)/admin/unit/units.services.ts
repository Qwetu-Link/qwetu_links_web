import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUnit, deleteUnit, unitDetails, updateUnit } from "./units.endpoints";
import { useRouter } from "next/navigation";
import { propertykeys } from "../property/property.services";

export const unitKeys = {
    all: ["units"] as const,
    list: (page: number) => [...unitKeys.all, page] as const,
    detail: (id: string) => [...unitKeys.all, , "detail", id] as const,
};

// export const useGetUnits = (page = 1) => {
//     return useQuery({
//         queryKey: unitKeys.list(page),
//         queryFn: () => getUnits(page),
//         staleTime: 1000 * 60 * 5,
//         gcTime: 1000 * 60 * 30,
//     });
// }

export const useUnitDetails = (id: string) => {
    return useQuery({
        queryKey: unitKeys.detail(id),
        queryFn: () => unitDetails({ id }),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

export const useCreateUnit = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: createUnit,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: unitKeys.all
            })
            router.push("/admin/unit");
        }
    })
}

export const useUpdateUnit = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: updateUnit,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: unitKeys.all
            });
            router.push("/admin/unit");
        },

    })
}

export const useUnitDel = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUnit,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: unitKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: propertykeys.all
            })
        },
    });
};

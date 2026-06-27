import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAmenity, delAmenity, getAmenities, updateAmenity } from "../services/amenities.endpoints";


export const amenityKeys = {
    all: ["amenities"] as const,
    list: (page: number) => [...amenityKeys.all, page] as const,
};

export const useGetAmenities = (page = 1) => {
    return useQuery({
        queryKey: amenityKeys.list(page),
        queryFn: () => getAmenities(page),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
}

// Hook — fetch ALL amenities once, never search the DB
export const useGetPropertyAmenities = () => {
    return useQuery({
        queryKey: amenityKeys.all,
        queryFn: () => getAmenities(),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
    });
};

export const useCreateAmenity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAmenity,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: amenityKeys.all
            })
        }
    })
}

export const useUpdateAmenity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAmenity,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: amenityKeys.all
            });
        },
    })
}

export const useAmenityDel = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: delAmenity,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: amenityKeys.all
            });
        },
    });
};

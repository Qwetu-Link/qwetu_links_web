import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createAmenity, delAmenity, getAmenities, updateAmenity } from "./amenities.endpoints";


export const amenityKeys = {
    all: ["amenities"] as const,
    list: (page: number) => [...amenityKeys.all, page] as const,
};

export const useGetAmenities = (page = 1) =>
    useSuspenseQuery({
        queryKey: amenityKeys.list(page),
        queryFn: () => getAmenities(page),
        // placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });

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

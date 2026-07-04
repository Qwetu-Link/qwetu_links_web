import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAmenity, delAmenity, getAmenities, updateAmenity } from "../services/amenities.endpoints";


export const amenityKeys = {
    all: ["amenities"] as const,
    list: (page: number, search:string) => [...amenityKeys.all, page, search] as const,
};


export const useGetAmenities = (page :number, search: string) => {
    return useQuery({
        queryKey: amenityKeys.list(page, search),
        queryFn: () => getAmenities(page,search),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        placeholderData: (previousData) => previousData,
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

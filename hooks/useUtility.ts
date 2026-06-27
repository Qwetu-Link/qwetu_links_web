import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createUtility, deleteUtility, getUtility, updateUtility } from "../services/utility.endpoints";
import { useRouter } from "next/navigation";


export const utilityKeys = {
    all: ["utilities"] as const,
    list: (page: number) => [...utilityKeys.all, page] as const,
};

// export function useUtilities(propertyId: string, search = "") {
//     return useQuery<UtilitiesResponse>({
//         queryKey: utilityKeys.lists(propertyId, search),
//         queryFn: async () => {
//             const params = new URLSearchParams({ propertyID: propertyId, search });
//             const res = await fetch(`${API_URL}?${params.toString()}`);
//             if (!res.ok) throw new Error("Failed to fetch utilities");
//             return res.json();
//         },
//         enabled: !!propertyId,
//     });
// }

export const useUtilities = (page = 1) => {
    return useSuspenseQuery({
        queryKey: utilityKeys.list(page),
        queryFn: () => getUtility(page),
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

export function useCreateUtility() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: createUtility,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: utilityKeys.all })
            router.push("/admin/utilities")
        },

    });
}

export function useUpdateUtility() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: updateUtility,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: utilityKeys.all })
            router.push("/admin/utilities");
        },
    });
}

export function useDeleteUtility() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUtility,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: utilityKeys.all });
        },
    });
}
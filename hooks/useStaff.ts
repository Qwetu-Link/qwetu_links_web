import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createStaff, deleteStaff, getStaffs, staffDetails, updateStaff } from "../services/staff.endpoint"

export const staffKeys = {
    all: ["staff"] as const,
    list: (page: number, search: string) => [...staffKeys.all, page, search] as const,
    detail: (id: string) => [...staffKeys.all, "detail", id] as const,
}

export const useGetStaffs = (page = 1, search = "") => {
    return useQuery({
        queryKey: staffKeys.list(page, search),
        queryFn: () => getStaffs(page, search),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        placeholderData: (previousData) => previousData, // keep old rows visible while refetching
    });
};

export const useGetStaffDetails = (id: string) => {
    return useQuery({
        queryKey: staffKeys.detail(id),
        queryFn: () => staffDetails({ id }),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

export const useCreateStaff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createStaff,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: staffKeys.all
            })
        }
    })
}

export const useUpdateStaff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateStaff,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: staffKeys.all
            })
        }
    })
}


export const useDelStaff = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteStaff,
        onSuccess: (result) => {
            // Invalidate your cache so the lists refresh
            queryClient.invalidateQueries({
                queryKey: staffKeys.all
            });

            // Handle custom user alerts based on what the service encountered
            if (result?.mediaDeleted === false) {
                toast.warning("Staff deleted, but failed to remove the associated avatar image.");
            } else {
                toast.success("Staff deleted successfully.");
            }
        },
        onError: () => {
            toast.error("Failed to delete staff. Please try again.");
        }
    });
};
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { createStaff, deleteStaff, getStaffs, staffDetails, updateStaff } from "../services/staff.endpoint"

export const staffKeys = {
    all: ["staff"] as const,
    list: (page: number) => [...staffKeys.all, page] as const,
    detail: (id: string) => [...staffKeys.all, "detail", id] as const,
}

export const useGetStaffs = (page = 1) => {
    return useSuspenseQuery({
        queryKey: staffKeys.list(page),
        queryFn: () => getStaffs(page),
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

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
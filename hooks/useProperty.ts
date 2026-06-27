import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { createProperty, deleteProperty, getProperties, getPublicProperties, propertyDetails, propertyPublicDetails, propertyPublicSlugDetails, updateProperty } from "../services/property.endpoints"
import { PropertyData } from "../types/property.definations"

export const propertykeys = {
    all: ["properties"] as const,
    list: (page: number) => [...propertykeys.all, page] as const,
    detail: (id: string) => [...propertykeys.all, "detail", id] as const,
    public: ["pproperties"] as const,
    pslug: (slug: string) => [...propertykeys.public, slug] as const,
    publiclist: (page: number) => [...propertykeys.public, page] as const,
}

export const useGetProperties = (page = 1) => {
    return useSuspenseQuery({
        queryKey: propertykeys.list(page),
        queryFn: () => getProperties(page),
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

export const useGetPropertyDetails = (id: string) => {
    return useQuery({
        queryKey: propertykeys.detail(id),
        queryFn: () => propertyDetails({ id }),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

// export const useGetproperty = () => {
//     useQuery({
//         queryKey: propertykeys.all,
//         queryFn: () => propertyDetails,
//         staleTime: 1000 * 60 * 5,
//         retry: 2,

//     })
// }

export const useCreateProperty = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: propertykeys.all
            })
        }
    })
}

export const useUpdateProperty = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: propertykeys.all
            })
        }
    })
}

export const useDelProperty = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: propertykeys.all
            })
        }
    })
}

// PUBLIC ENDPOINTS

export const usePublicProperties = (page = 1) => {
    return useQuery({
        queryKey: propertykeys.publiclist(page),
        queryFn: () => getPublicProperties(page),
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}

export const useGetPublicProperty = () => {
    return useQuery({
        queryKey: propertykeys.public,
        queryFn: () => propertyPublicDetails,
        staleTime: 1000 * 60 * 5,
        retry: 2,

    })
}

export const useGetPublicSlugProperty = (slug: string) => {
    return useQuery<{ data: PropertyData }>({
        queryKey: propertykeys.pslug(slug),
        queryFn: () => propertyPublicSlugDetails({ slug }),
        staleTime: 1000 * 60 * 5,
        retry: 2,
        enabled: !!slug,

    })
}

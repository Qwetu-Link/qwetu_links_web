import { contactBooking, contactQwetu } from "@/services/contact.endpoint"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const contactKeys = {
    qwetu: ["contactqwetu"] as const,
    booking: ["propertybooking"] as const,
}

// CONTACT QWETU
export const useContactQwetu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: contactQwetu,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: contactKeys.qwetu,

            })

        }
    })
}

// CONTACT BOOKING
export const useContactBooking = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: contactBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: contactKeys.booking,
            })
        }
    })
}
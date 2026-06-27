import { api } from "@/lib/axios";
import { BookUnitFormValues, ContactFormValues } from "@/schemas/contact.zod";
import { BookUnitForm } from "@/types/booking.definations";
import { ContactForm } from "@/types/contact.definations";

const CONTACT_QWETU = "public/enquiries";
const CONTACT_BOOKING = "public/bookings";


export const contactQwetu = async (data: ContactFormValues): Promise<ContactForm> => {
    const response = await api.post(CONTACT_QWETU, data)
    return response.data
}

export const contactBooking = async (data: BookUnitFormValues): Promise<BookUnitForm> => {
    const response = await api.post(CONTACT_BOOKING, data)
    return response.data
}
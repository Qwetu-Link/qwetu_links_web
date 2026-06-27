import { BookUnitFormValues } from "@/schemas/contact.zod";

export interface BookUnitForm {
    fullname: string;
    email: string;
    phoneNumber: string;
    propertyID: string;
    viewingDate: string;
    message: string;
}

export const bookUnitFormDefaultValues: BookUnitFormValues = {
    fullname: "",
    email: "",
    phoneNumber: "",
    propertyID: "" ,
    viewingDate: "",
    message: "",
};

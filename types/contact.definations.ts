import { ContactFormValues } from "@/schemas/contact.zod";


export const enquiryTypeValues = [
    "general",
    "property_viewing",
    "landlord_onboarding",
    "list_property",
    "tenant_support"
] as const;

export type EnquiryType =
    (typeof enquiryTypeValues)[number];


export interface ContactForm {
    fullname: string;
    email: string;
    phoneNumber: string;
    enquiryType: EnquiryType;
    message: string;
}


export const contactFormDefaultValues: ContactFormValues = {
    fullname: "",
    email: "",
    phoneNumber: "",
    enquiryType: "general",
    message: "",
};

export const enquiryTypeOptions = [
    {
        value: "general",
        label: "General Enquiry",
    },
    {
        value: "property_viewing",
        label: "Property Viewing",
    },
    {
        value: "landlord_onboarding",
        label: "Landlord Onboarding",
    },
    {
        value: "list_property",
        label: "List a Property",
    },
    {
        value: "tenant_support",
        label: "Tenant Support",
    },
];
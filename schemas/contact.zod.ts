import { enquiryTypeValues } from "@/types/contact.definations";
import z from "zod";

export const contactSchema = z.object({
    fullname: z
        .string({ message: "contact name field is required" })
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "Name can only contain letters, spaces, hyphens, and apostrophes",
        )
        .trim(),
    email: z
        .email({ pattern: z.regexes.email, message: "Enter a valid email address" })
        .max(255, "Email must not exceed 255 characters").trim(),
    phoneNumber: z
        .e164("Enter a valid phone number (e.g. +254712345678)")
        .min(13, "Enter a valid phone number"),

    enquiryType: z.enum(enquiryTypeValues, {
        message: "Priority is required",
    }),
    message: z.string().trim(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;


export const bookUnitSchema = z.object({
    fullname: z
        .string({ message: "contact name field is required" })
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "Name can only contain letters, spaces, hyphens, and apostrophes",
        )
        .trim(),

    email: z
        .email({ pattern: z.regexes.email, message: "Enter a valid email address" })
        .max(255, "Email must not exceed 255 characters"),

    phoneNumber: z
        .e164("Enter a valid phone number (e.g. +254712345678)")
        .min(13, "Enter a valid phone number"),

    propertyID: z.string().min(1, "Property ID is required"),

    viewingDate: z
        .string()
        .min(1, "Pick a preferred viewing date")
        .refine((val) => {
            const selected = new Date(val);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selected >= today;
        }, "Viewing date must be today or in the future"),

    message: z.string().max(500, "Message must be under 500 characters").optional().or(z.literal("")),
});

export type BookUnitFormValues = z.infer<typeof bookUnitSchema>;
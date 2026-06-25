import { z } from "zod";

export const tenantUserSchema = z.object({
    nextOfKinName: z
        .string({ message: "Name field is required" })
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "Name can only contain letters, spaces, hyphens, and apostrophes",
        )
        .trim(),
    nextOfKinPhone: z.e164("Enter a valid phone number (e.g. +254712345678)"),
    isActive: z.boolean(),
    name: z
        .string({ message: "Tenant Name field is required" })
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "Name can only contain letters, spaces, hyphens, and apostrophes",
        )
        .trim(),
    email: z.email(),
    phone: z.e164("Enter a valid phone number (e.g. +254712345678)"),
    emergencyContactName: z
        .string({ message: "Emergency contact name field is required" })
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "Name can only contain letters, spaces, hyphens, and apostrophes",
        )
        .trim(),
    emergencyContactPhone: z.e164("Enter a valid phone number (e.g. +254712345678)"),
    emergencyContactRelationship: z.string(),

    idNumber: z.string(),
    address: z.string(),

    avatar: z.url().optional(),
    avatarPath: z.string().optional(),
    version:z.number().optional(),
})

export type TenantUserFormValues = z.infer<typeof tenantUserSchema>;
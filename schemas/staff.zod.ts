import { z } from "zod";
import { DEPARTMENTS, employmentTypeValues, POSITIONS } from "../utils/selectConstants";

export const staffUserSchema = z.object({
    // Staff details
    position: z.enum(POSITIONS, { message: "Select a valid position" }),
    department: z.enum(
        DEPARTMENTS.map((d) => d.code) as [string, ...string[]],
        { message: "Select a valid department" },
    ),
    salary: z
        .number({ message: "Salary is required" })
        .min(0, "Salary must be at least 0")
        .max(100_000_000, "Salary must not exceed 100,000,000")
        .positive(),

    hireDate: z.iso.date("Enter a valid date")
        .refine((val) => val <= new Date().toISOString().slice(0, 10), {
            message: "Hire date cannot be in the future",
        }),
    employmentType: z.enum(employmentTypeValues, {
        message: "Select a valid employment type",
    }),

    // User details
    name: z
        .string({ message: "Full name field is required" })
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "Name can only contain letters, spaces, hyphens, and apostrophes",
        )
        .trim(),
    email: z
        .email({
            pattern: z.regexes.email,
            message: "Enter a valid email address",
        })
        .max(255, "Email must not exceed 255 characters")
        .toLowerCase(),
    phone: z
        .e164("Enter a valid phone number (e.g. +254712345678)")
        .min(13, "Enter a valid phone number"),
    // Emergency contact — all optional
    emergencyContactName: z.string().max(255).optional(),
    emergencyContactPhone: z
        .e164("Enter a valid phone number (e.g. +254712345678)")
        .min(13, "Enter a valid phone number")
        .optional(),
    emergencyContactRelationship: z.string().max(100).optional(),

    // Identity & address — all optional
    idNumber: z
        .string()
        .min(6, "ID number/Passport is required")
        .max(12, "ID number must not exceed 10 digits").optional(),
    address: z.string().max(500).optional(),

    // Media
    avatar: z.url("Enter a valid URL").optional(),
    avatarPath: z.string().max(255).optional(),

    // Status
    isActive: z.boolean().optional(),
    version: z.number().optional()
});

export type StaffUserFormValues = z.infer<typeof staffUserSchema>;
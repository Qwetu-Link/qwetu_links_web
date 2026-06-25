import z from "zod";

export const unitStatusValues = [
    "available",
    "occupied",
    "reserved",
    "maintenance"
] as const;



export const unitFormSchema = z.object({
    propertyID: z.string({ message: "property is required" }),
    unitNumber: z
        .string({ message: "Unit number field is required" })
        .min(2, "Unit Number must be at least 2 characters")
        .max(100, "Unit Number must not exceed 100 characters")
        .trim(),
    unitFloor: z
        .string({ message: "Unit floor is required" })
        .min(1, "Unit floor must be at least 1 characters")
        .max(25, "Unit floor must not exceed 25 characters")
        .trim(),
    status: z.enum(unitStatusValues, { message: "Status is required" }),
    size: z.string().min(0, "Size cannot be negative"),
    parking: z.number().int().min(0, "Parking cannot be negative").nonnegative(),
    bedrooms: z
        .number()
        .int()
        .min(0, "Bedrooms cannot be negative")
        .nonnegative(),
    bathrooms: z
        .number()
        .int()
        .min(0, "Bathrooms cannot be negative")
        .nonnegative(),
    image: z.array(z.string()).optional(),
    version: z
        .number().optional()
});

export type UnitFormValues = z.infer<typeof unitFormSchema>;

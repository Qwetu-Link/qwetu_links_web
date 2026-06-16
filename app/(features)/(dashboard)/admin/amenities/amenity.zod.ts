import z from "zod";

export const amenitySchema = z.object({
    name: z
        .string({ message: "Amenity name field is required" })
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "Name can only contain letters, spaces, hyphens, and apostrophes",
        )
        .trim(),
    description: z.string().trim(),
    category: z.string().min(1,).optional(),
    icon: z.string(),
    version:z.number().optional()
});

export type AmenityFormValues = z.infer<typeof amenitySchema>;
import z from "zod";
import { propertyStatusValues, propertyTypeGroups } from "@/utils/selectConstants";

const propertyTypes = propertyTypeGroups.flatMap((group) => group.options);

const imageSchema = z.object({
  id: z.string(),
  url: z.string(),
  path: z.string(),
  original_url: z.string().optional(),
  watermarked_url: z.string().optional(),
  thumbnail_url: z.string().optional(),
  webp_url: z.string().optional(),
});

export const propertyFormSchema = z.object({
  name: z
    .string({ message: "Full name field is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    )
    .trim(),
  address: z
    .string({ message: "Address field is required" })
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address must not exceed 255 characters")
    .trim(),
  location: z
    .string({ message: "Location field is required" })
    .min(5, "Location must be at least 5 characters")
    .max(255, "Location must not exceed 255 characters")
    .trim(),

  apartmentType: z.enum(propertyTypes as [string, ...string[]], {
    message: "Apartment type is required",
  }),

  description: z
    .string({ message: "Description field is required" })
    .min(5, "Description must be at least 5 characters")
    .trim(),

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
  squareMeters: z
    .number()
    .min(0, "Square meters cannot be negative")
    .nonnegative(),
  status: z.enum(propertyStatusValues, { message: "Status is required" }),
  image: z.array(imageSchema).min(1, "At least one image is required").default([]),
  amenityID: z.array(z.string()).default([]),
  version: z.number().optional(),
});

// What RHF actually holds field-by-field while the user is filling the form —
// `image`/`amenityID` are optional here because of `.default([])`.
export type PropertyFormInput = z.input<typeof propertyFormSchema>;

// What you get back after the resolver validates — defaults applied,
// so `image`/`amenityID` are guaranteed arrays. Use this in onSubmit.
export type PropertyFormValues = z.output<typeof propertyFormSchema>;
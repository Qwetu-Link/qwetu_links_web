import z from "zod";
import { propertyStatusValues } from "../(features)/(dashboard)/admin/property/definations";

export const propertyTypeGroups = [
  {
    label: "Residential",
    options: ["Apartment", "House", "Villa", "Bedsitter", "Studio"],
  },
  {
    label: "Commercial",
    options: ["Office", "Shop", "Warehouse", "Retail Space"],
  },
  {
    label: "Land",
    options: ["Residential Plot", "Commercial Plot", "Agricultural Land"],
  },
  {
    label: "Hospitality",
    options: ["Hotel", "Resort", "Airbnb"],
  },
] as const;

const propertyTypes = propertyTypeGroups.flatMap((group) => group.options);

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
  slug: z
    .string({ message: "Slug field is required" })
    .min(2, "Slug must be at least 2 characters")
    .max(100, "Slug must not exceed 100 characters")
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

  apartment_type: z.enum(propertyTypes as [string, ...string[]], {
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
  square_meters: z
    .number()
    .min(0, "Square meters cannot be negative")
    .nonnegative(),
  unit: z
    .string({ message: "Unit field is required" })
    .min(1, "Unit is required")
    .max(50, "Unit must not exceed 50 characters")
    .regex(
      /^[A-Za-z0-9\s-]+$/,
      "Unit can only contain letters, numbers, spaces, and hyphens",
    ),
  status: z.enum(propertyStatusValues, { message: "Status is required" }),
  occupany_rate: z
    .number()
    .min(0, "Occupancy rate cannot be negative")
    .max(100, "Occupancy rate cannot exceed 100")
    .nonnegative(),
  business_id: z
    .string({ message: "Business ID field is required" })
    .min(1, "Business ID must be at least 1 character")
    .max(50, "Business ID must not exceed 50 characters")
    .trim(),
  image: z.url(),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;

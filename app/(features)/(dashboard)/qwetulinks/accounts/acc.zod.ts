import z from "zod";

export const businessSchema = z.object({
  name: z
    .string({ message: "Business name field is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  // .regex(
  //   /^[a-zA-Z\s'-]+$/,
  //   "Name can only contain letters, spaces, hyphens, and apostrophes",
  // ),
  email: z
    .email({ pattern: z.regexes.email, message: "Enter a valid email address" })
    .max(255, "Email must not exceed 255 characters"),
  phone: z.e164("Enter a valid phone number (e.g. +254712345678)")
    .min(13, "Enter a valid phone number"),
  role: z.string().min(2, "Role is required").max(50),
  city: z.string().min(2, "City is required").max(100),
  address: z.string().min(5, "Address is required").max(255),
  country: z.string().max(100).optional(),
  website: z
    .union([z.url("Enter a valid website URL"), z.literal("")])
    .optional(),
  industry: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  bankName: z.string().max(100).optional(),
  bankAccountNumber: z.string().max(50).optional(),
  mpesaPaybill: z.string().max(20).optional(),
  mpesaAccountNumber: z.string().max(50).optional(),
  mpesaTillNo: z.string().max(20).optional(),
  avatar: z.string().optional(),
  avatarPath: z.string().optional(),
  password: z
    .string({ message: "Password is required" })
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(24, "Password must not exceed 24 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character",
    ),

  confirmPassword: z.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type BusinessFormValues = z.infer<typeof businessSchema>;

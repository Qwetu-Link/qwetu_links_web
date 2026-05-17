import z from "zod";

export const loginSchema = z.object({
  email: z
    .email({ pattern: z.regexes.email, message: "Enter a valid email address" })
    .max(255, "Email must not exceed 255 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character",
    ),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Name can only contain letters, spaces, hyphens, and apostrophes",
      ),

    email: z
      .email({
        pattern: z.regexes.email,
        message: "Enter a valid email address",
      })
      .max(255, "Email must not exceed 255 characters"),

    phone: z.e164("Enter a valid phone number (e.g. +254712345678)"),

    city: z
      .string()
      .min(2, "City must be at least 2 characters")
      .max(100, "City must not exceed 100 characters"),

    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(255, "Address must not exceed 255 characters"),

    is_active: z.literal(true),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters")
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

export type RegisterFormData = z.infer<typeof registerSchema>;

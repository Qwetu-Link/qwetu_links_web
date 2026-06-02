import z from "zod";

export const loginSchema = z.object({
  email: z
    .email({ pattern: z.regexes.email, message: "Enter a valid email address" })
    .max(255, "Email must not exceed 255 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(24, "Password must not exceed 24 characters")
});

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Business name field is required" })
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

    phone: z.e164("Enter a valid phone number (e.g. +254712345678)").min(13, "Enter a valid phone number"),

    city: z
      .string({message: "City field is required"})
      .min(2, "City must be at least 2 characters")
      .max(100, "City must not exceed 100 characters"),

    address: z
      .string({message: "Address field is required"})
      .min(5, "Address must be at least 5 characters")
      .max(255, "Address must not exceed 255 characters"),

    password: z
      .string({message: "Password is required"})
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

export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .email({ pattern: z.regexes.email, message: "Enter a valid email address" })
    .max(255, "Email must not exceed 255 characters"),
});

export const otpCodeSchema = z
  .string({message: "OTP code is required"})
  .length(6, "Enter the full 6-character code")
  .regex(/^[a-zA-Z0-9]+$/, "Code can only contain letters and numbers");

export const verifyEmailSchema = z.object({
  token: otpCodeSchema,
  email:forgotPasswordSchema.shape.email, // Reuse email validation from forgotPasswordSchema
});

export const resetPasswordSchema = z
  .object({
    token: otpCodeSchema,
    email: forgotPasswordSchema.shape.email, // Reuse email validation from forgotPasswordSchema
    password: loginSchema.shape.password,
    confirmPassword: loginSchema.shape.password
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

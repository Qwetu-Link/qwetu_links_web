// import z from "zod";
// import { employmentTypeValues } from "../(features)/(dashboard)/admin/user/definations";

// export const staffFormSchema = z
//   .object({
//     // id: z.string(),
//     position: z.string().min(1, "Position is required").trim(),
//     department: z.string().min(1, "Department is required").trim(),
//     salary: z.number().min(0, "Salary cannot be negative").positive(),
//     hire_date: z.iso.date(),
//     employment_type: z.enum(employmentTypeValues),
//     username: z
//       .string({ message: "Username field is required" })
//       .min(2, "Username must be at least 2 characters")
//       .regex(
//         /^[a-zA-Z\s'-]+$/,
//         "Username can only contain letters, spaces, hyphens, and apostrophes",
//       )
//       .trim(),
//     name: z
//       .string({ message: "Full name field is required" })
//       .min(2, "Name must be at least 2 characters")
//       .max(100, "Name must not exceed 100 characters")
//       .regex(
//         /^[a-zA-Z\s'-]+$/,
//         "Name can only contain letters, spaces, hyphens, and apostrophes",
//       )
//       .trim(),
//     email: z
//       .email({
//         pattern: z.regexes.email,
//         message: "Enter a valid email address",
//       })
//       .max(255, "Email must not exceed 255 characters")
//       .toLowerCase(),
//     password: z
//       .string({ message: "Password is required" })
//       .nonempty("Password is required")
//       .min(8, "Password must be at least 8 characters")
//       .max(24, "Password must not exceed 24 characters")
//       .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//       .regex(/[0-9]/, "Password must contain at least one number")
//       .regex(
//         /[^a-zA-Z0-9]/,
//         "Password must contain at least one special character",
//       ),
//     confirm_password: z.string().min(1, "Confirm password is required"),
//     role: z.string().min(1, "Role is required").trim(),
//     phone: z
//       .e164("Enter a valid phone number (e.g. +254712345678)")
//       .min(13, "Enter a valid phone number"),
//     emergency_contact_name: z
//       .string({ message: "Emergency contact name is required" })
//       .min(2, "Name must be at least 2 characters")
//       .max(100, "Name must not exceed 100 characters")
//       .trim(),
//     emergency_contact_phone: z
//       .e164("Enter a valid phone number (e.g. +254712345678)")
//       .min(13, "Enter a valid phone number"),
//     emergency_contact_relationship: z
//       .string()
//       .min(1, "Relationship is required")
//       .trim(),
//     id_number: z
//       .string()
//       .min(6, "ID number/Passport is required")
//       .max(12, "ID number must not exceed 10 digits"),
//     address: z
//       .string({ message: "Address field is required" })
//       .min(5, "Address must be at least 5 characters")
//       .max(255, "Address must not exceed 255 characters")
//       .trim(),
//     avatar: z.url(),
//     is_active: z.boolean(),
//   })
//   .refine((data) => data.password === data.confirm_password, {
//     message: "Passwords do not match",
//     path: ["confirm_password"],
//   });

// export type StaffFormValues = z.infer<typeof staffFormSchema>;

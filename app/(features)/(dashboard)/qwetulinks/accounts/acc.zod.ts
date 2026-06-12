import z from "zod";

export const businessSchema = z.object({
  name: z.string().min(2, "Business name is required").max(100),
  email: z.email("Enter a valid email address").max(255),
  phone: z.string().min(10, "Phone number is required").max(20),
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
  password: z.string().max(24).optional(),
  confirmPassword: z.string().max(24).optional(),
});

export type BusinessFormValues = z.infer<typeof businessSchema>;

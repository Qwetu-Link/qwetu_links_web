
import { BusinessFormValues, businessSchema } from "@/schemas/acc.zod";
import { Business, emptyBusiness } from "@/types/business.definations";

export function getBusinessFormSchema(mode: "add" | "edit") {
  return businessSchema.superRefine((data, ctx) => {
    if (mode === "add" && !data.password) {
      ctx.addIssue({
        code: "custom",
        message: "Password must be at least 8 characters",
        path: ["password"],
      });
    }

    if (data.password && data.password.length < 8) {
      ctx.addIssue({
        code: "custom",
        message: "Password must be at least 8 characters",
        path: ["password"],
      });
    }

    if ((data.password || "") !== (data.confirmPassword || "")) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
}


export function getDefaults(business?: Business): BusinessFormValues {
  const source = business ?? emptyBusiness;

  return {
    name: source.name,
    email: source.email,
    phone: source.phone,
    role: "",

    city: source.city,
    address: source.address,
    country: source.country ?? "Kenya",
    website: source.website ?? "",
    industry: source.industry ?? "",
    description: source.description ?? "",
    bankName: source.bankName ?? "",
    bankAccountNumber: source.bankAccountNumber ?? "",
    mpesaPaybill: source.mpesaPaybill ?? "",
    mpesaAccountNumber: source.mpesaAccountNumber ?? "",
    mpesaTillNo: source.mpesaTillNo ?? "",

    avatar: source.avatar ?? "",

    password: "",
    confirmPassword: "",
  };
}
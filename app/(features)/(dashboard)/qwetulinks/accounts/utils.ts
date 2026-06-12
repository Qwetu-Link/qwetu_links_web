
import { BusinessFormValues, businessSchema } from "./acc.zod";
import { Business, emptyBusiness } from "./definations";

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

export const fieldClass =
  "h-10 w-full rounded-lg border border-orange-100 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export const textAreaClass =
  "min-h-24 w-full resize-y rounded-lg border border-orange-100 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export const roleOptions = [
  {
    value: "company_admin",
    label: "Company Admin",
  },
  {
    value: "property_manager",
    label: "Property Manager",
  },
  {
    value: "landlord",
    label: "Landlord",
  },
] as const;

// Configured layout names directly to match snake_case key definitions in BusinessFormValues
export const sectionFields = [
  {
    title: "Business Details",
    fields: [
      { name: "name", label: "Business name", type: "text", required: true },
      { name: "email", label: "Business email", type: "email", required: true },
      { name: "phone", label: "Business phone", type: "tel", required: true },
      { name: "industry", label: "Industry", type: "text" },
      { name: "role", label: "Role", type: "select", required: true, options: roleOptions },
    ],
  },
  {
    title: "Location",
    fields: [
      { name: "country", label: "Country", type: "text" },
      { name: "city", label: "City", type: "text", required: true },
    ],
  },
  {
    title: "Payment Details",
    fields: [
      { name: "bankName", label: "Bank name", type: "text" },
      { name: "bankAccountNumber", label: "Bank account number", type: "text" },
      { name: "mpesaPaybill", label: "Mpesa paybill", type: "text" },
      { name: "mpesaAccountNumber", label: "Mpesa account number", type: "text" },
      { name: "mpesaTillNo", label: "Mpesa till no.", type: "text" },
    ],
  },
] as const;

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
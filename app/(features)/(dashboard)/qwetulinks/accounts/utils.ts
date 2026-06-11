import { BusinessFormValues, businessSchema } from "@/app/lib/acc.zod";
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

export const sectionFields = [
  {
    title: "Business Details",
    fields: [
      ["name", "Business name", "text", true],
      ["email", "Business email", "email", true],
      ["phone", "Business phone", "tel", true],
      ["role", "Role", "text", true],
      ["industry", "Industry", "text"],
    ],
  },
  {
    title: "Location",
    fields: [
      ["country", "Country", "text"],
      ["city", "City", "text", true],
    ],
  },
  {
    title: "Payment Details",
    fields: [
      ["bank_name", "Bank name", "text"],
      ["bank_account_number", "Bank account number", "text"],
      ["mpesa_paybill", "Mpesa paybill", "text"],
      ["mpesa_account_number", "Mpesa account number", "text"],
      ["mpesa_till_no", "Mpesa till no.", "text"],
    ],
  },
] as const;



// export function getSeededBusiness(id?: string) {
//   if (!id) return undefined;
//   const decodedId = decodeURIComponent(id);

//   const { data } = useBizDetails(decodedId) || {};

//   return data?.find(
//     (business : Business) =>
//       String(business.id) === decodedId ||
//       business.slug === decodedId ||
//       business.email === decodedId,
//   );
// }

export function getDefaults(business?: Business): BusinessFormValues {
  const source = business ?? emptyBusiness;

  return {
    name: source.name,
    email: source.email,
    phone: source.phone,
    role: "owner",
    city: source.city,
    address: source.address,
    country: source.country ?? "Kenya",
    website: source.website ?? "",
    industry: source.industry ?? "",
    description: source.description ?? "",
    bank_name: source.bank_name ?? "",
    bank_account_number: source.bank_account_number ?? "",
    mpesa_paybill: source.mpesa_paybill ?? "",
    mpesa_account_number: source.mpesa_account_number ?? "",
    mpesa_till_no: source.mpesa_till_no ?? "",
    avatar: source.avatar ?? "",
    password: "",
    confirmPassword: "",
  };
}


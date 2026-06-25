import { User } from "@/app/(features)/(auth)/definitions";
import { TenantUserFormValues } from "./tenant.zod";

export type Tenant = {
  id: string;
  userID: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
  phonenumber?: string;
  isActive: boolean;
  businessID: boolean;
  version?: number;
  user: User;
};

export interface TenantResponse {
  data: Tenant[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    to: number;
    from: number;
  };
}


export const emptyTenant: TenantUserFormValues = {
  nextOfKinName: "",
  nextOfKinPhone: "",
  isActive: true,
  name: "",
  email: "",
  phone: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelationship: "",
  idNumber: "",
  address: "",

  // avatar is optional, omitted intentionally
};

export const fieldClass =
  "h-10 w-full rounded-lg border border-orange-100 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export const textAreaClass =
  "min-h-24 w-full resize-y rounded-lg border border-orange-100 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export const formSections: {
  title: string;
  fields: [keyof TenantUserFormValues, string][];
}[] = [
    {
      title: "Tenant Details",
      fields: [
        ["name", "Full name"],
        ["email", "Email"],
        ["phone", "Phone"],
        ["idNumber", "ID/Passport number"],
      ],
    },
    {
      title: "Contacts",
      fields: [
        ["nextOfKinName", "Next of kin name"],
        ["nextOfKinPhone", "Next of kin phone"],
        ["emergencyContactName", "Emergency contact name"],
        ["emergencyContactPhone", "Emergency contact phone"],
        ["emergencyContactRelationship", "Relationship"],
      ],
    },
  ];
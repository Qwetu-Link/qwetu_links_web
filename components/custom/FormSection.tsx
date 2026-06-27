import { StaffUserFormValues } from "@/schemas/staff.zod";
import { TenantUserFormValues } from "@/schemas/tenant.zod";
import { businessRoleOptions } from "@/utils/selectConstants";

// tenant form section
export const tenantFormSections: {
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

// staff form section

export const staffFormSections = [
    {
        title: "Staff Details",
        fields: [
            ["name", "Full name"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["idNumber", "ID number"],
        ] as [keyof StaffUserFormValues, string][],
    },
    {
        title: "Emergency Contact",
        fields: [
            ["emergencyContactName", "Emergency contact name"],
            ["emergencyContactPhone", "Emergency contact phone"],
            ["emergencyContactRelationship", "Relationship"],
        ] as [keyof StaffUserFormValues, string][],
    },
] as const;

// business form section
export const businesFormSection = [
  {
    title: "Business Details",
    fields: [
      { name: "name", label: "Business name", type: "text", required: true },
      { name: "email", label: "Business email", type: "email", required: true },
      { name: "phone", label: "Business phone", type: "tel", required: true },
      { name: "industry", label: "Industry", type: "text" },
      { name: "role", label: "Role", type: "select", required: true, options: businessRoleOptions },
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
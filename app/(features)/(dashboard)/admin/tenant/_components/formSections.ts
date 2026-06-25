import { TenantUserFormValues } from "../tenant.zod";

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

import { Staff } from "../definations";
import { StaffUserFormValues } from "../user.zod";

export const fieldClass =
    "h-10 w-full rounded-lg border border-orange-100 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export const textAreaClass =
    "min-h-24 w-full resize-y rounded-lg border border-orange-100 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export type StaffFormPageProps = {
    mode: "add" | "edit";
    existingStaff?: Staff;
    listHref: string;
    businessId: string;
};

export const textSections = [
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

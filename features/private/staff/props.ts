import { Staff } from "@/types/staff.definations";

export type StaffFormPageProps = {
  mode: "add" | "edit";
  existingStaff?: Staff;
  listHref: string;
  businessId: string;
};


export type StaffDetailsPageProps = {
  staffId: string;
  listHref: string;
  editHref: string;
};
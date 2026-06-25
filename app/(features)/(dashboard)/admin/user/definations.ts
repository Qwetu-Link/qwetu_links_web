import { EmploymentType } from "./staffConstants";
import { StaffUserFormValues } from "./user.zod";

export interface StaffRecord {
  id: string;
  userID: string;
  position: string;
  department: string;
  salary: string;
  hireDate: string;
  employmentType: EmploymentType;
  businessID: string;
  version: number;
}

export interface StaffUser {
  id: string;
  businessID: string;
  name: string;
  username: string;
  email: string;
  userType: string;
  phone: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  idNumber?: string;
  address?: string;
  isActive: boolean;
  avatar?: string;
  avatarPath?: string;
  version: number;
  staff: StaffRecord[];
  tenant: unknown[];
}

export interface Staff {
  id: string;
  userID: string;
  position: string;
  department: string;
  salary: string;
  hireDate: string;
  employmentType: EmploymentType;
  businessID: string;
  version: number;
  user: StaffUser;
}

// API response wrappers

export interface StaffListResponse {
  data: Staff[];
}

export interface StaffResponse {
  data: Staff[];
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

export const emptyStaff: StaffUserFormValues = {
  // Staff details
  position: "Staff",
  department: "ADMIN",
  salary: 0,
  hireDate: new Date().toISOString().slice(0, 10),
  employmentType: "full_time",

  // User details
  name: "",
  email: "",
  phone: "",

  // Emergency contact
  emergencyContactName: undefined,
  emergencyContactPhone: undefined,
  emergencyContactRelationship: undefined,

  // Identity & address
  idNumber: undefined,
  address: undefined,

  // Media
  avatar: undefined,
  avatarPath: undefined,

  // Status
  isActive: true,
};

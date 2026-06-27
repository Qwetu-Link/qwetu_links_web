
import { TenantUserFormValues } from "../schemas/tenant.zod";
import { User } from "./auth.definitions";
import { PaginationLinks, PaginationMeta } from "./pagination.definations";

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
  links: PaginationLinks;
  meta: PaginationMeta;
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
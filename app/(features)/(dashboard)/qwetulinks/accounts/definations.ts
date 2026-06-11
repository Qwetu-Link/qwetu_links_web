import { LoginFormInputs } from "@/app/(features)/(auth)/definitions";

export interface RegisterBusinessFormInputs extends LoginFormInputs {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  role: string;
  country?: string;
  website?: string;
  industry?: string;
  description?: string;
  bank_name?: string;
  bank_account_number?: string;
  mpesa_paybill?: string;
  mpesa_account_number?: string;
  mpesa_till_no?: string;
  avatar?: string;
}

export type Business = {
  id?: string | number;
  name: string;
  slug: string;
  phone: string;
  website?: string;
  country?: string;
  city: string;
  address: string;
  bank_name?: string;
  bank_account_number?: string;
  mpesa_paybill?: string;
  mpesa_account_number?: string;
  mpesa_till_no?: string;
  industry?: string;
  description?: string;
  is_active: boolean;
  username?: string;
  email: string;
  avatar?: string;
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const emptyBusiness: Business = {
  id: "",
  name: "",
  slug: "",
  phone: "",
  website: "",
  country: "Kenya",
  city: "",
  address: "",
  bank_name: "",
  bank_account_number: "",
  mpesa_paybill: "",
  mpesa_account_number: "",
  mpesa_till_no: "",
  industry: "",
  description: "",
  is_active: true,
  username: "",
  email: "",
  avatar: "",
  is_verified: false,
};
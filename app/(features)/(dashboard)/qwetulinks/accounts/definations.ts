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
  bankName?: string;
  bankAccountNumber?: string;
  mpesaPaybill?: string;
  mpesaAccountNumber?: string;
  mpesaTillNo?: string;
  avatar?: string;
  avatarPath?: string;
}

export type Business = {
  id: string;
  name: string;
  slug: string;
  phone: string;
  website?: string;
  country?: string;
  city: string;
  address: string;
  bankName?: string;
  bankAccountNumber?: string;
  mpesaPaybill?: string;
  mpesaAccountNumber?: string;
  mpesaTillNo?: string;
  industry?: string;
  description?: string;
  isActive: boolean;
  username?: string;
  email: string;
  avatar?: string;
  avatarPath?: string;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
};

export const emptyBusiness: Business = {
  id: "",
  name: "",
  slug: "",
  phone: "",
  website: "",
  country: "Kenya",
  city: "",
  address: "",
  bankName: "",
  bankAccountNumber: "",
  mpesaPaybill: "",
  mpesaAccountNumber: "",
  mpesaTillNo: "",
  industry: "",
  description: "",
  isActive: true,
  username: "",
  email: "",
  avatar: "",
  avatarPath: "",
};
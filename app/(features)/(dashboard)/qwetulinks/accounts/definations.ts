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

export interface Business {
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

export const seededBusinesses: Business[] = [
  {
    id: "qwetu-links",
    name: "Qwetu Links",
    slug: "qwetu-links",
    phone: "+254712345678",
    website: "https://qwetulinks.com",
    country: "Kenya",
    city: "Mombasa",
    address: "Links Road, Nyali",
    bank_name: "KCB Bank",
    bank_account_number: "1234567890",
    mpesa_paybill: "522522",
    mpesa_account_number: "QWETU",
    mpesa_till_no: "987654",
    industry: "Property Management",
    description: "Rental and property management services for modern homes.",
    is_active: true,
    username: "qwetulinks",
    email: "info@qwetulinks.com",
    avatar: "",
    is_verified: true,
  },
  {
    id: "coast-rentals",
    name: "Coast Rentals",
    slug: "coast-rentals",
    phone: "+254723456789",
    website: "",
    country: "Kenya",
    city: "Kilifi",
    address: "Bofa Road, Kilifi",
    bank_name: "Equity Bank",
    bank_account_number: "9080706050",
    mpesa_paybill: "400200",
    mpesa_account_number: "COAST",
    mpesa_till_no: "",
    industry: "Real Estate",
    description: "Coastal apartment listings and tenant services.",
    is_active: true,
    username: "coastrentals",
    email: "hello@coastrentals.co.ke",
    avatar: "",
    is_verified: false,
  },
];

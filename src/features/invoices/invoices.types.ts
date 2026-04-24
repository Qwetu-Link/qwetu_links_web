import type { Role } from "../auth/auth.types";
import type { LucideIcon } from "lucide-react";

// Invoices related types
export type InvoiceStatus =
  | "pending"
  | "paid"
  | "partial"
  | "overdue"
  | "cancelled";

export type PaymentFrequency =
  | "monthly"
  | "quarterly"
  | "semi_annual"
  | "third_quarter"
  | "yearly";

type LeaseStatus = "active" | "terminated" | "pending" | "expired";
export type PaymentStatus = "paid" | "pending" | "partial" | "overdue";
type UUID = string;

export interface StatusConfigItem {
  label: string;
  color: string;
  icon: LucideIcon;
}

export interface User {
  id: UUID;
  email: string;
  business: Business;
  role: Role;
  first_name: string;
  last_name: string;
  gender: "male" | "female" | "other";
  phone_number: string;
  id_passport: string;
}

export interface Lease {
  id: UUID;
  tenant: User;
  unit: string;
  business: string;
  start_date: Date;
  end_date: Date;
  rent_amount: number;
  utility_amount: number;
  deposit_amount: number;
  payment_frequency: PaymentFrequency;
  status: LeaseStatus;
  created_at: Date;
}

export interface InvoicePlan {
  id: UUID;
  tenant: User;
  lease: string;
  business: Business;
  invoice_number: string;
  rent_amount: number;
  utility_amount: number;
  other_charges: number;
  total_amount: number;
  due_date: Date; // date
  status: InvoiceStatus;
  issued_date: Date;
  paid_at: Date | null;
  amount_paid: number;
  balance: number;
  created_at: Date;
}

//business
export interface Business {
  id: UUID;
  name: string;
  short_name: string;
  email: string;
  phone_number: string;
  address: string;
  primary_activity: string;
  description: string;
  logo_url: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

//payment
export interface Payment {
  id: UUID;
  invoice: InvoicePlan[];
  business: Business;
  amount: number;
  payment_method: string;
  status: PaymentStatus;
  reference: string;
  verified: boolean;
  created_at: Date;
  paid_at: Date | null;
}

// invoiceui
export interface InvoicePlanUI {
  id: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  leaseId: string;
  leaseUnit: string;
  leaseStartDate: string;
  leaseEndDate: string;
  leaseRentAmount: number;
  leaseUtilityAmount: number;
  leaseTerms: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAdress: string;
  businessLogo: string;
  invoiceNumber: string;
  rentAmount: number;
  utilityAmount: number;
  otherCharges: number;
  totalAmount: number;
  dueDate: string; // date
  daysOverdue?: number;
  status: InvoiceStatus;
  issuedDate: string;
  paidAt?: string;
  amountPaid: number;
  balance: number;
  createdAt: string;
}

export interface PaymentUI {
  id: string;
  invoiceIds: string[];
  amount: number;
  method: string;
  status: string;
  reference: string;
  date: string;
}

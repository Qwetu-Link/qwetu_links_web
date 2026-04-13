// Invoices related types
export type StatusChoices =
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

type UUID = string;

export interface Tenant {
  id: UUID;
  name: string;
  phone: string;
  email: string;
}

export interface Lease {
  id: UUID;
  tenant: Tenant;
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
  tenant: Tenant;
  lease: string;
  business: string;
  invoice_number: string;
  rent_amount: number;
  utility_amount: number;
  other_charges: number;
  total_amount: number;
  due_date: Date; // date
  status: StatusChoices;
  issued_date: Date;
  paid_at: Date | null;
  amount_paid: number;
  balance: number;
  created_at: Date;
}


// invoice test

export interface PaymentPlan {
  id: string;
  customer: string;
  unit: string;
  lease: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  installments: number;
  installmentAmount: number;
  frequency: PaymentFrequency;
  nextPaymentDate: string;
  status: StatusChoices;
  daysOverdue?: number;
  paymentMethod?: "M-Pesa" | "Airtel Money" | "Bank Transfer";
  startDate: string;
}
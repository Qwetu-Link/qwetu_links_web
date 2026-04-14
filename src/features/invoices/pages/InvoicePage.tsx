import { useState } from "react";
import {
  CreditCard,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Search,
} from "lucide-react";

import { toast } from "sonner";
import { InvoicesPaymentModal } from "../components/InvoicesPaymentModal";
import InvoicesCollectionChart from "../components/InvoicesCollectionChart";
import InvoicesView from "../components/InvoicesView";
import data from "@/data/finance.json";
import type {
  PaymentPlan,
  PaymentFrequency,
  StatusChoices,
} from "../invoices.types";
import InvoicesHub from "../components/InvoicesHub";
import InvoiceFallback from "../components/InvoiceFallback";
import PaginationFooter from "../components/PaginatedFooter";

interface PaymentPayload {
  planId?: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  paymentDate: string;
  notes: string;
  recordedAt: string;
}

type SelectedPlan = {
  id: string;
  customer: string;
  installmentAmount: number;
  paymentMethod: string;
} | null;

const collectionData = [
  { month: "Oct", collected: 380000, expected: 420000 },
  { month: "Nov", collected: 425000, expected: 450000 },
  { month: "Dec", collected: 510000, expected: 520000 },
  { month: "Jan", collected: 495000, expected: 500000 },
  { month: "Feb", collected: 540000, expected: 550000 },
  { month: "Mar", collected: 620000, expected: 630000 },
  { month: "Apr", collected: 580000, expected: 600000 },
];

const FREQUENCY_MAP: Record<PaymentFrequency, { installments: number }> = {
  monthly: { installments: 12 },
  quarterly: { installments: 4 },
  semi_annual: { installments: 2 },
  third_quarter: { installments: 3 },
  yearly: { installments: 1 },
};

const paymentPlans: PaymentPlan[] = data.invoices.map((invoice) => {
  const frequency = invoice.lease.payment_frequency as PaymentFrequency;

  const installments = FREQUENCY_MAP[frequency].installments;
  const installmentAmount = invoice.total_amount / installments;

  return {
    id: invoice.invoice_number,
    customer: invoice.tenant.name,
    unit: invoice.lease.unit,
    lease: invoice.lease.id,
    totalAmount: invoice.total_amount,
    paidAmount: invoice.total_amount - invoice.balance,
    remainingAmount: invoice.balance,
    installments,
    installmentAmount,
    frequency,
    nextPaymentDate: invoice.due_date,
    status: invoice.status as StatusChoices,
    daysOverdue:
      invoice.status === "overdue"
        ? Math.floor(
            (Date.now() - new Date(invoice.due_date).getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : undefined,
    paymentMethod: "M-Pesa",
    startDate: invoice.lease.start_date,
  };
});

export default function InvoicePage() {
  const [selectedTab, setSelectedTab] = useState<
    "plans" | "collections" | "invoices"
  >("plans");
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Search Functionality
  const filteredPlans = paymentPlans.filter((plan) => {
    const query = searchQuery.toLowerCase();
    return (
      plan.customer.toLowerCase().includes(query) ||
      plan.id.toLowerCase().includes(query) ||
      plan.lease.toLowerCase().includes(query) ||
      (plan.unit ?? "").toLowerCase().includes(query)
    );
  });

  //View and Hub Invoices
  const activeInvoicePlans = filteredPlans.filter(
    (invoice) => invoice.status !== "paid",
  );
  const allInvoicePlans = filteredPlans;

  const totalActive = paymentPlans.filter((p) => p.status === "pending").length;
  const totalOverdue = paymentPlans.filter(
    (p) => p.status === "overdue",
  ).length;
  const totalExpected = paymentPlans.reduce(
    (sum, p) => sum + p.installmentAmount,
    0,
  );
  const totalOutstanding = paymentPlans.reduce(
    (sum, p) => sum + p.remainingAmount,
    0,
  );

  const handleRecordPayment = (payment: PaymentPayload) => {
    console.log("Payment recorded:", payment);
    toast.success("Payment recorded successfully!");
  };

  const handleOpenRecordPayment = (plan: PaymentPlan) => {
    setSelectedPlan({
      id: plan.id,
      customer: plan.customer,
      installmentAmount: plan.installmentAmount,
      paymentMethod: plan.paymentMethod ?? "M-Pesa",
    });
    setShowRecordPaymentModal(true);
  };

  // Pagination
  const paginatedActivePlans = activeInvoicePlans.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const paginatedAllPlans = allInvoicePlans.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalActivePages = Math.ceil(activeInvoicePlans.length / pageSize);
  const totalAllPages = Math.ceil(allInvoicePlans.length / pageSize);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Invoices Hub</h1>
          <p className="text-muted-foreground mt-1">
            Manage installment payment invoices and track collections
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <CheckCircle className="w-4 h-4" />
            <p className="text-sm font-medium">Active Invoices</p>
          </div>
          <p className="text-2xl font-semibold">{totalActive}</p>
        </div>
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertCircle className="w-4 h-4" />
            <p className="text-sm font-medium">Overdue</p>
          </div>
          <p className="text-2xl font-semibold">{totalOverdue}</p>
        </div>
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <DollarSign className="w-4 h-4" />
            <p className="text-sm font-medium">This Month</p>
          </div>
          <p className="text-2xl font-semibold">
            KES {(totalExpected / 1000).toFixed(0)}K
          </p>
        </div>
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <CreditCard className="w-4 h-4" />
            <p className="text-sm font-medium">Outstanding</p>
          </div>
          <p className="text-2xl font-semibold">
            KES {(totalOutstanding / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by customer, invoice ID, lease, or unit..."
          value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-6">
          <button
            onClick={() => setSelectedTab("plans")}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              selectedTab === "plans"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Payment Plans
          </button>
          <button
            onClick={() => setSelectedTab("collections")}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              selectedTab === "collections"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Collections
          </button>

          <button
            onClick={() => setSelectedTab("invoices")}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              selectedTab === "invoices"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Invoices Hub
          </button>
        </div>
      </div>

      {/* Payment Plans Tab */}
      {selectedTab === "plans" &&
        (activeInvoicePlans.length === 0 ? (
          searchQuery ? (
            <div className="text-center text-muted-foreground py-10">
              No invoice payment plans found matching "{searchQuery}"
            </div>
          ) : (
            <InvoiceFallback />
          )
        ) : (
          <>
            <InvoicesView
              activeInvoicePlans={paginatedActivePlans}
              handleOpenRecordPayment={handleOpenRecordPayment}
            />

            <PaginationFooter
              currentPage={currentPage}
              totalPages={totalActivePages}
              onPageChange={setCurrentPage}
            />
          </>
        ))}
      {/* collection tab */}
      {selectedTab === "collections" &&
        (!collectionData.length ? (
          <InvoiceFallback />
        ) : (
          <InvoicesCollectionChart collectionData={collectionData} />
        ))}

      {/* Invoices Hub Tab */}
      {selectedTab === "invoices" &&
        (allInvoicePlans.length === 0 ? (
          searchQuery ? (
            <div className="text-center text-muted-foreground py-10">
              No invoice payment plans found matching "{searchQuery}"
            </div>
          ) : (
            <InvoiceFallback />
          )
        ) : (
          <>
            <InvoicesHub paymentPlans={paginatedAllPlans} />

            <PaginationFooter
              currentPage={currentPage}
              totalPages={totalAllPages}
              onPageChange={setCurrentPage}
            />
          </>
        ))}

      {/* payment Model */}
      <InvoicesPaymentModal
        isOpen={showRecordPaymentModal}
        onClose={() => {
          setShowRecordPaymentModal(false);
          setSelectedPlan(null);
        }}
        onSave={handleRecordPayment}
        planDetails={selectedPlan}
      />
    </div>
  );
}

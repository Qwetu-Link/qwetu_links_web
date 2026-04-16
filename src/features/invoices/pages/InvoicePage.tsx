import { lazy, Suspense, useState } from "react";
import { useMemo } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { InvoicesPaymentModal } from "../components/InvoicesPaymentModal";
const InvoicesCollectionChart = lazy(
  () => import("../components/InvoicesCollectionChart"),
);
const InvoicesView = lazy(() => import("../components/InvoicesView"));
import data from "@/data/finance.json";
import type {
  PaymentPlan,
  PaymentFrequency,
  StatusChoices,
} from "../invoices.types";
const InvoicesHub = lazy(() => import("../components/InvoicesHub"));
import InvoiceFallback from "../components/InvoiceFallback";
import PaginationFooter from "../components/PaginatedFooter";
import InvoiceStats from "../components/InvoiceStats";

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

const FREQUENCY_MAP: Record<PaymentFrequency, { installments: number }> = {
  monthly: { installments: 12 },
  quarterly: { installments: 4 },
  semi_annual: { installments: 2 },
  third_quarter: { installments: 3 },
  yearly: { installments: 1 },
};

export default function InvoicePage() {
  const [selectedTab, setSelectedTab] = useState<
    "plans" | "collections" | "invoices"
  >("plans");
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const collectionData = useMemo(
    () => [
      { month: "Oct", collected: 380000, expected: 420000 },
      { month: "Nov", collected: 425000, expected: 450000 },
      { month: "Dec", collected: 510000, expected: 520000 },
      { month: "Jan", collected: 495000, expected: 500000 },
      { month: "Feb", collected: 540000, expected: 550000 },
      { month: "Mar", collected: 620000, expected: 630000 },
      { month: "Apr", collected: 580000, expected: 600000 },
    ],
    [],
  );

  const paymentPlans: PaymentPlan[] = useMemo(() => {
    return data.invoices.map((invoice) => {
      const frequency = invoice.lease.payment_frequency as PaymentFrequency;

      const installments = FREQUENCY_MAP[frequency].installments;
      const installmentAmount = invoice.total_amount / installments;

      const today = new Date();

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
                (today.getTime() - new Date(invoice.due_date).getTime()) /
                  (1000 * 60 * 60 * 24),
              )
            : undefined,
        paymentMethod: "M-Pesa",
        startDate: invoice.lease.start_date,
      };
    });
  }, []);

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
      <InvoiceStats paymentPlans={paymentPlans} />

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
            <Suspense fallback={<div>Loading payment plans...</div>}>
              <InvoicesView
                activeInvoicePlans={paginatedActivePlans}
                handleOpenRecordPayment={handleOpenRecordPayment}
              />
            </Suspense>

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
          <Suspense fallback={<div>Loading chart...</div>}>
            <InvoicesCollectionChart collectionData={collectionData} />
          </Suspense>
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
            <Suspense fallback={<div>Loading Invoices...</div>}>
              <InvoicesHub paymentPlans={paginatedAllPlans} />
            </Suspense>

            <PaginationFooter
              currentPage={currentPage}
              totalPages={totalAllPages}
              onPageChange={setCurrentPage}
            />
          </>
        ))}

      {/* payment Model */}
      <div>
        <Suspense fallback={<div>Loading Invoices...</div>}>
          <InvoicesPaymentModal
            isOpen={showRecordPaymentModal}
            onClose={() => {
              setShowRecordPaymentModal(false);
              setSelectedPlan(null);
            }}
            onSave={handleRecordPayment}
            planDetails={selectedPlan}
          />
        </Suspense>
      </div>
    </div>
  );
}

import { lazy, Suspense, useState } from "react";
import { useMemo } from "react";
import { Search } from "lucide-react";
// import { toast } from "sonner";
// import { InvoicesPaymentModal } from "../components/InvoicesPaymentModal";
const InvoicesCollectionChart = lazy(
  () => import("../components/InvoicesCollectionChart"),
);
// const InvoicesView = lazy(() => import("../components/InvoiceView"));
import jsonData from "@/data/finance.json";
const InvoicesHub = lazy(() => import("../components/InvoicesHub"));
import InvoiceFallback from "../components/InvoiceFallback";
import PaginationFooter from "../components/PaginatedFooter";
import type {
  InvoicePlanUI,
  InvoiceStatus,
  PaymentUI,
} from "../invoices.types";
import InvoiceStats from "../components/InvoiceStats";

// const FREQUENCY_MAP: Record<PaymentFrequency, { installments: number }> = {
//   monthly: { installments: 12 },
//   quarterly: { installments: 4 },
//   semi_annual: { installments: 2 },
//   third_quarter: { installments: 3 },
//   yearly: { installments: 1 },
// };

export default function InvoicePage() {
  const [selectedTab, setSelectedTab] = useState<
    "invoices" | "payments" | "collections"
  >("invoices");
  // const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  // const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>(null);

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

  const response = jsonData[0];
  const rawInvoices = response.invoices ?? [];
  const rawPayments = response.payments ?? [];

    const today = new Date();

  //Normolize invoice
  const invoiceData: InvoicePlanUI[] = rawInvoices.map((inv) => ({
    id: inv.id,
    tenantName: `${inv.tenant.first_name} ${inv.tenant.last_name}`,
    tenantEmail: inv.tenant.email,
    tenantPhone: inv.tenant.phone_number,
    leaseId: inv.lease.id,
    leaseUnit: inv.lease.unit,
    leaseStartDate: inv.lease.start_date,
    leaseEndDate: inv.lease.end_date,
    leaseRentAmount: inv.lease.rent_amount,
    leaseUtilityAmount: inv.lease.utility_amount,
    leaseTerms: inv.lease.payment_frequency,
    businessName: inv.business.name,
    businessEmail: inv.business.email,
    businessPhone: inv.business.phone_number,
    businessAdress: inv.business.address,
    businessLogo: inv.business.logo_url,
    invoiceNumber: inv.invoice_number,
    rentAmount: inv.rent_amount,
    utilityAmount: inv.utility_amount,
    otherCharges: inv.other_charges,
    totalAmount: inv.total_amount,
    dueDate: inv.due_date,
    daysOverdue:
          inv.status === "overdue"
            ? Math.floor(
                (today.getTime() - new Date(inv.due_date).getTime()) /
                  (1000 * 60 * 60 * 24),
              )
            : 0,
    status: inv.status  as InvoiceStatus,
    issuedDate: inv.issued_date,
    paidAt: inv.paid_at ?? undefined,
    amountPaid: inv.amount_paid,
    balance: inv.balance,
    createdAt: inv.created_at,
  }));

  const paymentData: PaymentUI[] = rawPayments.map((pay) => ({
    id: pay.id,
    amount: pay.amount,
    method: pay.payment_method,
    status: pay.status,
    reference: pay.reference,
    invoiceIds: pay.invoice.map((inv) => inv.id),
    date:pay.created_at
  }));

  // Search Functionality
  const filteredPlans = invoiceData.filter((plan) => {
    const query = searchQuery.toLowerCase();
    return (
      plan.tenantName.toLowerCase().includes(query) ||
      plan.id.toLowerCase().includes(query) ||
      plan.leaseId.toLowerCase().includes(query) ||
      (plan.leaseUnit ?? "").toLowerCase().includes(query)
    );
  });

  //View and Hub Invoices
  // const activeInvoicePlans = filteredPlans.filter(
  //   (invoice) => invoice.status !== "paid",
  // );
  // const allInvoicePlans = filteredPlans;

  // const handleRecordPayment = (payment: PaymentPayload) => {
  //   console.log("Payment recorded:", payment);
  //   toast.success("Payment recorded successfully!");
  // };

  // const handleOpenRecordPayment = (plan: PaymentPlan) => {
  //   setSelectedPlan({
  //     id: plan.id,
  //     customer: plan.customer,
  //     installmentAmount: plan.installmentAmount,
  //     paymentMethod: plan.paymentMethod ?? "M-Pesa",
  //   });
  //   setShowRecordPaymentModal(true);
  // };

  // Pagination
  // const paginatedActivePlans = activeInvoicePlans.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize,
  // );

  const paginatedInvoices = filteredPlans.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // const totalActivePages = Math.ceil(activeInvoicePlans.length / pageSize);
  const totalPages = Math.ceil(paginatedInvoices.length / pageSize);

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
      <InvoiceStats paymentPlans={invoiceData} />

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
            onClick={() => setSelectedTab("invoices")}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              selectedTab === "invoices"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Invoices Hub
          </button>
          <button
            onClick={() => setSelectedTab("payments")}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              selectedTab === "payments"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Payments
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
        </div>
      </div>

      {/* Payment Plans Tab */}
      {selectedTab === "invoices" &&
        (invoiceData.length === 0 ? (
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
              <InvoicesHub invoices={invoiceData} />
            </Suspense>

            <PaginationFooter
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ))}

      {/* Invoices Hub Tab */}
      {selectedTab === "invoices" &&
        (paymentData.length === 0 ? (
          searchQuery ? (
            <div className="text-center text-muted-foreground py-10">
              No invoice payment plans found matching "{searchQuery}"
            </div>
          ) : (
            <InvoiceFallback />
          )
        ) : (
          <>
            {/* <PageUnderDevelopment/>
            <Suspense fallback={<div>Loading payment plans...</div>}>
              <InvoicesView
                activeInvoicePlans={paginatedActivePlans}
                handleOpenRecordPayment={handleOpenRecordPayment}
              />
            </Suspense> */}
          </>
        ))}

      {/* payment Model */}
      <div>
        {/* <Suspense fallback={<div>Loading Invoices...</div>}>
          <InvoicesPaymentModal
            isOpen={showRecordPaymentModal}
            onClose={() => {
              setShowRecordPaymentModal(false);
              setSelectedPlan(null);
            }}
            onSave={handleRecordPayment}
            planDetails={selectedPlan}
          />
        </Suspense> */}
      </div>

      {/* collection tab */}
      {selectedTab === "collections" &&
        (!collectionData.length ? (
          <InvoiceFallback />
        ) : (
          <Suspense fallback={<div>Loading chart...</div>}>
            <InvoicesCollectionChart collectionData={collectionData} />
          </Suspense>
        ))}
    </div>
  );
}

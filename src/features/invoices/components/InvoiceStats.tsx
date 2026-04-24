import { AlertCircle, CheckCircle, CreditCard, DollarSign } from "lucide-react";
import { useMemo } from "react";
import type { InvoicePlanUI } from "../invoices.types";

export default function InvoiceStats({
  paymentPlans,
}: {
  paymentPlans: InvoicePlanUI[];
}) {
  const stats = useMemo(() => {
    const totalActive = paymentPlans.filter(
      (p) => p.status !== "paid",
    ).length;
    const totalOverdue = paymentPlans.filter(
      (p) => p.status === "overdue",
    ).length;
    const totalExpected = paymentPlans.reduce(
      (sum, p) => sum + p.totalAmount,
      0,
    );
    const totalOutstanding = paymentPlans.reduce(
      (sum, p) => sum + p.balance,
      0,
    );
    return { totalActive, totalOverdue, totalExpected, totalOutstanding };
  }, [paymentPlans]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <CheckCircle className="w-4 h-4" />
          <p className="text-sm font-medium">Active Invoices</p>
        </div>
        <p className="text-2xl font-semibold">{stats.totalActive}</p>
      </div>
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-600 mb-2">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm font-medium">Overdue</p>
        </div>
        <p className="text-2xl font-semibold">{stats.totalOverdue}</p>
      </div>
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <DollarSign className="w-4 h-4" />
          <p className="text-sm font-medium">This Month</p>
        </div>
        <p className="text-2xl font-semibold">
          KES {(stats.totalExpected / 1000).toFixed(0)}K
        </p>
      </div>
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 text-purple-600 mb-2">
          <CreditCard className="w-4 h-4" />
          <p className="text-sm font-medium">Outstanding</p>
        </div>
        <p className="text-2xl font-semibold">
          KES {(stats.totalOutstanding / 1000).toFixed(0)}K
        </p>
      </div>
    </div>
  );
}

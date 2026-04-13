import { Calendar, Smartphone, Send } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import type { PaymentPlan } from "../invoices.types";
import { statusConfig } from "../config/StatusConfig";

interface Props {
  activeInvoicePlans: PaymentPlan[];
  handleOpenRecordPayment: (plan: PaymentPlan) => void;
}

export default function InvoicesView({
  activeInvoicePlans = [],
  handleOpenRecordPayment,
}: Props) {
  return (
    <div className="space-y-4">
      {activeInvoicePlans.map((plan) => {
        const config = statusConfig[plan.status] ?? statusConfig["pending"];
        const StatusIcon = config.icon;

        const progress =
          plan.totalAmount > 0 ? (plan.paidAmount / plan.totalAmount) * 100 : 0;

        return (
          <div
            key={plan.id}
            className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* LEFT SIDE */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <Avatar className="h-15 w-15">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium text-2xl">
                        {plan.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {plan.customer}
                      </h3>

                      <p className="text-sm text-muted-foreground mt-0.5 truncate">
                        {plan.id} • Lease: {plan.lease}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Apartment • Unit: {plan.unit}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.color}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {config.label}
                    {plan.daysOverdue ? ` (${plan.daysOverdue}d)` : ""}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      Payment Progress
                    </span>
                    <span className="font-medium">{progress.toFixed(0)}%</span>
                  </div>

                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-semibold">
                      KES {plan.totalAmount.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Paid</p>
                    <p className="font-semibold text-green-600">
                      KES {plan.paidAmount.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className="font-semibold text-red-600">
                      KES {plan.remainingAmount.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Installment</p>
                    <p className="font-semibold">
                      KES {plan.installmentAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground pt-4 font-medium">
                    Start Date: {plan.startDate}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="lg:w-64 space-y-3">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <p className="text-xs font-medium">Next Payment</p>
                  </div>

                  <p className="text-lg font-semibold">
                    {new Date(plan.nextPaymentDate).toLocaleDateString()}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {plan.frequency} • {plan.installments} installments
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Smartphone className="w-4 h-4" />
                  {plan.paymentMethod}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      toast.info("Reminder sent!", {
                        description: `SMS reminder sent to ${plan.customer}`,
                      })
                    }
                    className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    Remind
                  </button>

                  <button
                    onClick={() => handleOpenRecordPayment(plan)}
                    className="flex-1 px-3 py-2 text-sm border rounded-lg hover:bg-muted/50"
                  >
                    Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { Printer, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import type { PaymentPlan } from "../invoices.types";
import { toast } from "sonner";
import { statusConfig } from "../config/StatusConfig";

interface Props {
  paymentPlans: PaymentPlan[];
}

export default function InvoicesHub({ paymentPlans = [] }: Props) {
  return (
    <div className="space-y-4">
      {paymentPlans.map((plan) => {
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
                <div className={`${config.color} border  rounded-lg p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <StatusIcon className="w-3 h-3" />
                    <p className="text-xs font-medium">{config.label}</p>
                  </div>
                  <p className="text-lg font-semibold mb-1">{config.label}</p>
                  <p className="text-xs">
                    {plan.installments} Installements
                    {plan.daysOverdue ? ` (${plan.daysOverdue}d)` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  22 April 2026
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toast.info("Printing in Process!")}
                    className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-3 h-3" />
                    Print Invoice
                  </button>

                  <button
                    onClick={() =>
                      toast.info("Viewing Invoice Page Under Development!")
                    }
                    className="flex-1 px-3 py-2 text-sm border rounded-lg hover:bg-muted/50"
                  >
                    View
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

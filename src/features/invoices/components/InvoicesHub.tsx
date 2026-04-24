import { Printer, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { statusConfig } from "../config/StatusConfig";
import type { InvoicePlanUI } from "../invoices.types";
import { formatDate } from "@/utils/date";
import { useNavigate } from "react-router-dom";

interface Props {
  invoices: InvoicePlanUI[];
}

export default function InvoicesHub({ invoices = [] }: Props) {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      {invoices.map((inv) => {
        const config = statusConfig[inv.status] ?? statusConfig["pending"];
        const StatusIcon = config.icon;

        const progress =
          inv.totalAmount > 0 ? (inv.amountPaid / inv.totalAmount) * 100 : 0;

        return (
          <div
            key={inv.id}
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
                        {inv.tenantName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {inv.tenantName}
                      </h3>

                      <p className="text-sm text-muted-foreground mt-0.5 truncate">
                        {inv.invoiceNumber} • Lease: {inv.leaseId}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Apartment • Unit: {inv.leaseUnit}
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-semibold">
                      KES {inv.totalAmount.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Paid</p>
                    <p className="font-semibold text-green-600">
                      KES {inv.amountPaid.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className="font-semibold text-red-600">
                      KES {inv.balance.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground pt-4 font-medium">
                    Start Date: {formatDate(inv.leaseStartDate)}
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
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(inv.dueDate)}
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
                      navigate(`/dashboard/payments/details/${inv.id}`)
                    }
                    className="flex-1 px-3 py-2 text-sm border rounded-lg hover:bg-muted/50"
                  >
                    View
                  </button>
                </div>
                {inv.status === "paid" && (
                  <div>
                    <button className="w-full flex px-3 py-2 text-sm bg-primary/90 text-white rounded-lg hover:bg-primary/90 flex items-center justify-center gap-1.5">
                      Generate Receipt
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

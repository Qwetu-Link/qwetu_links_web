import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Loader,
  XCircle,
} from "lucide-react";
import type { InvoiceStatus, StatusConfigItem } from "../invoices.types";

export const statusConfig: Record<InvoiceStatus, StatusConfigItem> = {
  partial: {
    label: "Partial Payment",
    color: "bg-blue-100 text-blue-700",
    icon: Loader,
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  overdue: {
    label: "Overdue",
    color: "bg-red-100 text-red-700",
    icon: AlertTriangle,
  },
  paid: {
    label: "Paid",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-gray-100 text-gray-700",
    icon: XCircle,
  },
};

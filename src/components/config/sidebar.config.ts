import {
  LayoutGrid,
  Building2,
  FileText,
  Users,
  Wallet,
  Wrench,
  FileBox,
  BarChart3,
  BookOpen,
  Headphones,
  Settings,
  Users2,
  Home,
  CreditCard,
  Layers,
} from "lucide-react";

export const menu = [
  {
    icon: LayoutGrid,
    label: "Overview",
    to: "/dashboard",
    roles: ["admin", "landlord", "caretaker", "tenant"],
  },
  {
    icon: Users2,
    label: "Tenants",
    to: "/dashboard/tenants",
    roles: ["admin", "landlord", "caretaker"],
  },
  {
    icon: Users,
    label: "Users",
    to: "/dashboard/users",
    roles: ["admin"],
  },
  {
    icon: Building2,
    label: "Properties",
    to: "/dashboard/properties",
    roles: ["admin", "landlord", "caretaker"],
  },
  {
    icon: Home,
    label: "Units",
    to: "/dashboard/units",
    roles: ["admin", "landlord", "caretaker", "tenant"],
  },
  {
    icon: FileText,
    label: "Leases",
    to: "/dashboard/leases",
    roles: ["admin", "landlord", "tenant"],
  },
  {
    icon: CreditCard,
    label: "Payments",
    to: "/dashboard/payments",
    roles: ["admin", "landlord", "tenant"],
  },
  {
    icon: Wallet,
    label: "Transactions",
    to: "/dashboard/transactions",
    roles: ["admin", "landlord"],
  },
  {
    icon: Wrench,
    label: "Maintenance",
    to: "/dashboard/maintenance",
    roles: ["admin", "landlord", "caretaker", "tenant"],
  },
  {
    icon: Layers,
    label: "Property Features",
    to: "/dashboard/features",
    roles: ["admin"],
  },
  {
    icon: FileBox,
    label: "Documents",
    to: "/dashboard/documents",
    roles: ["admin", "landlord", "tenant"],
  },
  {
    icon: BarChart3,
    label: "Reports",
    to: "/dashboard/reports",
    roles: ["admin", "landlord"],
  },
];
export const help = [
  {
    icon: BookOpen,
    label: "Users Guide",
    to: "/dashboard/guide",
    roles: ["admin"],
  },
  {
    icon: Headphones,
    label: "Contact Support",
    to: "/dashboard/support",
    roles: ["admin"],
  },
  {
    icon: Settings,
    label: "Settings",
    to: "/dashboard/settings",
    roles: ["admin", "landlord"],
  },
];

import {
  LayoutGrid,
  Building2,
  Users2,
  Users,
  CreditCard,
  BarChart3,
  Home,
  FileText,
  Wrench,
  Wallet,
  Layers,
  FileBox,
  BookOpen,
  Headphones,
  Settings,
  HomeIcon,
} from "lucide-react";

export const links = {
  owner: [
    {
      icon: LayoutGrid,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Building2,
      label: "Properties",
      href: "/admin/property",
    },
    {
      icon: HomeIcon,
      label: "Units",
      href: "/admin/unit",
    },
    {
      icon: Layers,
      label: "Property Features",
      children: [
        {
          label: "Amenities",
          href: "/admin/amenities",
        },
        {
          label: "Utility",
          href: "/admin/utilities",
        },
      ],
    },
    {
      icon: Users2,
      label: "Tenants",
      href: "/admin/tenant",
    },
    {
      icon: Wrench,
      label: "Maintenance",
      href: "/admin/maintenance",
    },
    // {
    //   icon: CreditCard,
    //   label: "Finance",
    //   href: "/admin/finance/payments",
    // },
    {
      icon: Users,
      label: "Accounts",
      href: "/admin/user",
    },

    {
      icon: FileBox,
      label: "Documents",
      href: "/admin/document",
    },
    {
      icon: BarChart3,
      label: "Reports",
      href: "/admin/reports",
    },
  ],

  staff: [
    {
      icon: LayoutGrid,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Building2,
      label: "Properties",
      href: "/landlord/property",
    },
    {
      icon: Home,
      label: "Units",
      href: "/landlord/unit",
    },
    {
      icon: Users2,
      label: "Tenants",
      href: "/landlord/tenant",
    },
    {
      icon: FileText,
      label: "Invoices",
      href: "/landlord/invoices",
    },
    {
      icon: Wrench,
      label: "Maintenance",
      href: "/landlord/maintenance",
    },
    {
      icon: Wallet,
      label: "Transactions",
      href: "/landlord/transactions",
    },
    {
      icon: BarChart3,
      label: "Reports",
      href: "/landlord/reports",
    },
  ],

  qwetulinks: [
    {
      icon: LayoutGrid,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Users,
      label: "Users",
      href: "/qwetulinks/accounts",
    },
    {
      icon: Layers,
      label: "Amenities",
      href: "/qwetulinks/amenities",
    },
    {
      icon: CreditCard,
      label: "Payments",
      href: "/qwetulinks/payments",
    },
  ],

  caretaker: [
    {
      icon: LayoutGrid,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Building2,
      label: "Properties",
      href: "/caretaker/property",
    },
    {
      icon: Home,
      label: "Units",
      href: "/caretaker/unit",
    },
    {
      icon: Wrench,
      label: "Maintenance",
      href: "/caretaker/maintenance",
    },
    {
      icon: Users2,
      label: "Tenants",
      href: "/caretaker/tenant",
    },
  ],

  tenant: [
    {
      icon: LayoutGrid,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Building2,
      label: "Available Properties",
      href: "/tenant/property",
    },
    {
      icon: Home,
      label: "My Unit",
      href: "/tenant/my-unit",
    },
    {
      icon: FileText,
      label: "Invoices",
      href: "/tenant/invoices",
    },
    {
      icon: CreditCard,
      label: "Payments",
      href: "/tenant/payments",
    },
    {
      icon: Wrench,
      label: "Maintenance",
      href: "/tenant/maintenance",
    },
  ],
};

export const helpLinks = {
  owner: [
    {
      icon: BookOpen,
      label: "User Guide",
      href: "/help/guide",
    },
    {
      icon: Headphones,
      label: "Support",
      href: "/help/support",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/help/settings",
    },
  ],

  staff: [
    {
      icon: Headphones,
      label: "Support",
      href: "/help/support",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/help/settings",
    },
  ],

  qwetulinks: [
    {
      icon: Headphones,
      label: "Support",
      href: "/help/support",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/help/settings",
    },
  ],

  caretaker: [
    {
      icon: Headphones,
      label: "Support",
      href: "/help/support",
    },
  ],

  tenant: [
    {
      icon: Headphones,
      label: "Support",
      href: "/help/support",
    },
  ],
};

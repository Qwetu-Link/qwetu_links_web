import {
  LayoutGrid,
  Building2,
  Users2,
  Users,
  CreditCard,
  Wrench,
  Layers,
  Headphones,
  Settings,
  HomeIcon,
  Sparkles,
  Cog,
  LucideIcon,
} from "lucide-react";

export interface MenuChild {
  label: string;
  href: string;
}

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  children?: MenuChild[];
}

export const links: Record<string, MenuItem[]> = {
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
      icon: Sparkles,
      label: "Amenities",
      href: "/admin/amenities",
    },
    {
      icon: Cog,
      label: "Utility",
      href: "/admin/utilities",
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
    {
      icon: Users,
      label: "Accounts",
      href: "/admin/user",
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
};

export const helpLinks: Record<string, MenuItem[]> = {
  owner: [
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
};
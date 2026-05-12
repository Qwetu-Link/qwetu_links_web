"use client";

import { Bell, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  onMenuClick: () => void;
}

const titleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/admin/property": "Properties",
  "/admin/property/unit": "Units",
  "/admin/feature": "Property Features",
  "/admin/tenant": "Tenants",
  "/admin/finance": "Finance",
  "/admin/reports": "Reports",
  "/admin/user": "Accounts",
  "/admin/document": "Documents",
  "/landlord/property": "Properties",
  "/landlord/unit": "Units",
  "/landlord/tenant": "Tenants",
  "/landlord/invoices": "Invoices",
  "/landlord/maintenance": "Maintenance",
  "/landlord/transactions": "Transactions",
  "/landlord/reports": "Reports",
  "/caretaker/property": "Properties",
  "/caretaker/unit": "Units",
  "/caretaker/maintenance": "Maintenance",
  "/caretaker/tenant": "Tenants",
  "/tenant/property": "Available Properties",
  "/tenant/my-unit": "My Unit",
  "/tenant/invoices": "Invoices",
  "/tenant/payments": "Payments",
  "/tenant/maintenance": "Maintenance",
  "/guide": "User Guide",
  "/support": "Support",
  "/settings": "Settings",
};

const getTitle = (pathname: string) => {
  const match = Object.keys(titleMap)
    .sort((a, b) => b.length - a.length)
    .find((path) => pathname === path || pathname.startsWith(`${path}/`));

  return match ? titleMap[match] : "Dashboard";
};

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4 sm:px-6">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="min-w-0">
        <h1 className="truncate text-sm font-semibold text-foreground">
          {getTitle(pathname)}
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Search"
          className="hidden sm:inline-flex"
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
          aria-label="User menu"
        >
          QL
        </button>
      </div>
    </header>
  );
}

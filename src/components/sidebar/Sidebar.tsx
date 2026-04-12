import {
  LayoutDashboard,
  Users,
  Building2,
  Home,
  Wallet,
  Wrench,
  BarChart3,
  Settings,
  FileText,
  Bell,
  LogOut,
  UserCircle,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

type Role = "admin" | "landlord" | "caretaker" | "tenant";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

type MenuConfig = Record<Role, { sections: MenuSection[] }>;

interface SidebarProps {
  role: Role;
  collapsed: boolean;
}

const menuConfig: MenuConfig = {
  admin: {
    sections: [
      {
        title: "MAIN",
        items: [
          { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
          { icon: Users, label: "Users Management", href: "/admin/users" },
        ],
      },
      {
        title: "MANAGEMENT",
        items: [
          { icon: Building2, label: "Properties", href: "/admin/properties" },
          { icon: Home, label: "Units", href: "/admin/units" },
          { icon: UserCircle, label: "Tenants", href: "/admin/tenants" },
        ],
      },
      {
        title: "FINANCE",
        items: [
          { icon: Wallet, label: "Payments", href: "/admin/payments" },
          { icon: Wrench, label: "Maintenance", href: "/admin/maintenance" },
        ],
      },
      {
        title: "SYSTEM",
        items: [
          { icon: BarChart3, label: "Reports", href: "/admin/reports" },
          { icon: Settings, label: "Settings", href: "/admin/settings" },
        ],
      },
    ],
  },

  landlord: {
    sections: [
      {
        title: "MAIN",
        items: [
          { icon: LayoutDashboard, label: "Dashboard", href: "/landlord" },
          {
            icon: Building2,
            label: "My Properties",
            href: "/landlord/properties",
          },
        ],
      },
      {
        title: "MANAGEMENT",
        items: [
          { icon: Home, label: "Units Overview", href: "/landlord/units" },
          { icon: UserCircle, label: "Tenants", href: "/landlord/tenants" },
          {
            icon: Wallet,
            label: "Rent Collection",
            href: "/landlord/payments",
          },
          {
            icon: Wrench,
            label: "Maintenance Requests",
            href: "/landlord/maintenance",
            badge: 3,
          },
        ],
      },
      {
        title: "REPORTS",
        items: [
          { icon: BarChart3, label: "Reports", href: "/landlord/reports" },
        ],
      },
    ],
  },

  caretaker: {
    sections: [
      {
        title: "MAIN",
        items: [
          { icon: LayoutDashboard, label: "Dashboard", href: "/caretaker" },
          {
            icon: Building2,
            label: "Assigned Properties",
            href: "/caretaker/properties",
          },
        ],
      },
      {
        title: "TASKS",
        items: [
          {
            icon: Wrench,
            label: "Maintenance Tasks",
            href: "/caretaker/tasks",
            badge: 5,
          },
          {
            icon: Bell,
            label: "Tenant Complaints",
            href: "/caretaker/complaints",
          },
          {
            icon: FileText,
            label: "Inspections",
            href: "/caretaker/inspections",
          },
        ],
      },
      {
        title: "COMMUNICATION",
        items: [{ icon: Bell, label: "Notices", href: "/caretaker/notices" }],
      },
    ],
  },

  tenant: {
    sections: [
      {
        title: "MAIN",
        items: [
          { icon: LayoutDashboard, label: "Dashboard", href: "/tenant" },
          { icon: Home, label: "My Unit", href: "/tenant/unit" },
        ],
      },
      {
        title: "FINANCE",
        items: [
          { icon: Wallet, label: "Rent & Payments", href: "/tenant/payments" },
        ],
      },
      {
        title: "SUPPORT",
        items: [
          {
            icon: Wrench,
            label: "Maintenance Requests",
            href: "/tenant/maintenance",
          },
          { icon: Bell, label: "Notices", href: "/tenant/notices" },
          { icon: FileText, label: "Lease Info", href: "/tenant/lease" },
        ],
      },
    ],
  },
};

export function Sidebar({ role, collapsed }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const config = menuConfig[role];

  return (
    <div
      className={`h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-gold flex items-center justify-center">
            <Building2 className="size-5 text-white" />
          </div>

          {!collapsed && (
            <div>
              <div className="font-semibold text-white">Qwetu Links</div>
              <div className="text-xs text-sidebar-foreground/60 capitalize">
                {role}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6">
        {config.sections.map((section, idx) => (
          <div key={idx} className="mb-6">
            {!collapsed && (
              <div className="px-6 mb-3 text-xs font-semibold text-sidebar-foreground/50">
                {section.title}
              </div>
            )}

            <div className="space-y-1 px-3">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.href);

                return (
                  <button
                    key={itemIdx}
                    onClick={() => navigate(item.href)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-gold text-white"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <Icon className="size-5 shrink-0" />

                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left text-sm">
                          {item.label}
                        </span>

                        {item.badge && (
                          <span className="size-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div
          className={`flex items-center gap-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="size-9 rounded-full bg-gold-light flex items-center justify-center text-gold-dark font-semibold">
            JD
          </div>

          {!collapsed && (
            <div className="flex-1">
              <div className="text-sm font-medium text-sidebar-foreground">
                John Doe
              </div>
              <div className="text-xs text-sidebar-foreground/60 capitalize">
                {role}
              </div>
            </div>
          )}

          {!collapsed && (
            <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <LogOut className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

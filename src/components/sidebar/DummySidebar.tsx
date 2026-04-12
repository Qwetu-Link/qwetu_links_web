import {
  LayoutDashboard,
  Users,
  Building2,
  Home,
  Wallet,
  Wrench,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  collapsed?: boolean;
}

const menuSections = [
  {
    title: "MAIN",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: Users, label: "Users Management", href: "/dashboard/users" },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { icon: Building2, label: "Properties", href: "/dashboard/properties" },
      { icon: Home, label: "Units", href: "/dashboard/units" },
      { icon: Users, label: "Tenants", href: "/dashboard/tenants" },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { icon: Wallet, label: "Payments", href: "/dashboard/payments" },
      {
        icon: Wrench,
        label: "Maintenance",
        href: "/dashboard/maintenance",
        badge: 4,
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ],
  },
];

export default function DummySidebar({ collapsed = false }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className={`h-screen bg-primary text-sidebar-foreground flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-gold flex items-center justify-center">
            <Building2 className="size-5 text-white" />
          </div>

          {!collapsed && (
            <div>
              <div className="font-semibold text-white">Qwetu Links</div>
              <div className="text-xs text-white">Admin</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6">
        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            {!collapsed && (
              <div className="px-6 mb-3 text-xs font-semibold text-white">
                {section.title}
              </div>
            )}

            <div className="space-y-1 px-3">
              {section.items.map((item, i) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.href);

                return (
                  <button
                    key={i}
                    onClick={() => navigate(item.href)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                      isActive
                        ? "bg-gold text-white"
                        : "text-white hover:bg-accent hover:text-white"
                    }`}
                  >
                    <Icon className="size-5 shrink-0" />

                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left text-sm">
                          {item.label}
                        </span>

                        {"badge" in item && item.badge && (
                          <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
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

      {/* User */}
      <div className="p-4 border-t">
        <div
          className={`flex items-center gap-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="size-9 rounded-full bg-gold flex items-center justify-center text-white font-semibold">
            A
          </div>

          {!collapsed && (
            <>
              <div className="flex-1">
                <div className="text-sm text-white font-medium">Admin User</div>
                <div className="text-xs text-white">admin</div>
              </div>

              <button className="text-white hover:text-white">
                <LogOut className="size-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

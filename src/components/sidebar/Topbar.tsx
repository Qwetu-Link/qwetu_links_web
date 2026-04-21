import { Bell, ChevronDown, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface TopBarProps {
  onMenuClick?: () => void;
  collapsed?: boolean;
}

export default function TopBar({ onMenuClick, collapsed }: TopBarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTitle = () => {
    const path = location.pathname;

    if (path.includes("tenants")) return "Tenants";
    if (path.includes("users")) return "Users";
    if (path.includes("properties")) return "Properties";
    if (path.includes("units")) return "Units";
    if (path.includes("payments")) return "Payments";
    if (path.includes("maintenance")) return "Maintenance";

    return "Dashboard";
  };

  return (
    <header
      className={`h-14 border-b bg-background flex items-center gap-3 px-6 transition-all duration-300 ${
        collapsed ? "ml-16" : "ml-64"
      }`}
    >
      {/* Mobile Menu */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-lg hover:bg-muted"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Title */}
      <h1 className="text-sm font-semibold">{getTitle()}</h1>

      {/* Right Section */}
      <div className="ml-auto flex items-center gap-3">
        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-muted relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 hover:bg-muted px-2 py-1 rounded-lg"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
              {user?.name?.charAt(0) || "U"}
            </div>

            <div className="hidden md:block text-left">
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-muted-foreground capitalize">
                {user?.role}
              </div>
            </div>

            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-50">
              {/* User Info */}
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

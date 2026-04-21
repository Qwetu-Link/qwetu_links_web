import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import logo from "@/assets/qwetu_logo.svg";
import { help, menu } from "../config/sidebar.config";
import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}

const SidebarBody = ({
  collapsed,
  onToggle,
  onNavigate
}: {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}) => {
  const location = useLocation();

  const isActive = (to: string) => {
    const path = location.pathname;
    return path === to || path.startsWith(to + "/");
  };

  const { user } = useAuth();
  const currentUserRole = user?.role || "user";

  const filteredMenu = menu.filter((item) =>
    item.roles.includes(currentUserRole),
  );

  const filteredHelp = help.filter((item) =>
    item.roles.includes(currentUserRole),
  );

  return (
    <div className="flex flex-col h-full">
      <div
        className={cn(
          "pt-5 pb-4 flex items-center",
          collapsed ? "px-3 justify-center" : "px-5 justify-between",
        )}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <img
                src={logo}
                alt="Qwetu Links"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="font-bold text-base text-foreground">
              Qwetu Links
            </span>
          </div>
        )}
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted hidden md:inline-flex"
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>

      <nav
        className={cn("flex-1 overflow-y-auto", collapsed ? "px-2" : "px-3")}
      >
        {!collapsed && (
          <p className="text-[10px] font-semibold tracking-widest text-muted-foreground mb-1.5 px-2">
            MENU
          </p>
        )}
        <ul className="space-y-0.5">
          {filteredMenu.map((item) => {
            const active = isActive(item.to);
            return (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg text-sm transition-colors",
                    collapsed ? "justify-center p-2.5" : "px-3 py-2",
                    active
                      ? "bg-primary/20 text-foreground font-medium"
                      : "text-foreground hover:bg-primary/10 hover:text-foreground",
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  {!collapsed && item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {filteredHelp.length > 0 && (
          <>
            {!collapsed && (
              <p className="text-[10px] font-semibold tracking-widest text-muted-foreground mt-5 mb-1.5 px-2">
                HELP & SUPPORT
              </p>
            )}
            {collapsed && <div className="my-3 border-t border-border" />}
            <ul className="space-y-0.5 pb-4">
              {filteredHelp.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors",
                      collapsed ? "justify-center p-2.5" : "px-3 py-2",
                    )}
                  >
                    <item.icon
                      className="w-4 h-4 shrink-0"
                      strokeWidth={1.75}
                    />
                    {!collapsed && item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </div>
  );
};

export const Sidebar = ({
  collapsed,
  onToggle,
  mobileOpen = false,
  onMobileOpenChange,
}: SidebarProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="p-0 w-72 bg-sidebar-bg">
          <SidebarBody
            collapsed={false}
            onToggle={onToggle}
            onNavigate={() => onMobileOpenChange?.(false)}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "shrink-0 bg-sidebar-bg border-r border-border h-screen sticky top-0 transition-[width] duration-200 hidden md:block",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <SidebarBody collapsed={collapsed} onToggle={onToggle} />
    </aside>
  );
};

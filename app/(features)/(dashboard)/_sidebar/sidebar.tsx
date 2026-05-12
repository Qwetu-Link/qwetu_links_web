"use client";

import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMobile } from "@/app/lib/use-mobile";
import { usePathname } from "next/navigation";
import { helpLinks, links } from "@/app/lib/sidebar.config";

type Role = "admin" | "landlord" | "caretaker" | "tenant";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}

const currentUserRole: Role = "admin"; // later get from auth user

const SidebarBody = ({
  collapsed,
  onToggle,
  onNavigate,
  isMobile = false,
  onClose,
}: {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}) => {
  const pathname = usePathname();

  const mainMenu = links[currentUserRole];
  const bottomMenu = helpLinks[currentUserRole];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex h-full flex-col">
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-semibold text-sm">Menu</span>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div
        className={cn(
          "flex items-center pt-5 pb-4",
          collapsed ? "justify-center px-3" : "justify-between px-5",
        )}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Image
                src="/images/qwetu_logo.webp"
                alt="Qwetu Links"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>

            <span className="text-base font-bold text-foreground">
              Qwetu Links
            </span>
          </div>
        )}

        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground md:inline-flex"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav
        className={cn("flex-1 overflow-y-auto", collapsed ? "px-2" : "px-3")}
      >
        {!collapsed && (
          <p className="mb-1.5 px-2 text-[10px] font-semibold tracking-widest text-muted-foreground">
            MENU
          </p>
        )}

        <ul className="space-y-0.5">
          {mainMenu.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg text-sm transition-colors",
                    collapsed ? "justify-center p-2.5" : "px-3 py-2",
                    active
                      ? "bg-primary/15 font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>

        {bottomMenu.length > 0 && (
          <>
            {!collapsed && (
              <p className="mt-5 mb-1.5 px-2 text-[10px] font-semibold tracking-widest text-muted-foreground">
                HELP & SUPPORT
              </p>
            )}

            {collapsed && <div className="my-3 border-t border-border" />}

            <ul className="space-y-0.5 pb-4">
              {bottomMenu.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg text-sm transition-colors",
                        collapsed ? "justify-center p-2.5" : "px-3 py-2",
                        active
                          ? "bg-primary/15 font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
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
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <div className="ml-4">
            <SidebarBody
              collapsed={false}
              onToggle={onToggle}
              onNavigate={() => onMobileOpenChange?.(false)}
              isMobile={true}
              onClose={() => onMobileOpenChange?.(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 border-r border-border bg-background transition-[width] duration-200 md:block",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <SidebarBody collapsed={collapsed} onToggle={onToggle} isMobile={false} />
    </aside>
  );
};

"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layouts/SideBar";
import { Topbar } from "@/components/layouts/TopBar";
import FirebaseAuthProvider from "@/lib/FirebaseAuthProvider";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <div className="fixed">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((current) => !current)}
          mobileOpen={mobileOpen}
          onMobileOpenChange={setMobileOpen}
        />
      </div>

      <div
        className={`flex min-w-0 flex-1 flex-col overflow-hidden transition-[margin-left] duration-300 ${
          collapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        <Topbar onMenuClick={() => setMobileOpen((open) => !open)} />

        <main className="custom-scrollbar min-h-0 flex-1 overflow-y-auto">
          <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
        </main>
      </div>
    </div>
  );
}

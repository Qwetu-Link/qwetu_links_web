"use client";

import { useState } from "react";
import { Sidebar } from "./_sidebar/sidebar";
import { Topbar } from "./_topbar/topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="fixed">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
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

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

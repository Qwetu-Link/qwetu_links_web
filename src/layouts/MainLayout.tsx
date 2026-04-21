import { RoleSwitcher } from "@/components/RoleSwitcher";
import { Sidebar } from "@/components/sidebar/Sidebar";
import TopBar from "@/components/sidebar/Topbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Sidebar */}
        <div className="fixed">
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed((c) => !c)}
            mobileOpen={mobileOpen}
            onMobileOpenChange={setMobileOpen}
          />
          <RoleSwitcher />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopBar onMenuClick={() => setMobileOpen((open) => !open)} collapsed={collapsed} />
          {/* Main content */}
          <main
            className={`flex-1 h-screen overflow-y-auto transition-all duration-300 ${
              collapsed ? "ml-16" : "ml-64"
            }`}
          >
            {" "}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

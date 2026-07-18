import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import DashboardLayoutClient from "./dashboard-layout-client";

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard | Qwetu Links",
  description:
    "Private Qwetu Links dashboard for managing property listings, tenants, payments, maintenance, and rental operations.",
  path: "/dashboard",
  index: false,
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}

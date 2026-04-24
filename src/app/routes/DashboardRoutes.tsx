import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import InvoiceView from "@/features/invoices/components/InvoiceView";

// Pages
const OverviewPage = lazy(() => import("@/features/dashboard/OverViewPage"));
const TenantsPage = lazy(() => import("@/features/tenants/pages/TenantPage"));
const UnitsPage = lazy(() => import("@/features/units/pages/UnitsPage"));
const MaintenancePage = lazy(
  () => import("@/features/maintainance/MaintenancePage"),
);
const DocumentsPage = lazy(() => import("@/features/businesses/DocumentsPage"));
const Guidepage = lazy(() => import("@/features/businesses/Guidepage"));
const ReportsPage = lazy(() => import("@/features/reports/pages/ReportsPage"));
const SettingsPage = lazy(() => import("@/features/businesses/SettingsPage"));
const SupportPage = lazy(() => import("@/features/businesses/SupportPage"));
const LeasesPage = lazy(() => import("@/features/leases/pages/LeasesPage"));
const Userspage = lazy(() => import("@/features/accounts/pages/UsersPage"));
const PaymentsPage = lazy(
  () => import("@/features/payments/pages/PaymentsPage"),
);
const FeaturesPage = lazy(
  () => import("@/features/properties/pages/FeaturesPage"),
);
const PropertiesPage = lazy(
  () => import("@/features/properties/pages/PropertiesPage"),
);
const TransactionsPage = lazy(
  () => import("@/features/transactions/pages/TransactionsPage"),
);
const UserProfile = lazy(() => import("@/features/accounts/UserProfile"));

export default function DashboardRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          element={
            <RoleGuard
              allowedRoles={["admin", "landlord", "caretaker", "tenant"]}
            />
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="units" element={<UnitsPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route
          element={
            <RoleGuard allowedRoles={["admin", "landlord", "caretaker"]} />
          }
        >
          <Route path="tenants" element={<TenantsPage />} />
          <Route path="properties" element={<PropertiesPage />} />
        </Route>

        <Route
          element={<RoleGuard allowedRoles={["admin", "landlord", "tenant"]} />}
        >
          <Route path="leases" element={<LeasesPage />} />
          <Route path="payments">
            <Route index element={<PaymentsPage />} />
            <Route path="details/:invoiceId" element={<InvoiceView />} />
          </Route>
          <Route path="documents" element={<DocumentsPage />} />
        </Route>

        <Route element={<RoleGuard allowedRoles={["admin", "landlord"]} />}>
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route element={<RoleGuard allowedRoles={["admin"]} />}>
          <Route path="users" element={<Userspage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="guide" element={<Guidepage />} />
          <Route path="support" element={<SupportPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

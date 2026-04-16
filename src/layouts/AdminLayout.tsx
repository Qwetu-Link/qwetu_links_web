// import DummySidebar from '@/components/sidebar/DummySidebar'
// const InvoicePage = lazy(() => import("@/features/invoices/pages/InvoicePage"));
// const PropertyPage = lazy(
//   () => import("@/features/properties/pages/PropertyPage"),
// );
// const TenantPage = lazy(() => import("@/features/tenants/pages/TenantPage"));
import LandingPage from "@/features/portfolio/LandingPage";
// import { lazy, Suspense } from "react";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* <aside className="fixed w-72 border-r bg-background">
        <DummySidebar/>
      </aside> */}
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <main className="flex-1 ">
          {/* dashboard pages */}
          <LandingPage/>
          {/* <PropertyPage />
          <TenantPage />
          <InvoicePage /> */}
        </main>
      {/* </Suspense> */}
    </div>
  );
}

import InvoicePage from "@/features/invoices/pages/InvoicePage";
import PropertyPage from "@/features/properties/pages/PropertyPage";
import TenantPage from "@/features/tenants/pages/TenantPage";

export default function MainLayout() {
  return (
    <div>
      <PropertyPage />
      <TenantPage />
      <InvoicePage />
    </div>
  );
}

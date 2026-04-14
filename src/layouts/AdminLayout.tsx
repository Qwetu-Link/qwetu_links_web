// import DummySidebar from '@/components/sidebar/DummySidebar'
import InvoicePage from "@/features/invoices/pages/InvoicePage";
import PropertyPage from "@/features/properties/pages/PropertyPage";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* <aside className="fixed w-72 border-r bg-background">
        <DummySidebar/>
      </aside> */}

      <main className="flex-1 ">
        {/* dashboard pages */}
        <PropertyPage/>
        <InvoicePage />
      </main>
    </div>
  );
}

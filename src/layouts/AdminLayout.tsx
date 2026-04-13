// import DummySidebar from '@/components/sidebar/DummySidebar'
import InvoicePage from "@/features/invoices/pages/InvoicePage";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* <aside className="fixed w-72 border-r bg-background">
        <DummySidebar/>
      </aside> */}

      <main className="flex-1 p-6">
        {/* dashboard pages */}
        <InvoicePage />
      </main>
    </div>
  );
}

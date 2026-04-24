import InvoicePage from "@/features/invoices/pages/InvoicePage";
import { Outlet } from "react-router-dom";

export default function PaymentsPage() {
  return (
    <>
      <InvoicePage />
      <Outlet />
    </>
  );
}

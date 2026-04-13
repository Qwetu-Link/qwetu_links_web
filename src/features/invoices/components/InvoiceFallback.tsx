import { FileText } from "lucide-react";

export default function InvoiceFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-muted/50 rounded-full p-6 mb-6">
        <FileText className="w-12 h-12 text-muted-foreground" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        No Invoices Yet
      </h3>

      <p className="text-muted-foreground text-center max-w-md mb-6">
        There are currently no invoices to display. Create your first invoice to
        get started.
      </p>
    </div>
  );
}

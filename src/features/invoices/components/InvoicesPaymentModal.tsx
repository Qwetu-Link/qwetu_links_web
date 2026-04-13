import { useState } from "react";
import { X, CheckCircle } from "lucide-react";

interface PaymentPayload {
  planId?: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  paymentDate: string;
  notes: string;
  recordedAt: string;
}

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payment: PaymentPayload) => void;
  planDetails?: {
    id: string;
    customer: string;
    installmentAmount: number;
    paymentMethod: string;
  } | null;
}

export function InvoicesPaymentModal({
  isOpen,
  onClose,
  onSave,
  planDetails,
}: RecordPaymentModalProps) {
  const [amount, setAmount] = useState(
    planDetails?.installmentAmount.toString() || "",
  );
  const [paymentMethod, setPaymentMethod] = useState(
    planDetails?.paymentMethod || "M-Pesa",
  );
  const [transactionId, setTransactionId] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    const payment = {
      planId: planDetails?.id,
      amount: Number(amount),
      paymentMethod,
      transactionId,
      paymentDate,
      notes,
      recordedAt: new Date().toISOString(),
    };
    onSave(payment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg max-w-2xl w-full">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Record Payment</h2>
            {planDetails && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {planDetails.customer} • {planDetails.id}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">
                Payment Amount (KES) *
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {planDetails && (
                <p className="text-xs text-muted-foreground mt-1">
                  Expected: KES {planDetails.installmentAmount.toLocaleString()}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2">Payment Date *</label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Payment Method *</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="M-Pesa">M-Pesa</option>
                <option value="Airtel Money">Airtel Money</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Transaction ID</label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g., RBK1A2B3C4"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add any additional notes..."
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Confirmation */}
          {amount && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">
                    Payment will be recorded
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    KES {Number(amount).toLocaleString()} via {paymentMethod} on{" "}
                    {new Date(paymentDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!amount || !paymentDate}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Record Payment
          </button>
        </div>
      </div>
    </div>
  );
}

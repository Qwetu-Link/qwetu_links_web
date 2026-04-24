"use client";

import {
  ArrowLeft,
  Printer,
  Send,
  Download,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import data from "@/data/finance.json";
import { formatDate } from "@/utils/date";
import jsonData from "@/data/finance.json";

export default function InvoiceView() {
  // const [isPaid, setIsPaid] = useState(false);
  const { invoiceId } = useParams();
  console.log(invoiceId);

  const invoices = data[0].invoices;

  const invoice_0 = invoices.filter((inv) => inv.id === invoiceId);
  const invoice = invoice_0[0];

  const handlePrint = () => {
    window.print();
  };

  const handleSend = () => {
    alert("Email sending functionality would be implemented here");
  };

  const handleBack = () => {
    window.history.back();
  };

  // const handleMarkAsPaid = () => {
  //   setIsPaid(!isPaid);
  // };

  const bgImage =
    invoice.status === "paid"
      ? "https://imagur.org/i/sPY9ykth"
      : invoice.status === "overdue"
        ? "https://imagur.org/i/JKGU5tmF"
        : invoice.status === "cancelled"
          ? "https://imagur.org/i/xfwKqI1P"
          : " "; // default (e.g. pending)

  const response = jsonData[0];
  const payments = response.payments ?? [];
  const relatedPayments = payments.filter((pay) =>
    pay.invoice.some((inv) => inv.id === invoiceId),
  );

  console.log("Related Pay:", relatedPayments);

  // const paymentsInv = payments.map((pay) => pay.invoice);
  // console.log("payInv", paymentsInv);

  // const allpayments = paymentsInv.find((p) => p.id === invoiceId);
  // console.log("allPayments", allpayments);

  // const invoicesId = [];

  // const getPayments =

  // console.log("invoice from pay",getPayments)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Invoice #{invoice.invoice_number}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* <Button
              onClick={handleMarkAsPaid}
              variant={isPaid ? "default" : "outline"}
              size="sm"
              className={`flex items-center gap-2 ${isPaid ? "bg-green-600 hover:bg-green-700" : ""}`}
            >
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">
                {invoice.status ? "Marked Paid" : "Mark as Paid"}
              </span>
            </Button> */}
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button
              onClick={handleSend}
              size="sm"
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card className="p-8 bg-white bg-contain bg-no-repeat bg-center">
          {/* // style={{ backgroundImage: `url(${invoice.business.logo_url})` }}> */}

          <div className="flex justify-between items-start mb-8 pb-8 border-b border-gray-200">
            <div className="flex gap-3">
              <img
                src={invoice.business.logo_url}
                alt={invoice.business.short_name}
                width="100px"
              />
              <div className="">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  RENTAL INVOICE
                </h2>
                <p className="text-gray-600">
                  Invoice #{invoice.invoice_number}
                </p>
                <p className="text-gray-600">
                  Date Issued: {formatDate(invoice.issued_date)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 font-medium">
                Invoice Status
              </p>
              <span className="capitalize">{invoice.status}</span>
            </div>
          </div>

          {/* Landlord and Tenant Information */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4 tracking-wide">
                Landlord Information
              </h3>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {invoice.business.name}
                </p>
                <p className="text-gray-600">{invoice.business.address}</p>
                <p className="text-gray-600 mt-3">
                  <span className="font-medium">Phone:</span>{" "}
                  {invoice.business.phone_number}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span>{" "}
                  {invoice.business.email}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4 tracking-wide">
                Tenant Information
              </h3>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {invoice.tenant.first_name} {invoice.tenant.last_name}
                </p>
                <p className="text-gray-600 mt-3">
                  <span className="font-medium">Phone:</span>{" "}
                  {invoice.tenant.phone_number}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span>{" "}
                  {invoice.tenant.email}
                </p>
              </div>
            </div>
          </div>

          {/* Rental Period */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4 tracking-wide">
              Rental Period
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Period Start</p>
                <p className="font-medium text-gray-900">
                  {" "}
                  {formatDate(invoice.issued_date)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Period End</p>
                <p className="font-medium text-gray-900">
                  {formatDate(invoice.due_date)}
                </p>
              </div>
            </div>
          </div>

          {/* Itemized Charges */}
          <div
            className="bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url(${bgImage})`,
              minHeight: "200px",
            }}
          >
            <div className="mb-8 pb-8 border-b border-gray-200 ">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4 tracking-wide">
                Itemized Charges
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-sm font-semibold text-gray-900 py-3 px-0">
                        Description
                      </th>
                      <th className="text-right text-sm font-semibold text-gray-900 py-3 px-0">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="text-sm text-gray-600 py-3 px-0">
                        Monthly Rent
                      </td>
                      <td className="text-right text-sm font-medium text-gray-900 py-3 px-0">
                        KES {invoice.rent_amount}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-sm text-gray-600 py-3 px-0">
                        Utilities
                      </td>
                      <td className="text-right text-sm font-medium text-gray-900 py-3 px-0">
                        KES {invoice.utility_amount}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-sm text-gray-600 py-3 px-0">
                        Other Charges
                      </td>
                      <td className="text-right text-sm font-medium text-gray-900 py-3 px-0">
                        KES {invoice.other_charges}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Amount Due */}
            <div className="mb-8 pb-8 border-b border-gray-200 bg-center">
              <div></div>
              <div className="max-w-xs ml-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    KES {invoice.total_amount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total Due
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    KES {invoice.total_amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4 tracking-wide">
              Payment Terms
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Due Date</p>
                <p className="font-medium text-gray-900">
                  {formatDate(invoice.due_date)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Accepted Payment Methods
                </p>
                <ul className="text-gray-900 space-y-1">
                  <li className="text-sm">• Bank Transfer</li>
                  <li className="text-sm">• Check</li>
                  <li className="text-sm">• Online Payment Platform</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Late Payment Terms */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4 tracking-wide">
              Late Payment Terms
            </h3>
            <p className="text-sm text-gray-700">
              A late fee of <span className="font-semibold">KES 500.00</span>{" "}
              will be applied for payments received after the due date. If
              payment is not received within{" "}
              <span className="font-semibold">5 business days</span> of the due
              date, an additional penalty of{" "}
              <span className="font-semibold">KES 200.00</span> per day will be
              charged.
            </p>
          </div>

          {/* Payment History */}
          {relatedPayments.length > 0 && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4 tracking-wide">
                Payment History
              </h3>
              <div className="space-y-3">
                {/* Payment */}
                {relatedPayments.map((pay) => (
                  <div
                    key={pay.id}
                    className="grid grid-cols-12 items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {/* Icon + Details */}
                    <div className="col-span-6 flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(pay.paid_at).toLocaleDateString("en-KE", {
                            month: "long",
                            year: "numeric",
                          })}{" "}
                          Payment
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Paid on {formatDate(pay.paid_at)}
                        </p>
                      </div>
                    </div>

                    {/* Reference */}
                    <div className="col-span-2 text-md text-gray-700">
                      {pay.reference}
                    </div>

                    {/* Amount */}
                    <div className="col-span-2 text-right text-md font-semibold text-gray-900">
                      KES {pay.amount}
                    </div>

                    {/* Action */}
                    <div className="col-span-2 flex justify-end">
                      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-white rounded-md transition-colors">
                        <Download className="w-4 h-4" /> Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Section */}
          {/* <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4 tracking-wide">
              Additional Notes
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Scheduled Maintenance:</span>{" "}
                HVAC inspection scheduled for January 20, 2024, between 9 AM -
                12 PM. Please ensure access to the unit.
              </p>
              <p className="text-sm text-gray-700 mt-3">
                <span className="font-semibold">Payment Method Change:</span>{" "}
                Starting February 2024, all rent payments must be made via bank
                transfer to account ending in 4567. Please update your records
                accordingly.
              </p>
            </div>
          </div> */}

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Thank you for your prompt payment. For questions, please contact
              the landlord at landlord@property.com
            </p>
          </div>
        </Card>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .hidden.sm:inline {
            display: inline !important;
          }
          
          button,
          .bg-gray-50 {
            display: none !important;
          }
          
          .max-w-4xl {
            max-width: 100%;
          }
          
          .px-6 {
            padding-left: 0;
            padding-right: 0;
          }
        }
      `}</style>
    </div>
  );
}

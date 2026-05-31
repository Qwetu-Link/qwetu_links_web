import { ArrowRight, Building2, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import { footerContacts } from "../../_portfolio/_component/propertyData";

const supportOptions = [
  "Property viewing support",
  "Landlord onboarding",
  "Listing verification",
  "Tenant and rental enquiries",
];

export default function ContactSidebar() {
  return (
    <aside id="office" className="space-y-6">
      <div className="rounded-md bg-brand-dark p-6 text-white">
        <Building2 className="mb-5 h-8 w-8 text-rental-primary" />
        <h2 className="text-2xl font-bold">Office details</h2>
        <div className="mt-6 space-y-4 text-white/75">
          {footerContacts.map((item) => (
            <p key={item.label} className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-rental-primary" />
              {item.label}
            </p>
          ))}
          <p className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-rental-primary" />
            Mon - Fri, 8:30 AM - 5:30 PM
          </p>
        </div>
      </div>

      <div className="rounded-md border border-rental-border bg-white p-6">
        <MessageCircle className="mb-5 h-8 w-8 text-rental-primary" />
        <h2 className="text-2xl font-bold text-brand-dark">Quick support</h2>
        <div className="mt-5 space-y-3">
          {supportOptions.map((item) => (
            <p key={item} className="flex items-center gap-3 text-slate-700">
              <span className="h-2 w-2 rounded-full bg-rental-primary" />
              {item}
            </p>
          ))}
        </div>
        <Link
          href="/property"
          className="mt-7 inline-flex items-center gap-2 rounded-md border border-rental-primary px-5 py-3 font-semibold text-rental-primary transition hover:bg-rental-bg-light"
        >
          Browse properties
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}

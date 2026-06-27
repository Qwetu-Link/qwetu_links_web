import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <div>
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-rental-primary">
          Send a message
        </p>
        <h2 className="mt-2 text-3xl font-bold text-brand-dark sm:text-4xl">
          How can we help?
        </h2>
        <p className="mt-4 leading-7 text-slate-600">
          Share a few details and the right member of our team will follow up
          with practical next steps.
        </p>
      </div>

      <form className="grid gap-5 rounded-md border border-rental-border bg-rental-bg-light p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-brand-dark">
              Full name
            </span>
            <input
              type="text"
              placeholder="Your name"
              className="h-12 w-full rounded-md border border-rental-border bg-white px-4 text-sm text-brand-dark outline-none focus:border-rental-primary"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-brand-dark">
              Email address
            </span>
            <input
              type="email"
              placeholder="you@example.com"
              className="h-12 w-full rounded-md border border-rental-border bg-white px-4 text-sm text-brand-dark outline-none focus:border-rental-primary"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-brand-dark">
              Phone number
            </span>
            <input
              type="tel"
              placeholder="+254 700 000 000"
              className="h-12 w-full rounded-md border border-rental-border bg-white px-4 text-sm text-brand-dark outline-none focus:border-rental-primary"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-brand-dark">
              Enquiry type
            </span>
            <select className="h-12 w-full rounded-md border border-rental-border bg-white px-4 text-sm text-brand-dark outline-none focus:border-rental-primary">
              <option>General enquiry</option>
              <option>Property viewing</option>
              <option>Landlord Onboarding</option>
              <option>List a property</option>
              <option>Tenant support</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-dark">
            Message
          </span>
          <textarea
            rows={5}
            placeholder="Tell us what you need help with..."
            className="w-full resize-none rounded-md border border-rental-border bg-white px-4 py-3 text-sm text-brand-dark outline-none focus:border-rental-primary"
          />
        </label>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-md bg-rental-primary px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Send Message
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

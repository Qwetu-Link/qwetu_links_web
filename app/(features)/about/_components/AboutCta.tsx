import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

export default function AboutCta() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-md bg-brand-dark p-6 text-white md:grid-cols-[1fr_auto] md:items-center sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-rental-primary">
            Work with us
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Ready to find or list a property?
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/75">
            Browse available listings or contact the Qwetu Links team for
            tailored support.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/property"
            className="inline-flex items-center gap-2 rounded-md bg-rental-primary px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            View Properties
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

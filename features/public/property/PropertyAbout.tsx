import { featureChecks } from "@/utils/footer.config";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PropertyAbout() {
  return (
    <section id="about" className="bg-rental-bg-light py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative overflow-hidden rounded-md  p-8 pr-0">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1100&q=80"
            alt="Bright modern property interior"
            width={900}
            height={680}
            className="h-[420px] w-full rounded-l-md object-cover"
            unoptimized
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold leading-tight text-brand-dark sm:text-4xl">
            Place To Find & List The Perfect Property
          </h2>
          <p className="mt-6 leading-8 text-slate-600">
            We make property discovery easier with clear listings, reliable
            details, and helpful guidance from search to viewing. Find the right
            space faster and move forward with confidence.
          </p>
          <div className="mt-6 space-y-4">
            {featureChecks.map((item) => (
              <p key={item} className="flex items-center gap-3 text-slate-700">
                <Check className="h-5 w-5 text-rental-primary" />
                {item}
              </p>
            ))}
          </div>
          <Link
            href="#property-listing"
            className="mt-8 inline-flex rounded-md bg-rental-primary px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
}

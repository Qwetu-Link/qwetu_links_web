import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { heroImages } from "../../_portfolio/_component/propertyData";

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <Image
        src={heroImages[3]}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        unoptimized
      />
      <div className="absolute inset-0 bg-brand-dark/75" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-md bg-rental-primary px-3 py-1 text-sm font-semibold uppercase tracking-wide text-white">
            Our Services
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Property support from listing to move-in
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Qwetu Links helps renters, landlords, and property managers handle
            discovery, listing, verification, viewing, and rental coordination
            with less friction.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/property"
              className="inline-flex items-center gap-2 rounded-md bg-rental-primary px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Browse Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Talk To Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

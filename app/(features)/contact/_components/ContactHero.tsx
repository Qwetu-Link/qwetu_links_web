import Image from "next/image";
import { heroImages } from "../../_portfolio/_component/propertyData";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <Image
        src={heroImages[1]}
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
            Contact Qwetu Links
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Talk to us about your next property move
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Reach our team for property viewing help, listing support, landlord
            onboarding, or general rental enquiries.
          </p>
        </div>
      </div>
    </section>
  );
}

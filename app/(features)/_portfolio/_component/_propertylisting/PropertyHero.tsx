import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { heroImages } from "../propertyData";

export default function PropertyHero() {
  return (
    <section className="bg-white">
      <div className="grid min-h-[620px] lg:grid-cols-2">
        <div className="flex items-center px-4 py-16 sm:px-6 lg:px-16">
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold leading-tight text-brand-dark sm:text-5xl">
              Find A <span className="text-rental-primary">Perfect Home</span> To
              Live
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600">
              Explore verified homes, apartments, villas, and commercial spaces
              in locations that match your lifestyle, budget, and long-term
              plans.
            </p>
            <Link
              href="#property-listing"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-rental-primary px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="grid min-h-[420px] grid-cols-2 overflow-hidden lg:min-h-full">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={index === 0 ? "relative" : "relative hidden sm:block"}
            >
              <Image
                src={image}
                alt="Modern family home"
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

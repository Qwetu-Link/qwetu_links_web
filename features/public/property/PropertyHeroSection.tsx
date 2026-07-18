"use client";

import { heroImages } from "@/utils/propertyData";
// import { ArrowDown, Home, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";
// import Link from "next/link";
import { useEffect, useState } from "react";

const pageHeroSlides = [
  {
    image: heroImages[0],
    heading: "Explore Verified Properties",
    text: "Browse rentals with clear pricing, useful details, and locations that make it easier to choose your next space.",
  },
  {
    image: heroImages[2],
    heading: "Find Homes That Fit Your Life",
    text: "Compare apartments, villas, family homes, and commercial spaces from one simple property listing page.",
  },
  {
    image: heroImages[3],
    heading: "Book Viewings With Confidence",
    text: "Move from search to viewing with trusted property details and helpful support for renters and managers.",
  },
];

// const highlights = [
//   { label: "Verified listings", icon: ShieldCheck },
//   { label: "Homes and rentals", icon: Home },
//   { label: "Prime locations", icon: MapPin },
// ];

export default function PropertyPageHeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % pageHeroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[500px] overflow-hidden bg-brand-dark sm:min-h-[580px]">
      {pageHeroSlides.map((slide, index) => (
        <Image
          key={slide.image}
          src={slide.image}
          alt=""
          fill
          loading="eager"
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          unoptimized
        />
      ))}
      <div className="absolute inset-0 bg-brand-dark/70" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-dark/70 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-7xl items-center px-4 pb-32 pt-16 sm:min-h-[580px] sm:px-6 sm:pb-36 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-md bg-rental-primary px-3 py-1 text-sm font-semibold uppercase tracking-wide text-white">
            Property Listing
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            {pageHeroSlides[activeSlide].heading}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            {pageHeroSlides[activeSlide].text}
          </p>

          {/* <div className="mt-8 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur"
              >
                <item.icon className="h-4 w-4 text-rental-primary" />
                {item.label}
              </div>
            ))}
          </div> */}

          {/* <Link
            href="#property-listing"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-rental-primary px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            View Properties
            <ArrowDown className="h-4 w-4" />
          </Link> */}
        </div>

        {/* <div className="absolute bottom-20 left-4 flex gap-3 sm:bottom-24 sm:left-6 lg:left-8">
          {pageHeroSlides.map((slide, index) => (
            <button
              key={slide.heading}
              type="button"
              aria-label={`Show property hero slide ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeSlide === index
                  ? "w-9 bg-rental-primary"
                  : "w-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}

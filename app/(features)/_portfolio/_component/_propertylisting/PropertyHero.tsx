"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroImages } from "../propertyData";

const heroSlides = [
  {
    image: heroImages[0],
    title: "Find A Perfect Home To Live",
    text: "Explore verified homes, apartments, villas, and commercial spaces in locations that match your lifestyle, budget, and long-term plans.",
  },
  {
    image: heroImages[1],
    title: "Move Into Spaces That Fit You",
    text: "Compare beautiful rentals with clear details, practical amenities, and the support you need before booking a viewing.",
  },
  {
    image: heroImages[2],
    title: "Discover Homes In Prime Locations",
    text: "Search across neighborhoods, property types, and budgets to find a space that keeps you close to what matters.",
  },
  {
    image: heroImages[3],
    title: "List And Rent With Confidence",
    text: "Connect with trusted landlords, agents, and property managers through a smoother property discovery experience.",
  },
];

export default function PropertyHero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[560px] overflow-hidden bg-brand-dark sm:min-h-[640px]">
      {heroSlides.map((slide, index) => (
        <Image
          key={slide.image}
          src={slide.image}
          alt=""
          fill
          priority={index === 0}
          loading="eager"
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${
            activeSlide === index ? "opacity-100" : "opacity-0"
          }`}
          unoptimized
        />
      ))}
      <div className="absolute inset-0 bg-brand-dark/65" />

      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-4 py-20 sm:min-h-[640px] sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            {heroSlides[activeSlide].title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:mt-6 sm:text-lg sm:leading-8">
            {heroSlides[activeSlide].text}
          </p>
          <Link
            href="#property-listing"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-rental-primary px-6 py-3 font-semibold text-white transition hover:bg-orange-600 sm:mt-8"
          >
            Explore Listings
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="absolute bottom-8 left-4 flex gap-3 sm:left-6 lg:left-8">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeSlide === index
                  ? "w-9 bg-rental-primary"
                  : "w-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

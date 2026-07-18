import AboutCta from "@/features/public/about/AboutCta";
import AboutHero from "@/features/public/about/AboutHero";
import AboutStats from "@/features/public/about/AboutStats";
import AboutStory from "@/features/public/about/AboutStory";
import AboutValues from "@/features/public/about/AboutValues";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "About Qwetu Links | Rental Property Platform",
  description:
    "Learn how Qwetu Links helps renters, landlords, and property managers discover properties and manage rental activity with confidence.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutStats />
      <AboutCta />
    </main>
  );
}

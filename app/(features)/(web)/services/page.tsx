import ServicesCta from "@/features/public/service/ServicesCta";
import ServicesGrid from "@/features/public/service/ServicesGrid";
import ServicesHero from "@/features/public/service/ServicesHero";
import ServicesProcess from "@/features/public/service/ServicesProcess";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Qwetu Links Services | Rentals, Listings and Management",
  description:
    "Explore Qwetu Links services for finding rental properties, listing homes, handling enquiries, and supporting property management workflows.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <ServicesHero />
      <ServicesGrid />
      <ServicesProcess />
      <ServicesCta />
    </main>
  );
}

import ServicesCta from "@/features/public/service/ServicesCta";
import ServicesGrid from "@/features/public/service/ServicesGrid";
import ServicesHero from "@/features/public/service/ServicesHero";
import ServicesProcess from "@/features/public/service/ServicesProcess";

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

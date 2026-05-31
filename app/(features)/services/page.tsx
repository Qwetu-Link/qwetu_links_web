import ServicesCta from "./_components/ServicesCta";
import ServicesGrid from "./_components/ServicesGrid";
import ServicesHero from "./_components/ServicesHero";
import ServicesProcess from "./_components/ServicesProcess";

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

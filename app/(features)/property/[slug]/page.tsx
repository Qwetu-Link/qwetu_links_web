import PropertyDetails from "../../_portfolio/_component/_propertylisting/propertyDetails";
import { propertyListings } from "../../_portfolio/_component/propertyData";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return propertyListings.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const property = propertyListings.find((item) => item.slug === slug);

  return {
    title: property ? `${property.title} | Qwetu Links` : "Property Details",
    description: property?.location,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const property = propertyListings.find((item) => item.slug === slug);

  if (!property) {
    notFound();
  }

  return <PropertyDetails property={property} />;
}

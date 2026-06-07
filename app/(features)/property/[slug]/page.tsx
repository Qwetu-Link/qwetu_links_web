import { seededProperties } from "../../(dashboard)/admin/property/definations";
import PropertyDetails from "../../_portfolio/_component/_propertylisting/propertyDetails";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return seededProperties.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const property = seededProperties.find((item) => item.slug === slug);

  return {
    title: property ? `${property.name} | Qwetu Links` : "Property Details",
    description: property?.location,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const property = seededProperties.find((item) => item.slug === slug);

  if (!property) {
    notFound();
  }

  return <PropertyDetails property={property} />;
}

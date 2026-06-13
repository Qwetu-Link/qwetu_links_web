

"use client";

import { useParams } from "next/navigation";
import { useGetPublicSlugProperty } from "../../(dashboard)/admin/property/property.services";
import PropertyDetails from "../../_portfolio/_component/_propertylisting/propertyDetails";

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: property, isLoading, isError } = useGetPublicSlugProperty(slug);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !property) {
    return <div>Property not found</div>;
  }

  return <PropertyDetails property={property} />;
}



// "use client";
// import { useGetPublicSlugProperty } from "../../(dashboard)/admin/property/property.services";
// import PropertyDetails from "../../_portfolio/_component/_propertylisting/propertyDetails";
// import { notFound } from "next/navigation";

// type PageProps = {
//   params: Promise<{
//     slug: string;
//   }>;
// };



// export function generateStaticParams() {
//   return seededProperties.map((property) => ({
//     slug: property.slug,
//   }));
// }

// export async function generateMetadata({ params }: PageProps) {
//   const { slug } = await params;
//   const property = seededProperties.find((item) => item.slug === slug);

//   return {
//     title: property ? `${property.name} | Qwetu Links` : "Property Details",
//     description: property?.location,
//   };
// }

// export default async function Page({ params }: PageProps) {
//   const { slug } = await params;
//   const property = useGetPublicSlugProperty(slug);

//   if (!property) {
//     notFound();
//   }

//   return <PropertyDetails property={property} />;
// }

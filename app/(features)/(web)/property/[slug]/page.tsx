"use client";

import { useParams } from "next/navigation";
import { useGetPublicSlugProperty } from "@/hooks/useProperty";
import PropertyDetails from "../../_portfolio/_component/_propertylisting/propertyDetails";

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: property, isLoading, isError } = useGetPublicSlugProperty(slug);
  console.log("Public Details", property);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !property) {
    return <div>Property not found</div>;
  }

  return <PropertyDetails propertyData={property.data} />;
}

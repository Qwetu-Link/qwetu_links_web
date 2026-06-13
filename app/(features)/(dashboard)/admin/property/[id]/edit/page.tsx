"use client";

import PropertyFormPage from "../../_component/PropertyFormPage";
import { useGetPropertyDetails } from "../../property.services";


export default function EditPropertyPage({
  params,
}: { params: { id: string; businessId: string } }) {
  const { data, isLoading } = useGetPropertyDetails(params.id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <PropertyFormPage
      businessId={params.businessId}
      mode="edit"
      property={data?.data ?? data}
    />
  );
}
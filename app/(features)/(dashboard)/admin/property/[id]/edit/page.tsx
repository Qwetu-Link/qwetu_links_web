import { getServerApi } from "@/lib/axios.server";
import PropertyFormPage from "@/features/forms/PropertyFormPage";

interface PageProps {
  params: Promise<{ id: string; businessId: string }>;
}

export default async function EditPropertyPage({ params }: PageProps) {
  const { id, businessId } = await params;
  console.log("property id", id);
  // 1. Await the function to get the actual Axios instance
  const axiosServer = await getServerApi();

  // 2. Since baseURL is already defined in your axios config,
  //    you can just pass the relative path.
  const res = await axiosServer.get(`/businesses/properties/${id}`);

  // 3. Axios automatically parses JSON into res.data
  const data = res.data;

  console.log("Raw payload object structure from API:", data);
  const property = data?.data ?? data;

  console.log("edit server", property);

  return (
    <PropertyFormPage businessId={businessId} mode="edit" property={property} />
  );
}

import EditMaintenanceForm from "@/app/(features)/(dashboard)/admin/maintenance/forms/EditMaintenanceForm";
import { getServerApi } from "@/lib/axios.server";
type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const axiosServer = await getServerApi();

  // 2. Since baseURL is already defined in your axios config,
  //    you can just pass the relative path.
  const res = await axiosServer.get(`/businesses/maintainance/${id}`);

  // 3. Axios automatically parses JSON into res.data
  const data = res.data;

  console.log("Raw payload object structure from API:", data);
  const maintenance = data?.data ?? data;

  console.log("edit server", maintenance);

  return (
    <EditMaintenanceForm
      maintenance={maintenance}
      basePath="/landlord/maintenance"
    />
  );
}
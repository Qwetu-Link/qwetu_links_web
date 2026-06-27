
import { getServerApi } from "@/lib/axios.server";
import { EditUtilityForm } from "../../components/EditUtilityForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UtilityEditPage({ params }: PageProps) {
  const { id } = await params;

  const axiosServer = await getServerApi();
  const res = await axiosServer.get(`/businesses/utilities/${id}`);
  const data = res.data;

  return (
    <div>
      {/* Fixed data extraction configuration structure path */}
      <EditUtilityForm utility={data.data} />
    </div>
  );
}
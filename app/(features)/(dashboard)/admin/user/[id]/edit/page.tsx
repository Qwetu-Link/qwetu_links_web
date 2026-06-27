import { getServerApi } from "@/lib/axios.server";
import StaffFormPage from "@/features/forms/StaffFormPage";
interface PageProps {
  params: Promise<{ id: string; businessId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id ,businessId} = await params;

  const axiosServer = await getServerApi();
  
    // 2. Since baseURL is already defined in your axios config,
    //    you can just pass the relative path.
    const res = await axiosServer.get(`/businesses/staff/${id}`);
  
    // 3. Axios automatically parses JSON into res.data
    const data = res.data;
  
    console.log("Raw payload object structure from API:", data);
    const staff = data?.data ?? data;
  
    console.log("edit server", staff);

  return <StaffFormPage mode="edit" businessId={businessId} existingStaff={staff} listHref="/admin/user" />;
}

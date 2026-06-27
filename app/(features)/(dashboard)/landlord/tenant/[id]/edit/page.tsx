import TenantFormPage from "@/features/forms/TenantFormPage";
import { getServerApi } from "@/lib/axios.server";

interface PageProps {
    params: Promise<{ id: string; businessId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id, businessId } = await params;

    const axiosServer = await getServerApi();

    // 2. Since baseURL is already defined in your axios config,
    //    you can just pass the relative path.
    const res = await axiosServer.get(`/businesses/tenants/${id}`);

    // 3. Axios automatically parses JSON into res.data
    const data = res.data;

    console.log("Raw payload object structure from API:", data);
    const tenant = data?.data ?? data;

    console.log("edit server", tenant);

    return <TenantFormPage mode="edit" businessId={businessId} tenant={tenant} listHref="/admin/tenant" />;
}

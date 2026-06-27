import TenantDetailsPage from "@/features/private/tenant/TenantDetailsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;


  console.log("tenant id detail", id)
  return (
    <TenantDetailsPage
      tenantId={id}
      listHref="/admin/tenant"
      editHref={`/admin/tenant/${id}/edit`}
    />
  );
}

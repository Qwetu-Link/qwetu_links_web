import TenantDetailsPage from "../_components/TenantDetailsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <TenantDetailsPage
      tenantId={id}
      listHref="/admin/tenant"
      editHref={`/admin/tenant/${id}/edit`}
    />
  );
}

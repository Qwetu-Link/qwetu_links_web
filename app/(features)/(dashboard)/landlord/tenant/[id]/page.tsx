import TenantDetailsPage from "@/features/private/tenant/TenantDetailsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <TenantDetailsPage
      tenantId={id}
      listHref="/landlord/tenant"
      editHref={`/landlord/tenant/${id}/edit`}
    />
  );
}

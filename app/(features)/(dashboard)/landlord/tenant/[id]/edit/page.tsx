import TenantFormPage from "../../../../admin/tenant/_components/TenantFormPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <TenantFormPage mode="edit" tenantId={id} listHref="/landlord/tenant" />
  );
}

import TenantDetailsPage from "../../../admin/tenant/_components/TenantDetailsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <TenantDetailsPage
      tenantId={id}
      listHref="/caretaker/tenant"
      editHref=""
    />
  );
}
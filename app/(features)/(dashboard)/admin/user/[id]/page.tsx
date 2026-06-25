import StaffDetailsPage from "../_components/StaffDetailsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <StaffDetailsPage staffId={id} editHref={`/admin/staff/${id}/edit`} listHref="/admin/staff"/>;
}

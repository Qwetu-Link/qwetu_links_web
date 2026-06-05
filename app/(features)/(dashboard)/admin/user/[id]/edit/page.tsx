import StaffFormPage from "../../_components/StaffFormPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <StaffFormPage mode="edit" staffId={id} />;
}

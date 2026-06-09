import RegisterBusinessForm from "../../forms/register_business";

export default async function EditBusinessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RegisterBusinessForm mode="edit" businessId={id} />;
}

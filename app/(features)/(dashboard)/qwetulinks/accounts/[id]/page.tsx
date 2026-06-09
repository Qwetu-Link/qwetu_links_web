import AccDetails from "../_components/AccDetails";

export default async function BusinessDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AccDetails businessId={id} />;
}

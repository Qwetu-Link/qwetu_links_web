import PropertyFormPage from "../../_component/PropertyFormPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <PropertyFormPage mode="edit" propertySlug={slug} />;
}

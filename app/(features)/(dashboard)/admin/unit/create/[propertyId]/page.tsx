import UnitCreateForm from "../../_components/UnitCreateForm";

interface PageProps {
  params: Promise<{
    propertyId: string;
  }>;
  searchParams: Promise<{
    businessId?: string;
  }>;
}

export default async function CreateUnitPage({
  params,
  searchParams,
}: PageProps) {
  const { propertyId } = await params;
  const { businessId } = await searchParams;

  console.log("id and pro", propertyId, businessId);
  return (
    <div>
      <UnitCreateForm propertyId={propertyId} businessId={businessId ?? ""} />
    </div>
  );
}

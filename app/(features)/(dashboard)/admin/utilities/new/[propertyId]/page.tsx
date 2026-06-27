import { CreateUtilityForm } from "../../components/CreateUtilityForm";

interface PageProps {
  params: Promise<{
    propertyId: string;
  }>;
  searchParams: Promise<{
    businessId?: string;
  }>;
}

export default async function CreateUtilityPage({
  params
}: PageProps) {
  const { propertyId } = await params;

  console.log("id and pro", propertyId);
  return (
    <div>
      <CreateUtilityForm propertyID={propertyId} />
    </div>
  );
}
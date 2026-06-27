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


// import UnitEditForm from "../../_components/EditUnitForm";
// import { getServerApi } from "@/lib/axios.server";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function UnitEditPage({ params }: PageProps) {
//   const { id } = await params;

//   const axiosServer = await getServerApi();
//   const res = await axiosServer.get(`/businesses/units/${id}`);
//   const data = res.data;

//   return (
//     <div>
//       {/* Fixed data extraction configuration structure path */}
//       <UnitEditForm unit={data.data} businessId={data.data.businessID} />
//     </div>
//   );
// }
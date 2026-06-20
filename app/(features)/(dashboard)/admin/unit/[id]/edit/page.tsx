// import { getServerApi } from "@/lib/axios.server";
// import UnitEditForm from "../../_components/EditUnitForm";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }
// export default async function UnitEditPage({ params }: PageProps) {
//   const { id } = await params;

//   console.log("unit id", id);

//   const axiosServer = await getServerApi();
//   const res = await axiosServer.get(`/businesses/units/${id}`);

//   // 3. Axios automatically parses JSON into res.data
//   const data = res.data;

//   console.log("unit data", data);
//   console.log("unit business id", data.data.businessID);

//   return (
//     <div>
//       <UnitEditForm unit={data.data} businessId={data.businessID} />
//     </div>
//   );
// }

// UnitEditPage.tsx
import { getServerApi } from "@/lib/axios.server";
import UnitEditForm from "../../_components/EditUnitForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UnitEditPage({ params }: PageProps) {
  const { id } = await params;

  const axiosServer = await getServerApi();
  const res = await axiosServer.get(`/businesses/units/${id}`);
  const data = res.data;

  return (
    <div>
      {/* Fixed data extraction configuration structure path */}
      <UnitEditForm unit={data.data} businessId={data.data.businessID} />
    </div>
  );
}

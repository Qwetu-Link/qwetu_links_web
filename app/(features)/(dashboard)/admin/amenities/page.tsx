import { amenityKeys } from "./amenities.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PropertyAmenities from "./_components/PropertyAmenities";
import { getAmenities } from "./amenities.endpoints";
import { getServerApi } from "@/lib/axios.server";
// import { Suspense } from "react";

type PageProps = {
  searchParams?: {
    page?: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const page = Number(searchParams?.page ?? 1);

  const serverApi = await getServerApi();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: amenityKeys.list(page),
    queryFn: () => getAmenities(page, serverApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PropertyAmenities />
    </HydrationBoundary>
  );
}

import { amenityKeys } from "@/hooks/useAmenities";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAmenities } from "@/services/amenities.endpoints";
import { getServerApi } from "@/lib/axios.server";
import PropertyAmenities from "@/features/private/amenity/PropertyAmenities";

type PageProps = {
  searchParams?: Promise<{
    page?: string;
    perPage?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page ?? 1);
  const perPage = Number(resolvedParams?.perPage ?? 15);

  const serverApi = await getServerApi();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: amenityKeys.list(page, perPage),
    queryFn: () => getAmenities(page, perPage, serverApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PropertyAmenities />
    </HydrationBoundary>
  );
}

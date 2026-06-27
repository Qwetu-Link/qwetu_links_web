import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PropertyCatalog from "@/features/private/property/PropertyCatalog";
import { propertykeys } from "@/hooks/useProperty";
import { getProperties } from "@/services/property.endpoints";
import { getServerApi } from "@/lib/axios.server";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page ?? 1);
  const serverApi = await getServerApi();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: propertykeys.list(page),
    queryFn: () => getProperties(page, serverApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PropertyCatalog />
    </HydrationBoundary>
  );
}

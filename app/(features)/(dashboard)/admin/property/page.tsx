import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PropertyCatalog from "./_component/PropertyCatalog";
import { propertykeys } from "./property.services";
import { getProperties } from "./property.endpoints";
import { getServerApi } from "@/lib/axios.server";

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
    queryKey: propertykeys.list(page),
    queryFn: () => getProperties(page, serverApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PropertyCatalog />
    </HydrationBoundary>
  );
}

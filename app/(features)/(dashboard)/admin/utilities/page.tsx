import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getServerApi } from "@/lib/axios.server";
import { propertykeys } from "@/hooks/useProperty";
import { getProperties } from "@/services/property.endpoints";
import UtilityManagementPage from "@/features/private/utility/UtilityMgt";

type PageProps = {
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page ?? 1);
  const search = resolvedParams?.search ?? "";
  const serverApi = await getServerApi();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: propertykeys.list(page, search),
    queryFn: () => getProperties(page, search, serverApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UtilityManagementPage />
    </HydrationBoundary>
  );
}

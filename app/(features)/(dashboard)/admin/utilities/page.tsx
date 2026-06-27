import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getServerApi } from "@/lib/axios.server";
import { propertykeys } from "../property/property.services";
import { getProperties } from "../property/property.endpoints";
import UtilityManagementPage from "./components/UtilityMgt";

type PageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page ?? 1);
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
      <UtilityManagementPage/>
    </HydrationBoundary>
  );
}

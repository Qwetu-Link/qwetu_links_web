import { getServerApi } from "@/lib/axios.server";
import MaintenanceRequestsPage from "@/features/private/maintenance/MaintenanceRequestsPage";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { maintenancekeys } from "@/hooks/useMaintenance";
import { getMaintenances } from "@/services/maintenance.endpoint";


interface PageProps {
  searchParams: Promise<{ page?: string, search?: string }>;
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
    queryKey: maintenancekeys.list(page, search),
    queryFn: () => getMaintenances(page,search, serverApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MaintenanceRequestsPage basePath="/admin/maintenance" />
    </HydrationBoundary>
  );
}

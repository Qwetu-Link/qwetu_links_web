import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getServerApi } from "@/lib/axios.server";
import { tenantKeys } from "@/hooks/useTenant";
import { getTenants } from "@/services/tenant.endpoint";
import TenantManagement from "@/features/private/tenant/TenantManagement";

interface PageProps {
  searchParams: Promise<{ page?: string, search?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page ?? 1);
  const search = resolvedParams.search ?? "";


  const serverApi = await getServerApi();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: tenantKeys.list(page, search),
    queryFn: () => getTenants(page, search, serverApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TenantManagement />
    </HydrationBoundary>
  );
}

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
  searchParams: Promise<{ page?: string }>;
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
    queryKey: tenantKeys.list(page),
    queryFn: () => getTenants(page, serverApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TenantManagement />
    </HydrationBoundary>
  );
}

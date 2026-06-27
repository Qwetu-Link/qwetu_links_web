import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AccManagement from "@/features/accounts/AccManagement";
import { getBusinesses } from "@/services/business.endpoints";
import { businessQueryKeys } from "@/hooks/useBusiness";

export default async function AccountsPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: businessQueryKeys.list(),
      queryFn: getBusinesses,
      staleTime: 1000 * 60 * 5,
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AccManagement />;
    </HydrationBoundary>
  );
}

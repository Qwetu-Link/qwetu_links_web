import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getServerApi } from "@/lib/axios.server";
import StaffManagement from "@/features/private/staff/StaffManagement";
import { staffKeys } from "@/hooks/useStaff";
import { getStaffs } from "@/services/staff.endpoint";

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
    queryKey: staffKeys.list(page),
    queryFn: () => getStaffs(page, serverApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StaffManagement />
    </HydrationBoundary>
  );
}


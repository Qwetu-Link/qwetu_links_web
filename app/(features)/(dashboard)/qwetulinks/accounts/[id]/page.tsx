import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AccDetails from "../_components/AccDetails";
import { getBizDetails } from "../business.endpoints";
import { businessQueryKeys } from "../business.service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BusinessDetailsPage({ params }: PageProps) {
  const { id } = await params;
  console.log("Busines Id", id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: businessQueryKeys.detail(id),
    queryFn: () => getBizDetails(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AccDetails id={id} />;
    </HydrationBoundary>
  );
}

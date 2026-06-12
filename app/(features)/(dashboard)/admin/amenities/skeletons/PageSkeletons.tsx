import {
  CardGridSkeleton,
  FilterBarSkeleton,
  PageHeaderSkeleton,
  StatCardsSkeleton,
} from "./SkeletonPrimitives";


export function AmenityPageSkeleton() {
  return (
    <main className="space-y-6 rounded-xl bg-gray-50 p-6">
      <PageHeaderSkeleton actions={1} />
      <StatCardsSkeleton count={3} />
      <FilterBarSkeleton controls={1} />
      <CardGridSkeleton count={6} />
    </main>
  );
}

import {
  CardGridSkeleton,
} from "./SkeletonPrimitives";


export function AmenityPageSkeleton() {
  return (
    <main className="space-y-6 rounded-xl bg-gray-50 p-6">
      <CardGridSkeleton count={6} />
    </main>
  );
}

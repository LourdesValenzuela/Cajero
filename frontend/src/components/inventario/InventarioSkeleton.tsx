import Skeleton from "../ui/Skeleton";

function InventarioSkeleton() {
  return (
    <div className="space-y-5">
      <div>
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-2 h-4 w-80" />
      </div>

      <Skeleton className="h-20 w-full rounded-xl" />

      <div className="grid gap-5 lg:grid-cols-2">
        <Skeleton className="h-80 w-full rounded-xl" />
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>

      <Skeleton className="h-80 w-full rounded-xl" />
    </div>
  );
}

export default InventarioSkeleton;
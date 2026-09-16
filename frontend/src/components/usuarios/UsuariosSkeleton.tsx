import Skeleton from "../ui/Skeleton";

function UsuariosSkeleton() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <div>
          <Skeleton className="h-8 w-36" />
          <Skeleton className="mt-2 h-4 w-80" />
        </div>

        <Skeleton className="h-10 w-36" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-24 rounded-xl"
          />
        ))}
      </div>

      <Skeleton className="h-10 w-96" />
      <Skeleton className="h-72 rounded-xl" />
    </div>
  );
}

export default UsuariosSkeleton;
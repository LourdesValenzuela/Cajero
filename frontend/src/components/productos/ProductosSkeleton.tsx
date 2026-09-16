import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";

function ProductosSkeleton() {
  return (
    <div className="space-y-5">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-72" />
        </div>

        <Skeleton className="h-10 w-36" />
      </div>

      {/* Buscador */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-11 w-full max-w-sm" />
        <Skeleton className="h-3 w-32" />
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between">
              <div className="space-y-3">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-7 w-14" />
                <Skeleton className="h-3 w-32" />
              </div>

              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </Card>
        ))}
      </div>

      {/* Tabla */}
      <Card className="overflow-hidden">
        <div className="border-b border-slate-200 p-5">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-2 h-3 w-52" />
        </div>

        <div className="p-5">
          <div className="mb-5 grid grid-cols-6 gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-3 w-20" />
            ))}
          </div>

          <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, row) => (
              <div
                key={row}
                className="grid grid-cols-6 items-center gap-5"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />

                  <div className="space-y-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-2.5 w-20" />
                  </div>
                </div>

                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProductosSkeleton;
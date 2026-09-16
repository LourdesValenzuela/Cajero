import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";

function VentasSkeleton() {
  return (
    <div className="space-y-5">
      {/* Cabecera */}
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-52" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-11 w-80" />
          <Skeleton className="ml-auto h-3 w-28" />
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between">
              <div className="space-y-3">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-3 w-36" />
              </div>

              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </Card>
        ))}
      </div>

      {/* Historial + detalle */}
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_380px]">
        <Card className="overflow-hidden">
          <div className="border-b border-slate-200 p-5">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="mt-2 h-3 w-60" />
          </div>

          <div className="p-5">
            <div className="mb-5 grid grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-3 w-16" />
              ))}
            </div>

            <div className="space-y-6">
              {Array.from({ length: 5 }).map((_, row) => (
                <div
                  key={row}
                  className="grid grid-cols-6 items-center gap-4"
                >
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-2.5 w-12" />
                  </div>

                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-5 w-32" />
            </div>

            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>

          <Skeleton className="mt-3 h-16 w-full" />

          <div className="my-5 border-t border-slate-100" />

          <Skeleton className="h-3 w-20" />

          <div className="mt-4 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex justify-between"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>

                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>

          <Skeleton className="mt-6 h-20 w-full rounded-xl" />
        </Card>
      </div>
    </div>
  );
}

export default VentasSkeleton;
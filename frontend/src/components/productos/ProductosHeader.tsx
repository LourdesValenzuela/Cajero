import Button from "../ui/Button";
import Input from "../ui/Input";

interface Props {
  busqueda: string;
  cantidadResultados: number;
  puedeCrear: boolean;
  onBusquedaChange: (valor: string) => void;
  onNuevaCategoria: () => void;
  onNuevoProducto: () => void;
}

function ProductosHeader({
  busqueda,
  cantidadResultados,
  puedeCrear,
  onBusquedaChange,
  onNuevaCategoria,
  onNuevoProducto,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Productos
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Consulta el catálogo y la disponibilidad de productos.
          </p>
        </div>

        {puedeCrear && (
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              onClick={onNuevaCategoria}
            >
              + Nueva categoría
            </Button>

            <Button onClick={onNuevoProducto}>
              + Nuevo producto
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="w-full sm:max-w-sm">
          <Input
            value={busqueda}
            onChange={(e) =>
              onBusquedaChange(e.target.value)
            }
            placeholder="Buscar por nombre o código..."
          />
        </div>

        <p className="text-xs font-medium text-slate-400">
          {cantidadResultados} productos encontrados
        </p>
      </div>
    </div>
  );
}

export default ProductosHeader;
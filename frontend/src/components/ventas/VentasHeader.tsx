import Input from "../ui/Input";

interface Props {
  busqueda: string;
  cantidadResultados: number;
  onBusquedaChange: (valor: string) => void;
}

function VentasHeader({
  busqueda,
  cantidadResultados,
  onBusquedaChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Historial de Ventas
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Consulta las operaciones realizadas en caja.
        </p>
      </div>

      <div className="w-full sm:w-80">
        <Input
          value={busqueda}
          onChange={(e) =>
            onBusquedaChange(e.target.value)
          }
          placeholder="Buscar por cajero o producto..."
        />

        <p className="mt-1 text-right text-xs text-slate-400">
          {cantidadResultados}{" "}
          {cantidadResultados === 1
            ? "venta encontrada"
            : "ventas encontradas"}
        </p>
      </div>
    </div>
  );
}

export default VentasHeader;
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";
import type { Venta } from "../../services/api";

interface Props {
  ventas: Venta[];
  ventaSeleccionada: Venta | null;
  onSeleccionar: (venta: Venta) => void;
}

const formatearGs = (valor: number) =>
  valor.toLocaleString("es-PY");

function VentasTable({
  ventas,
  ventaSeleccionada,
  onSeleccionar,
}: Props) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="font-bold text-slate-900">
          Ventas realizadas
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Selecciona una operación para ver sus detalles
        </p>
      </div>

      {ventas.length === 0 ? (
        <div className="flex min-h-72 items-center justify-center p-8">
          <div className="text-center">
            <div className="text-4xl">🧾</div>

            <p className="mt-3 font-semibold text-slate-600">
              No se encontraron ventas
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Las ventas realizadas aparecerán aquí.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Cajero</th>
                <th className="px-4 py-3">Productos</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {ventas.map((venta) => {
                const cantidadProductos =
                  venta.detalles.reduce(
                    (total, detalle) =>
                      total + detalle.cantidad,
                    0
                  );

                const seleccionada =
                  ventaSeleccionada?.id === venta.id;

                return (
                  <tr
                    key={venta.id}
                    className={`
                      border-t border-slate-100
                      transition
                      ${
                        seleccionada
                          ? "bg-blue-50/70"
                          : "hover:bg-slate-50"
                      }
                    `}
                  >
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {new Date(
                          venta.fecha
                        ).toLocaleDateString("es-PY")}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {new Date(
                          venta.fecha
                        ).toLocaleTimeString("es-PY", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      {venta.usuario.nombre}{" "}
                      {venta.usuario.apellido}
                    </td>

                    <td className="px-4 py-4">
                      <Badge variant="info">
                        {cantidadProductos} items
                      </Badge>
                    </td>

                    <td className="px-4 py-4 font-bold text-slate-800">
                      {formatearGs(Number(venta.total))} Gs.
                    </td>

                    <td className="px-4 py-4">
                      {venta.estado === "COMPLETADA" ? (
                        <Badge variant="success">
                          Completada
                        </Badge>
                      ) : (
                        <Badge variant="danger">
                          Anulada
                        </Badge>
                      )}
                    </td>

                    <td className="px-4 py-4 text-right">
                      <Button
                        variant={
                          seleccionada
                            ? "primary"
                            : "secondary"
                        }
                        onClick={() => onSeleccionar(venta)}
                        className="px-3 py-1.5 text-xs"
                      >
                        Ver detalle
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default VentasTable;
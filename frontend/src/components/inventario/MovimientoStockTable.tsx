import Badge from "../ui/Badge";

import type { MovimientoStock } from "../../services/api";

interface Props {
  movimientos: MovimientoStock[];
}

function MovimientosStockTable({
  movimientos,
}: Props) {
  const obtenerCantidad = (movimiento: MovimientoStock) => {
    if (movimiento.tipo === "ENTRADA") {
      return `+${Math.abs(movimiento.cantidad)}`;
    }

    if (movimiento.tipo === "VENTA") {
      return `-${Math.abs(movimiento.cantidad)}`;
    }

    return movimiento.cantidad.toString();
  };

  const obtenerColorCantidad = (
    movimiento: MovimientoStock
  ) => {
    if (movimiento.tipo === "ENTRADA") {
      return "text-emerald-600";
    }

    if (movimiento.tipo === "VENTA") {
      return "text-red-500";
    }

    return "text-amber-600";
  };

  const obtenerMotivo = (movimiento: MovimientoStock) => {
    if (
      movimiento.tipo === "VENTA" &&
      movimiento.motivo?.startsWith("Venta ")
    ) {
      return "Venta";
    }

    return movimiento.motivo || "-";
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="font-bold text-slate-900">
          Movimientos de stock
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Historial de entradas, ventas y ajustes.
        </p>
      </div>

      {movimientos.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-slate-500">
          No hay movimientos registrados.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Fecha</th>
                <th className="px-5 py-3">Producto</th>
                <th className="px-5 py-3">Tipo</th>
                <th className="px-5 py-3">Cantidad</th>
                <th className="px-5 py-3">Usuario</th>
                <th className="px-5 py-3">Motivo</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {movimientos.map((movimiento) => (
                <tr
                  key={movimiento.id}
                  className="text-sm transition hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                    {new Date(
                      movimiento.creadoEn
                    ).toLocaleString("es-PY")}
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-800">
                      {movimiento.producto.nombre}
                    </div>

                    <div className="mt-0.5 text-xs text-slate-400">
                      {movimiento.producto.codigoBarras}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <Badge>
                      {movimiento.tipo}
                    </Badge>
                  </td>

                  <td
                    className={`px-5 py-4 font-bold ${obtenerColorCantidad(
                      movimiento
                    )}`}
                  >
                    {obtenerCantidad(movimiento)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {movimiento.usuario.nombre}{" "}
                    {movimiento.usuario.apellido}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {obtenerMotivo(movimiento)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MovimientosStockTable;
import { History } from "lucide-react";
import { Link } from "react-router-dom";

import Card from "../ui/Card";
import Badge from "../ui/Badge";

import type { Venta } from "../../services/api";

interface Props {
  ventas: Venta[];
}

function UltimasVentas({ ventas }: Props) {
  const ultimasVentas = [...ventas]
    .sort(
      (a, b) =>
        new Date(b.fecha).getTime() -
        new Date(a.fecha).getTime()
    )
    .slice(0, 5);

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <History size={18} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Últimas ventas
            </h3>

            <p className="text-xs text-slate-400">
              Operaciones más recientes
            </p>
          </div>
        </div>

        <Link
          to="/ventas"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          Ver historial
        </Link>
      </div>

      {ultimasVentas.length === 0 ? (
        <div className="p-8 text-center text-sm text-slate-400">
          Todavía no hay ventas registradas.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {ultimasVentas.map((venta) => (
            <div
              key={venta.id}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {venta.usuario.nombre}{" "}
                  {venta.usuario.apellido}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {new Date(venta.fecha).toLocaleString(
                    "es-PY"
                  )}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">
                    {Number(
                      venta.total
                    ).toLocaleString("es-PY")}{" "}
                    Gs.
                  </p>

                  <p className="text-xs text-slate-400">
                    {venta.detalles.length} producto
                    {venta.detalles.length !== 1
                      ? "s"
                      : ""}
                  </p>
                </div>

                <Badge
                  variant={
                    venta.estado === "COMPLETADA"
                      ? "success"
                      : "danger"
                  }
                >
                  {venta.estado === "COMPLETADA"
                    ? "Completada"
                    : "Anulada"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default UltimasVentas;
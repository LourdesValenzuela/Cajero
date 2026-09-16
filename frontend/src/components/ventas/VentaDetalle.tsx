import { Receipt } from "lucide-react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";
import type { Venta } from "../../services/api";

interface Props {
  venta: Venta | null;
}

const formatearGs = (valor: number) =>
  valor.toLocaleString("es-PY");

function VentaDetalle({ venta }: Props) {
  if (!venta) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Receipt size={24} />
          </div>

          <p className="mt-3 font-semibold text-slate-600">
            Selecciona una venta
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Aquí podrás consultar todos sus detalles.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
              Detalle de operación
            </p>

            <h3 className="mt-1 font-bold text-slate-900">
              Venta
            </h3>
          </div>

          {venta.estado === "COMPLETADA" ? (
            <Badge variant="success">
              Completada
            </Badge>
          ) : (
            <Badge variant="danger">
              Anulada
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          <Dato
            titulo="Fecha"
            valor={new Date(
              venta.fecha
            ).toLocaleDateString("es-PY")}
          />

          <Dato
            titulo="Hora"
            valor={new Date(
              venta.fecha
            ).toLocaleTimeString("es-PY", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        </div>

        <div className="mt-3 rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-400">
            Cajero
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {venta.usuario.nombre}{" "}
            {venta.usuario.apellido}
          </p>
        </div>

        <div className="my-5 border-t border-slate-100" />

        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
          Productos
        </p>

        <div className="space-y-3">
          {venta.detalles.map((detalle) => (
            <div
              key={detalle.id}
              className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {detalle.producto.nombre}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {detalle.cantidad} ×{" "}
                  {formatearGs(
                    Number(detalle.precioUnitario)
                  )}{" "}
                  Gs.
                </p>
              </div>

              <p className="whitespace-nowrap text-sm font-bold">
                {formatearGs(
                  Number(detalle.subtotal)
                )}{" "}
                Gs.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2">
          <FilaMonto
            titulo="Monto recibido"
            valor={Number(venta.montoRecibido)}
          />

          <FilaMonto
            titulo="Vuelto"
            valor={Number(venta.vuelto)}
          />
        </div>

        <div className="mt-5 rounded-xl border border-blue-300 bg-blue-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
            Total
          </p>

          <p className="mt-1 text-2xl font-extrabold text-blue-600">
            {formatearGs(Number(venta.total))} Gs.
          </p>
        </div>
      </div>
    </Card>
  );
}

function Dato({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string;
}) {
  return (
    <div className="rounded-lg border border-slate-100 p-3">
      <p className="text-xs text-slate-400">
        {titulo}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {valor}
      </p>
    </div>
  );
}

function FilaMonto({
  titulo,
  valor,
}: {
  titulo: string;
  valor: number;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">
        {titulo}
      </span>

      <span className="font-semibold text-slate-800">
        {formatearGs(valor)} Gs.
      </span>
    </div>
  );
}

export default VentaDetalle;
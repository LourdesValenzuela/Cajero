import Button from "../ui/Button";
import Card from "../ui/Card";
import type { ProductoCarrito } from "./types";

interface Props {
  carrito: ProductoCarrito[];
  onCambiarCantidad: (
    productoId: string,
    cantidad: number
  ) => void;
  onEliminar: (productoId: string) => void;
  onVaciar: () => void;
}

const formatearGs = (valor: number) =>
  valor.toLocaleString("es-PY");

function CarritoVenta({
  carrito,
  onCambiarCantidad,
  onEliminar,
  onVaciar,
}: Props) {
  const cantidadItems = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <Card className="min-h-[500px] overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-slate-800">
            Detalle de Venta Actual
          </h2>

          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
            {cantidadItems} items
          </span>
        </div>

        {carrito.length > 0 && (
          <Button
            variant="danger"
            onClick={onVaciar}
            className="px-3 py-1.5 text-xs"
          >
            Vaciar todo
          </Button>
        )}
      </div>

      {carrito.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="text-4xl">🛒</div>

            <p className="mt-3 font-semibold text-slate-500">
              No hay productos en la venta
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Escanea o escribe un código para comenzar
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Cantidad</th>
                <th className="px-4 py-3">Subtotal</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {carrito.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100"
                >
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-800">
                      {item.nombre}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.codigoBarras}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Stock: {item.stock}
                    </p>
                  </td>

                  <td className="px-4 py-4 font-medium">
                    {formatearGs(Number(item.precio))} Gs.
                  </td>

                  <td className="px-4 py-4">
                    <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-200">
                      <button
                        onClick={() =>
                          onCambiarCantidad(
                            item.id,
                            item.cantidad - 1
                          )
                        }
                        className="h-8 w-8 bg-slate-50 hover:bg-slate-100"
                      >
                        −
                      </button>

                      <span className="w-10 text-center text-sm font-bold">
                        {item.cantidad}
                      </span>

                      <button
                        onClick={() =>
                          onCambiarCantidad(
                            item.id,
                            item.cantidad + 1
                          )
                        }
                        disabled={item.cantidad >= item.stock}
                        className="h-8 w-8 bg-slate-50 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-4 font-bold">
                    {formatearGs(
                      Number(item.precio) * item.cantidad
                    )}{" "}
                    Gs.
                  </td>

                  <td className="px-4 py-4">
                    <button
                      onClick={() => onEliminar(item.id)}
                      className="rounded-md bg-red-50 px-2 py-1 text-sm text-red-500 hover:bg-red-100"
                      title="Eliminar producto"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default CarritoVenta;
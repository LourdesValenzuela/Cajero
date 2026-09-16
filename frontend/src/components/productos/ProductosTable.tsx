import Badge from "../ui/Badge";
import Card from "../ui/Card";
import type { Producto } from "../../services/api";

interface Props {
  productos: Producto[];
}

const formatearGs = (valor: number) =>
  valor.toLocaleString("es-PY");

function ProductosTable({ productos }: Props) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="font-bold text-slate-900">
          Catálogo de productos
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Información actual del inventario
        </p>
      </div>

      {productos.length === 0 ? (
        <div className="flex min-h-72 items-center justify-center p-8">
          <div className="text-center">
            <div className="text-4xl">📦</div>

            <p className="mt-3 font-semibold text-slate-600">
              No se encontraron productos
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Prueba con otro nombre o código.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">Producto</th>
                <th className="px-5 py-3">
                  Código de barras
                </th>
                <th className="px-5 py-3">Precio</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3">
                  Stock mínimo
                </th>
                <th className="px-5 py-3">Estado</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => {
                const sinStock = producto.stock === 0;

                const stockBajo =
                  producto.stock > 0 &&
                  producto.stock <= producto.stockMinimo;

                return (
                  <tr
                    key={producto.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                          📦
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {producto.nombre}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {producto.activo
                              ? "Producto activo"
                              : "Producto inactivo"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600">
                        {producto.codigoBarras}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {formatearGs(
                        Number(producto.precio)
                      )}{" "}
                      Gs.
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`font-bold ${
                          sinStock
                            ? "text-red-600"
                            : stockBajo
                              ? "text-amber-600"
                              : "text-slate-800"
                        }`}
                      >
                        {producto.stock}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {producto.stockMinimo}
                    </td>

                    <td className="px-5 py-4">
                      {!producto.activo ? (
                        <Badge>Inactivo</Badge>
                      ) : sinStock ? (
                        <Badge variant="danger">
                          Sin stock
                        </Badge>
                      ) : stockBajo ? (
                        <Badge variant="warning">
                          Stock bajo
                        </Badge>
                      ) : (
                        <Badge variant="success">
                          Disponible
                        </Badge>
                      )}
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

export default ProductosTable;
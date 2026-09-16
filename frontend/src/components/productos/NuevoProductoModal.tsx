import { useEffect, useState } from "react";
import { X } from "lucide-react";

import Button from "../ui/Button";
import Input from "../ui/Input";

import {
  crearProducto,
  obtenerCategorias,
} from "../../services/api";

import type {
  Categoria,
  NuevoProducto,
  Producto,
} from "../../services/api";

interface Props {
  abierto: boolean;
  onCerrar: () => void;
  onProductoCreado: (producto: Producto) => void;
}

const formularioInicial: NuevoProducto = {
  codigoBarras: "",
  nombre: "",
  precio: 0,
  stock: 0,
  stockMinimo: 0,
  categoriaId: "",
};

function NuevoProductoModal({
  abierto,
  onCerrar,
  onProductoCreado,
}: Props) {
  const [formulario, setFormulario] =
    useState<NuevoProducto>(formularioInicial);

  const [categorias, setCategorias] =
    useState<Categoria[]>([]);

  const [guardando, setGuardando] = useState(false);

  const [cargandoCategorias, setCargandoCategorias] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!abierto) return;

    const cargarCategorias = async () => {
      setCargandoCategorias(true);
      setError("");

      try {
        const data = await obtenerCategorias();

        const activas = data.filter(
          (categoria) => categoria.activo
        );

        setCategorias(activas);

        if (activas.length > 0) {
          setFormulario((actual) => ({
            ...actual,
            categoriaId:
              actual.categoriaId || activas[0].id,
          }));
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setCargandoCategorias(false);
      }
    };

    cargarCategorias();
  }, [abierto]);

  const actualizarCampo = (
    campo: keyof NuevoProducto,
    valor: string | number
  ) => {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor,
    }));
  };

  const actualizarNumero = (
    campo: "precio" | "stock" | "stockMinimo",
    valor: string
  ) => {
    actualizarCampo(
      campo,
      valor === "" ? 0 : Number(valor)
    );
  };

  const limpiarFormulario = () => {
    setFormulario(formularioInicial);
    setError("");
  };

  const cerrar = () => {
    if (guardando) return;

    limpiarFormulario();
    onCerrar();
  };

  const guardar = async () => {
    setError("");

    if (!formulario.codigoBarras.trim()) {
      setError("Ingresa el código de barras.");
      return;
    }

    if (!formulario.nombre.trim()) {
      setError("Ingresa el nombre del producto.");
      return;
    }

    if (formulario.precio <= 0) {
      setError("El precio debe ser mayor a 0.");
      return;
    }

    if (formulario.stock < 0) {
      setError("El stock no puede ser negativo.");
      return;
    }

    if (formulario.stockMinimo < 0) {
      setError(
        "El stock mínimo no puede ser negativo."
      );
      return;
    }

    if (!formulario.categoriaId) {
      setError("Selecciona una categoría.");
      return;
    }

    setGuardando(true);

    try {
      const producto = await crearProducto({
        ...formulario,
        codigoBarras: formulario.codigoBarras.trim(),
        nombre: formulario.nombre.trim(),
      });

      onProductoCreado(producto);

      limpiarFormulario();
      onCerrar();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setGuardando(false);
    }
  };

  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          cerrar();
        }
      }}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
              Catálogo
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Nuevo producto
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Registra un producto para comenzar a venderlo.
            </p>
          </div>

          <button
            type="button"
            onClick={cerrar}
            disabled={guardando}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Formulario */}
        <div className="space-y-5 p-6">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <Input
            label="Código de barras"
            value={formulario.codigoBarras}
            onChange={(e) =>
              actualizarCampo(
                "codigoBarras",
                e.target.value
              )
            }
            placeholder="Ej. 7840012345678"
            autoFocus
          />

          <Input
            label="Nombre del producto"
            value={formulario.nombre}
            onChange={(e) =>
              actualizarCampo(
                "nombre",
                e.target.value
              )
            }
            placeholder="Ej. Coca-Cola 500 ml"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Precio (Gs.)"
              type="number"
              min="1"
              value={
                formulario.precio === 0
                  ? ""
                  : formulario.precio
              }
              onChange={(e) =>
                actualizarNumero(
                  "precio",
                  e.target.value
                )
              }
              placeholder="Ej. 8000"
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Categoría
              </label>

              {cargandoCategorias ? (
                <div className="h-11 animate-pulse rounded-lg bg-slate-200" />
              ) : (
                <select
                  value={formulario.categoriaId}
                  onChange={(e) =>
                    actualizarCampo(
                      "categoriaId",
                      e.target.value
                    )
                  }
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                >
                  {categorias.length === 0 && (
                    <option value="">
                      No hay categorías disponibles
                    </option>
                  )}

                  {categorias.map((categoria) => (
                    <option
                      key={categoria.id}
                      value={categoria.id}
                    >
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Stock inicial"
              type="number"
              min="0"
              value={
                formulario.stock === 0
                  ? ""
                  : formulario.stock
              }
              onChange={(e) =>
                actualizarNumero(
                  "stock",
                  e.target.value
                )
              }
              placeholder="Ej. 20"
            />

            <Input
              label="Stock mínimo"
              type="number"
              min="0"
              value={
                formulario.stockMinimo === 0
                  ? ""
                  : formulario.stockMinimo
              }
              onChange={(e) =>
                actualizarNumero(
                  "stockMinimo",
                  e.target.value
                )
              }
              placeholder="Ej. 5"
            />
          </div>

          <div className="rounded-lg bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-700">
            El stock mínimo se utilizará para identificar
            automáticamente productos que necesitan reposición.
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <Button
            variant="secondary"
            onClick={cerrar}
            disabled={guardando}
          >
            Cancelar
          </Button>

          <Button
            onClick={guardar}
            disabled={
              guardando ||
              cargandoCategorias ||
              categorias.length === 0
            }
          >
            {guardando
              ? "Guardando..."
              : "Guardar producto"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NuevoProductoModal;